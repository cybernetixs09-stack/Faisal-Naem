import { NextRequest } from "next/server";

export function isStaffRequest(request: NextRequest) {
  const configuredSecret = process.env.STAFF_SECRET;

  if (!configuredSecret) {
    return false;
  }

  const providedSecret =
    request.headers.get("x-staff-secret");

  return providedSecret === configuredSecret;
}