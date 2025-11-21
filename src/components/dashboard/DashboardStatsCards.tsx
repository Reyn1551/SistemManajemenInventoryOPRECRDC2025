import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Package, DollarSign, TrendingUp } from "lucide-react";

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

interface DashboardStatsCardsProps {
    stats: DashboardStats | null;
}

export function DashboardStatsCards({ stats }: DashboardStatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Total Item Diminta
                    </CardTitle>
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                        <Package className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-800 dark:text-white">
                        {stats?.totalItemDiminta || 0}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Items requested
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Total Estimasi Biaya
                    </CardTitle>
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                        <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-800 dark:text-white">
                        Rp {stats?.totalEstimasiBiaya.toLocaleString("id-ID") || 0}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Estimated budget
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Total Biaya Aktual
                    </CardTitle>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-slate-800 dark:text-white">
                        Rp {stats?.totalBiayaAktual.toLocaleString("id-ID") || 0}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Actual cost
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
