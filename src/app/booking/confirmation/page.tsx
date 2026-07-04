import { Suspense } from "react";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { LoadingState } from "@/components/ui/LoadingState";

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-16">
          <LoadingState label="Đang tải thông tin vé..." />
        </div>
      }
    >
      <BookingConfirmation />
    </Suspense>
  );
}
