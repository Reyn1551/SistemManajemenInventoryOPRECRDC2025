import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    // Ambil semua data permintaan dari database
    const permintaan = await db.permintaan.findMany();

    // 1. Hitung Total Item Diminta
    // Menjumlahkan semua 'jumlahDiminta' dari setiap item permintaan
    const totalItemDiminta = permintaan.reduce(
      (sum, item) => sum + item.jumlahDiminta,
      0,
    );

    // 2. Hitung Total Estimasi Biaya
    // Menjumlahkan semua 'totalHarga' dari setiap item permintaan
    const totalEstimasiBiaya = permintaan.reduce(
      (sum, item) => sum + (item.totalHarga || 0),
      0,
    );

    // 3. Hitung Total Biaya Aktual
    // Menjumlahkan semua 'totalBiayaAktual' dari setiap item permintaan
    const totalBiayaAktual = permintaan.reduce(
      (sum, item) => sum + (item.totalBiayaAktual || 0),
      0,
    );

    // 4. Hitung Jumlah Permintaan Berdasarkan Status
    const statusCounts = {
      Diajukan: 0,
      "Disetujui Perlengkapan": 0,
      "Sedang Diproses": 0,
      Selesai: 0,
      Ditolak: 0,
    };

    permintaan.forEach((item) => {
      if (item.statusPermintaan in statusCounts) {
        statusCounts[item.statusPermintaan as keyof typeof statusCounts]++;
      }
    });

    // Gabungkan semua hasil perhitungan menjadi satu objek
    const dashboardData = {
      totalItemDiminta,
      totalEstimasiBiaya,
      totalBiayaAktual,
      statusCounts,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("[DASHBOARD_API_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
