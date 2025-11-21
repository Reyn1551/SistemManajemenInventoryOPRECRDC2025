import { PrismaClient } from "@prisma/client";

/**
 * Prisma singleton for Next.js app router.
 *
 * In development mode we attach the client to the global object so that it
 * persists across hot‑module reloads. In production a single instance is
 * created per serverless invocation which is fine because the runtime will
 * reuse the same process for subsequent requests.
 */
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient({
    // Optional: log queries in development to help debugging
    log: process.env.NODE_ENV === "development" ? ["query", "error", "info"] : [],
});

if (process.env.NODE_ENV !== "production") {
    // Attach to global in dev to prevent multiple instances during hot reloads
    global.prisma = prisma;
}

export default prisma;
