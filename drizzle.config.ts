import { defineConfig } from "drizzle-kit";


console.log(process.env.POSTGRES_HOST);
export default defineConfig({
    dialect: "postgresql",
    schema: "./db/schema.ts",
    out: "./drizzle",
    dbCredentials: ({
        host: process.env.POSTGRES_HOST!,
        port: Number(process.env.POSTGRES_PORT!),
        user: process.env.POSTGRES_USER!,
        password: process.env.POSTGRES_PASSWORD!,
        database: process.env.POSTGRES_DB!,
        ssl: false,
    }),

});