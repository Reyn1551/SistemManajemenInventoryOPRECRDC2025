import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const take = Number(url.searchParams.get('take')) || 20;
    const skip = Number(url.searchParams.get('skip')) || 0;
    const permintaan = await db.permintaan.findMany({
      orderBy: { createdAt: "desc" },
      take,
      skip,
      select: {
        id: true,
        timestamp: true,
        namaDivisi: true,
        namaBarang: true,
        jumlahDiminta: true,
        hargaSatuan: true,
        totalHarga: true,
        prioritas: true,
        kebutuhanKhusus: true,
        diperlukanPada: true,
        statusPermintaan: true,
        totalBiayaAktual: true,
        catatanPerlengkapan: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(permintaan);
  } catch (error) {
    console.error("Error fetching permintaan:", error);
    return NextResponse.json(
      { error: "Failed to fetch permintaan" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      namaDivisi,
      namaBarang,
      jumlahDiminta,
      hargaSatuan,
      totalHarga,
      prioritas,
      kebutuhanKhusus,
      diperlukanPada,
      statusPermintaan,
      catatanPerlengkapan,
    } = body;

    if (
      !namaDivisi ||
      !namaBarang ||
      !jumlahDiminta ||
      !prioritas ||
      !statusPermintaan
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const permintaan = await db.permintaan.create({
      data: {
        namaDivisi,
        namaBarang,
        jumlahDiminta: parseInt(jumlahDiminta),
        hargaSatuan: hargaSatuan ? parseFloat(hargaSatuan) : null,
        totalHarga: totalHarga ? parseFloat(totalHarga) : null,
        prioritas,
        kebutuhanKhusus,
        diperlukanPada: diperlukanPada ? new Date(diperlukanPada) : null,
        statusPermintaan,
        catatanPerlengkapan,
      },
    });

    return NextResponse.json(permintaan, { status: 201 });
  } catch (error) {
    console.error("Error creating permintaan:", error);
    return NextResponse.json(
      { error: "Failed to create permintaan" },
      { status: 500 },
    );
  }
}
