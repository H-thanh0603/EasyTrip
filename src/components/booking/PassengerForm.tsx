import { User, Phone, Mail } from "lucide-react";
import type { Passenger } from "@/lib/types";
import { Input, Textarea } from "@/components/ui/Input";

export interface PassengerErrors {
  fullName?: string;
  phone?: string;
  email?: string;
}

interface PassengerFormProps {
  index: number;
  seatLabel: string;
  value: Passenger;
  errors: PassengerErrors;
  onChange: (next: Passenger) => void;
}

// One passenger's editable fields, tied to a specific seat.
export function PassengerForm({
  index,
  seatLabel,
  value,
  errors,
  onChange,
}: PassengerFormProps) {
  const update = (field: keyof Passenger, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Hành khách {index + 1}</h3>
        <span className="rounded-lg bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700">
          Ghế {seatLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          icon={<User className="h-5 w-5" />}
          value={value.fullName}
          error={errors.fullName}
          onChange={(e) => update("fullName", e.target.value)}
        />
        <Input
          label="Số điện thoại"
          placeholder="0901234567"
          inputMode="tel"
          icon={<Phone className="h-5 w-5" />}
          value={value.phone}
          error={errors.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <Input
          label="Email"
          placeholder="email@example.com"
          inputMode="email"
          icon={<Mail className="h-5 w-5" />}
          value={value.email}
          error={errors.email}
          onChange={(e) => update("email", e.target.value)}
          containerClassName="sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <Textarea
            label="Ghi chú (không bắt buộc)"
            placeholder="Ví dụ: cần hỗ trợ hành lý, đón tại điểm hẹn..."
            rows={2}
            value={value.note ?? ""}
            onChange={(e) => update("note", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

// Shared validators reused by the passenger page.
export function validatePassenger(p: Passenger): PassengerErrors {
  const errors: PassengerErrors = {};
  if (!p.fullName.trim()) {
    errors.fullName = "Vui lòng nhập họ tên.";
  } else if (p.fullName.trim().length < 2) {
    errors.fullName = "Họ tên quá ngắn.";
  }

  const phone = p.phone.trim();
  if (!phone) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!/^0\d{9}$/.test(phone)) {
    errors.phone = "Số điện thoại phải gồm 10 chữ số, bắt đầu bằng 0.";
  }

  const email = p.email.trim();
  if (!email) {
    errors.email = "Vui lòng nhập email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email không hợp lệ.";
  }

  return errors;
}

export function hasErrors(errors: PassengerErrors): boolean {
  return Boolean(errors.fullName || errors.phone || errors.email);
}
