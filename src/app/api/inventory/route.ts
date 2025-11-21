import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const inventory = await db.inventory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(inventory);
  } catch (error) {
    console.error("[INVENTORY_GET_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newInventory = await db.inventory.create({
      data: body,
    });
    return NextResponse.json(newInventory, { status: 201 });
  } catch (error) {
    console.error("[INVENTORY_POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
