import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const take = Number(url.searchParams.get('take')) || 20;
    const skip = Number(url.searchParams.get('skip')) || 0;
    const inventory = await db.inventory.findMany({
      orderBy: { createdAt: "desc" },
      take,
      skip,
      select: {
        id: true,
        namaBarang: true,
        kategori: true,
        spesifikasi: true,
        stokTersedia: true,
        kondisi: true,
        createdAt: true,
        updatedAt: true,
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
