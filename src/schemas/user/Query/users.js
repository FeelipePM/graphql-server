export const users = (parent, args, ctx) => {
  if (!ctx.user?.id)
    ctx.errorHandling("You must be logged in", "UNAUTHENTICATED");

  return ctx.prisma.user.findMany();
};

export const user = (parent, { id }, ctx) => {
  return ctx.prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};
