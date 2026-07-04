import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  containerClassName?: string;
};

export function Input({
  label,
  error,
  icon,
  id,
  className,
  containerClassName,
  ...props
}: InputProps) {
  return (
    <div className={cn("w-full", containerClassName)}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2",
            icon && "pl-11",
            error
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-slate-300 focus:border-brand-500 focus:ring-brand-500/20",
            className,
          )}
          aria-invalid={error ? true : undefined}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-rose-600">{error}</p>}
    </div>
  );
}

type TextareaProps = ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
};

export function Textarea({ label, error, id, className, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-rose-600">{error}</p>}
    </div>
  );
}
