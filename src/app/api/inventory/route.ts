import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const inventory = await db.inventory.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(inventory)
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      kodeBarang,
      namaBarang,
      kategori,
      spesifikasi,
      stokTersedia,
      kondisi
    } = body

    if (!kodeBarang || !namaBarang || !kategori || !kondisi) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const inventory = await db.inventory.create({
      data: {
        kodeBarang,
        namaBarang,
        kategori,
        spesifikasi,
        stokTersedia: stokTersedia || 0,
        kondisi
      }
    })

    return NextResponse.json(inventory, { status: 201 })
  } catch (error) {
    console.error('Error creating inventory:', error)
    return NextResponse.json(
      { error: 'Failed to create inventory' },
      { status: 500 }
    )
  }
}