import { PrismaClient } from "@prisma/client";
import { COMPANIES, DIVISIONS, ROLES, USERS } from "./seed.config";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const data = USERS.map((user) => {
    return { ...user, password: bcrypt.hashSync(user.password, 10) };
  });
  await prisma.role.createMany({
    data: ROLES,
    skipDuplicates: true,
  });
  await prisma.user.createMany({ data, skipDuplicates: true });
  await prisma.division.createMany({
    data: DIVISIONS,
    skipDuplicates: true,
  });
  await prisma.company.createMany({
    data: COMPANIES,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
