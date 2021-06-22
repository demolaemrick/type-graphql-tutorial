import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema, Resolver, Query } from "type-graphql";

const PORT = process.env.PORT || 8080;

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello world!";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({
    schema  
  });

  const { url } = await server.listen(PORT);
  console.log(`🚀 Server is running, GraphQL Playground available at ${url}graphql`)
};

main();
