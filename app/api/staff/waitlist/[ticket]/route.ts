import { NextRequest, NextResponse } from "next/server";
import { removeWaitlistPartyController } from "@/controllers/waitlist.controller";
import { isStaffRequest } from "@/lib/staff-auth";

type RouteContext = {
  params: Promise<{
    ticket: string;
  }>;
};

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  if (!isStaffRequest(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { ticket } = await context.params;

  const ticketNumber = Number(ticket);

  if (!Number.isInteger(ticketNumber) || ticketNumber <= 0) {
    return NextResponse.json(
      { error: "Invalid ticket number" },
      { status: 400 }
    );
  }

  return removeWaitlistPartyController(ticketNumber);
}