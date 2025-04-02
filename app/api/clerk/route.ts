import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ status: "Clerk API is working" })
}

