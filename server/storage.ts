import { type Seller, type Product, type Order, type InsertSeller, type InsertProduct, type InsertOrder, type ProductWithSeller, type OrderWithDetails, type Admin, type AdminSession, type InsertAdmin, type PromoCode, type InsertPromoCode, sellers, products, orders, admins, adminSessions, promoCodes } from "@shared/schema";
import { db } from "./db";
import { eq, and, gt, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export interface IStorage {
  // Sellers
  getSellers(): Promise<Seller[]>;
  getSeller(id: string): Promise<Seller | undefined>;
  createSeller(seller: InsertSeller): Promise<Seller>;
  updateSeller(id: string, updates: Partial<Seller>): Promise<Seller | undefined>;

  // Products
  getProducts(): Promise<ProductWithSeller[]>;
  getProduct(id: string): Promise<ProductWithSeller | undefined>;
  getProductsBySeller(sellerId: string): Promise<ProductWithSeller[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined>;

  // Orders
  getOrders(): Promise<OrderWithDetails[]>;
  getOrder(id: string): Promise<OrderWithDetails | undefined>;
  getOrderByIdAndEmail(orderId: string, email: string): Promise<OrderWithDetails | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, updates: Partial<Order>): Promise<Order | undefined>;
  getOrdersByStatus(status: string): Promise<OrderWithDetails[]>;

  // Admin authentication
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdminSession(adminId: string, token: string, expiresAt: Date): Promise<AdminSession>;
  getValidAdminSession(token: string): Promise<AdminSession & { admin: Admin } | undefined>;
  deleteAdminSession(token: string): Promise<void>;

  // Promo codes
  getPromoCodes(): Promise<PromoCode[]>;
  getPromoCode(code: string): Promise<PromoCode | undefined>;
  createPromoCode(promoCode: InsertPromoCode): Promise<PromoCode>;
  updatePromoCode(id: string, updates: Partial<PromoCode>): Promise<PromoCode | undefined>;
  deletePromoCode(id: string): Promise<void>;
  incrementPromoCodeUsage(code: string): Promise<void>;
}

// MemStorage removed - now using DatabaseStorage only

export class DatabaseStorage implements IStorage {
  // Sellers
  async getSellers(): Promise<Seller[]> {
    return await db.select().from(sellers);
  }

  async getSeller(id: string): Promise<Seller | undefined> {
    const [seller] = await db.select().from(sellers).where(eq(sellers.id, id));
    return seller || undefined;
  }

  async createSeller(insertSeller: InsertSeller): Promise<Seller> {
    const [seller] = await db
      .insert(sellers)
      .values(insertSeller)
      .returning();
    return seller;
  }

  async updateSeller(id: string, updates: Partial<Seller>): Promise<Seller | undefined> {
    const [seller] = await db
      .update(sellers)
      .set(updates)
      .where(eq(sellers.id, id))
      .returning();
    return seller || undefined;
  }

  // Products
  async getProducts(): Promise<ProductWithSeller[]> {
    return await db.query.products.findMany({
      with: {
        seller: true,
      },
    });
  }

  async getProduct(id: string): Promise<ProductWithSeller | undefined> {
    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        seller: true,
      },
    });
    return product || undefined;
  }

  async getProductsBySeller(sellerId: string): Promise<ProductWithSeller[]> {
    return await db.query.products.findMany({
      where: eq(products.sellerId, sellerId),
      with: {
        seller: true,
      },
    });
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set(updates)
      .where(eq(products.id, id))
      .returning();
    return product || undefined;
  }

  // Orders
  async getOrders(): Promise<OrderWithDetails[]> {
    return await db.query.orders.findMany({
      with: {
        product: true,
        seller: true,
      },
    });
  }

  async getOrder(id: string): Promise<OrderWithDetails | undefined> {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, id),
      with: {
        product: true,
        seller: true,
      },
    });
    return order || undefined;
  }

  async getOrderByIdAndEmail(orderId: string, email: string): Promise<OrderWithDetails | undefined> {
    const order = await db.query.orders.findFirst({
      where: and(eq(orders.id, orderId), eq(orders.customerEmail, email)),
      with: {
        product: true,
        seller: true,
      },
    });
    return order || undefined;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values(insertOrder)
      .returning();
    return order;
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order | undefined> {
    const [order] = await db
      .update(orders)
      .set(updates)
      .where(eq(orders.id, id))
      .returning();
    return order || undefined;
  }

  async getOrdersByStatus(status: string): Promise<OrderWithDetails[]> {
    return await db.query.orders.findMany({
      where: eq(orders.status, status),
      with: {
        product: true,
        seller: true,
      },
    });
  }

  // Admin authentication
  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const passwordHash = await bcrypt.hash(insertAdmin.passwordHash, 12);
    const [admin] = await db
      .insert(admins)
      .values({
        ...insertAdmin,
        passwordHash,
      })
      .returning();
    return admin;
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin || undefined;
  }

  async createAdminSession(adminId: string, token: string, expiresAt: Date): Promise<AdminSession> {
    const [session] = await db
      .insert(adminSessions)
      .values({
        adminId,
        token,
        expiresAt,
      })
      .returning();
    return session;
  }

  async getValidAdminSession(token: string): Promise<AdminSession & { admin: Admin } | undefined> {
    const session = await db.query.adminSessions.findFirst({
      where: and(
        eq(adminSessions.token, token),
        gt(adminSessions.expiresAt, new Date())
      ),
      with: {
        admin: true,
      },
    });
    return session || undefined;
  }

  async deleteAdminSession(token: string): Promise<void> {
    await db.delete(adminSessions).where(eq(adminSessions.token, token));
  }

  async getAllAdminSessions(): Promise<AdminSession[]> {
    return await db.select().from(adminSessions);
  }

  // Promo codes
  async getPromoCodes(): Promise<PromoCode[]> {
    return await db.select().from(promoCodes);
  }

  async getPromoCode(code: string): Promise<PromoCode | undefined> {
    const [promoCode] = await db.select().from(promoCodes).where(eq(promoCodes.code, code.toUpperCase()));
    return promoCode || undefined;
  }

  async createPromoCode(insertPromoCode: InsertPromoCode): Promise<PromoCode> {
    const [promoCode] = await db
      .insert(promoCodes)
      .values({
        ...insertPromoCode,
        code: insertPromoCode.code.toUpperCase(),
      })
      .returning();
    return promoCode;
  }

  async updatePromoCode(id: string, updates: Partial<PromoCode>): Promise<PromoCode | undefined> {
    const [promoCode] = await db
      .update(promoCodes)
      .set(updates)
      .where(eq(promoCodes.id, id))
      .returning();
    return promoCode || undefined;
  }

  async deletePromoCode(id: string): Promise<void> {
    await db.delete(promoCodes).where(eq(promoCodes.id, id));
  }

  async incrementPromoCodeUsage(code: string): Promise<void> {
    await db
      .update(promoCodes)
      .set({
        usageCount: sql`${promoCodes.usageCount} + 1`,
      })
      .where(eq(promoCodes.code, code.toUpperCase()));
  }
}

export const storage = new DatabaseStorage();
