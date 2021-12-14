import { PrismaClient } from './generated/prisma-client';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: `file:./ymd-db.db`,
        },
    },
});

async function main() {
    await prisma.days.create({
        data: {
            Day: "Monday",
        }
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });