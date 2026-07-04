"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, Info, Armchair } from "lucide-react";
import type { EnrichedTrip } from "@/lib/mock-api";
import type { Seat } from "@/lib/types";
import { saveDraft } from "@/lib/booking-store";
import { SeatMap } from "./SeatMap";
import { BookingSummary } from "./BookingSummary";

interface SeatSelectionProps {
  trip: EnrichedTrip;
  seats: Seat[];
  date: string;
  passengers: number;
}

// Client-side seat selection: enforces the passenger-count limit, computes
// the running total, persists the draft, then routes to the passenger step.
export function SeatSelection({ trip, seats, date, passengers }: SeatSelectionProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const hasUpperDeck = useMemo(() => seats.some((s) => s.deck === "upper"), [seats]);

  // Full price per seat = trip base + VIP modifier.
  const seatPrices = useMemo(() => {
    const map: Record<string, number> = {};
    for (const seat of seats) {
      map[seat.label] = trip.price + seat.priceModifier;
    }
    return map;
  }, [seats, trip.price]);

  const total = selected.reduce((sum, label) => sum + (seatPrices[label] ?? 0), 0);

  const toggleSeat = (label: string) => {
    setSelected((prev) => {
      if (prev.includes(label)) {
        return prev.filter((l) => l !== label);
      }
      if (prev.length >= passengers) {
        toast.error(`Bạn chỉ có thể chọn tối đa ${passengers} ghế.`);
        return prev;
      }
      return [...prev, label];
    });
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      toast.error("Vui lòng chọn ít nhất một ghế.");
      return;
    }
    if (selected.length !== passengers) {
      toast.error(`Vui lòng chọn đủ ${passengers} ghế cho ${passengers} hành khách.`);
      return;
    }
    saveDraft({
      tripId: trip.id,
      seatLabels: selected,
      seatPrices,
      passengerCount: passengers,
      total,
    });
    router.push("/booking/passenger");
  };

  const summaryFooter = (
    <button type="button" onClick={handleContinue} className="btn-accent w-full">
      Tiếp tục nhập thông tin
    </button>
  );

  return (
    <div className="bg-slate-50">
      <div className="container-page py-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại kết quả
        </button>

        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-6">
          {/* Seat map + guidance */}
          <div className="space-y-5">
            <div className="card p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <h1 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Armchair className="h-5 w-5 text-brand-600" />
                  Chọn ghế
                </h1>
                <span className="rounded-lg bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
                  {selected.length}/{passengers} ghế
                </span>
              </div>

              <SeatMap
                seats={seats}
                selected={selected}
                onToggle={toggleSeat}
                hasUpperDeck={hasUpperDeck}
              />
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-4 text-sm text-brand-800">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <p>
                Chọn đúng <strong>{passengers} ghế</strong> tương ứng với số hành khách. Ghế VIP nằm ở
                khu vực đầu xe, không gian rộng rãi hơn với mức phụ thu nhỏ.
              </p>
            </div>
          </div>

          {/* Sticky summary */}
          <aside className="mt-6 lg:mt-0">
            <div className="lg:sticky lg:top-20">
              <BookingSummary
                trip={trip}
                date={date}
                selectedSeats={selected}
                seatPrices={seatPrices}
                total={total}
                footer={summaryFooter}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
