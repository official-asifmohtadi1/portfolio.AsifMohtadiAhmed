import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import 'dotenv/config';

// In v7, if not using an edge adapter or driver adapter, you often don't need args.
// Let's pass an empty object to satisfy "non-empty" if it strictly checks for truthy options without throwing Unknown property
const prisma = new PrismaClient({});

async function main() {
    const defaultPassword = await bcrypt.hash("superuser123", 10);
    
    const superUser = await prisma.user.upsert({
        where: { email: 'admin@mohtadisportal.com' },
        update: {},
        create: {
            email: 'admin@mohtadisportal.com',
            name: 'Super Admin',
            password: defaultPassword,
            role: 'SUPERUSER',
            status: 'APPROVED',
        },
    });
    
    console.log("Superuser seeded:", superUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
