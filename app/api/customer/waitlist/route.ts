import { NextRequest } from "next/server";
import { createWaitlistController } from "@/controllers/waitlist.controller";


export async function POST(request: NextRequest) {
  return createWaitlistController(request);
}