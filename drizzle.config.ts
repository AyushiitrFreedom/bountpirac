import { defineConfig } from "drizzle-kit";


console.log(process.env.POSTGRES_PASSWORD);
export default defineConfig({
    dialect: "postgresql",
    schema: "./db/schema.ts",
    out: "./drizzle",
    dbCredentials: ({
        host: process.env.CONTAINER_NAME!,
        port: process.env.POSTGRES_PORT! as unknown as number,
        user: process.env.POSTGRES_USER!,
        password: process.env.POSTGRES_PASSWORD!,
        database: process.env.POSTGRES_DB!,
        ssl: false,
    }),

});