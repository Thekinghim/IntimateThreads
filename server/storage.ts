import { type Seller, type Product, type Order, type InsertSeller, type InsertProduct, type InsertOrder, type ProductWithSeller, type OrderWithDetails, sellers, products, orders } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

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
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, updates: Partial<Order>): Promise<Order | undefined>;
  getOrdersByStatus(status: string): Promise<OrderWithDetails[]>;
}

export class MemStorage implements IStorage {
  private sellers: Map<string, Seller>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;

  constructor() {
    this.sellers = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.seedData();
  }

  private seedData() {
    // Add some sample sellers
    const seller1: Seller = {
      id: randomUUID(),
      alias: "Emma",
      location: "Stockholm",
      age: 25,
      bio: "Stilmedveten tjej som älskar lyxiga material",
      commissionRate: "0.45",
      isActive: true,
      createdAt: new Date(),
    };

    const seller2: Seller = {
      id: randomUUID(),
      alias: "Astrid",
      location: "Oslo",
      age: 28,
      bio: "Designer med passion för kvalitet",
      commissionRate: "0.45",
      isActive: true,
      createdAt: new Date(),
    };

    const seller3: Seller = {
      id: randomUUID(),
      alias: "Linnea",
      location: "Köpenhamn",
      age: 24,
      bio: "Minimalist som föredrar klassiska designs",
      commissionRate: "0.45",
      isActive: true,
      createdAt: new Date(),
    };

    this.sellers.set(seller1.id, seller1);
    this.sellers.set(seller2.id, seller2);
    this.sellers.set(seller3.id, seller3);

    // Add sample products
    const product1: Product = {
      id: randomUUID(),
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
      createdAt: new Date(),
    };

    const product2: Product = {
      id: randomUUID(),
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
      createdAt: new Date(),
    };

    const product3: Product = {
      id: randomUUID(),
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
      createdAt: new Date(),
    };

    this.products.set(product1.id, product1);
    this.products.set(product2.id, product2);
    this.products.set(product3.id, product3);
  }

  // Sellers
  async getSellers(): Promise<Seller[]> {
    return Array.from(this.sellers.values());
  }

  async getSeller(id: string): Promise<Seller | undefined> {
    return this.sellers.get(id);
  }

  async createSeller(insertSeller: InsertSeller): Promise<Seller> {
    const seller: Seller = {
      ...insertSeller,
      id: randomUUID(),
      bio: insertSeller.bio || null,
      commissionRate: insertSeller.commissionRate || "0.45",
      isActive: insertSeller.isActive ?? true,
      createdAt: new Date(),
    };
    this.sellers.set(seller.id, seller);
    return seller;
  }

  async updateSeller(id: string, updates: Partial<Seller>): Promise<Seller | undefined> {
    const seller = this.sellers.get(id);
    if (!seller) return undefined;

    const updated = { ...seller, ...updates };
    this.sellers.set(id, updated);
    return updated;
  }

  // Products
  async getProducts(): Promise<ProductWithSeller[]> {
    const products = Array.from(this.products.values());
    return Promise.all(
      products.map(async (product) => {
        const seller = await this.getSeller(product.sellerId);
        return { ...product, seller: seller! };
      })
    );
  }

  async getProduct(id: string): Promise<ProductWithSeller | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    const seller = await this.getSeller(product.sellerId);
    if (!seller) return undefined;

    return { ...product, seller };
  }

  async getProductsBySeller(sellerId: string): Promise<ProductWithSeller[]> {
    const products = Array.from(this.products.values()).filter(p => p.sellerId === sellerId);
    const seller = await this.getSeller(sellerId);
    if (!seller) return [];

    return products.map(product => ({ ...product, seller }));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const product: Product = {
      ...insertProduct,
      id: randomUUID(),
      imageUrl: insertProduct.imageUrl || null,
      isAvailable: insertProduct.isAvailable ?? true,
      wearDays: insertProduct.wearDays || null,
      createdAt: new Date(),
    };
    this.products.set(product.id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updated = { ...product, ...updates };
    this.products.set(id, updated);
    return updated;
  }

  // Orders
  async getOrders(): Promise<OrderWithDetails[]> {
    const orders = Array.from(this.orders.values());
    return Promise.all(
      orders.map(async (order) => {
        const product = await this.getProduct(order.productId);
        const seller = await this.getSeller(order.sellerId);
        return { ...order, product: product!, seller: seller! };
      })
    );
  }

  async getOrder(id: string): Promise<OrderWithDetails | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const product = await this.getProduct(order.productId);
    const seller = await this.getSeller(order.sellerId);
    if (!product || !seller) return undefined;

    return { ...order, product, seller };
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const order: Order = {
      ...insertOrder,
      id: randomUUID(),
      customerName: insertOrder.customerName || null,
      nowpaymentsId: insertOrder.nowpaymentsId || null,
      cryptoCurrency: insertOrder.cryptoCurrency || null,
      cryptoAmount: insertOrder.cryptoAmount || null,
      paymentAddress: insertOrder.paymentAddress || null,
      paymentStatus: insertOrder.paymentStatus || "pending",
      status: insertOrder.status || "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.set(order.id, order);
    return order;
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updated = { ...order, ...updates, updatedAt: new Date() };
    this.orders.set(id, updated);
    return updated;
  }

  async getOrdersByStatus(status: string): Promise<OrderWithDetails[]> {
    const orders = await this.getOrders();
    return orders.filter(order => order.status === status);
  }
}

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
}

export const storage = new DatabaseStorage();
