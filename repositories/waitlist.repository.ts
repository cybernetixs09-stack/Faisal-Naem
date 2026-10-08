export type WaitlistParty = {
  id: string;
  ticketNumber: number;
  customerToken: string;
  name: string;
  partySize: number;
  status: "WAITING" | "REMOVED";
  createdAt: Date;
  removedAt: Date | null;
};

export type CreateWaitlistPartyInput = {
  name: string;
  partySize: number;
};

export interface WaitlistRepository {
  create(
    input: CreateWaitlistPartyInput
  ): Promise<WaitlistParty>;

  findByCustomerToken(
    customerToken: string
  ): Promise<WaitlistParty | null>;

  findWaiting(): Promise<WaitlistParty[]>;

  countWaitingBefore(
  ticketNumber: number
): Promise<number>;

  removeByTicket(
    ticketNumber: number
  ): Promise<WaitlistParty | null>;


}

