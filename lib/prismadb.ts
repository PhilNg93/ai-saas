import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient(); //use globalThis.prisma to avoid error in console log when too many PrismaClients are active in development
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;