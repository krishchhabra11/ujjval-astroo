import type { Express } from "express";
import type { Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { products, pujas } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL
});

import { db } from "./db";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Setup Auth (Passport)
  setupAuth(app);

  // Products
  app.get(api.products.list.path, async (req, res) => {
    const items = await storage.getProducts();
    res.json(items);
  });

  app.get(api.products.get.path, async (req, res) => {
    const item = await storage.getProduct(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Product not found" });
    res.json(item);
  });

  // Pujas
  app.get(api.pujas.list.path, async (req, res) => {
    const items = await storage.getPujas();
    res.json(items);
  });

  // Consultations
  app.post(api.consultations.create.path, async (req, res) => {
    try {
      const input = api.consultations.create.input.parse(req.body);
      // If logged in, attach userId
      const consultationData = {
        ...input,
        userId: req.user ? (req.user as any).id : null
      };
      const consultation = await storage.createConsultation(consultationData);
      res.status(201).json(consultation);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Bookings
  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const bookingData = {
        ...input,
        userId: req.user ? (req.user as any).id : null
      };
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Orders
  app.post(api.orders.create.path, async (req, res) => {
    try {
      const { items } = req.body; // Validation already likely done or simple enough
      const userId = req.user ? (req.user as any).id : null;
      const order = await storage.createOrder(userId, items);
      res.status(201).json(order);
    } catch (err) {
       res.status(400).json({ message: "Invalid order data" });
    }
  });

  // Admin Routes (Simple check)
  const requireAdmin = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  app.get(api.admin.consultations.path, requireAdmin, async (req, res) => {
    const items = await storage.getConsultations();
    res.json(items);
  });

  app.get(api.admin.bookings.path, requireAdmin, async (req, res) => {
    const items = await storage.getBookings();
    res.json(items);
  });

  app.get(api.admin.orders.path, requireAdmin, async (req, res) => {
    const items = await storage.getOrders();
    res.json(items);
  });

  app.post(api.chat.path, async (req, res) => {
    try {
      const { message } = api.chat.input.parse(req.body);
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are an expert Vedic astrologer. Answer questions about astrology, horoscopes, and compatibility. Be mystical but helpful." },
          { role: "user", content: message }
        ],
      });
      const response = completion.choices[0].message.content;
      res.json({ message: response });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error processing request" });
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    await db.insert(products).values([
      { name: "5 Mukhi Rudraksha", description: "Original 5 Mukhi Rudraksha from Nepal.", price: "500.00", category: "Rudraksha", imageUrl: "https://placehold.co/600x400?text=Rudraksha" },
      { name: "Ruby Gemstone", description: "Natural certified Ruby for Sun.", price: "5000.00", category: "Gemstones", imageUrl: "https://placehold.co/600x400?text=Ruby" },
      { name: "Puja Thali Set", description: "Brass puja thali with accessories.", price: "1200.00", category: "Puja Samagri", imageUrl: "https://placehold.co/600x400?text=Thali" },
      { name: "Shree Yantra", description: "Gold plated Shree Yantra for wealth.", price: "2100.00", category: "Yantras", imageUrl: "https://placehold.co/600x400?text=Yantra" },
    ]);
  }

  const existingPujas = await storage.getPujas();
  if (existingPujas.length === 0) {
    await db.insert(pujas).values([
      { name: "Griha Pravesh Puja", description: "For new home entry.", price: "5100.00" },
      { name: "Satyanarayan Puja", description: "For peace and prosperity.", price: "2100.00" },
      { name: "Navgraha Puja", description: "To pacify nine planets.", price: "3100.00" },
      { name: "Marriage Puja", description: "For happy married life.", price: "11000.00" },
    ]);
  }
}
