import { cn } from "@/lib/utils";

// Shimmer skeleton block used across loading states.
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-slate-200/70",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer",
        "before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent",
        className,
      )}
    />
  );
}

// Skeleton card matching the trip result layout.
export function TripCardSkeleton() {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-px w-24" />
        <div className="space-y-2 text-right">
          <Skeleton className="ml-auto h-5 w-16" />
          <Skeleton className="ml-auto h-3 w-24" />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
    </div>
  );
}

// Full loading view: a short label plus a stack of trip skeletons.
export function LoadingState({ label }: { label?: string }) {
  return (
    <div className="space-y-4">
      {label && (
        <p className="flex items-center gap-2 text-sm text-slate-500">
          <Spinner className="h-4 w-4 text-brand-600" />
          {label}
        </p>
      )}
      {[0, 1, 2].map((i) => (
        <TripCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Inline spinner for buttons / small areas.
export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      )}
      role="status"
      aria-label="Đang tải"
    />
  );
}
