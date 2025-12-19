// Import PrismaClient class to interact with the database
// import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaClient } from "@prisma/client";
// Create a type-safe global object to store PrismaClient
// This helps prevent multiple instances during development (hot reload)
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient;
};

// Reuse existing PrismaClient if it exists, otherwise create a new one
export const prisma = globalForPrisma.prisma || new PrismaClient();

// In development, attach PrismaClient to the global object
// This ensures hot reloads don't create multiple instances
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
