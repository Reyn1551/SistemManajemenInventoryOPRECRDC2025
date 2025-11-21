import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const item = await db.inventory.findUnique({
      where: { id: params.id },
    });
    return NextResponse.json(item);
  } catch (error) {
    console.error("[INVENTORY_GET_ID_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const updatedItem = await db.inventory.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("[INVENTORY_UPDATE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await db.inventory.delete({
      where: { id: params.id },
    });
    return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error) {
    console.error("[INVENTORY_DELETE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
