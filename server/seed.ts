import { db } from "./db";
import { sellers, products, orders } from "@shared/schema";

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(orders);
  await db.delete(products);  
  await db.delete(sellers);

  // Add sample sellers
  const [seller1, seller2, seller3] = await db
    .insert(sellers)
    .values([
      {
        alias: "Emma",
        location: "Stockholm",
        age: 25,
        bio: "Stilmedveten tjej som älskar lyxiga material",
        commissionRate: "0.45",
        isActive: true,
      },
      {
        alias: "Astrid",
        location: "Oslo",
        age: 28,
        bio: "Designer med passion för kvalitet",
        commissionRate: "0.45",
        isActive: true,
      },
      {
        alias: "Linnea",
        location: "Köpenhamn",
        age: 24,
        bio: "Minimalist som föredrar klassiska designs",
        commissionRate: "0.45",
        isActive: true,
      },
    ])
    .returning();

  // Add sample products
  await db
    .insert(products)
    .values([
      {
        sellerId: seller1.id,
        title: "Svart spets",
        description: "Elegant svart spets i storlek S. Buren vid speciella tillfällen. Diskret och välvårdad.",
        size: "S",
        color: "Svart",
        material: "Spets",
        priceKr: "499.00",
        imageUrl: "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=400",
        isAvailable: true,
        wearDays: 3,
      },
      {
        sellerId: seller2.id,
        title: "Rosa siden",
        description: "Lyxig rosa siden från fransk tillverkare. Storlek M. Sällan använd.",
        size: "M",
        color: "Rosa",
        material: "Siden",
        priceKr: "699.00",
        imageUrl: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400",
        isAvailable: true,
        wearDays: 2,
      },
      {
        sellerId: seller3.id,
        title: "Vit bomull med spetsdetaljer",
        description: "Klassisk vit bomull med spetsdetaljer. Storlek S. Mycket omtyckt design.",
        size: "S",
        color: "Vit",
        material: "Bomull",
        priceKr: "399.00",
        imageUrl: "https://images.unsplash.com/photo-1594736797933-d0f021b89484?w=400",
        isAvailable: true,
        wearDays: 5,
      },
    ]);

  console.log("✅ Database seeded successfully!");
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Error seeding database:", error);
      process.exit(1);
    });
}

export { seedDatabase };