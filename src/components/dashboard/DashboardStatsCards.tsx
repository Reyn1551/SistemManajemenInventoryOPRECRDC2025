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
}

interface DashboardStatsCardsProps {
    stats: DashboardStats | null;
}

export function DashboardStatsCards({ stats }: DashboardStatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Total Item Diminta
                    </CardTitle>
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <Package className="h-4 w-4 text-slate-600" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-slate-800">
                        {stats?.totalItemDiminta || 0}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Items requested</p>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Total Estimasi Biaya
                    </CardTitle>
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <DollarSign className="h-4 w-4 text-emerald-600" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-slate-800">
                        Rp {stats?.totalEstimasiBiaya.toLocaleString("id-ID") || 0}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Estimated budget</p>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Total Biaya Aktual
                    </CardTitle>
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-slate-800">
                        Rp {stats?.totalBiayaAktual.toLocaleString("id-ID") || 0}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Actual cost</p>
                </CardContent>
            </Card>
        </div>
    );
}
