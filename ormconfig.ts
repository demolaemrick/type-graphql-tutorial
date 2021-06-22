export default {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "emric",
  password: process.env.TYPEORM_PASSWORD,
  database: "typegraphql",
  synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
