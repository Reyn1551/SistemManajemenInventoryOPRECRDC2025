import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FilterX, FileDown } from "lucide-react";

interface PermintaanFiltersProps {
    filters: {
        divisi: string;
        prioritas: string;
        status: string;
        search: string;
    };
    divisiOptions: string[];
    prioritasOptions: string[];
    statusOptions: string[];
    onFilterChange: (key: string, value: string) => void;
    onReset: () => void;
    onExport: () => void;
}

export function PermintaanFilters({
    filters,
    divisiOptions,
    prioritasOptions,
    statusOptions,
    onFilterChange,
    onReset,
    onExport,
}: PermintaanFiltersProps) {
    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
                <Input
                    placeholder="Cari nama barang..."
                    value={filters.search}
                    onChange={(e) => onFilterChange("search", e.target.value)}
                    className="flex-1 basis-full sm:basis-1/4"
                />

                <Select
                    value={filters.divisi}
                    onValueChange={(value) => onFilterChange("divisi", value)}
                >
                    <SelectTrigger className="flex-1 basis-full sm:basis-1/5">
                        <SelectValue placeholder="Filter Divisi" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Semua">Semua Divisi</SelectItem>
                        {divisiOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={filters.prioritas}
                    onValueChange={(value) => onFilterChange("prioritas", value)}
                >
                    <SelectTrigger className="flex-1 basis-full sm:basis-1/5">
                        <SelectValue placeholder="Filter Prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Semua">Semua Prioritas</SelectItem>
                        {prioritasOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={filters.status}
                    onValueChange={(value) => onFilterChange("status", value)}
                >
                    <SelectTrigger className="flex-1 basis-full sm:basis-1/5">
                        <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Semua">Semua Status</SelectItem>
                        {statusOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex-1 basis-full sm:basis-auto flex gap-2">
                    <Button
                        variant="outline"
                        onClick={onReset}
                        className="flex-1"
                    >
                        <FilterX className="w-4 h-4 mr-2" />
                        Reset
                    </Button>

                    <Button
                        onClick={onExport}
                        className="flex-1 bg-emerald-700 hover:bg-emerald-800"
                    >
                        <FileDown className="w-4 h-4 mr-2" />
                        Ekspor
                    </Button>
                </div>
            </div>
        </div>
    );
}
