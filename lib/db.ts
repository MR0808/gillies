import { PrismaClient } from '@/generated/prisma';

// const prismaClientSingleton = () => {
//     return new PrismaClient();
// };

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClientSingleton | undefined;
// };

// const db = globalForPrisma.prisma ?? prismaClientSingleton();

// export default db;

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// import { PrismaClient } from '@/generated/prisma';

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// const db = globalForPrisma.prisma || new PrismaClient();

// export default db;

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const db = globalForPrisma.prisma ?? new PrismaClient();

export default db;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
