import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit2, Save, Trash2, X } from "lucide-react";

interface InventoryItem {
    id: string;
    namaBarang: string;
    kategori: string;
    spesifikasi?: string;
    stokTersedia: number;
    kondisi: string;
}

interface InventoryTableProps {
    inventory: InventoryItem[];
    editingId: string | null;
    editForm: Partial<InventoryItem>;
    onEdit: (item: InventoryItem) => void;
    onDelete: (id: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onFormChange: (field: keyof InventoryItem, value: any) => void;
}

export function InventoryTable({
    inventory,
    editingId,
    editForm,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    onFormChange,
}: InventoryTableProps) {
    return (
        <div className="bg-white dark:bg-gray-950/90 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-gray-50 dark:bg-gray-800/80">
                        <TableRow>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Nama Barang</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Kategori</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Spesifikasi</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Stok</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Kondisi</TableHead>
                            <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventory.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-8 text-slate-500 dark:text-slate-400"
                                >
                                    Tidak ada data inventory.
                                </TableCell>
                            </TableRow>
                        ) : (
                            inventory.map((item) => (
                                <TableRow key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700">
                                    <TableCell className="font-medium text-slate-800 dark:text-slate-200">
                                        {editingId === item.id ? (
                                            <Input
                                                value={editForm.namaBarang}
                                                onChange={(e) =>
                                                    onFormChange("namaBarang", e.target.value)
                                                }
                                                className="w-full bg-white dark:bg-gray-900/90 border-slate-300 dark:border-slate-600"
                                            />
                                        ) : (
                                            item.namaBarang
                                        )}
                                    </TableCell>
                                    <TableCell className="text-slate-600 dark:text-slate-300">
                                        {editingId === item.id ? (
                                            <Input
                                                value={editForm.kategori}
                                                onChange={(e) =>
                                                    onFormChange("kategori", e.target.value)
                                                }
                                                className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                                            />
                                        ) : (
                                            <Badge variant="outline" className="dark:border-slate-600 dark:text-slate-300">
                                                {item.kategori}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-slate-600 dark:text-slate-300">
                                        {editingId === item.id ? (
                                            <Input
                                                value={editForm.spesifikasi || ""}
                                                onChange={(e) =>
                                                    onFormChange("spesifikasi", e.target.value)
                                                }
                                                className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                                            />
                                        ) : (
                                            item.spesifikasi || "-"
                                        )}
                                    </TableCell>
                                    <TableCell className="text-slate-600 dark:text-slate-300">
                                        {editingId === item.id ? (
                                            <Input
                                                type="number"
                                                value={editForm.stokTersedia}
                                                onChange={(e) =>
                                                    onFormChange(
                                                        "stokTersedia",
                                                        parseInt(e.target.value) || 0
                                                    )
                                                }
                                                className="w-20 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                                            />
                                        ) : (
                                            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                                                {item.stokTersedia}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-slate-600 dark:text-slate-300">
                                        {editingId === item.id ? (
                                            <Input
                                                value={editForm.kondisi}
                                                onChange={(e) =>
                                                    onFormChange("kondisi", e.target.value)
                                                }
                                                className="w-full bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                                            />
                                        ) : (
                                            <Badge className={item.kondisi === "Baik" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200"}>
                                                {item.kondisi}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {editingId === item.id ? (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        onClick={onSave}
                                                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="outline" onClick={onCancel} className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => onEdit(item)}
                                                        className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => onDelete(item.id)}
                                                        className="h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
