import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

interface NewPermintaanItem {
    namaDivisi: string;
    namaBarang: string;
    jumlahDiminta: number;
    hargaSatuan: number;
    totalHarga: number;
    prioritas: string;
    kebutuhanKhusus: string;
    diperlukanPada: string;
    statusPermintaan: string;
    catatanPerlengkapan: string;
}

interface AddPermintaanDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    newItem: NewPermintaanItem;
    divisiOptions: string[];
    prioritasOptions: string[];
    statusOptions: string[];
    divisiColors: any;
    onFormChange: (field: keyof NewPermintaanItem, value: any) => void;
    onSubmit: () => void;
}

export function AddPermintaanDialog({
    open,
    onOpenChange,
    newItem,
    divisiOptions,
    prioritasOptions,
    statusOptions,
    divisiColors,
    onFormChange,
    onSubmit,
}: AddPermintaanDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Permintaan
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="text-slate-800 dark:text-slate-100">
                        Tambah Permintaan Baru
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                        Isi form permintaan barang baru
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="namaDivisi" className="text-right dark:text-slate-300">
                            Divisi
                        </Label>
                        <Select
                            value={newItem.namaDivisi}
                            onValueChange={(value) => onFormChange("namaDivisi", value)}
                        >
                            <SelectTrigger className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                                <SelectValue placeholder="Pilih divisi" />
                            </SelectTrigger>
                            <SelectContent>
                                {divisiOptions.map((divisi) => (
                                    <SelectItem key={divisi} value={divisi}>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-3 h-3 rounded-full ${divisiColors[divisi as keyof typeof divisiColors]?.bg
                                                    }`}
                                            ></div>
                                            {divisi}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="namaBarang" className="text-right dark:text-slate-300">
                            Nama Barang
                        </Label>
                        <Input
                            id="namaBarang"
                            value={newItem.namaBarang}
                            onChange={(e) => onFormChange("namaBarang", e.target.value)}
                            className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="jumlahDiminta" className="text-right dark:text-slate-300">
                            Jumlah
                        </Label>
                        <Input
                            id="jumlahDiminta"
                            type="number"
                            value={newItem.jumlahDiminta}
                            onChange={(e) =>
                                onFormChange("jumlahDiminta", parseInt(e.target.value) || 0)
                            }
                            className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="hargaSatuan" className="text-right dark:text-slate-300">
                            Harga Satuan
                        </Label>
                        <Input
                            id="hargaSatuan"
                            type="number"
                            value={newItem.hargaSatuan}
                            onChange={(e) =>
                                onFormChange("hargaSatuan", parseFloat(e.target.value) || 0)
                            }
                            className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="totalHarga" className="text-right dark:text-slate-300">
                            Total Harga
                        </Label>
                        <Input
                            id="totalHarga"
                            type="number"
                            value={newItem.totalHarga}
                            readOnly
                            className="col-span-3 bg-gray-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="prioritas" className="text-right dark:text-slate-300">
                            Prioritas
                        </Label>
                        <Select
                            value={newItem.prioritas}
                            onValueChange={(value) => onFormChange("prioritas", value)}
                        >
                            <SelectTrigger className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                                <SelectValue placeholder="Pilih prioritas" />
                            </SelectTrigger>
                            <SelectContent>
                                {prioritasOptions.map((prioritas) => (
                                    <SelectItem key={prioritas} value={prioritas}>
                                        {prioritas}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="kebutuhanKhusus" className="text-right dark:text-slate-300">
                            Kebutuhan Khusus
                        </Label>
                        <Textarea
                            id="kebutuhanKhusus"
                            value={newItem.kebutuhanKhusus}
                            onChange={(e) => onFormChange("kebutuhanKhusus", e.target.value)}
                            className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                            rows={2}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="diperlukanPada" className="text-right dark:text-slate-300">
                            Diperlukan Pada
                        </Label>
                        <Input
                            id="diperlukanPada"
                            type="date"
                            value={newItem.diperlukanPada}
                            onChange={(e) => onFormChange("diperlukanPada", e.target.value)}
                            className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="statusPermintaan" className="text-right dark:text-slate-300">
                            Status
                        </Label>
                        <Select
                            value={newItem.statusPermintaan}
                            onValueChange={(value) => onFormChange("statusPermintaan", value)}
                        >
                            <SelectTrigger className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                                <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="catatanPerlengkapan" className="text-right dark:text-slate-300">
                            Catatan
                        </Label>
                        <Textarea
                            id="catatanPerlengkapan"
                            value={newItem.catatanPerlengkapan}
                            onChange={(e) =>
                                onFormChange("catatanPerlengkapan", e.target.value)
                            }
                            className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                            rows={2}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                        Batal
                    </Button>
                    <Button
                        onClick={onSubmit}
                        className="bg-emerald-700 hover:bg-emerald-800"
                    >
                        Simpan
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
