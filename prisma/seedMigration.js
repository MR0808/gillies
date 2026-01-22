import { PrismaClient } from '@prisma/client';

// import { PrismaClient } from '@/generated/prisma/client';;

const prisma = new PrismaClient();

async function seedMigration() {
    try {
        console.log('🌎 Seeding users...');
        const users = await prisma.user.findMany();
        const totalLength = users.length;
        let count = 1;
        for (const user of users) {
            await prisma.account.updateMany({
                where: { userId: user.id },
                data: {
                    password: user.password
                }
            });
            console.log(`Seeded ${count} / ${totalLength} users`);
            count++;
        }
        console.log(`✅ Seeded ${users.length} users`);
    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
}

seedMigration()
    .catch((error) => {
        console.error('💥 Seed failed:', error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
