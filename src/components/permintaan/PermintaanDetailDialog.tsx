import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";

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

interface PermintaanDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: PermintaanItem | null;
    divisiColors: any;
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

export function PermintaanDetailDialog({
    open,
    onOpenChange,
    item,
    divisiColors,
}: PermintaanDetailDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        Detail Permintaan Barang
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 dark:text-slate-400">
                        Rincian lengkap untuk item{" "}
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {item?.namaBarang}
                        </span>{" "}
                        dari Divisi {item?.namaDivisi}.
                    </DialogDescription>
                </DialogHeader>
                {item && (
                    <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50">
                            <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-slate-400">
                                Nama Barang
                            </div>
                            <div className="col-span-2 font-semibold text-slate-800 dark:text-slate-200">
                                {item.namaBarang}
                            </div>

                            <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-slate-400">
                                Divisi
                            </div>
                            <div className="col-span-2">
                                <Badge
                                    className={`${divisiColors[item.namaDivisi as keyof typeof divisiColors]?.bg
                                        } text-white border-0`}
                                >
                                    {item.namaDivisi}
                                </Badge>
                            </div>

                            <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-slate-400">
                                Jumlah
                            </div>
                            <div className="col-span-2 font-semibold text-slate-800 dark:text-slate-200">
                                {item.jumlahDiminta} unit
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-x-4 gap-y-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-slate-400">
                                Prioritas
                            </div>
                            <div className="col-span-2">
                                <Badge className={getPriorityColor(item.prioritas)}>
                                    {item.prioritas}
                                </Badge>
                            </div>

                            <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-slate-400">
                                Status
                            </div>
                            <div className="col-span-2">
                                <Badge className={getStatusColor(item.statusPermintaan)}>
                                    {getStatusIcon(item.statusPermintaan)}
                                    <span className="ml-1">{item.statusPermintaan}</span>
                                </Badge>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-x-4 gap-y-2 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50">
                            <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-slate-400">
                                Estimasi Harga
                            </div>
                            <div className="col-span-2 font-semibold text-slate-800 dark:text-slate-200">
                                {item.totalHarga
                                    ? `Rp ${item.totalHarga.toLocaleString("id-ID")}`
                                    : "-"}
                            </div>

                            <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-slate-400">
                                Biaya Aktual
                            </div>
                            <div className="col-span-2 font-semibold text-emerald-600 dark:text-emerald-400">
                                {item.totalBiayaAktual
                                    ? `Rp ${item.totalBiayaAktual.toLocaleString("id-ID")}`
                                    : "Belum diisi"}
                            </div>
                        </div>

                        <div className="space-y-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-slate-400">
                                    Kebutuhan Khusus
                                </Label>
                                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 p-2 bg-gray-50 dark:bg-slate-800/50 rounded-md min-h-[40px]">
                                    {item.kebutuhanKhusus || "-"}
                                </p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-gray-500 dark:text-slate-400">
                                    Catatan dari Perlengkapan
                                </Label>
                                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 p-2 bg-gray-50 dark:bg-slate-800/50 rounded-md min-h-[40px]">
                                    {item.catatanPerlengkapan || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="text-xs text-center text-gray-400 dark:text-slate-500 pt-2">
                            Diajukan pada:{" "}
                            {new Date(item.timestamp).toLocaleString("id-ID", {
                                dateStyle: "full",
                                timeStyle: "short",
                            })}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
