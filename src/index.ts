import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { RegisterResolver } from "./modules/user/register";

const PORT = process.env.PORT || 8080;

const main = async () => {
  await createConnection();

  const app = express();

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(
      `🚀 Server is running, GraphQL Playground available at http://localhost:8080/graphql`
    );
  });
};

main();
