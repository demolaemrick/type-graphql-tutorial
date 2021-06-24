import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

import { redis } from "./redis";

import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";

const PORT = process.env.PORT || 8080;

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver],
    authChecker: ({ context: {req} }) => {
      return !!req.session.userId
    },
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
  });

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: "https://localhost:3000",
    })
  );
  const RedisStore = connectRedis(session);

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis as any,
    }),
    name: "qid",
    secret: "mysessionsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(
      `🚀 Server is running, GraphQL Playground available at http://localhost:8080/graphql`
    );
  });
};

main();
