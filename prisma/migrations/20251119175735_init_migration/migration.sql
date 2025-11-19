-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "kodeBarang" TEXT NOT NULL,
    "namaBarang" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "spesifikasi" TEXT,
    "stokTersedia" INTEGER NOT NULL DEFAULT 0,
    "kondisi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permintaan" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "namaDivisi" TEXT NOT NULL,
    "namaBarang" TEXT NOT NULL,
    "jumlahDiminta" INTEGER NOT NULL,
    "hargaSatuan" DOUBLE PRECISION,
    "totalHarga" DOUBLE PRECISION,
    "prioritas" TEXT NOT NULL,
    "kebutuhanKhusus" TEXT,
    "diperlukanPada" TIMESTAMP(3),
    "statusPermintaan" TEXT NOT NULL DEFAULT 'Diajukan',
    "catatanPerlengkapan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permintaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anggaran" (
    "id" TEXT NOT NULL,
    "namaDivisi" TEXT NOT NULL,
    "namaBarang" TEXT NOT NULL,
    "jumlahDiminta" INTEGER NOT NULL,
    "estimasiHargaSatuan" DOUBLE PRECISION NOT NULL,
    "totalEstimasiBiaya" DOUBLE PRECISION NOT NULL,
    "hargaBeliAktual" DOUBLE PRECISION,
    "totalBiayaAktual" DOUBLE PRECISION,
    "varianAnggaran" DOUBLE PRECISION,
    "statusPermintaan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anggaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_kodeBarang_key" ON "Inventory"("kodeBarang");
