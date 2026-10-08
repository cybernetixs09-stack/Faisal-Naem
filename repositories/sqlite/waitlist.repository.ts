import { and, count, eq, lt } from "drizzle-orm";
import { db } from "@/db";
import { waitlist } from "@/db/schema";
import type {
  CreateWaitlistPartyInput,
  WaitlistParty,
  WaitlistRepository,
} from "@/repositories/waitlist.repository";

export class SQLiteWaitlistRepository
  implements WaitlistRepository
{
  async create(
  input: CreateWaitlistPartyInput
): Promise<WaitlistParty> {
  const id = crypto.randomUUID();
  const customerToken = crypto.randomUUID();
  const createdAt = new Date();

  const result = await db
    .insert(waitlist)
    .values({
      id,
      customerToken,
      name: input.name,
      partySize: input.partySize,
      status: "WAITING",
      createdAt,
      removedAt: null,
    })
    .returning();

  const party = result[0];

  return {
    id: party.id,
    ticketNumber: party.ticketNumber,
    customerToken: party.customerToken,
    name: party.name,
    partySize: party.partySize,
    status: party.status as "WAITING" | "REMOVED",
    createdAt: party.createdAt,
    removedAt: party.removedAt,
  };
}

  async findByCustomerToken(
    customerToken: string
  ): Promise<WaitlistParty | null> {
    const result = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.customerToken, customerToken))
      .limit(1);

    return result[0] ?? null;
  }

  async findWaiting(): Promise<WaitlistParty[]> {
    const result = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.status, "WAITING"));

    return result.map((party) => ({
      ...party,
      status: party.status as "WAITING" | "REMOVED",
    }));
  }

 async countWaitingBefore(
  ticketNumber: number
): Promise<number> {
  const result = await db
    .select({
      count: count(),
    })
    .from(waitlist)
    .where(
      and(
        eq(waitlist.status, "WAITING"),
        lt(waitlist.ticketNumber, ticketNumber)
      )
    );

  return result[0]?.count ?? 0;
}

  async removeByTicket(
    ticketNumber: number
  ): Promise<WaitlistParty | null> {
    const result = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.ticketNumber, ticketNumber))
      .limit(1);

    const party = result[0];

    if (!party || party.status !== "WAITING") {
      return null;
    }

    const removedAt = new Date();

    await db
      .update(waitlist)
      .set({
        status: "REMOVED",
        removedAt,
      })
      .where(eq(waitlist.ticketNumber, ticketNumber));

    return {
      ...party,
      status: "REMOVED",
      removedAt,
    };
  }
}