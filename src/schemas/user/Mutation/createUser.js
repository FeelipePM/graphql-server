import { generateHash } from "../providers/hashProvider.js";

export const createUser = async (_, args, ctx) => {
  const { name, email, password, birthDate, inputRole } = args;
  console.log(args.data);

  if (!ctx.user?.id)
    ctx.errorHandling("You must be logged in", "UNAUTHENTICATED");

  const defaultRoleId = "3f67dd89-ee64-4e70-a932-fce87f5fcab6";

  const newUser = await ctx.prisma.user.create({
    data: {
      name,
      email,
      password: await generateHash(password),
      birthDate,
      UserRole: {
        create: {
          role_id: !inputRole ? defaultRoleId : inputRole,
        },
      },
    },
  });

  return newUser;
};