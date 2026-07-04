import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "success" | "danger";

const toneClass: Record<Tone, { bg: string; text: string }> = {
  brand: { bg: "bg-brand-50", text: "text-brand-600" },
  accent: { bg: "bg-accent-50", text: "text-accent-600" },
  success: { bg: "bg-emerald-50", text: "text-emerald-600" },
  danger: { bg: "bg-rose-50", text: "text-rose-600" },
};

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: Tone;
  delta?: number; // percentage change; sign drives arrow direction
  hint?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "brand",
  delta,
  hint,
}: StatCardProps) {
  const colors = toneClass[tone];
  const positive = (delta ?? 0) >= 0;

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            colors.bg,
            colors.text,
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        {delta != null && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
              positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600",
            )}
          >
            {positive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
