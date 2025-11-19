import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Get all permintaan and anggaran data
    const permintaan = await db.permintaan.findMany()
    const anggaran = await db.anggaran.findMany()

    // Calculate total item diminta per divisi
    const totalItemDiminta = permintaan.reduce((total, item) => total + item.jumlahDiminta, 0)

    // Calculate total estimasi biaya and total biaya aktual
    const totalEstimasiBiaya = anggaran.reduce((total, item) => total + item.totalEstimasiBiaya, 0)
    const totalBiayaAktual = anggaran.reduce((total, item) => item.totalBiayaAktual ? total + item.totalBiayaAktual : total, 0)

    // Calculate status counts
    const statusCounts = {
      'Diajukan': 0,
      'Disetujui Perlengkapan': 0,
      'Sedang Diproses': 0,
      'Selesai': 0,
      'Ditolak': 0
    }

    permintaan.forEach(item => {
      if (statusCounts.hasOwnProperty(item.statusPermintaan)) {
        statusCounts[item.statusPermintaan]++
      }
    })

    const dashboardStats = {
      totalItemDiminta,
      totalEstimasiBiaya,
      totalBiayaAktual,
      statusCounts
    }

    return NextResponse.json(dashboardStats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}