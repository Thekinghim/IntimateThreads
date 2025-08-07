import { storage } from "./storage";

async function createAdminUsers() {
  console.log("🔐 Skapar admin-användare...");

  try {
    // Skapa första admin-användaren för dig
    const admin1 = await storage.createAdmin({
      username: "admin1",
      passwordHash: "adminpass123", // Detta kommer hashas automatiskt
      name: "Admin 1",
      isActive: true,
    });

    // Skapa andra admin-användaren för din partner
    const admin2 = await storage.createAdmin({
      username: "admin2", 
      passwordHash: "adminpass123", // Detta kommer hashas automatiskt
      name: "Admin 2",
      isActive: true,
    });

    console.log("✅ Admin-användare skapade:");
    console.log(`   👤 Användare 1: ${admin1.username} (${admin1.name})`);
    console.log(`   👤 Användare 2: ${admin2.username} (${admin2.name})`);
    console.log("");
    console.log("📝 Inloggningsuppgifter:");
    console.log("   Användare 1: admin1 / adminpass123");
    console.log("   Användare 2: admin2 / adminpass123");
    console.log("");
    console.log("⚠️  VIKTIGT: Ändra lösenorden efter första inloggningen!");
    
  } catch (error) {
    console.error("❌ Fel vid skapande av admin-användare:", error);
  }
}

// Kör om detta script körs direkt
if (import.meta.url === `file://${process.argv[1]}`) {
  createAdminUsers()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Fel:", error);
      process.exit(1);
    });
}

export { createAdminUsers };