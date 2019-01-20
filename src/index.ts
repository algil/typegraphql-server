import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import {
  buildSchema,
  Resolver,
  Query,
  formatArgumentValidationError
} from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './modules/user/user.resolver';

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return 'Hello world';
  }
}

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver]
  });
  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError
  });
  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server listen on http://localhost:4000/graphql');
  });
};

main();
