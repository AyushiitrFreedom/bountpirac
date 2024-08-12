import * as schema from "@/db/schema";
import db from "@/db";

export default async function Home() {
  const name = await db.select().from(schema.users);

  return (
    <div>
      hi
      {name.map((user) => (user.name))}
    </div>
  );
}
