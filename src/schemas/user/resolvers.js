const users = [
  {
    id: 1,
    name: 'John Doe 1',
    email: 'johndoe1@gmail.com',
    age: 31
  },
  {
    id: 2,
    name: 'John Doe 2',
    email: 'johndoe2@gmail.com',
    age: 24
  },
  {
    id: 3,
    name: 'John Doe 3',
    email: 'johndoe3@gmail.com',
    age: 19
  },
];

export const resolvers = {
  Query: {
    users: () => users,
    user: () => users[0],
  }
}