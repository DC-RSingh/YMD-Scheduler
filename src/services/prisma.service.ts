import { PrismaClient } from '../../prisma/generated/prisma-client';
import { dbPath } from '..';

export const prisma = new PrismaClient({
    datasources: {
        db: {
            url: `file:${dbPath}`,
        },
    },
});
