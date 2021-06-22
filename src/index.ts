import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { RegisterResolver } from './modules/user/register'

const PORT = process.env.PORT || 8080;


const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(PORT);
  console.log(
    `🚀 Server is running, GraphQL Playground available at ${url}graphql`
  );
};

main();
