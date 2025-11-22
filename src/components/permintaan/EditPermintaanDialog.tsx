import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Interface for a single request item
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

// Props for the EditPermintaanDialog component
interface EditPermintaanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Partial<PermintaanItem> | null;
  onFormChange: (field: keyof PermintaanItem, value: any) => void;
  onSave: () => void;
  prioritasOptions: string[];
  statusOptions: string[];
  divisiOptions: string[];
}

export function EditPermintaanDialog({
  open,
  onOpenChange,
  item,
  onFormChange,
  onSave,
  prioritasOptions,
  statusOptions,
  divisiOptions,
}: EditPermintaanDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Edit Permintaan Barang
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            Ubah rincian untuk item{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {item.namaBarang}
            </span>
            . Klik simpan jika sudah selesai.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="space-y-2">
              <Label htmlFor="namaBarang">Nama Barang</Label>
              <Input
                id="namaBarang"
                value={item.namaBarang || ""}
                onChange={(e) => onFormChange("namaBarang", e.target.value)}
                className="bg-white dark:bg-gray-900/90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="namaDivisi">Divisi</Label>
              <Select
                value={item.namaDivisi || ""}
                onValueChange={(value) => onFormChange("namaDivisi", value)}
              >
                <SelectTrigger
                  id="namaDivisi"
                  className="bg-white dark:bg-gray-900/90"
                >
                  <SelectValue placeholder="Pilih Divisi" />
                </SelectTrigger>
                <SelectContent>
                  {divisiOptions.map((divisi) => (
                    <SelectItem key={divisi} value={divisi}>
                      {divisi}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 2: Quantity and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="space-y-2">
              <Label htmlFor="jumlahDiminta">Jumlah Diminta</Label>
              <Input
                id="jumlahDiminta"
                type="number"
                value={item.jumlahDiminta || 0}
                onChange={(e) =>
                  onFormChange(
                    "jumlahDiminta",
                    parseInt(e.target.value, 10) || 0,
                  )
                }
                className="bg-white dark:bg-gray-900/90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hargaSatuan">Harga Satuan</Label>
              <Input
                id="hargaSatuan"
                type="number"
                value={item.hargaSatuan || 0}
                onChange={(e) =>
                  onFormChange("hargaSatuan", parseFloat(e.target.value) || 0)
                }
                className="bg-white dark:bg-gray-900/90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalHarga">Total Estimasi</Label>
              <Input
                id="totalHarga"
                type="number"
                value={item.totalHarga || 0}
                disabled
                className="bg-slate-100 dark:bg-slate-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalBiayaAktual">Biaya Aktual</Label>
              <Input
                id="totalBiayaAktual"
                type="number"
                value={item.totalBiayaAktual || 0}
                onChange={(e) =>
                  onFormChange(
                    "totalBiayaAktual",
                    parseFloat(e.target.value) || 0,
                  )
                }
                className="bg-white dark:bg-gray-900/90"
              />
            </div>
          </div>

          {/* Section 3: Status and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="space-y-2">
              <Label htmlFor="prioritas">Prioritas</Label>
              <Select
                value={item.prioritas || ""}
                onValueChange={(value) => onFormChange("prioritas", value)}
              >
                <SelectTrigger
                  id="prioritas"
                  className="bg-white dark:bg-gray-900/90"
                >
                  <SelectValue placeholder="Pilih Prioritas" />
                </SelectTrigger>
                <SelectContent>
                  {prioritasOptions.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="statusPermintaan">Status Permintaan</Label>
              <Select
                value={item.statusPermintaan || ""}
                onValueChange={(value) =>
                  onFormChange("statusPermintaan", value)
                }
              >
                <SelectTrigger
                  id="statusPermintaan"
                  className="bg-white dark:bg-gray-900/90"
                >
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 4: Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="space-y-2">
              <Label htmlFor="kebutuhanKhusus">Kebutuhan Khusus</Label>
              <Textarea
                id="kebutuhanKhusus"
                value={item.kebutuhanKhusus || ""}
                onChange={(e) =>
                  onFormChange("kebutuhanKhusus", e.target.value)
                }
                placeholder="cth: Merek tertentu, ukuran, warna, dll."
                className="bg-white dark:bg-gray-900/90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catatanPerlengkapan">
                Catatan dari Perlengkapan
              </Label>
              <Textarea
                id="catatanPerlengkapan"
                value={item.catatanPerlengkapan || ""}
                onChange={(e) =>
                  onFormChange("catatanPerlengkapan", e.target.value)
                }
                placeholder="Catatan dari tim perlengkapan"
                className="bg-white dark:bg-gray-900/90"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            onClick={onSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
