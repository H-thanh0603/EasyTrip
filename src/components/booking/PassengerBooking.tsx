"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft, MapPin, UserCog } from "lucide-react";
import type { Booking, Passenger } from "@/lib/types";
import {
  loadDraft,
  loadSearch,
  addTicket,
  clearDraft,
  generateBookingCode,
} from "@/lib/booking-store";
import { getTripById, enrichTrip, getCityName } from "@/lib/mock-api";
import { getStations } from "@/lib/data/stations";
import { Input } from "@/components/ui/Input";
import { BookingSummary } from "./BookingSummary";
import {
  PassengerForm,
  validatePassenger,
  hasErrors,
  type PassengerErrors,
} from "./PassengerForm";
import { LoadingState } from "@/components/ui/LoadingState";

function emptyPassenger(seatLabel: string): Passenger {
  return { fullName: "", phone: "", email: "", seatLabel, note: "" };
}

// Passenger info step: forms per seat + contact/pickup, validates then confirms.
export function PassengerBooking() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const draft = useMemo(() => loadDraft(), []);
  const search = useMemo(() => loadSearch(), []);

  const trip = draft ? getTripById(draft.tripId) : undefined;
  const date = search?.date ?? "";
  const enriched = trip && date ? enrichTrip(trip, date) : null;

  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [errors, setErrors] = useState<PassengerErrors[]>([]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactErrors, setContactErrors] = useState<PassengerErrors>({});
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  useEffect(() => {
    if (!draft || !trip || !date) {
      setInvalid(true);
      setReady(true);
      return;
    }
    setPassengers(draft.seatLabels.map((label) => emptyPassenger(label)));
    setErrors(draft.seatLabels.map(() => ({})));
    const pickups = getStations(trip.fromCityId);
    const dropoffs = getStations(trip.toCityId);
    setPickup(pickups[0] ?? "");
    setDropoff(dropoffs[0] ?? "");
    setReady(true);
    // draft/trip/date are derived once from localStorage and stable for this step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) {
    return (
      <div className="container-page py-16">
        <LoadingState label="Đang tải thông tin đặt vé..." />
      </div>
    );
  }

  if (invalid || !enriched || !draft) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-xl font-bold text-slate-900">Không có thông tin đặt vé</h1>
        <p className="mt-2 text-slate-500">
          Phiên đặt vé đã hết hạn hoặc chưa chọn ghế. Vui lòng tìm chuyến và chọn ghế lại.
        </p>
        <button
          type="button"
          onClick={() => router.push("/search")}
          className="btn-primary mt-6"
        >
          Tìm chuyến xe
        </button>
      </div>
    );
  }

  const updatePassenger = (index: number, next: Passenger) => {
    setPassengers((prev) => prev.map((p, i) => (i === index ? next : p)));
  };

  const applyContactToFirst = () => {
    if (!passengers[0]) return;
    setContactName(passengers[0].fullName);
    setContactPhone(passengers[0].phone);
    setContactEmail(passengers[0].email);
  };

  const handleSubmit = () => {
    const passengerErrs = passengers.map((p) => validatePassenger(p));
    const contactErr = validatePassenger({
      fullName: contactName,
      phone: contactPhone,
      email: contactEmail,
      seatLabel: "",
    });
    setErrors(passengerErrs);
    setContactErrors(contactErr);

    const anyPassengerError = passengerErrs.some((e) => hasErrors(e));
    if (anyPassengerError || hasErrors(contactErr)) {
      toast.error("Vui lòng kiểm tra lại thông tin còn thiếu hoặc chưa hợp lệ.");
      return;
    }

    const code = generateBookingCode();
    const booking: Booking = {
      code,
      tripId: enriched.id,
      operatorName: enriched.operator.name,
      routeLabel: `${getCityName(enriched.fromCityId)} → ${getCityName(enriched.toCityId)}`,
      fromCityId: enriched.fromCityId,
      toCityId: enriched.toCityId,
      departTime: enriched.departTime,
      arriveTime: enriched.arriveTime,
      departureStation: enriched.departureStation,
      arrivalStation: enriched.arrivalStation,
      busType: enriched.busType,
      seats: draft.seatLabels,
      passengers,
      pickupPoint: pickup,
      dropoffPoint: dropoff,
      contactName,
      contactPhone,
      contactEmail,
      total: draft.total,
      status: "pending",
      paymentMethod: "Thanh toán tại quầy / VNPay (demo)",
      createdAt: new Date().toISOString(),
    };

    addTicket(booking);
    clearDraft();
    toast.success("Đặt vé thành công!");
    router.push(`/booking/confirmation?code=${code}`);
  };

  const pickupOptions = getStations(enriched.fromCityId);
  const dropoffOptions = getStations(enriched.toCityId);

  return (
    <div className="bg-slate-50">
      <div className="container-page py-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại chọn ghế
        </button>

        <h1 className="mb-5 text-2xl font-bold text-slate-900">Thông tin hành khách</h1>

        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-6">
          <div className="space-y-5">
            {passengers.map((p, i) => (
              <PassengerForm
                key={p.seatLabel}
                index={i}
                seatLabel={p.seatLabel}
                value={p}
                errors={errors[i] ?? {}}
                onChange={(next) => updatePassenger(i, next)}
              />
            ))}

            {/* Contact info */}
            <div className="card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold text-slate-900">
                  <UserCog className="h-5 w-5 text-brand-600" />
                  Thông tin liên hệ
                </h3>
                <button
                  type="button"
                  onClick={applyContactToFirst}
                  className="text-xs font-medium text-brand-600 hover:text-brand-700"
                >
                  Dùng thông tin hành khách 1
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  label="Họ và tên người đặt"
                  value={contactName}
                  error={contactErrors.fullName}
                  onChange={(e) => setContactName(e.target.value)}
                />
                <Input
                  label="Số điện thoại"
                  inputMode="tel"
                  value={contactPhone}
                  error={contactErrors.phone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
                <Input
                  label="Email nhận vé"
                  inputMode="email"
                  value={contactEmail}
                  error={contactErrors.email}
                  onChange={(e) => setContactEmail(e.target.value)}
                  containerClassName="sm:col-span-2"
                />
              </div>
            </div>

            {/* Pickup / dropoff */}
            <div className="card p-5">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                <MapPin className="h-5 w-5 text-brand-600" />
                Điểm đón & điểm trả
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Điểm đón
                  </label>
                  <select
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="input-field"
                  >
                    {pickupOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Điểm trả
                  </label>
                  <select
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="input-field"
                  >
                    {dropoffOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky summary */}
          <aside className="mt-6 lg:mt-0">
            <div className="lg:sticky lg:top-20">
              <BookingSummary
                trip={enriched}
                date={date}
                selectedSeats={draft.seatLabels}
                seatPrices={draft.seatPrices}
                total={draft.total}
                footer={
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn-accent w-full"
                  >
                    Xác nhận đặt vé
                  </button>
                }
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
