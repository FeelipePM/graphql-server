export const updatePost = async (_, args, ctx) => {
  const { id, content, published, author_id } = args.data;

  if (!ctx.user?.id)
    ctx.errorHandling("You must be logged in to create a post");

  if (!author_id)
    ctx.errorHandling("You must be an author in to create a post");

  const updatePost = await ctx.prisma.post.update({
    where: {
      id,
    },
    data: {
      content,
      published,
      author: {
        connect: {
          id: author_id,
        },
      },
    },
  });

  return updatePost;
};
