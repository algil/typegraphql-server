import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import expressJwt from 'express-jwt';
import {
  buildSchema,
  Resolver,
  Query,
  formatArgumentValidationError,
  Authorized
} from 'type-graphql';
import { createConnection } from 'typeorm';
import { AuthResolver } from './modules/auth/auth.resolver';
import config from './config';

@Resolver()
class HelloResolver {
  @Query(() => String)
  @Authorized()
  async hello() {
    return 'Hello world';
  }
}

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [HelloResolver, AuthResolver],
    authChecker: ({ context }) => !!context.req.user
  });
  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req }: any) => ({ req })
  });
  const app = express();

  app.use(
    expressJwt({
      secret: config.jwtSecret as string,
      credentialsRequired: false
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server listen on http://localhost:4000/graphql');
  });
};

main();
