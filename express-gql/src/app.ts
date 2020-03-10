import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { authHandler } from '@/utils/auth';

import resolvers from '@/resolvers';
import { registerEnums } from '@/enums';

const path = '/graphql';

const main = async () => {
  await createConnection();

  registerEnums();

  const schema = await buildSchema({
    resolvers,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req, user: req.user }),
  });

  const app = express();

  app.use(authHandler);

  apolloServer.applyMiddleware({ app, path });

  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000/graphql');
  });
};

main();
