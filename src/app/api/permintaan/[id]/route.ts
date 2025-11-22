import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Ambil semua data dari body, termasuk totalBiayaAktual
    const {
      namaBarang,
      jumlahDiminta,
      hargaSatuan,
      prioritas,
      statusPermintaan,
      totalBiayaAktual,
      kebutuhanKhusus,
      catatanPerlengkapan,
    } = body;

    // Recalculate totalHarga on the backend for data integrity
    const totalHarga = (jumlahDiminta || 0) * (hargaSatuan || 0);

    const updatedPermintaan = await db.permintaan.update({
      where: { id },
      data: {
        namaBarang,
        jumlahDiminta,
        hargaSatuan,
        totalHarga,
        prioritas,
        statusPermintaan,
        totalBiayaAktual, // Pastikan field ini disertakan dalam update
        kebutuhanKhusus,
        catatanPerlengkapan,
      },
    });
    return NextResponse.json(updatedPermintaan);
  } catch (error) {
    console.error("[PERMINTAAN_UPDATE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await db.permintaan.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[PERMINTAAN_DELETE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
