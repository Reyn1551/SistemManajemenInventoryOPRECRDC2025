"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";
import { Building, BarChart3, Package, Users, Eye } from "lucide-react";
import LoginPage from "@/components/ui/LoginPage";

// Dashboard Components
import { DashboardStatsCards } from "@/components/dashboard/DashboardStatsCards";
import { StatusSummaryCard } from "@/components/dashboard/StatusSummaryCard";

// Inventory Components
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { AddInventoryDialog } from "@/components/inventory/AddInventoryDialog";

// Permintaan Components
import { PermintaanTable } from "@/components/permintaan/PermintaanTable";
import { PermintaanFilters } from "@/components/permintaan/PermintaanFilters";
import { AddPermintaanDialog } from "@/components/permintaan/AddPermintaanDialog";
import { PermintaanDetailDialog } from "@/components/permintaan/PermintaanDetailDialog";

// Types
interface InventoryItem {
  id: string;
  namaBarang: string;
  kategori: string;
  spesifikasi?: string;
  stokTersedia: number;
  kondisi: string;
}

interface PermintaanItem {
  id: string;
  timestamp: string;
  namaDivisi: string;
  namaBarang: string;
  jumlahDiminta: number;
  hargaSatuan?: number;
  totalHarga?: number;
  prioritas: string;
  kebutuhanKhusus?: string;
  diperlukanPada?: string;
  statusPermintaan: string;
  catatanPerlengkapan?: string;
  totalBiayaAktual?: number;
}

interface DashboardStats {
  totalItemDiminta: number;
  totalEstimasiBiaya: number;
  totalBiayaAktual: number;
  statusCounts: {
    Diajukan: number;
    "Disetujui Perlengkapan": number;
    "Sedang Diproses": number;
    Selesai: number;
    Ditolak: number;
  };
}

// Constants
const divisiOptions = ["PH", "LO", "Acara", "Humas", "Konsumsi", "PDD"];
const prioritasOptions = ["Sangat Tinggi", "Tinggi", "Sedang", "Rendah"];
const statusOptions = [
  "Diajukan",
  "Disetujui Perlengkapan",
  "Sedang Diproses",
  "Selesai",
  "Ditolak",
];
const kondisiOptions = ["Baik", "Rusak Ringan", "Rusak Berat"];

const divisiColors = {
  PH: {
    bg: "bg-slate-700",
    light: "bg-slate-100",
    text: "text-slate-800",
    border: "border-slate-200",
    hover: "hover:bg-slate-50",
  },
  LO: {
    bg: "bg-teal-700",
    light: "bg-teal-50",
    text: "text-teal-800",
    border: "border-teal-200",
    hover: "hover:bg-teal-50",
  },
  Acara: {
    bg: "bg-blue-700",
    light: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
    hover: "hover:bg-blue-50",
  },
  Humas: {
    bg: "bg-emerald-700",
    light: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
    hover: "hover:bg-emerald-50",
  },
  Konsumsi: {
    bg: "bg-amber-700",
    light: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
    hover: "hover:bg-amber-50",
  },
  PDD: {
    bg: "bg-purple-700",
    light: "bg-purple-50",
    text: "text-purple-800",
    border: "border-purple-200",
    hover: "hover:bg-purple-50",
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [permintaan, setPermintaan] = useState<PermintaanItem[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null
  );
  const [isAddInventoryOpen, setIsAddInventoryOpen] = useState(false);
  const [isAddPermintaanOpen, setIsAddPermintaanOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PermintaanItem>>({});

  //state untuk dialog rincian
  const [isRincianDetailOpen, setIsRincianDetailOpen] = useState(false);
  const [selectedRincianItem, setSelectedRincianItem] =
    useState<PermintaanItem | null>(null);

  // State untuk autentikasi
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // State for inventory editing
  const [editingInventoryItem, setEditingInventoryItem] = useState<
    string | null
  >(null);
  const [editInventoryForm, setEditInventoryForm] = useState<
    Partial<InventoryItem>
  >({});

  // State untuk filter
  const [permintaanFilters, setPermintaanFilters] = useState({
    divisi: "Semua",
    prioritas: "Semua",
    status: "Semua",
    search: "",
  });
  const [inventoryFilters, setInventoryFilters] = useState({
    kategori: "",
    kondisi: "Semua",
    search: "",
  });

  // State untuk data yang sudah difilter
  const [filteredPermintaan, setFilteredPermintaan] = useState<
    PermintaanItem[]
  >([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>(
    []
  );

  // Form states
  const [newInventory, setNewInventory] = useState({
    namaBarang: "",
    kategori: "",
    spesifikasi: "",
    stokTersedia: 0,
    kondisi: "",
  });

  const [newPermintaan, setNewPermintaan] = useState({
    namaDivisi: "",
    namaBarang: "",
    jumlahDiminta: 1,
    hargaSatuan: 0,
    totalHarga: 0,
    prioritas: "",
    kebutuhanKhusus: "",
    diperlukanPada: "",
    statusPermintaan: "Diajukan",
    catatanPerlengkapan: "",
  });

  // Fetch data from API
  const fetchData = async () => {
    // Mengambil data inventory secara terpisah
    try {
      const inventoryRes = await fetch("/api/inventory");
      if (inventoryRes.ok) {
        const inventoryData = await inventoryRes.json();
        setInventory(inventoryData);
      } else {
        console.error("Failed to fetch inventory");
        toast.error("Gagal memuat data inventory.");
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
      toast.error("Terjadi kesalahan saat memuat data inventory.");
    }

    // Mengambil data permintaan secara terpisah
    try {
      const permintaanRes = await fetch("/api/permintaan");
      if (permintaanRes.ok) {
        const permintaanData = await permintaanRes.json();
        setPermintaan(permintaanData);
      }
    } catch (error) {
      console.error("Error fetching permintaan:", error);
    }

    // Mengambil data dashboard secara terpisah
    try {
      const dashboardRes = await fetch("/api/dashboard");
      if (dashboardRes.ok) setDashboardStats(await dashboardRes.json());
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  // Efek untuk menerapkan filter pada data permintaan
  useEffect(() => {
    let data = [...permintaan];
    if (permintaanFilters.divisi !== "Semua") {
      data = data.filter(
        (item) => item.namaDivisi === permintaanFilters.divisi
      );
    }
    if (permintaanFilters.prioritas !== "Semua") {
      data = data.filter(
        (item) => item.prioritas === permintaanFilters.prioritas
      );
    }
    if (permintaanFilters.status !== "Semua") {
      data = data.filter(
        (item) => item.statusPermintaan === permintaanFilters.status
      );
    }
    if (permintaanFilters.search) {
      data = data.filter((item) =>
        item.namaBarang
          .toLowerCase()
          .includes(permintaanFilters.search.toLowerCase())
      );
    }
    setFilteredPermintaan(data);
  }, [permintaan, permintaanFilters]);

  // Efek untuk menerapkan filter pada data inventory
  useEffect(() => {
    let data = [...inventory];
    if (inventoryFilters.kategori) {
      data = data.filter((item) =>
        item.kategori
          .toLowerCase()
          .includes(inventoryFilters.kategori.toLowerCase())
      );
    }
    if (inventoryFilters.kondisi !== "Semua") {
      data = data.filter((item) => item.kondisi === inventoryFilters.kondisi);
    }
    if (inventoryFilters.search) {
      data = data.filter((item) =>
        item.namaBarang
          .toLowerCase()
          .includes(inventoryFilters.search.toLowerCase())
      );
    }
    setFilteredInventory(data);
  }, [inventory, inventoryFilters]);

  useEffect(() => {
    fetchData();
  }, []);

  // Cek status login saat komponen pertama kali dimuat
  useEffect(() => {
    const localAuthStatus = localStorage.getItem("isAuthenticated");
    const sessionAuthStatus = sessionStorage.getItem("isAuthenticated");

    if (localAuthStatus === "true" || sessionAuthStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Selesai loading
  }, []);

  // Calculate total harga when jumlah or harga changes
  useEffect(() => {
    const total = newPermintaan.jumlahDiminta * newPermintaan.hargaSatuan;
    setNewPermintaan((prev) => ({ ...prev, totalHarga: total }));
  }, [newPermintaan.jumlahDiminta, newPermintaan.hargaSatuan]);

  const handleAddInventory = async () => {
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInventory),
      });

      if (response.ok) {
        setIsAddInventoryOpen(false);
        setNewInventory({
          namaBarang: "",
          kategori: "",
          spesifikasi: "",
          stokTersedia: 0,
          kondisi: "",
        });
        fetchData();
        toast.success("Item inventory berhasil ditambahkan!");
      }
    } catch (error) {
      console.error("Error adding inventory:", error);
    }
  };

  const handleAddPermintaan = async () => {
    try {
      const response = await fetch("/api/permintaan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPermintaan),
      });

      if (response.ok) {
        setIsAddPermintaanOpen(false);
        setNewPermintaan({
          namaDivisi: "",
          namaBarang: "",
          jumlahDiminta: 1,
          hargaSatuan: 0,
          totalHarga: 0,
          prioritas: "",
          kebutuhanKhusus: "",
          diperlukanPada: "",
          statusPermintaan: "Diajukan",
          catatanPerlengkapan: "",
        });
        fetchData();
        toast.success("Permintaan baru berhasil ditambahkan!");
      }
    } catch (error) {
      toast.error("Gagal menambahkan permintaan baru.");
      console.error("Error adding permintaan:", error);
    }
  };

  const handleEdit = (item: PermintaanItem) => {
    setEditingItem(item.id);
    setEditForm(item);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/permintaan/${editingItem}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        setEditingItem(null);
        setEditForm({});
        fetchData();
        toast.success("Perubahan berhasil disimpan!");
      }
    } catch (error) {
      toast.error("Gagal menyimpan perubahan.");
      console.error("Error updating permintaan:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      try {
        const response = await fetch(`/api/permintaan/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchData();
          toast.success("Item permintaan berhasil dihapus.");
        }
      } catch (error) {
        toast.error("Gagal menghapus item permintaan.");
        console.error("Error deleting permintaan:", error);
      }
    }
  };

  const handleEditInventory = (item: InventoryItem) => {
    setEditingInventoryItem(item.id);
    setEditInventoryForm(item);
  };

  const handleCancelInventoryEdit = () => {
    setEditingInventoryItem(null);
    setEditInventoryForm({});
  };

  const handleSaveInventoryEdit = async () => {
    if (!editingInventoryItem) return;
    try {
      const response = await fetch(`/api/inventory/${editingInventoryItem}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editInventoryForm),
      });

      if (response.ok) {
        handleCancelInventoryEdit();
        fetchData();
        toast.success("Item inventory berhasil diperbarui!");
      }
    } catch (error) {
      toast.error("Gagal memperbarui item inventory.");
      console.error("Error updating inventory:", error);
    }
  };

  const handleDeleteInventory = async (id: string) => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus item inventory ini? Ini tidak dapat dibatalkan."
      )
    ) {
      try {
        const response = await fetch(`/api/inventory/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchData();
          toast.success("Item inventory berhasil dihapus.");
        } else {
          const errorData = await response.json();
          console.error("Failed to delete inventory:", errorData.error);
          toast.error(`Gagal menghapus: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error deleting inventory:", error);
        toast.error("Terjadi kesalahan saat menghapus item.");
      }
    }
  };

  //Handler untuk membaca dialog rincian
  const handleRincianClick = (item: PermintaanItem) => {
    setSelectedRincianItem(item);
    setIsRincianDetailOpen(true);
  };

  // Fungsi untuk mengekspor data ke CSV
  const handleExportToCSV = () => {
    if (filteredPermintaan.length === 0) {
      toast.warning("Tidak ada data untuk diekspor.");
      return;
    }

    // Definisikan header untuk file CSV
    const headers = [
      "ID",
      "Tanggal Diajukan",
      "Divisi",
      "Nama Barang",
      "Jumlah Diminta",
      "Estimasi Harga Satuan",
      "Total Estimasi Harga",
      "Biaya Aktual",
      "Prioritas",
      "Status",
      "Kebutuhan Khusus",
      "Catatan Perlengkapan",
    ];

    // Fungsi kecil untuk memastikan data dengan koma tidak merusak format CSV
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return "";
      const str = String(val);
      // Jika string mengandung koma, bungkus dengan tanda kutip ganda
      if (str.includes(",")) return `"${str.replace(/"/g, '""')}"`;
      return str;
    };

    // Ubah setiap item permintaan menjadi baris CSV
    const rows = filteredPermintaan.map((item) =>
      [
        item.id,
        new Date(item.timestamp).toLocaleDateString("id-ID"),
        item.namaDivisi,
        escapeCsv(item.namaBarang),
        item.jumlahDiminta,
        item.hargaSatuan || 0,
        item.totalHarga || 0,
        item.totalBiayaAktual || 0,
        item.prioritas,
        item.statusPermintaan,
        escapeCsv(item.kebutuhanKhusus),
        escapeCsv(item.catatanPerlengkapan),
      ].join(",")
    );

    // Gabungkan header dan semua baris data
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Buat Blob dan picu unduhan
    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    }); // \uFEFF untuk kompatibilitas Excel
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `laporan_permintaan_rdc_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Data berhasil diekspor!");
  };

  // Fungsi yang akan dipanggil saat login berhasil
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Saat masih loading, tampilkan halaman kosong untuk mencegah konten utama terlihat sekejap
  if (isLoading) {
    return <div className="min-h-screen bg-gray-100 dark:bg-gray-900"></div>;
  }

  // Jika tidak terautentikasi, tampilkan halaman login
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Jika berhasil diautentikasi, tampilkan konten aplikasi utama
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Toaster richColors position="top-center" />
      {/* Header and TabsList - STICKY PART */}
      <div className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="py-4 text-center">
            <div className="flex justify-center items-center gap-3 mb-2">
              <div className="p-2 bg-slate-800 rounded-lg shadow-sm">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Sistem Inventory Management
              </h1>
            </div>
            <p className="text-gray-500 text-sm md:text-base">
              Open Recruitment Robotic Development Community 2025
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="w-full overflow-x-auto pb-2 md:flex md:justify-center">
              <TabsList className="inline-flex h-auto items-center justify-center rounded-lg bg-gray-100 p-1">
                <TabsTrigger
                  value="dashboard"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-colors whitespace-nowrap px-4 py-2 text-sm font-medium"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="inventory"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-colors whitespace-nowrap px-4 py-2 text-sm font-medium"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Inventory
                </TabsTrigger>
                <TabsTrigger
                  value="permintaan"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-colors whitespace-nowrap px-4 py-2 text-sm font-medium"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Permintaan
                </TabsTrigger>
                <TabsTrigger
                  value="rincian"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-colors whitespace-nowrap px-4 py-2 text-sm font-medium"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Rincian
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Content - SCROLLABLE PART */}
      <div className="max-w-7xl mx-auto p-4 md:p-6 w-full flex-grow">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <DashboardStatsCards stats={dashboardStats} />
            <StatusSummaryCard stats={dashboardStats} />
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800">
                Data Master Inventory
              </h2>
              <AddInventoryDialog
                open={isAddInventoryOpen}
                onOpenChange={setIsAddInventoryOpen}
                newItem={newInventory}
                kondisiOptions={kondisiOptions}
                onFormChange={(field, value) =>
                  setNewInventory({ ...newInventory, [field]: value })
                }
                onSubmit={handleAddInventory}
              />
            </div>

            <InventoryFilters
              filters={inventoryFilters}
              kondisiOptions={kondisiOptions}
              onFilterChange={(key, value) =>
                setInventoryFilters({ ...inventoryFilters, [key]: value })
              }
              onReset={() =>
                setInventoryFilters({
                  kategori: "",
                  kondisi: "Semua",
                  search: "",
                })
              }
            />

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-0">
              <InventoryTable
                inventory={filteredInventory}
                editingId={editingInventoryItem}
                editForm={editInventoryForm}
                kondisiOptions={kondisiOptions}
                onEdit={handleEditInventory}
                onDelete={handleDeleteInventory}
                onSave={handleSaveInventoryEdit}
                onCancel={handleCancelInventoryEdit}
                onFormChange={(field, value) =>
                  setEditInventoryForm({ ...editInventoryForm, [field]: value })
                }
              />
            </div>
          </TabsContent>

          {/* Permintaan Tab */}
          <TabsContent value="permintaan" className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800">
                Form Input Permintaan
              </h2>
              <AddPermintaanDialog
                open={isAddPermintaanOpen}
                onOpenChange={setIsAddPermintaanOpen}
                newItem={newPermintaan}
                divisiOptions={divisiOptions}
                prioritasOptions={prioritasOptions}
                statusOptions={statusOptions}
                divisiColors={divisiColors}
                onFormChange={(field, value) =>
                  setNewPermintaan({ ...newPermintaan, [field]: value })
                }
                onSubmit={handleAddPermintaan}
              />
            </div>

            <PermintaanFilters
              filters={permintaanFilters}
              divisiOptions={divisiOptions}
              prioritasOptions={prioritasOptions}
              statusOptions={statusOptions}
              onFilterChange={(key, value) =>
                setPermintaanFilters({ ...permintaanFilters, [key]: value })
              }
              onReset={() =>
                setPermintaanFilters({
                  divisi: "Semua",
                  prioritas: "Semua",
                  status: "Semua",
                  search: "",
                })
              }
              onExport={handleExportToCSV}
            />

            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-0">
              <PermintaanTable
                permintaan={filteredPermintaan}
                editingId={editingItem}
                editForm={editForm}
                prioritasOptions={prioritasOptions}
                statusOptions={statusOptions}
                divisiColors={divisiColors}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSave={handleSaveEdit}
                onCancel={() => {
                  setEditingItem(null);
                  setEditForm({});
                }}
                onFormChange={(field, value) =>
                  setEditForm({ ...editForm, [field]: value })
                }
                onRincianClick={handleRincianClick}
              />
            </div>
          </TabsContent>

          {/* Rincian Tab */}
          <TabsContent value="rincian" className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">
              Rincian Kebutuhan Per Divisi
            </h2>

            {/* Re-use PermintaanFilters for consistency, or keep as is if different behavior needed. 
                For now, I'll reuse the filter logic but render the cards as before since that wasn't fully extracted to a component yet 
                (it was part of the plan to extract components, but the card view logic is specific to this tab).
                Actually, I can use the PermintaanFilters component here too!
            */}
            <PermintaanFilters
              filters={permintaanFilters}
              divisiOptions={divisiOptions}
              prioritasOptions={prioritasOptions}
              statusOptions={statusOptions}
              onFilterChange={(key, value) =>
                setPermintaanFilters({ ...permintaanFilters, [key]: value })
              }
              onReset={() =>
                setPermintaanFilters({
                  divisi: "Semua",
                  prioritas: "Semua",
                  status: "Semua",
                  search: "",
                })
              }
              onExport={handleExportToCSV}
            />

            <div className="space-y-8">
              {divisiOptions.map((divisi) => {
                // Menggunakan data yang sudah difilter
                const divisiPermintaan = filteredPermintaan.filter(
                  (item) => item.namaDivisi === divisi
                );
                // @ts-ignore
                const colors = divisiColors[divisi];
                return divisiPermintaan.length > 0 ? (
                  <div
                    key={divisi}
                    className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div
                      className={`${colors.light} ${colors.border} border-l-4 p-4 flex items-center justify-between`}
                    >
                      <div>
                        <h3 className="text-lg font-bold flex items-center gap-3 text-slate-800">
                          <div
                            className={`w-4 h-4 rounded-full ${colors.bg}`}
                          ></div>
                          Kebutuhan Divisi {divisi}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Total {divisiPermintaan.length} permintaan
                        </p>
                      </div>
                      <span
                        className={`${colors.bg} text-white px-2 py-1 rounded text-xs font-bold`}
                      >
                        {divisiPermintaan.length} Items
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="max-h-64 overflow-y-auto">
                        {/* Re-using PermintaanTable but we might want a read-only version or just use it with no edit actions */}
                        <PermintaanTable
                          permintaan={divisiPermintaan}
                          editingId={null} // Disable editing in this view
                          editForm={{}}
                          prioritasOptions={prioritasOptions}
                          statusOptions={statusOptions}
                          divisiColors={divisiColors}
                          onEdit={() => { }} // No-op
                          onDelete={() => { }} // No-op
                          onSave={() => { }} // No-op
                          onCancel={() => { }} // No-op
                          onFormChange={() => { }} // No-op
                          onRincianClick={handleRincianClick}
                          isReadOnly={true}
                        />
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </TabsContent>
        </Tabs>

        <PermintaanDetailDialog
          open={isRincianDetailOpen}
          onOpenChange={setIsRincianDetailOpen}
          item={selectedRincianItem}
          divisiColors={divisiColors}
        />
      </div>
    </main>
  );
}