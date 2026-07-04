import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardProps = ComponentProps<"div"> & {
  hover?: boolean;
};

export function Card({ className, hover, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white shadow-card",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        className,
      )}
      {...props}
    />
  );
}
