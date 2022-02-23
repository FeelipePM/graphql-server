export const createPost = async (_, args, ctx) => {
  const { content, published, author_id } = args.data;

  if (!ctx.user?.id)
    ctx.errorHandling(
      "You must be logged in to create a post",
      "UNAUTHENTICATED"
    );

  if (!author_id)
    ctx.errorHandling(
      "You must be an author in to create a post",
      "UNAUTHORIZED"
    );

  const newPost = await ctx.prisma.post.create({
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

  return newPost;
};
