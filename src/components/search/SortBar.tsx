"use client";

import { ArrowDownUp } from "lucide-react";
import type { SortKey } from "@/lib/mock-api";
import { cn } from "@/lib/utils";

interface SortBarProps {
  value: SortKey;
  onChange: (key: SortKey) => void;
  resultCount: number;
}

const options: Array<{ key: SortKey; label: string }> = [
  { key: "cheapest", label: "Giá rẻ nhất" },
  { key: "earliest", label: "Khởi hành sớm" },
  { key: "fastest", label: "Đi nhanh nhất" },
  { key: "top-rated", label: "Đánh giá cao" },
];

// Sort control bar shown above the trip results list.
export function SortBar({ value, onChange, resultCount }: SortBarProps) {
  return (
    <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-600">
        Tìm thấy{" "}
        <span className="font-bold text-slate-900">{resultCount}</span> chuyến xe phù hợp
      </p>
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="hidden shrink-0 items-center gap-1 text-xs font-medium text-slate-400 sm:inline-flex">
          <ArrowDownUp className="h-3.5 w-3.5" />
          Sắp xếp
        </span>
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={cn(
              "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              value === opt.key
                ? "bg-brand-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
