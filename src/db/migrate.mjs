import dotenv from "dotenv";

import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql } from "@vercel/postgres";

dotenv.config();

async function run() {
  const db = drizzle(sql);

  // this will automatically run needed migrations on the database
  await migrate(db, { migrationsFolder: "./drizzle" });
}

run();
