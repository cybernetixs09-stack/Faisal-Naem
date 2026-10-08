import { waitlistRepository } from "@/repositories";

export async function createWaitlistParty(input: {
  name: string;
  partySize: number;
}) {
  const party = await waitlistRepository.create(input);

 const partiesAhead =
  await waitlistRepository.countWaitingBefore(
    party.ticketNumber
  );

  return {
    ticketNumber: party.ticketNumber,
    customerToken: party.customerToken,
    partiesAhead,
  };
}

export async function getWaitlistPosition(
  customerToken: string
) {
  const party =
    await waitlistRepository.findByCustomerToken(
      customerToken
    );

  if (!party || party.status !== "WAITING") {
    return null;
  }

  const partiesAhead =
  await waitlistRepository.countWaitingBefore(
    party.ticketNumber
  );

  return {
    ticketNumber: party.ticketNumber,
    name: party.name,
    partySize: party.partySize,
    partiesAhead,
  };
}

export async function getStaffWaitlist() {
  const waitingParties =
    await waitlistRepository.findWaiting();

  return waitingParties
    .sort(
      (a, b) =>
        a.createdAt.getTime() -
        b.createdAt.getTime()
    )
    .map((party) => ({
      ticketNumber: party.ticketNumber,
      name: party.name,
      partySize: party.partySize,
      createdAt: party.createdAt,
    }));
}

export async function removeWaitlistParty(
  ticketNumber: number
) {
  const party =
    await waitlistRepository.removeByTicket(
      ticketNumber
    );

  if (!party) {
    return null;
  }

  return {
    ticketNumber: party.ticketNumber,
    removed: true,
  };
}