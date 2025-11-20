import { db } from '@/lib/db'

async function seedDatabase() {
  try {
    // Clear existing data
    await db.permintaan.deleteMany()
    await db.inventory.deleteMany()
    await db.anggaran.deleteMany()

    // Sample inventory data
    const inventoryData = [
      {
        namaBarang: 'Proyektor LCD 3500lm',
        kategori: 'Elektronik',
        spesifikasi: 'Merk X, HDMI, 3500 Lumens',
        stokTersedia: 2,
        kondisi: 'Baik'
      },
      {
        namaBarang: 'Laptop',
        kategori: 'Elektronik',
        spesifikasi: 'Core i5, 8GB RAM, 256GB SSD',
        stokTersedia: 5,
        kondisi: 'Baik'
      },
      {
        namaBarang: 'Sound System',
        kategori: 'Audio',
        spesifikasi: '2.1 Channel, Bluetooth',
        stokTersedia: 3,
        kondisi: 'Baik'
      },
      {
        namaBarang: 'Air Mineral',
        kategori: 'Konsumsi',
        spesifikasi: '600ml botol',
        stokTersedia: 50,
        kondisi: 'Baik'
      },
      {
        namaBarang: 'Snack Box',
        kategori: 'Konsumsi',
        spesifikasi: 'Isian 5 pcs',
        stokTersedia: 20,
        kondisi: 'Baik'
      }
    ]

    // Insert inventory data
    for (const item of inventoryData) {
      await db.inventory.create({
        data: item
      })
    }

    // Sample permintaan data with separated PH and LO divisions
    const permintaanData = [
      {
        namaDivisi: 'PH',
        namaBarang: 'Proyektor LCD 3500lm',
        jumlahDiminta: 1,
        hargaSatuan: 5000000,
        totalHarga: 5000000,
        prioritas: 'Tinggi',
        kebutuhanKhusus: 'Untuk presentasi workshop',
        diperlukanPada: new Date('2025-01-15'),
        statusPermintaan: 'Diajukan',
        catatanPerlengkapan: 'Pastikan kabel HDMI tersedia'
      },
      {
        namaDivisi: 'LO',
        namaBarang: 'Laptop',
        jumlahDiminta: 2,
        hargaSatuan: 8000000,
        totalHarga: 16000000,
        prioritas: 'Tinggi',
        kebutuhanKhusus: 'Untuk pendamping acara',
        diperlukanPada: new Date('2025-01-18'),
        statusPermintaan: 'Diajukan',
        catatanPerlengkapan: 'Butuh segera untuk persiapan'
      },
      {
        namaDivisi: 'Acara',
        namaBarang: 'Sound System',
        jumlahDiminta: 2,
        hargaSatuan: 1500000,
        totalHarga: 3000000,
        prioritas: 'Sangat Tinggi',
        kebutuhanKhusus: 'Untuk acara pembukaan',
        diperlukanPada: new Date('2025-01-10'),
        statusPermintaan: 'Disetujui Perlengkapan',
        catatanPerlengkapan: 'Sudah dicek dan siap digunakan'
      },
      {
        namaDivisi: 'Konsumsi',
        namaBarang: 'Air Mineral',
        jumlahDiminta: 30,
        hargaSatuan: 5000,
        totalHarga: 150000,
        prioritas: 'Sedang',
        kebutuhanKhusus: 'Untuk peserta seminar',
        diperlukanPada: new Date('2025-01-12'),
        statusPermintaan: 'Selesai',
        catatanPerlengkapan: 'Sudah diterima dan disimpan'
      },
      {
        namaDivisi: 'Humas',
        namaBarang: 'Laptop',
        jumlahDiminta: 1,
        hargaSatuan: 7500000,
        totalHarga: 7500000,
        prioritas: 'Rendah',
        kebutuhanKhusus: 'Untuk admin media sosial',
        diperlukanPada: new Date('2025-01-20'),
        statusPermintaan: 'Sedang Diproses',
        catatanPerlengkapan: 'Sedang dicek ketersediaan'
      },
      {
        namaDivisi: 'PH',
        namaBarang: 'Laptop',
        jumlahDiminta: 1,
        hargaSatuan: 7500000,
        totalHarga: 7500000,
        prioritas: 'Tinggi',
        kebutuhanKhusus: 'Untuk pengutus harian',
        diperlukanPada: new Date('2025-01-22'),
        statusPermintaan: 'Diajukan',
        catatanPerlengkapan: 'Diperlukan untuk koordinasi'
      }
    ]

    // Insert permintaan data
    for (const item of permintaanData) {
      await db.permintaan.create({
        data: item
      })
    }

    // Sample anggaran data
    const anggaranData = [
      {
        namaDivisi: 'PH',
        namaBarang: 'Proyektor LCD 3500lm',
        jumlahDiminta: 1,
        estimasiHargaSatuan: 5000000,
        totalEstimasiBiaya: 5000000,
        hargaBeliAktual: 4800000,
        totalBiayaAktual: 4800000,
        varianAnggaran: -200000,
        statusPermintaan: 'Diajukan'
      },
      {
        namaDivisi: 'LO',
        namaBarang: 'Laptop',
        jumlahDiminta: 2,
        estimasiHargaSatuan: 8000000,
        totalEstimasiBiaya: 16000000,
        hargaBeliAktual: 7800000,
        totalBiayaAktual: 15600000,
        varianAnggaran: -400000,
        statusPermintaan: 'Diajukan'
      },
      {
        namaDivisi: 'Acara',
        namaBarang: 'Sound System',
        jumlahDiminta: 2,
        estimasiHargaSatuan: 1500000,
        totalEstimasiBiaya: 3000000,
        hargaBeliAktual: 1450000,
        totalBiayaAktual: 2900000,
        varianAnggaran: -100000,
        statusPermintaan: 'Disetujui Perlengkapan'
      },
      {
        namaDivisi: 'Konsumsi',
        namaBarang: 'Air Mineral',
        jumlahDiminta: 30,
        estimasiHargaSatuan: 5000,
        totalEstimasiBiaya: 150000,
        hargaBeliAktual: 4500,
        totalBiayaAktual: 135000,
        varianAnggaran: -15000,
        statusPermintaan: 'Selesai'
      }
    ]

    // Insert anggaran data
    for (const item of anggaranData) {
      await db.anggaran.create({
        data: item
      })
    }

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

seedDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))