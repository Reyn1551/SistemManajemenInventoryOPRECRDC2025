'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Plus, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  XCircle,
  Edit2,
  Save,
  X,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  Users,
  BarChart3,
  Building,
  Settings
} from 'lucide-react'
import LoginPage from '@/components/ui/LoginPage'

interface InventoryItem {
  id: string
  namaBarang: string
  kategori: string
  spesifikasi?: string
  stokTersedia: number
  kondisi: string
}

interface PermintaanItem {
  id: string
  timestamp: string
  namaDivisi: string
  namaBarang: string
  jumlahDiminta: number
  hargaSatuan?: number
  totalHarga?: number
  prioritas: string
  kebutuhanKhusus?: string
  diperlukanPada?: string
  statusPermintaan: string
  catatanPerlengkapan?: string
  totalBiayaAktual?: number
}

interface DashboardStats {
  totalItemDiminta: number
  totalEstimasiBiaya: number
  totalBiayaAktual: number
  statusCounts: {
    'Diajukan': number
    'Disetujui Perlengkapan': number
    'Sedang Diproses': number
    'Selesai': number
    'Ditolak': number
  }
}

const divisiOptions = ['PH', 'LO', 'Acara', 'Humas', 'Konsumsi', 'PDD']
const prioritasOptions = ['Sangat Tinggi', 'Tinggi', 'Sedang', 'Rendah']
const statusOptions = ['Diajukan', 'Disetujui Perlengkapan', 'Sedang Diproses', 'Selesai', 'Ditolak']
const kondisiOptions = ['Baik', 'Rusak Ringan', 'Rusak Berat']

// Professional color schemes for divisions
const divisiColors = {
  'PH': {
    bg: 'bg-slate-700',
    light: 'bg-slate-100',
    text: 'text-slate-800',
    border: 'border-slate-200',
    hover: 'hover:bg-slate-50'
  },
  'LO': {
    bg: 'bg-teal-700',
    light: 'bg-teal-50',
    text: 'text-teal-800',
    border: 'border-teal-200',
    hover: 'hover:bg-teal-50'
  },
  'Acara': {
    bg: 'bg-blue-700',
    light: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-50'
  },
  'Humas': {
    bg: 'bg-emerald-700',
    light: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    hover: 'hover:bg-emerald-50'
  },
  'Konsumsi': {
    bg: 'bg-amber-700',
    light: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    hover: 'hover:bg-amber-50'
  },
  'PDD': {
    bg: 'bg-purple-700',
    light: 'bg-purple-50',
    text: 'text-purple-800',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-50'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Sangat Tinggi': return 'bg-red-100 text-red-800 border border-red-200'
    case 'Tinggi': return 'bg-orange-100 text-orange-800 border border-orange-200'
    case 'Sedang': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    case 'Rendah': return 'bg-green-100 text-green-800 border border-green-200'
    default: return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Diajukan': return 'bg-blue-100 text-blue-800 border border-blue-200'
    case 'Disetujui Perlengkapan': return 'bg-indigo-100 text-indigo-800 border border-indigo-200'
    case 'Sedang Diproses': return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    case 'Selesai': return 'bg-green-100 text-green-800 border border-green-200'
    case 'Ditolak': return 'bg-red-100 text-red-800 border border-red-200'
    default: return 'bg-gray-100 text-gray-800 border border-gray-200'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Diajukan': return <Clock className="w-4 h-4" />
    case 'Disetujui Perlengkapan': return <CheckCircle className="w-4 h-4" />
    case 'Sedang Diproses': return <AlertCircle className="w-4 h-4" />
    case 'Selesai': return <CheckCircle className="w-4 h-4" />
    case 'Ditolak': return <XCircle className="w-4 h-4" />
    default: return <Clock className="w-4 h-4" />
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [permintaan, setPermintaan] = useState<PermintaanItem[]>([])
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [isAddInventoryOpen, setIsAddInventoryOpen] = useState(false)
  const [isAddPermintaanOpen, setIsAddPermintaanOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<PermintaanItem>>({})
  
  // State untuk autentikasi
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // State for inventory editing
  const [editingInventoryItem, setEditingInventoryItem] = useState<string | null>(null)
  const [editInventoryForm, setEditInventoryForm] = useState<Partial<InventoryItem>>({})

  // Form states
  const [newInventory, setNewInventory] = useState({
    namaBarang: '',
    kategori: '',
    spesifikasi: '',
    stokTersedia: 0,
    kondisi: ''
  })

  const [newPermintaan, setNewPermintaan] = useState({
    namaDivisi: '',
    namaBarang: '',
    jumlahDiminta: 1,
    hargaSatuan: 0,
    totalHarga: 0,
    prioritas: '',
    kebutuhanKhusus: '',
    diperlukanPada: '',
    statusPermintaan: 'Diajukan',
    catatanPerlengkapan: ''
  })

  // Fetch data from API
  const fetchData = async () => {
    try {
      const [inventoryRes, permintaanRes, dashboardRes] = await Promise.all([
        fetch('/api/inventory'),
        fetch('/api/permintaan'),
        fetch('/api/dashboard')
      ])

      if (inventoryRes.ok) {
        const inventoryData = await inventoryRes.json()
        setInventory(inventoryData)
      }

      if (permintaanRes.ok) {
        const permintaanData = await permintaanRes.json()
        setPermintaan(permintaanData)
      }

      if (dashboardRes.ok) {
        const dashboardData = await dashboardRes.json()
        setDashboardStats(dashboardData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Cek status login saat komponen pertama kali dimuat
  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Selesai loading
  }, []);

  // Calculate total harga when jumlah or harga changes
  useEffect(() => {
    const total = newPermintaan.jumlahDiminta * newPermintaan.hargaSatuan
    setNewPermintaan(prev => ({ ...prev, totalHarga: total }))
  }, [newPermintaan.jumlahDiminta, newPermintaan.hargaSatuan])

  const handleAddInventory = async () => {
    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInventory),
      })

      if (response.ok) {
        setIsAddInventoryOpen(false)
        setNewInventory({
          namaBarang: '',
          kategori: '',
          spesifikasi: '',
          stokTersedia: 0,
          kondisi: ''
        })
        fetchData()
      }
    } catch (error) {
      console.error('Error adding inventory:', error)
    }
  }

  const handleAddPermintaan = async () => {
    try {
      const response = await fetch('/api/permintaan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPermintaan),
      })

      if (response.ok) {
        setIsAddPermintaanOpen(false)
        setNewPermintaan({
          namaDivisi: '',
          namaBarang: '',
          jumlahDiminta: 1,
          hargaSatuan: 0,
          totalHarga: 0,
          prioritas: '',
          kebutuhanKhusus: '',
          diperlukanPada: '',
          statusPermintaan: 'Diajukan',
          catatanPerlengkapan: ''
        })
        fetchData()
      }
    } catch (error) {
      console.error('Error adding permintaan:', error)
    }
  }

  const handleEdit = (item: PermintaanItem) => {
    setEditingItem(item.id)
    setEditForm(item)
  }

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/permintaan/${editingItem}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      })

      if (response.ok) {
        setEditingItem(null)
        setEditForm({})
        fetchData()
      }
    } catch (error) {
      console.error('Error updating permintaan:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      try {
        const response = await fetch(`/api/permintaan/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchData()
        }
      } catch (error) {
        console.error('Error deleting permintaan:', error)
      }
    }
  }

  const handleEditInventory = (item: InventoryItem) => {
    setEditingInventoryItem(item.id)
    setEditInventoryForm(item)
  }

  const handleCancelInventoryEdit = () => {
    setEditingInventoryItem(null)
    setEditInventoryForm({})
  }

  const handleSaveInventoryEdit = async () => {
    if (!editingInventoryItem) return
    try {
      const response = await fetch(`/api/inventory/${editingInventoryItem}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editInventoryForm),
      })

      if (response.ok) {
        handleCancelInventoryEdit()
        fetchData()
      }
    } catch (error) {
      console.error('Error updating inventory:', error)
    }
  }

  const handleDeleteInventory = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus item inventory ini? Ini tidak dapat dibatalkan.')) {
      try {
        const response = await fetch(`/api/inventory/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchData()
        } else {
          const errorData = await response.json()
          console.error('Failed to delete inventory:', errorData.error)
          alert(`Gagal menghapus: ${errorData.error}`)
        }
      } catch (error) {
        console.error('Error deleting inventory:', error)
        alert('Terjadi kesalahan saat menghapus item.')
      }
    }
  }

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
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
              Sistem Inventory Management
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Open Recruitment Robotic Development Community 2025</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Wrapper untuk scrolling horizontal di mobile */}
          <div className="w-full overflow-x-auto pb-2">
            <TabsList className="inline-flex h-auto items-center justify-center rounded-lg bg-white p-1 shadow-sm border border-gray-200">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-colors whitespace-nowrap">
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="inventory" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-colors whitespace-nowrap">
                <Package className="w-4 h-4 mr-2" />
                Inventory
              </TabsTrigger>
              <TabsTrigger value="permintaan" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-colors whitespace-nowrap">
                <Users className="w-4 h-4 mr-2" />
                Permintaan
              </TabsTrigger>
              <TabsTrigger value="rincian" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-colors whitespace-nowrap">
                <Eye className="w-4 h-4 mr-2" />
                Rincian
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Item Diminta</CardTitle>
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Package className="h-4 w-4 text-slate-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-800">
                    {dashboardStats?.totalItemDiminta || 0}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Items requested</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Estimasi Biaya</CardTitle>
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-800">
                    Rp {dashboardStats?.totalEstimasiBiaya.toLocaleString('id-ID') || 0}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Estimated budget</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Biaya Aktual</CardTitle>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-800">
                    Rp {dashboardStats?.totalBiayaAktual.toLocaleString('id-ID') || 0}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Actual cost</p>
                </CardContent>
              </Card>
            </div>

            {/* Status Summary */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-slate-600" />
                  Ringkasan Status Permintaan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(dashboardStats?.statusCounts || {}).map(([status, count]) => (
                    <div key={status} className="text-center">
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                        {status}
                      </div>
                      <div className="text-2xl font-bold mt-2 text-slate-800">
                        {count}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800">
                Data Master Inventory
              </h2>
              <Dialog open={isAddInventoryOpen} onOpenChange={setIsAddInventoryOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-slate-700 hover:bg-slate-800 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-slate-800">
                      Tambah Item Inventory
                    </DialogTitle>
                    <DialogDescription>
                      Tambahkan item baru ke database inventory
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="namaBarang" className="text-right">Nama Barang</Label>
                      <Input
                        id="namaBarang"
                        value={newInventory.namaBarang}
                        onChange={(e) => setNewInventory({...newInventory, namaBarang: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="kategori" className="text-right">Kategori</Label>
                      <Input
                        id="kategori"
                        value={newInventory.kategori}
                        onChange={(e) => setNewInventory({...newInventory, kategori: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="spesifikasi" className="text-right">Spesifikasi</Label>
                      <Input
                        id="spesifikasi"
                        value={newInventory.spesifikasi}
                        onChange={(e) => setNewInventory({...newInventory, spesifikasi: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="stokTersedia" className="text-right">Stok</Label>
                      <Input
                        id="stokTersedia"
                        type="number"
                        value={newInventory.stokTersedia}
                        onChange={(e) => setNewInventory({...newInventory, stokTersedia: parseInt(e.target.value) || 0})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="kondisi" className="text-right">Kondisi</Label>
                      <Select value={newInventory.kondisi} onValueChange={(value) => setNewInventory({...newInventory, kondisi: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih kondisi" />
                        </SelectTrigger>
                        <SelectContent>
                          {kondisiOptions.map((kondisi) => (
                            <SelectItem key={kondisi} value={kondisi}>{kondisi}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddInventoryOpen(false)}>
                      Batal
                    </Button>
                    <Button onClick={handleAddInventory} className="bg-slate-700 hover:bg-slate-800">
                      Simpan
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Nama Barang</TableHead>
                        <TableHead className="font-semibold">Kategori</TableHead>
                        <TableHead className="font-semibold">Spesifikasi</TableHead>
                        <TableHead className="font-semibold">Stok</TableHead>
                        <TableHead className="font-semibold">Kondisi</TableHead>
                        <TableHead className="font-semibold text-center">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventory.map((item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50">
                          {editingInventoryItem === item.id ? (
                            <>
                              <TableCell>
                                <Input value={editInventoryForm.namaBarang} onChange={(e) => setEditInventoryForm({...editInventoryForm, namaBarang: e.target.value})} />
                              </TableCell>
                              <TableCell>
                                <Input value={editInventoryForm.kategori} onChange={(e) => setEditInventoryForm({...editInventoryForm, kategori: e.target.value})} />
                              </TableCell>
                              <TableCell>
                                <Input value={editInventoryForm.spesifikasi} onChange={(e) => setEditInventoryForm({...editInventoryForm, spesifikasi: e.target.value})} />
                              </TableCell>
                              <TableCell>
                                <Input type="number" value={editInventoryForm.stokTersedia} onChange={(e) => setEditInventoryForm({...editInventoryForm, stokTersedia: parseInt(e.target.value) || 0})} />
                              </TableCell>
                              <TableCell>
                                <Select value={editInventoryForm.kondisi} onValueChange={(value) => setEditInventoryForm({...editInventoryForm, kondisi: value})}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {kondisiOptions.map((kondisi) => (
                                      <SelectItem key={kondisi} value={kondisi}>{kondisi}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell>{item.namaBarang}</TableCell>
                              <TableCell>{item.kategori}</TableCell>
                              <TableCell className="max-w-xs truncate">{item.spesifikasi}</TableCell>
                              <TableCell>
                                <Badge variant={item.stokTersedia > 0 ? "default" : "destructive"}>
                                  {item.stokTersedia}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant={item.kondisi === 'Baik' ? 'default' : 'secondary'}>
                                  {item.kondisi}
                                </Badge>
                              </TableCell>
                            </>
                          )}
                          <TableCell>
                            <div className="flex gap-2 justify-center">
                              {editingInventoryItem === item.id ? (
                                <>
                                  <Button size="sm" onClick={handleSaveInventoryEdit} className="bg-emerald-600 hover:bg-emerald-700">
                                    <Save className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={handleCancelInventoryEdit}>
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button size="sm" variant="outline" onClick={() => handleEditInventory(item)}>
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => handleDeleteInventory(item.id)} 
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permintaan Tab */}
          <TabsContent value="permintaan" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800">
                Form Input Permintaan
              </h2>
              <Dialog open={isAddPermintaanOpen} onOpenChange={setIsAddPermintaanOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Permintaan
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-slate-800">
                      Tambah Permintaan Baru
                    </DialogTitle>
                    <DialogDescription>
                      Isi form permintaan barang baru
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="namaDivisi" className="text-right">Divisi</Label>
                      <Select value={newPermintaan.namaDivisi} onValueChange={(value) => setNewPermintaan({...newPermintaan, namaDivisi: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih divisi" />
                        </SelectTrigger>
                        <SelectContent>
                          {divisiOptions.map((divisi) => (
                            <SelectItem key={divisi} value={divisi}>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${divisiColors[divisi as keyof typeof divisiColors].bg}`}></div>
                                {divisi}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="namaBarang" className="text-right">Nama Barang</Label>
                      <Input
                        id="namaBarang"
                        value={newPermintaan.namaBarang}
                        onChange={(e) => setNewPermintaan({...newPermintaan, namaBarang: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="jumlahDiminta" className="text-right">Jumlah</Label>
                      <Input
                        id="jumlahDiminta"
                        type="number"
                        value={newPermintaan.jumlahDiminta}
                        onChange={(e) => setNewPermintaan({...newPermintaan, jumlahDiminta: parseInt(e.target.value) || 0})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hargaSatuan" className="text-right">Harga Satuan</Label>
                      <Input
                        id="hargaSatuan"
                        type="number"
                        value={newPermintaan.hargaSatuan}
                        onChange={(e) => setNewPermintaan({...newPermintaan, hargaSatuan: parseFloat(e.target.value) || 0})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="totalHarga" className="text-right">Total Harga</Label>
                      <Input
                        id="totalHarga"
                        type="number"
                        value={newPermintaan.totalHarga}
                        readOnly
                        className="col-span-3 bg-gray-100"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="prioritas" className="text-right">Prioritas</Label>
                      <Select value={newPermintaan.prioritas} onValueChange={(value) => setNewPermintaan({...newPermintaan, prioritas: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih prioritas" />
                        </SelectTrigger>
                        <SelectContent>
                          {prioritasOptions.map((prioritas) => (
                            <SelectItem key={prioritas} value={prioritas}>{prioritas}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="kebutuhanKhusus" className="text-right">Kebutuhan Khusus</Label>
                      <Textarea
                        id="kebutuhanKhusus"
                        value={newPermintaan.kebutuhanKhusus}
                        onChange={(e) => setNewPermintaan({...newPermintaan, kebutuhanKhusus: e.target.value})}
                        className="col-span-3"
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="diperlukanPada" className="text-right">Diperlukan Pada</Label>
                      <Input
                        id="diperlukanPada"
                        type="date"
                        value={newPermintaan.diperlukanPada}
                        onChange={(e) => setNewPermintaan({...newPermintaan, diperlukanPada: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="statusPermintaan" className="text-right">Status</Label>
                      <Select value={newPermintaan.statusPermintaan} onValueChange={(value) => setNewPermintaan({...newPermintaan, statusPermintaan: value})}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="catatanPerlengkapan" className="text-right">Catatan</Label>
                      <Textarea
                        id="catatanPerlengkapan"
                        value={newPermintaan.catatanPerlengkapan}
                        onChange={(e) => setNewPermintaan({...newPermintaan, catatanPerlengkapan: e.target.value})}
                        className="col-span-3"
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddPermintaanOpen(false)}>
                      Batal
                    </Button>
                    <Button onClick={handleAddPermintaan} className="bg-emerald-700 hover:bg-emerald-800">
                      Simpan
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Timestamp</TableHead>
                        <TableHead className="font-semibold">Divisi</TableHead>
                        <TableHead className="font-semibold">Nama Barang</TableHead>
                        <TableHead className="font-semibold">Jumlah</TableHead>
                        <TableHead className="font-semibold">Harga</TableHead>
                        <TableHead className="font-semibold">Total</TableHead>
                        <TableHead className="font-semibold">Biaya Aktual</TableHead>
                        <TableHead className="font-semibold">Prioritas</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {permintaan.map((item) => (
                        <TableRow key={item.id} className={`hover:bg-gray-50 ${divisiColors[item.namaDivisi as keyof typeof divisiColors].hover}`}>
                          <TableCell className="font-medium">
                            {new Date(item.timestamp).toLocaleDateString('id-ID')}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${divisiColors[item.namaDivisi as keyof typeof divisiColors].bg} text-white`}>
                              {item.namaDivisi}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {editingItem === item.id ? (
                              <Input
                                value={editForm.namaBarang}
                                onChange={(e) => setEditForm({...editForm, namaBarang: e.target.value})}
                                className="w-full"
                              />
                            ) : (
                              item.namaBarang
                            )}
                          </TableCell>
                          <TableCell>
                            {editingItem === item.id ? (
                              <Input
                                type="number"
                                value={editForm.jumlahDiminta}
                                onChange={(e) => setEditForm({...editForm, jumlahDiminta: parseInt(e.target.value) || 0})}
                                className="w-full"
                              />
                            ) : (
                              item.jumlahDiminta
                            )}
                          </TableCell>
                          <TableCell>
                            {editingItem === item.id ? (
                              <Input
                                type="number"
                                value={editForm.hargaSatuan}
                                onChange={(e) => setEditForm({...editForm, hargaSatuan: parseFloat(e.target.value) || 0})}
                                className="w-full"
                              />
                            ) : (
                              item.hargaSatuan ? `Rp ${item.hargaSatuan.toLocaleString('id-ID')}` : '-'
                            )}
                          </TableCell>
                          <TableCell>
                            {editingItem === item.id ? (
                              <Input
                                type="number"
                                value={editForm.totalHarga}
                                onChange={(e) => setEditForm({...editForm, totalHarga: parseFloat(e.target.value) || 0})}
                                className="w-full"
                              />
                            ) : (
                              item.totalHarga ? `Rp ${item.totalHarga.toLocaleString('id-ID')}` : '-'
                            )}
                          </TableCell>
                          <TableCell>
                            {editingItem === item.id ? (
                              <Input
                                type="number"
                                placeholder="Masukkan biaya riil"
                                value={editForm.totalBiayaAktual || ''}
                                onChange={(e) => setEditForm({...editForm, totalBiayaAktual: parseFloat(e.target.value) || 0})}
                                className="w-full"
                              />
                            ) : (
                              item.totalBiayaAktual ? `Rp ${item.totalBiayaAktual.toLocaleString('id-ID')}` : '-'
                            )}
                          </TableCell>
                          <TableCell>
                            {editingItem === item.id ? (
                              <Select value={editForm.prioritas} onValueChange={(value) => setEditForm({...editForm, prioritas: value})}>
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {prioritasOptions.map((prioritas) => (
                                    <SelectItem key={prioritas} value={prioritas}>{prioritas}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Badge className={getPriorityColor(item.prioritas)}>
                                {item.prioritas}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {editingItem === item.id ? (
                              <Select value={editForm.statusPermintaan} onValueChange={(value) => setEditForm({...editForm, statusPermintaan: value})}>
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {statusOptions.map((status) => (
                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Badge className={getStatusColor(item.statusPermintaan)}>
                                {getStatusIcon(item.statusPermintaan)}
                                <span className="ml-1">{item.statusPermintaan}</span>
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {editingItem === item.id ? (
                                <>
                                  <Button size="sm" onClick={handleSaveEdit} className="bg-emerald-600 hover:bg-emerald-700">
                                    <Save className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => setEditingItem(null)}>
                                    <X className="w-4 h-4" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rincian Tab */}
          <TabsContent value="rincian" className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">
              Rincian Kebutuhan Per Divisi
            </h2>
            
            <div className="space-y-8">
              {divisiOptions.map((divisi) => {
                const divisiPermintaan = permintaan.filter(item => item.namaDivisi === divisi)
                const colors = divisiColors[divisi as keyof typeof divisiColors]
                return (
                  <Card key={divisi} className="bg-white shadow-sm border border-gray-200">
                    <CardHeader className={`${colors.light} ${colors.border} border-l-4`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${colors.bg}`}></div>
                            Kebutuhan Divisi {divisi}
                          </CardTitle>
                          <CardDescription>
                            Total {divisiPermintaan.length} permintaan
                          </CardDescription>
                        </div>
                        <Badge className={`${colors.bg} text-white`}>
                          {divisiPermintaan.length} Items
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {divisiPermintaan.length > 0 ? (
                        <div className="max-h-64 overflow-y-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold">Tanggal</TableHead>
                                <TableHead className="font-semibold">Nama Barang</TableHead>
                                <TableHead className="font-semibold">Jumlah</TableHead>
                                <TableHead className="font-semibold">Harga</TableHead>
                                <TableHead className="font-semibold">Total</TableHead>
                                <TableHead className="font-semibold">Prioritas</TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="font-semibold">Catatan</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {divisiPermintaan.map((item) => (
                                <TableRow key={item.id} className={`hover:bg-gray-50 ${colors.hover}`}>
                                  <TableCell className="font-medium">
                                    {new Date(item.timestamp).toLocaleDateString('id-ID')}
                                  </TableCell>
                                  <TableCell>{item.namaBarang}</TableCell>
                                  <TableCell>{item.jumlahDiminta}</TableCell>
                                  <TableCell>
                                    {item.hargaSatuan ? `Rp ${item.hargaSatuan.toLocaleString('id-ID')}` : '-'}
                                  </TableCell>
                                  <TableCell>
                                    {item.totalHarga ? `Rp ${item.totalHarga.toLocaleString('id-ID')}` : '-'}
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={getPriorityColor(item.prioritas)}>
                                      {item.prioritas}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={getStatusColor(item.statusPermintaan)}>
                                      {getStatusIcon(item.statusPermintaan)}
                                      <span className="ml-1">{item.statusPermintaan}</span>
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="max-w-xs truncate">
                                    {item.catatanPerlengkapan || item.kebutuhanKhusus || '-'}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500">Belum ada permintaan untuk divisi ini</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}