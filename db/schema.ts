import {
  integer,
  sqliteTable,
  text,
  check,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const waitlist = sqliteTable(
  "waitlist",
  {
    ticketNumber: integer("ticket_number")
      .primaryKey({ autoIncrement: true }),

    id: text("id").notNull().unique(),

    customerToken: text("customer_token")
      .notNull()
      .unique(),

    name: text("name").notNull(),

    partySize: integer("party_size").notNull(),

    status: text("status", {
      enum: ["WAITING", "REMOVED"],
    })
      .notNull()
      .default("WAITING"),

    createdAt: integer("created_at", {
      mode: "timestamp_ms",
    }).notNull(),

    removedAt: integer("removed_at", {
      mode: "timestamp_ms",
    }),
  },
  (table) => [
    check(
      "party_size_positive",
      sql`${table.partySize} > 0`
    ),
  ]
);