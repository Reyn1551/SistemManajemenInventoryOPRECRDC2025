import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    // Ambil semua data dari body, termasuk totalBiayaAktual
    const { namaBarang, jumlahDiminta, hargaSatuan, totalHarga, prioritas, statusPermintaan, totalBiayaAktual } = body

    const updatedPermintaan = await db.permintaan.update({
      where: { id: params.id },
      data: {
        namaBarang,
        jumlahDiminta,
        hargaSatuan,
        totalHarga,
        prioritas,
        statusPermintaan,
        totalBiayaAktual, // Pastikan field ini disertakan dalam update
      },
    })
    return NextResponse.json(updatedPermintaan)
  } catch (error) {
    console.error('[PERMINTAAN_UPDATE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.permintaan.delete({ where: { id: params.id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[PERMINTAAN_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}