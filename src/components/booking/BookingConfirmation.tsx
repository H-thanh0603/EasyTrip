"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Home,
  Ticket as TicketIcon,
  MapPin,
  CalendarDays,
  Clock,
  CreditCard,
  Info,
  Copy,
  Check,
} from "lucide-react";
import type { Booking } from "@/lib/types";
import { getTicket } from "@/lib/booking-store";
import { formatVND, formatDateVI, formatTime } from "@/lib/format";
import { busTypeLabel } from "@/lib/labels";
import { StatusBadge } from "@/components/ui/Badge";
import { LoadingState } from "@/components/ui/LoadingState";
import { Button } from "@/components/ui/Button";

// Booking confirmation: reads the saved ticket by code, shows the full summary.
export function BookingConfirmation() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code") ?? "";

  const [ready, setReady] = useState(false);
  const [booking, setBooking] = useState<Booking | undefined>();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setBooking(getTicket(code));
    setReady(true);
  }, [code]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard may be unavailable; ignore in this demo context.
    }
  };

  if (!ready) {
    return (
      <div className="container-page py-16">
        <LoadingState label="Đang tải thông tin vé..." />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-xl font-bold text-slate-900">Không tìm thấy vé</h1>
        <p className="mt-2 text-slate-500">
          Mã đặt vé không hợp lệ hoặc vé không tồn tại.
        </p>
        <Button href="/" className="mt-6">
          Về trang chủ
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      <div className="container-page max-w-3xl py-8 sm:py-12">
        {/* Success header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-9 w-9 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Đặt vé thành công!
          </h1>
          <p className="mt-2 text-slate-500">
            Vé của bạn đã được ghi nhận. Vui lòng lưu lại mã đặt vé bên dưới.
          </p>
        </div>

        {/* Ticket card */}
        <div className="card overflow-hidden">
          {/* Code strip */}
          <div className="flex flex-col items-center justify-between gap-3 border-b border-dashed border-slate-200 bg-brand-50/60 p-5 sm:flex-row">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Mã đặt vé
              </p>
              <p className="font-mono text-2xl font-extrabold tracking-wider text-brand-800">
                {booking.code}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={booking.status} />
              <button
                type="button"
                onClick={copyCode}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" /> Đã sao chép
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Sao chép
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Trip info */}
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <TicketIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-bold text-slate-900">{booking.routeLabel}</p>
                <p className="text-sm text-slate-500">
                  {booking.operatorName} · {busTypeLabel[booking.busType]}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <InfoRow
                icon={<CalendarDays className="h-4 w-4 text-brand-500" />}
                label="Ngày đi"
                value={formatDateVI(booking.departTime)}
              />
              <InfoRow
                icon={<Clock className="h-4 w-4 text-brand-500" />}
                label="Giờ"
                value={`${formatTime(booking.departTime)} → ${formatTime(booking.arriveTime)}`}
              />
              <InfoRow
                icon={<MapPin className="h-4 w-4 text-brand-500" />}
                label="Điểm đón"
                value={booking.pickupPoint}
              />
              <InfoRow
                icon={<MapPin className="h-4 w-4 text-accent-500" />}
                label="Điểm trả"
                value={booking.dropoffPoint}
              />
            </div>
          </div>

          {/* Passengers */}
          <div className="border-b border-slate-100 p-5">
            <h2 className="mb-3 font-semibold text-slate-800">
              Hành khách ({booking.passengers.length})
            </h2>
            <div className="space-y-2">
              {booking.passengers.map((p) => (
                <div
                  key={p.seatLabel}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-sm"
                >
                  <div>
                    <p className="font-medium text-slate-800">{p.fullName}</p>
                    <p className="text-xs text-slate-500">{p.phone}</p>
                  </div>
                  <span className="rounded-md bg-brand-100 px-2.5 py-1 text-xs font-bold text-brand-700">
                    Ghế {p.seatLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-2 text-slate-500">
                <CreditCard className="h-4 w-4" />
                {booking.paymentMethod}
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between border-t border-slate-100 pt-3">
              <span className="text-sm text-slate-500">Tổng thanh toán</span>
              <span className="text-2xl font-extrabold text-accent-600">
                {formatVND(booking.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="font-semibold">Lưu ý quan trọng</p>
            <ul className="mt-1 list-inside list-disc space-y-0.5 text-amber-700">
              <li>Vui lòng có mặt tại điểm đón trước giờ khởi hành 30 phút.</li>
              <li>Xuất trình mã đặt vé và giấy tờ tùy thân khi lên xe.</li>
              <li>Đây là hệ thống demo, vé không có giá trị sử dụng thực tế.</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/" variant="outline">
            <Home className="h-4 w-4" />
            Về trang chủ
          </Button>
          <Button href="/tickets" variant="primary">
            <TicketIcon className="h-4 w-4" />
            Xem vé của tôi
          </Button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      {icon}
      <div>
        <span className="text-slate-400">{label}: </span>
        <span className="font-medium text-slate-700">{value}</span>
      </div>
    </div>
  );
}
