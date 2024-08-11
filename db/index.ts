import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// for migrations
console.log(process.env.DATABASE_URL);
const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

migrate(drizzle(migrationClient), "./migrations");

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!);

const db = drizzle(queryClient);
export default db;