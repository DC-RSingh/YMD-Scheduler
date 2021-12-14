import { PrismaClient } from '../../prisma/client';
import { dbPath } from '..';

export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: `file:${dbPath}`,
        },
    },
});
