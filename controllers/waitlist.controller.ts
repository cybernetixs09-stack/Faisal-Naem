import { NextRequest, NextResponse } from "next/server";
import {
  createWaitlistParty,
  getWaitlistPosition,
  getStaffWaitlist,
  removeWaitlistParty,
} from "@/services/waitlist.service";

export async function createWaitlistController(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const { name, partySize } = body;

    if (
      typeof name !== "string" ||
      name.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (
      typeof partySize !== "number" ||
      !Number.isInteger(partySize) ||
      partySize <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Party size must be a whole number greater than zero",
        },
        { status: 400 }
      );
    }

    const party = await createWaitlistParty({
      name: name.trim(),
      partySize,
    });

    return NextResponse.json(party, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}

export async function getWaitlistPositionController(
  _request: NextRequest,
  customerToken: string
) {
  const party = await getWaitlistPosition(customerToken);

  if (!party) {
    return NextResponse.json(
      { error: "Waitlist party not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(party);
}

export async function getStaffWaitlistController() {
  const parties = await getStaffWaitlist();

  return NextResponse.json(parties);
}

export async function removeWaitlistPartyController(
  ticketNumber: number
) {
  const result = await removeWaitlistParty(ticketNumber);

  if (!result) {
    return NextResponse.json(
      { error: "Waitlist party not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(result);
}