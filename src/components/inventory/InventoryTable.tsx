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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    kondisiOptions: string[];
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
    kondisiOptions,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    onFormChange,
}: InventoryTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
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
                            {editingId === item.id ? (
                                <>
                                    <TableCell>
                                        <Input
                                            value={editForm.namaBarang}
                                            onChange={(e) =>
                                                onFormChange("namaBarang", e.target.value)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            value={editForm.kategori}
                                            onChange={(e) => onFormChange("kategori", e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            value={editForm.spesifikasi}
                                            onChange={(e) =>
                                                onFormChange("spesifikasi", e.target.value)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            value={editForm.stokTersedia}
                                            onChange={(e) =>
                                                onFormChange(
                                                    "stokTersedia",
                                                    parseInt(e.target.value) || 0
                                                )
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={editForm.kondisi}
                                            onValueChange={(value) => onFormChange("kondisi", value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {kondisiOptions.map((kondisi) => (
                                                    <SelectItem key={kondisi} value={kondisi}>
                                                        {kondisi}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>{item.namaBarang}</TableCell>
                                    <TableCell>{item.kategori}</TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {item.spesifikasi}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                item.stokTersedia > 0 ? "default" : "destructive"
                                            }
                                        >
                                            {item.stokTersedia}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                item.kondisi === "Baik" ? "default" : "secondary"
                                            }
                                        >
                                            {item.kondisi}
                                        </Badge>
                                    </TableCell>
                                </>
                            )}
                            <TableCell>
                                <div className="flex gap-2 justify-center">
                                    {editingId === item.id ? (
                                        <>
                                            <Button
                                                size="sm"
                                                onClick={onSave}
                                                className="bg-emerald-600 hover:bg-emerald-700"
                                            >
                                                <Save className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="outline" onClick={onCancel}>
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => onEdit(item)}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => onDelete(item.id)}
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
    );
}
