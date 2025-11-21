import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FilterX } from "lucide-react";

interface InventoryFiltersProps {
    filters: {
        kategori: string;
        kondisi: string;
        search: string;
    };
    kondisiOptions: string[];
    onFilterChange: (key: string, value: string) => void;
    onReset: () => void;
}

export function InventoryFilters({
    filters,
    kondisiOptions,
    onFilterChange,
    onReset,
}: InventoryFiltersProps) {
    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
                <Input
                    placeholder="Cari nama barang..."
                    value={filters.search}
                    onChange={(e) => onFilterChange("search", e.target.value)}
                    className="flex-grow min-w-[200px]"
                />
                <Input
                    placeholder="Cari kategori..."
                    value={filters.kategori}
                    onChange={(e) => onFilterChange("kategori", e.target.value)}
                    className="flex-grow min-w-[200px]"
                />
                <Select
                    value={filters.kondisi}
                    onValueChange={(value) => onFilterChange("kondisi", value)}
                >
                    <SelectTrigger className="flex-grow min-w-[200px]">
                        <SelectValue placeholder="Filter Kondisi" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Semua">Semua Kondisi</SelectItem>
                        {kondisiOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button variant="outline" onClick={onReset}>
                    <FilterX className="w-4 h-4 mr-2" />
                    Reset Filter
                </Button>
            </div>
        </div>
    );
}
