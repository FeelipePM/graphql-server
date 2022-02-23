import { users, user } from "./Query/users.js";
import { age } from "./User/age.js";
import { createUser } from "./Mutation/createUser.js";
import { createPost } from "../post/Mutation/createPost.js";
import { updatePost } from "../post/Mutation/updatePost.js";
import { signIn } from "../session/signIn.js";

export const resolvers = {
  Query: {
    users,
    user,
  },

  User: {
    age,
  },

  Mutation: {
    createUser,
    createPost,
    updatePost,
    signIn,
  },
};
