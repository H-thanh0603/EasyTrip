"use client";

import type { Seat } from "@/lib/types";
import { formatVND } from "@/lib/format";
import { cn } from "@/lib/utils";

interface SeatMapProps {
  seats: Seat[];
  selected: string[];
  onToggle: (label: string) => void;
  hasUpperDeck: boolean;
}

type VisualStatus = "available" | "booked" | "selected" | "vip";

function visualStatus(seat: Seat, isSelected: boolean): VisualStatus {
  if (seat.status === "booked") return "booked";
  if (isSelected) return "selected";
  if (seat.status === "vip") return "vip";
  return "available";
}

const seatClass: Record<VisualStatus, string> = {
  available:
    "border-slate-300 bg-white text-slate-500 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 cursor-pointer",
  selected:
    "border-brand-600 bg-brand-600 text-white shadow-md scale-105 cursor-pointer",
  vip: "border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-500 hover:bg-amber-100 cursor-pointer",
  booked: "border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed",
};

// Renders one deck of seats as a grid with a center aisle.
function Deck({
  seats,
  deckLabel,
  selected,
  onToggle,
}: {
  seats: Seat[];
  deckLabel?: string;
  selected: string[];
  onToggle: (label: string) => void;
}) {
  if (!seats.length) return null;
  const rows = Math.max(...seats.map((s) => s.row));
  const cols = Math.max(...seats.map((s) => s.col)) + 1;
  // Aisle after the first half of columns (e.g. 2+2 -> aisle after col index 1).
  const aisleAfter = Math.floor(cols / 2) - 1;

  return (
    <div className="flex-1">
      {deckLabel && (
        <p className="mb-3 text-center text-sm font-semibold text-slate-500">
          {deckLabel}
        </p>
      )}
      <div className="mx-auto w-fit rounded-2xl border border-slate-200 bg-slate-50 p-4">
        {/* Driver row indicator */}
        <div className="mb-3 flex justify-end">
          <span className="rounded-md bg-slate-200 px-2 py-1 text-xs font-medium text-slate-500">
            Tài xế
          </span>
        </div>
        <div className="space-y-2">
          {Array.from({ length: rows }, (_, rIdx) => {
            const row = rIdx + 1;
            const rowSeats = seats
              .filter((s) => s.row === row)
              .sort((a, b) => a.col - b.col);
            return (
              <div key={row} className="flex items-center gap-2">
                {rowSeats.map((seat) => {
                  const isSelected = selected.includes(seat.label);
                  const vs = visualStatus(seat, isSelected);
                  const disabled = seat.status === "booked";
                  return (
                    <div key={seat.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => onToggle(seat.label)}
                        title={
                          disabled
                            ? `Ghế ${seat.label} đã được đặt`
                            : `Ghế ${seat.label}`
                        }
                        aria-label={`Ghế ${seat.label}`}
                        aria-pressed={isSelected}
                        className={cn(
                          "flex h-11 w-11 flex-col items-center justify-center rounded-lg border-2 text-xs font-bold transition-all",
                          seatClass[vs],
                        )}
                      >
                        {seat.label}
                      </button>
                      {seat.col === aisleAfter && <span className="w-5" />}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SeatMap({ seats, selected, onToggle, hasUpperDeck }: SeatMapProps) {
  const lower = seats.filter((s) => s.deck === "lower");
  const upper = seats.filter((s) => s.deck === "upper");

  const vipPrice = seats.find((s) => s.status === "vip")?.priceModifier ?? 0;

  return (
    <div>
      {/* Legend */}
      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <LegendItem className="border-slate-300 bg-white" label="Còn trống" />
        <LegendItem className="border-brand-600 bg-brand-600" label="Đang chọn" />
        <LegendItem
          className="border-amber-300 bg-amber-50"
          label={vipPrice ? `VIP (+${formatVND(vipPrice)})` : "VIP"}
        />
        <LegendItem className="border-slate-200 bg-slate-100" label="Đã đặt" />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <Deck
          seats={lower}
          deckLabel={hasUpperDeck ? "Tầng dưới" : undefined}
          selected={selected}
          onToggle={onToggle}
        />
        {hasUpperDeck && (
          <Deck
            seats={upper}
            deckLabel="Tầng trên"
            selected={selected}
            onToggle={onToggle}
          />
        )}
      </div>
    </div>
  );
}

function LegendItem({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-slate-600">
      <span className={cn("h-5 w-5 rounded-md border-2", className)} />
      {label}
    </span>
  );
}
