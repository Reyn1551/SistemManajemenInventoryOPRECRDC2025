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
import { Edit2, Save, Trash2, X, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";

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

interface PermintaanTableProps {
    permintaan: PermintaanItem[];
    editingId: string | null;
    editForm: Partial<PermintaanItem>;
    prioritasOptions: string[];
    statusOptions: string[];
    divisiColors: any;
    onEdit: (item: PermintaanItem) => void;
    onDelete: (id: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onFormChange: (field: keyof PermintaanItem, value: any) => void;
    onRincianClick: (item: PermintaanItem) => void;
}

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "Sangat Tinggi":
            return "bg-red-100 text-red-800 border border-red-200";
        case "Tinggi":
            return "bg-orange-100 text-orange-800 border border-orange-200";
        case "Sedang":
            return "bg-yellow-100 text-yellow-800 border border-yellow-200";
        case "Rendah":
            return "bg-green-100 text-green-800 border border-green-200";
        default:
            return "bg-gray-100 text-gray-800 border border-gray-200";
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "Diajukan":
            return "bg-blue-100 text-blue-800 border border-blue-200";
        case "Disetujui Perlengkapan":
            return "bg-indigo-100 text-indigo-800 border border-indigo-200";
        case "Sedang Diproses":
            return "bg-yellow-100 text-yellow-800 border border-yellow-200";
        case "Selesai":
            return "bg-green-100 text-green-800 border border-green-200";
        case "Ditolak":
            return "bg-red-100 text-red-800 border border-red-200";
        default:
            return "bg-gray-100 text-gray-800 border border-gray-200";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "Diajukan":
            return <Clock className="w-4 h-4" />;
        case "Disetujui Perlengkapan":
            return <CheckCircle className="w-4 h-4" />;
        case "Sedang Diproses":
            return <AlertCircle className="w-4 h-4" />;
        case "Selesai":
            return <CheckCircle className="w-4 h-4" />;
        case "Ditolak":
            return <XCircle className="w-4 h-4" />;
        default:
            return <Clock className="w-4 h-4" />;
    }
};

export function PermintaanTable({
    permintaan,
    editingId,
    editForm,
    prioritasOptions,
    statusOptions,
    divisiColors,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    onFormChange,
    onRincianClick,
}: PermintaanTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
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
                        <TableRow
                            key={item.id}
                            className={`hover:bg-gray-50 ${divisiColors[item.namaDivisi as keyof typeof divisiColors]?.hover
                                }`}
                        >
                            <TableCell className="font-medium">
                                {new Date(item.timestamp).toLocaleDateString("id-ID")}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    className={`${divisiColors[item.namaDivisi as keyof typeof divisiColors]?.bg
                                        } text-white`}
                                >
                                    {item.namaDivisi}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {editingId === item.id ? (
                                    <Input
                                        value={editForm.namaBarang}
                                        onChange={(e) => onFormChange("namaBarang", e.target.value)}
                                        className="w-full"
                                    />
                                ) : (
                                    item.namaBarang
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === item.id ? (
                                    <Input
                                        type="number"
                                        value={editForm.jumlahDiminta}
                                        onChange={(e) =>
                                            onFormChange("jumlahDiminta", parseInt(e.target.value) || 0)
                                        }
                                        className="w-full"
                                    />
                                ) : (
                                    item.jumlahDiminta
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === item.id ? (
                                    <Input
                                        type="number"
                                        value={editForm.hargaSatuan}
                                        onChange={(e) =>
                                            onFormChange("hargaSatuan", parseFloat(e.target.value) || 0)
                                        }
                                        className="w-full"
                                    />
                                ) : item.hargaSatuan ? (
                                    `Rp ${item.hargaSatuan.toLocaleString("id-ID")}`
                                ) : (
                                    "-"
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === item.id ? (
                                    <Input
                                        type="number"
                                        value={editForm.totalHarga}
                                        onChange={(e) =>
                                            onFormChange("totalHarga", parseFloat(e.target.value) || 0)
                                        }
                                        className="w-full"
                                    />
                                ) : item.totalHarga ? (
                                    `Rp ${item.totalHarga.toLocaleString("id-ID")}`
                                ) : (
                                    "-"
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === item.id ? (
                                    <Input
                                        type="number"
                                        placeholder="Masukkan biaya riil"
                                        value={editForm.totalBiayaAktual || ""}
                                        onChange={(e) =>
                                            onFormChange(
                                                "totalBiayaAktual",
                                                parseFloat(e.target.value) || 0
                                            )
                                        }
                                        className="w-full"
                                    />
                                ) : item.totalBiayaAktual ? (
                                    `Rp ${item.totalBiayaAktual.toLocaleString("id-ID")}`
                                ) : (
                                    "-"
                                )}
                            </TableCell>
                            <TableCell>
                                {editingId === item.id ? (
                                    <Select
                                        value={editForm.prioritas}
                                        onValueChange={(value) => onFormChange("prioritas", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {prioritasOptions.map((prioritas) => (
                                                <SelectItem key={prioritas} value={prioritas}>
                                                    {prioritas}
                                                </SelectItem>
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
                                {editingId === item.id ? (
                                    <Select
                                        value={editForm.statusPermintaan}
                                        onValueChange={(value) =>
                                            onFormChange("statusPermintaan", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions.map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
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
                                                className="text-red-600 hover:text-red-700"
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
