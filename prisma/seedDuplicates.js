import { PrismaClient } from '@prisma/client';

// import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

async function seedMigration() {
    const groups = await prisma.review.groupBy({
        by: ['whiskyId', 'userId'],
        _count: { _all: true }
    });

    // 2) Filter to only duplicates
    const dupPairs = groups.filter((g) => g._count._all > 1);

    console.log('Duplicate pairs:', dupPairs);
}

seedMigration()
    .catch((error) => {
        console.error('💥 Seed failed:', error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
