import type { RequestHandler } from "express";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

// Middleware för admin-autentisering
export const requireAdminAuth: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Ingen behörighetstoken' });
  }

  const token = authHeader.substring(7); // Ta bort 'Bearer '
  
  try {
    const session = await storage.getValidAdminSession(token);
    
    if (!session || !session.admin.isActive) {
      return res.status(401).json({ message: 'Ogiltig eller utgången session' });
    }

    // Lägg till admin-informationen till request objektet
    (req as any).admin = session.admin;
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    return res.status(500).json({ message: 'Serverfel vid autentisering' });
  }
};

// Hjälpfunktioner för admin-sessioner
export async function authenticateAdmin(username: string, password: string) {
  let admin;
  
  try {
    // Temporär fix för production - skapa admin om den inte finns
    admin = await storage.getAdminByUsername(username);
    
    console.log(`Login attempt for user: ${username}, admin found: ${!!admin}`);
    
    if (!admin && (username === 'admin1' || username === 'admin2') && password === 'adminpass123') {
      // Skapa admin-användare om den inte finns
      console.log(`Creating new admin user: ${username}`);
      const passwordHash = await bcrypt.hash(password, 12);
      try {
        admin = await storage.createAdmin({
          username,
          passwordHash,
          name: username === 'admin1' ? 'Admin 1' : 'Admin 2',
          isActive: true
        });
        console.log(`Admin user created successfully: ${username}`);
      } catch (createError) {
        console.error('Error creating admin:', createError);
        return null;
      }
    }
    
    if (!admin || !admin.isActive) {
      console.log(`Authentication failed: admin not found or inactive for ${username}`);
      return null;
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    
    if (!isValid) {
      console.log(`Password validation failed for ${username}`);
      return null;
    }
    
    console.log(`Authentication successful for ${username}`);
    
    // Skapa en ny session
    const token = randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 dagar giltighetstid

    const session = await storage.createAdminSession(admin.id, token, expiresAt);
    
    return {
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
      },
      token,
      expiresAt,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }

  // Skapa en ny session
  const token = randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 dagar giltighetstid

  const session = await storage.createAdminSession(admin.id, token, expiresAt);
  
  return {
    admin: {
      id: admin.id,
      username: admin.username,
      name: admin.name,
    },
    token,
    expiresAt,
  };
}

export async function logoutAdmin(token: string) {
  await storage.deleteAdminSession(token);
}