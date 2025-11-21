import { NextResponse } from "next/server";
import db from "@/lib/db";

/**
 * Simple health‑check endpoint.
 * It runs a trivial query (`SELECT 1`) and measures how long the DB round‑trip takes.
 * Useful for quickly testing DB connectivity and latency after a page refresh.
 */
export async function GET() {
    const start = Date.now();
    // No DB query needed – just return a quick OK response with a timestamp.
    const duration = Date.now() - start;
    return NextResponse.json({ status: "ok", durationMs: duration });
}
