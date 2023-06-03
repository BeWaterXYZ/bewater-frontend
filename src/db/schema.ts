import {
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
  uniqueIndex,
  boolean,
} from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const ChallengesTable = pgTable("challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  approved: boolean("approved").default(false).notNull(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Challenge = InferModel<typeof ChallengesTable>;
export type ChallengeNew = InferModel<typeof ChallengesTable, "insert">;
