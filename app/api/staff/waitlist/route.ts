import { NextRequest, NextResponse } from "next/server";
import { getStaffWaitlistController } from "@/controllers/waitlist.controller";
import { isStaffRequest } from "@/lib/staff-auth";

export async function GET(request: NextRequest) {
  if (!isStaffRequest(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return getStaffWaitlistController();
}