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

interface DashboardStats {
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

export function StatusSummaryCard({ stats }: StatusSummaryCardProps) {
    return (
        <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-slate-600" />
                    Ringkasan Status Permintaan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(stats?.statusCounts || {}).map(([status, count]) => (
                        <div key={status} className="text-center">
                            <div
                                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(
                                    status
                                )}`}
                            >
                                {getStatusIcon(status)}
                                {status}
                            </div>
                            <div className="text-2xl font-bold mt-2 text-slate-800">
                                {count}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
