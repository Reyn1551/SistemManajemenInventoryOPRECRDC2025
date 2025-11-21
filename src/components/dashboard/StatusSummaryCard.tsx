import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    BarChart3,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface StatusSummaryCardProps {
    stats: DashboardStats | null;
}

export function StatusSummaryCard({ stats }: StatusSummaryCardProps) {
    return (
        <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white">
                    <BarChart3 className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    Ringkasan Status Permintaan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="flex flex-col items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <Badge
                            variant="secondary"
                            className="mb-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                        >
                            <Clock className="w-3 h-3 mr-1" /> Diajukan
                        </Badge>
                        <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                            {stats?.statusCounts["Diajukan"] || 0}
                        </span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <Badge
                            variant="secondary"
                            className="mb-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50"
                        >
                            <CheckCircle className="w-3 h-3 mr-1" /> Disetujui Perlengkapan
                        </Badge>
                        <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                            {stats?.statusCounts["Disetujui Perlengkapan"] || 0}
                        </span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <Badge
                            variant="secondary"
                            className="mb-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50"
                        >
                            <AlertCircle className="w-3 h-3 mr-1" /> Sedang Diproses
                        </Badge>
                        <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                            {stats?.statusCounts["Sedang Diproses"] || 0}
                        </span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <Badge
                            variant="secondary"
                            className="mb-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50"
                        >
                            <CheckCircle className="w-3 h-3 mr-1" /> Selesai
                        </Badge>
                        <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                            {stats?.statusCounts["Selesai"] || 0}
                        </span>
                    </div>
                    <div className="flex flex-col items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <Badge
                            variant="secondary"
                            className="mb-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50"
                        >
                            <XCircle className="w-3 h-3 mr-1" /> Ditolak
                        </Badge>
                        <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                            {stats?.statusCounts["Ditolak"] || 0}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
