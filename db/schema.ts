import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";
import { link } from "fs";


export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('naam').notNull(),
});