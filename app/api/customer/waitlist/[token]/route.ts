import { NextRequest } from "next/server";
import { getWaitlistPositionController } from "@/controllers/waitlist.controller";

type RouteContext = {
  params: Promise<{
    token: string;
  }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { token } = await context.params;

  return getWaitlistPositionController(request, token);
}