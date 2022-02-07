import { prisma } from '../../../src/database/prismaClient.js';

export async function permission() {
  const userPermission = await prisma.permission.create({
    data: {
      description: "Can create, read, update and delete users",
      code: "USER_MANAGEMENT",
    }
  });

return userPermission;

}
