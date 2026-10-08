import { SQLiteWaitlistRepository } from "@/repositories/sqlite/waitlist.repository";

export const waitlistRepository =
  new SQLiteWaitlistRepository();