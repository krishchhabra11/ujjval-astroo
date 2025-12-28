import { db } from "./db";
import {
  users, products, pujas, consultations, bookings, orders, orderItems,
  type User, type InsertUser, type Product, type Puja, type Consultation, type Booking, type Order, type OrderItem,
  type InsertConsultation, type InsertBooking
} from "@shared/schema";
import { eq } from "drizzle-orm";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  sessionStore: session.Store;

  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;

  // Pujas
  getPujas(): Promise<Puja[]>;
  getPuja(id: number): Promise<Puja | undefined>;

  // Consultations
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultations(): Promise<Consultation[]>;

  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;

  // Orders
  createOrder(userId: number | null, items: { productId: number; quantity: number }[]): Promise<Order>;
  getOrders(): Promise<Order[]>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  // Pujas
  async getPujas(): Promise<Puja[]> {
    return await db.select().from(pujas);
  }

  async getPuja(id: number): Promise<Puja | undefined> {
    const [puja] = await db.select().from(pujas).where(eq(pujas.id, id));
    return puja;
  }

  // Consultations
  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    const [newItem] = await db.insert(consultations).values(consultation).returning();
    return newItem;
  }

  async getConsultations(): Promise<Consultation[]> {
    return await db.select().from(consultations);
  }

  // Bookings
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newItem] = await db.insert(bookings).values(booking).returning();
    return newItem;
  }

  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  // Orders
  async createOrder(userId: number | null, items: { productId: number; quantity: number }[]): Promise<Order> {
    // Calculate total amount
    let total = 0;
    for (const item of items) {
      const product = await this.getProduct(item.productId);
      if (product) {
        total += Number(product.price) * item.quantity;
      }
    }

    const [order] = await db.insert(orders).values({
      userId,
      totalAmount: total.toString(),
      status: "paid", // Auto-paid for demo
    }).returning();

    for (const item of items) {
      await db.insert(orderItems).values({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    return order;
  }

  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }
}

export const storage = new DatabaseStorage();
