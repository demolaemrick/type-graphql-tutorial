import { createConnection } from "typeorm"

export const testConn = (drop: boolean = false) => {
    return createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "emric",
        password: process.env.TYPEORM_PASSWORD,
        database: "typegraphql-test",
        synchronize: true,
        dropSchema: drop,
        logging: false,
        entities: [__dirname + "/../entity/**/*.*"],
        migrations: ["src/migration/**/*.*"],
        subscribers: ["src/subscriber/**/*.*"],
        cli: {
          entitiesDir: "src/entity",
          migrationsDir: "src/migration",
          subscribersDir: "src/subscriber"
        }
    })
}