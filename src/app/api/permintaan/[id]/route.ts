import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
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
      catatanPerlengkapan
    } = body

    const permintaan = await db.permintaan.update({
      where: {
        id: params.id
      },
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
        catatanPerlengkapan
      }
    })

    return NextResponse.json(permintaan)
  } catch (error) {
    console.error('Error updating permintaan:', error)
    return NextResponse.json(
      { error: 'Failed to update permintaan' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await db.permintaan.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting permintaan:', error)
    return NextResponse.json(
      { error: 'Failed to delete permintaan' },
      { status: 500 }
    )
  }
}