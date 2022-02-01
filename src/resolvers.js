const users = [
  {
    name: 'John Doe 1',
    email: 'johndoe1@gmail.com',
    age: 31
  },
  {
    name: 'John Doe 2',
    email: 'johndoe2@gmail.com',
    age: 24
  },
  {
    name: 'John Doe 3',
    email: 'johndoe3@gmail.com',
    age: 19
  },
];

export const resolvers = {
  Query: {
    users: () => users,
  }
}