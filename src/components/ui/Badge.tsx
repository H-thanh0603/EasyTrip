import type { ReactNode } from "react";
import type { BookingStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tone = "brand" | "accent" | "success" | "warning" | "danger" | "neutral";

const toneClass: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
  accent: "bg-accent-50 text-accent-700 ring-1 ring-accent-100",
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  danger: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
  neutral: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

type BadgeProps = {
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusConfig: Record<BookingStatus, { label: string; tone: Tone }> = {
  pending: { label: "Chờ thanh toán", tone: "warning" },
  confirmed: { label: "Đã xác nhận", tone: "success" },
  cancelled: { label: "Đã hủy", tone: "danger" },
  completed: { label: "Hoàn thành", tone: "brand" },
};

type StatusBadgeProps = {
  status: BookingStatus;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  return (
    <Badge tone={cfg.tone} className={className}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {cfg.label}
    </Badge>
  );
}
