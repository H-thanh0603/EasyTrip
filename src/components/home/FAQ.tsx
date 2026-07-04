"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Làm thế nào để đặt vé xe trên EasyTrip?",
    answer:
      "Bạn chỉ cần chọn điểm đi, điểm đến, ngày khởi hành và số vé, sau đó nhấn Tìm chuyến. Chọn chuyến xe phù hợp, chọn ghế, điền thông tin hành khách và xác nhận đặt vé. Toàn bộ quá trình chỉ mất khoảng 2 phút.",
  },
  {
    question: "Tôi có thể thanh toán bằng những hình thức nào?",
    answer:
      "EasyTrip hỗ trợ thanh toán qua ví điện tử (Momo, ZaloPay, VNPay), thẻ ATM nội địa, thẻ tín dụng/ghi nợ quốc tế và tiền mặt tại quầy. Bạn có thể chọn hình thức phù hợp ở bước thanh toán.",
  },
  {
    question: "Tôi có được hoàn tiền khi hủy vé không?",
    answer:
      "Chính sách hoàn hủy phụ thuộc vào từng nhà xe. Đa số nhà xe cho phép hủy vé trước giờ khởi hành và hoàn từ 70% đến 100% giá vé. Thông tin chi tiết được hiển thị rõ ở trang xác nhận đặt vé.",
  },
  {
    question: "Sau khi đặt vé tôi nhận vé bằng cách nào?",
    answer:
      "Ngay sau khi đặt thành công, mã vé điện tử sẽ hiển thị trên trang xác nhận và trong mục Vé của tôi. Bạn chỉ cần đọc mã vé hoặc trình mã cho nhân viên nhà xe khi lên xe, không cần in vé giấy.",
  },
  {
    question: "EasyTrip có thu thêm phí đặt vé không?",
    answer:
      "Giá hiển thị trên EasyTrip là giá cuối cùng, đã bao gồm mọi loại phí. Chúng tôi cam kết minh bạch, không phát sinh phụ phí ẩn khi bạn thanh toán.",
  },
  {
    question: "Tôi có thể chọn vị trí ghế mong muốn không?",
    answer:
      "Có. Với mỗi chuyến xe, bạn có thể xem sơ đồ ghế trực quan và tự chọn vị trí còn trống, bao gồm cả ghế VIP. Số ghế đã chọn sẽ được giữ cho bạn trong suốt quá trình đặt vé.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <div>
            <span className="chip bg-brand-50 text-brand-700">Hỗ trợ</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Câu hỏi thường gặp
            </h2>
            <p className="mt-4 text-slate-600">
              Những thắc mắc phổ biến khi đặt vé xe khách trực tuyến. Nếu cần thêm hỗ trợ, đội ngũ
              EasyTrip luôn sẵn sàng 24/7.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                <HelpCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">Tổng đài 1900 1234</p>
                <p className="text-xs text-slate-600">Hỗ trợ mọi lúc, kể cả ngày lễ</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors",
                    isOpen ? "border-brand-200 bg-white shadow-card" : "border-slate-200 bg-white",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-slate-900">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
