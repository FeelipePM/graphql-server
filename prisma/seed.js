import { prisma } from '../src/database/prismaClient.js';

async function main() {
  const userRole = await prisma.role.create({
    data: {
      name: "USER",
    }
});

  const userPermission = await prisma.permission.create({
    data: {
      description: "Can create, read, update and delete users",
      code: "USER_MANAGEMENT",
    }
  });

return userRole, userPermission;

}

main();
