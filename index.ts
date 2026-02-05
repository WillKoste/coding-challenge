import { PrismaClient } from "./generated/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// This file can go in a better spot

export const adapter = new PrismaBetterSqlite3({
  url: "file:./database.db",
});
export const prisma = new PrismaClient({ adapter });
