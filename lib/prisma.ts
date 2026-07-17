import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    try {
      const databaseUrl = process.env.DATABASE_URL || "mysql://root:@localhost:3306/artikel";
      const url = new URL(databaseUrl);
      const adapter = new PrismaMariaDb({
        host: url.hostname,
        port: Number(url.port) || 3306,
        user: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        database: url.pathname.replace(/^\//, ""),
      });
      globalForPrisma.prisma = new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query"] : [],
      });
    } catch (e) {
      if (process.env.NODE_ENV === "production") throw e;
      console.warn("PrismaClient init failed (expected during build if DB unavailable)");
    }
  }
  return globalForPrisma.prisma!;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    const client = getPrismaClient();
    return Reflect.get(client, prop);
  },
});