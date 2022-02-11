import { prisma } from '../../../src/database/prismaClient.js';

export async function permission() {
  const userPermission = await prisma.permission.create({
    data: {
      description: "Can read",
      code: "USER",
      role: {
        create: {
          name: "USER",
        }
      }
      }
  });
console.log(userPermission);
return userPermission;
}
