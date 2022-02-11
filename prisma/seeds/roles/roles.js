import { prisma } from '../../../src/database/prismaClient.js';

export async function role() {
  const userRole = await prisma.role.create({
    data: {
      name: "DEFAULT",
    }
});

return userRole;

}

