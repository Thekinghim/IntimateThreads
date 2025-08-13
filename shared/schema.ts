import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sellers = pgTable("sellers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  alias: text("alias").notNull(),
  location: text("location").notNull(),
  age: integer("age").notNull(),
  bio: text("bio"),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).default("0.45"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sellerId: varchar("seller_id").references(() => sellers.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  size: text("size").notNull(),
  color: text("color").notNull(),
  material: text("material").notNull(),
  priceKr: decimal("price_kr", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
  category: text("category").default("women"),
  isAvailable: boolean("is_available").default(true),
  wearDays: integer("wear_days"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").references(() => products.id).notNull(),
  sellerId: varchar("seller_id").references(() => sellers.id).notNull(),
  customerName: text("customer_name"),
  customerEmail: text("customer_email").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  totalAmountKr: decimal("total_amount_kr", { precision: 10, scale: 2 }).notNull(),
  commissionKr: decimal("commission_kr", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method").notNull(), // 'crypto', 'revolut', 'gumroad'
  paymentStatus: text("payment_status").default("pending"), // 'pending', 'completed', 'failed', 'expired'
  nowpaymentsId: text("nowpayments_id"),
  cryptoCurrency: text("crypto_currency"),
  cryptoAmount: text("crypto_amount"),
  paymentAddress: text("payment_address"),
  status: text("status").default("pending"), // 'pending', 'confirmed', 'shipped', 'completed', 'cancelled', 'returned'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const adminSessions = pgTable("admin_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  adminId: varchar("admin_id").references(() => admins.id).notNull(),
  token: text("token").unique().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const promoCodes = pgTable("promo_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").unique().notNull(),
  discountKr: decimal("discount_kr", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  usageCount: integer("usage_count").default(0),
  maxUsage: integer("max_usage"),
  validFrom: timestamp("valid_from").defaultNow(),
  validUntil: timestamp("valid_until"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSellerSchema = createInsertSchema(sellers).omit({
  id: true,
  createdAt: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  createdAt: true,
});

export const insertPromoCodeSchema = createInsertSchema(promoCodes).omit({
  id: true,
  createdAt: true,
  usageCount: true,
});

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Användarnamn krävs"),
  password: z.string().min(1, "Lösenord krävs"),
});

export type InsertSeller = z.infer<typeof insertSellerSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type InsertPromoCode = z.infer<typeof insertPromoCodeSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;

export type Seller = typeof sellers.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Admin = typeof admins.$inferSelect;
export type AdminSession = typeof adminSessions.$inferSelect;
export type PromoCode = typeof promoCodes.$inferSelect;

// Alias types for admin panel compatibility
export type SelectSeller = typeof sellers.$inferSelect;
export type SelectProduct = typeof products.$inferSelect;
export type SelectOrder = typeof orders.$inferSelect;

// Relations
export const sellersRelations = relations(sellers, ({ many }) => ({
  products: many(products),
  orders: many(orders),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  seller: one(sellers, {
    fields: [products.sellerId],
    references: [sellers.id],
  }),
  orders: many(orders),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  product: one(products, {
    fields: [orders.productId],
    references: [products.id],
  }),
  seller: one(sellers, {
    fields: [orders.sellerId],
    references: [sellers.id],
  }),
}));

export const adminsRelations = relations(admins, ({ many }) => ({
  sessions: many(adminSessions),
}));

export const adminSessionsRelations = relations(adminSessions, ({ one }) => ({
  admin: one(admins, {
    fields: [adminSessions.adminId],
    references: [admins.id],
  }),
}));

export type ProductWithSeller = Product & { seller: Seller };
export type OrderWithDetails = Order & { product: Product; seller: Seller };
