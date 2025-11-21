import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

const prisma = globalThis.__prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "info"] : [],
});

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
  //Manasin Database loh ya wkwkwk
  prisma
    .$connect()
    .then(() => console.log("[Prisma] connection warm‑up complete"))
    .catch((e) => console.error("[Prisma] warm‑up error:", e));
}

export default prisma;