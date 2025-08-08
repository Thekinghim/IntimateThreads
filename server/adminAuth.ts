import type { RequestHandler } from "express";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

// PRODUCTION AUTH v3.2.0 - Enhanced logging and detection
console.log("🔐 Admin authentication system v3.2.0 initialized");

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
  try {
    console.log(`🔐 Production auth v3.2.0: Login attempt for ${username}`);
    
    // Hämta admin från databas
    const admin = await storage.getAdminByUsername(username);
    console.log(`Admin found: ${!!admin}`);
    
    if (!admin) {
      console.log(`❌ No admin found for username: ${username}`);
      return null;
    }
    
    if (!admin.isActive) {
      console.log(`❌ Admin account inactive: ${username}`);
      return null;
    }

    console.log(`🔑 Testing password for ${username}...`);
    const isValid = await bcrypt.compare(password, admin.passwordHash);
    console.log(`Password valid: ${isValid}`);
    
    if (!isValid) {
      console.log(`❌ Password validation failed for ${username}`);
      return null;
    }
    
    console.log(`✅ Authentication successful for ${username}`);
    
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
}

export async function logoutAdmin(token: string) {
  await storage.deleteAdminSession(token);
}