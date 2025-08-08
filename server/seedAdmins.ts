import bcrypt from "bcryptjs";
import { storage } from "./storage";

export async function seedAdmins() {
  try {
    console.log("Seeding admin users...");
    
    // Check if admin1 exists
    let admin1 = await storage.getAdminByUsername('admin1');
    if (!admin1) {
      console.log("Creating admin1...");
      const passwordHash = await bcrypt.hash('adminpass123', 12);
      await storage.createAdmin({
        username: 'admin1',
        passwordHash,
        name: 'Admin 1',
        isActive: true
      });
      console.log("Admin1 created successfully");
    } else {
      console.log("Admin1 already exists");
    }
    
    // Check if admin2 exists
    let admin2 = await storage.getAdminByUsername('admin2');
    if (!admin2) {
      console.log("Creating admin2...");
      const passwordHash = await bcrypt.hash('adminpass123', 12);
      await storage.createAdmin({
        username: 'admin2',
        passwordHash,
        name: 'Admin 2',
        isActive: true
      });
      console.log("Admin2 created successfully");
    } else {
      console.log("Admin2 already exists");
    }
    
    console.log("Admin seeding completed");
  } catch (error) {
    console.error("Error seeding admins:", error);
  }
}