import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertOrderSchema, adminLoginSchema } from "@shared/schema";
import { z } from "zod";
import { requireAdminAuth, authenticateAdmin, logoutAdmin } from "./adminAuth";

const nowpaymentsApiKey = process.env.NOWPAYMENTS_API_KEY || process.env.API_KEY || "your_api_key_here";
const nowpaymentsBaseUrl = process.env.NODE_ENV === "production" 
  ? "https://api.nowpayments.io/v1" 
  : "https://api-sandbox.nowpayments.io/v1";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get products by seller
  app.get("/api/sellers/:id/products", async (req, res) => {
    try {
      const products = await storage.getProductsBySeller(req.params.id);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch seller products" });
    }
  });

  // Get all sellers
  app.get("/api/sellers", async (req, res) => {
    try {
      const sellers = await storage.getSellers();
      res.json(sellers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sellers" });
    }
  });

  // Create new order
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Get order by ID
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Update order
  app.patch("/api/orders/:id", async (req, res) => {
    try {
      const updates = req.body;
      const order = await storage.updateOrder(req.params.id, updates);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order" });
    }
  });

  // NOWPayments API endpoints
  app.get("/api/nowpayments/status", async (req, res) => {
    try {
      const response = await fetch(`${nowpaymentsBaseUrl}/status`, {
        headers: { 'x-api-key': nowpaymentsApiKey }
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to check NOWPayments status" });
    }
  });

  app.get("/api/nowpayments/currencies", async (req, res) => {
    try {
      const response = await fetch(`${nowpaymentsBaseUrl}/currencies`, {
        headers: { 'x-api-key': nowpaymentsApiKey }
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch currencies" });
    }
  });

  app.get("/api/nowpayments/estimate", async (req, res) => {
    try {
      const { amount, currency_from, currency_to } = req.query;
      const response = await fetch(
        `${nowpaymentsBaseUrl}/estimate?amount=${amount}&currency_from=${currency_from}&currency_to=${currency_to}`,
        { headers: { 'x-api-key': nowpaymentsApiKey } }
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to get estimate" });
    }
  });

  app.post("/api/nowpayments/payment", async (req, res) => {
    try {
      const paymentData = {
        price_amount: req.body.price_amount,
        price_currency: "sek",
        pay_currency: req.body.pay_currency,
        ipn_callback_url: `${req.protocol}://${req.get('host')}/api/nowpayments/webhook`,
        order_id: req.body.order_id,
        order_description: req.body.order_description || "Diskreta Kollektion Purchase"
      };

      const response = await fetch(`${nowpaymentsBaseUrl}/payment`, {
        method: 'POST',
        headers: {
          'x-api-key': nowpaymentsApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();
      
      if (response.ok) {
        // Update order with payment details
        await storage.updateOrder(req.body.order_id, {
          nowpaymentsId: data.payment_id,
          cryptoCurrency: data.pay_currency,
          cryptoAmount: data.pay_amount,
          paymentAddress: data.pay_address,
          paymentStatus: "pending"
        });
      }

      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to create payment" });
    }
  });

  app.get("/api/nowpayments/payment/:payment_id", async (req, res) => {
    try {
      const response = await fetch(`${nowpaymentsBaseUrl}/payment/${req.params.payment_id}`, {
        headers: { 'x-api-key': nowpaymentsApiKey }
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payment status" });
    }
  });

  // NOWPayments webhook
  app.post("/api/nowpayments/webhook", async (req, res) => {
    try {
      const { payment_id, payment_status, order_id } = req.body;
      
      // Update order based on payment status
      let orderStatus = "pending";
      if (payment_status === "finished") {
        orderStatus = "confirmed";
      } else if (payment_status === "failed" || payment_status === "expired") {
        orderStatus = "cancelled";
      }

      await storage.updateOrder(order_id, {
        paymentStatus: payment_status,
        status: orderStatus
      });

      res.status(200).send("OK");
    } catch (error) {
      res.status(500).json({ message: "Webhook processing failed" });
    }
  });

  // Admin authentication endpoints
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      
      const result = await authenticateAdmin(username, password);
      
      if (!result) {
        return res.status(401).json({ message: "Felaktigt användarnamn eller lösenord" });
      }
      
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Ogiltig indata", errors: error.errors });
      }
      res.status(500).json({ message: "Inloggningsfel" });
    }
  });

  app.post("/api/admin/logout", requireAdminAuth, async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.substring(7); // Ta bort 'Bearer '
      
      if (token) {
        await logoutAdmin(token);
      }
      
      res.json({ message: "Utloggad" });
    } catch (error) {
      res.status(500).json({ message: "Utloggningsfel" });
    }
  });

  app.get("/api/admin/me", requireAdminAuth, async (req, res) => {
    const admin = (req as any).admin;
    res.json({
      id: admin.id,
      username: admin.username,
      name: admin.name,
    });
  });

  // Protected admin endpoints
  app.get("/api/admin/orders", requireAdminAuth, async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/admin/products", requireAdminAuth, async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  // Update order status (protected admin endpoint)
  app.patch("/api/orders/:id", requireAdminAuth, async (req, res) => {
    try {
      const orderId = req.params.id;
      const updates = req.body;
      
      const updatedOrder = await storage.updateOrder(orderId, updates);
      
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
