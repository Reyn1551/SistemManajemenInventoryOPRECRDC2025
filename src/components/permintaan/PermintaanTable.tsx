import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit2,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

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

// Props for the PermintaanTable component
interface PermintaanTableProps {
  permintaan: PermintaanItem[];
  divisiColors: any;
  onEdit: (item: PermintaanItem) => void;
  onDelete: (id: string) => void;
  onRincianClick: (item: PermintaanItem) => void;
  isReadOnly?: boolean;
  prioritasOptions: string[];
  statusOptions: string[];
}

// Helper function to determine badge color based on priority
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Sangat Tinggi":
      return "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
    case "Tinggi":
      return "bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800";
    case "Sedang":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
    case "Rendah":
      return "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
  }
};

// Helper function to determine badge color based on status
const getStatusColor = (status: string) => {
  switch (status) {
    case "Diajukan":
      return "bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
    case "Disetujui Perlengkapan":
      return "bg-indigo-100 text-indigo-800 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800";
    case "Sedang Diproses":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
    case "Selesai":
      return "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
    case "Ditolak":
      return "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
  }
};

// Helper function to get an icon based on status
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
  divisiColors,
  onEdit,
  onDelete,
  onRincianClick,
  isReadOnly = false,
}: PermintaanTableProps) {
  return (
    <div className="bg-white dark:bg-gray-950/90 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800/80">
            <TableRow>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Timestamp
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Divisi
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Nama Barang
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Jumlah
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Harga
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Total
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Biaya Aktual
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Prioritas
              </TableHead>
              <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                Status
              </TableHead>
              {!isReadOnly && (
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Aksi
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {permintaan.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isReadOnly ? 9 : 10}
                  className="text-center py-8 text-slate-500 dark:text-slate-400"
                >
                  Tidak ada data permintaan.
                </TableCell>
              </TableRow>
            ) : (
              permintaan.map((item) => (
                <TableRow
                  key={item.id}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700 ${isReadOnly ? "cursor-pointer" : "cursor-default"}`}
                  onClick={() => onRincianClick(item)}
                >
                  <TableCell className="font-medium text-slate-800 dark:text-slate-200">
                    {new Date(item.timestamp).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${divisiColors[item.namaDivisi as keyof typeof divisiColors]?.bg} text-white`}
                    >
                      {item.namaDivisi}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-800 dark:text-slate-200">
                    {item.namaBarang}
                  </TableCell>
                  <TableCell className="text-slate-800 dark:text-slate-200">
                    {item.jumlahDiminta}
                  </TableCell>
                  <TableCell className="text-slate-800 dark:text-slate-200">
                    {item.hargaSatuan
                      ? `Rp ${item.hargaSatuan.toLocaleString("id-ID")}`
                      : "-"}
                  </TableCell>
                  <TableCell className="text-slate-800 dark:text-slate-200">
                    {item.totalHarga
                      ? `Rp ${item.totalHarga.toLocaleString("id-ID")}`
                      : "-"}
                  </TableCell>
                  <TableCell className="text-slate-800 dark:text-slate-200">
                    {item.totalBiayaAktual
                      ? `Rp ${item.totalBiayaAktual.toLocaleString("id-ID")}`
                      : "-"}
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
                  {!isReadOnly && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                          }}
                          className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item.id);
                          }}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:border-slate-600 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
