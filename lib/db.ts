// import { PrismaClient } from '@/generated/prisma';

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// const db = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// export default db;

import { PrismaClient } from '@/generated/prisma';
import { withAccelerate } from '@prisma/extension-accelerate';

// Use `any` on the global cache to avoid type-narrowing conflicts with the extended client
const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof createPrismaClient> | undefined;
};

function createPrismaClient() {
    const client = new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL // prisma://accelerate... URL
    }).$extends(withAccelerate());

    return client;
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

export default db;
