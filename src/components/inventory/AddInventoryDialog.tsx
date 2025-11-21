import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface NewInventoryItem {
    namaBarang: string;
    kategori: string;
    spesifikasi: string;
    stokTersedia: number;
    kondisi: string;
}

interface AddInventoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    newItem: NewInventoryItem;
    kondisiOptions: string[];
    onFormChange: (field: keyof NewInventoryItem, value: any) => void;
    onSubmit: () => void;
}

export function AddInventoryDialog({
    open,
    onOpenChange,
    newItem,
    kondisiOptions,
    onFormChange,
    onSubmit,
}: AddInventoryDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-slate-700 hover:bg-slate-800 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Item
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="text-slate-800 dark:text-slate-100">
                        Tambah Item Inventory
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                        Tambahkan item baru ke database inventory
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                        <Label htmlFor="kategori" className="text-right dark:text-slate-300">
                            Kategori
                        </Label>
                        <Input
                            id="kategori"
                            value={newItem.kategori}
                            onChange={(e) => onFormChange("kategori", e.target.value)}
                            className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="spesifikasi" className="text-right dark:text-slate-300">
                            Spesifikasi
                        </Label>
                        <Input
                            id="spesifikasi"
                            value={newItem.spesifikasi}
                            onChange={(e) => onFormChange("spesifikasi", e.target.value)}
                            className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stokTersedia" className="text-right dark:text-slate-300">
                            Stok
                        </Label>
                        <Input
                            id="stokTersedia"
                            type="number"
                            value={newItem.stokTersedia}
                            onChange={(e) =>
                                onFormChange("stokTersedia", parseInt(e.target.value) || 0)
                            }
                            className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="kondisi" className="text-right dark:text-slate-300">
                            Kondisi
                        </Label>
                        <Select
                            value={newItem.kondisi}
                            onValueChange={(value) => onFormChange("kondisi", value)}
                        >
                            <SelectTrigger className="col-span-3 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                                <SelectValue placeholder="Pilih kondisi" />
                            </SelectTrigger>
                            <SelectContent>
                                {kondisiOptions.map((kondisi) => (
                                    <SelectItem key={kondisi} value={kondisi}>
                                        {kondisi}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                        Batal
                    </Button>
                    <Button
                        onClick={onSubmit}
                        className="bg-slate-700 hover:bg-slate-800"
                    >
                        Simpan
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
