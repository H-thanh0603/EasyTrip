import { getReviews } from "@/lib/mock-api";
import { Star, Quote } from "lucide-react";

export function Reviews() {
  const reviews = getReviews();

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20">
      <div className="container-page">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="chip bg-brand-50 text-brand-700">Khách hàng nói gì</span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Hơn 2 triệu lượt đặt vé hài lòng
          </h2>
          <p className="mt-3 text-slate-600">
            Trải nghiệm thực tế từ những hành khách đã đồng hành cùng EasyTrip trên mọi nẻo đường.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.id}
              className="card relative flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-brand-100" />
              <div className="mb-3 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < review.rating
                        ? "h-4 w-4 fill-accent-400 text-accent-400"
                        : "h-4 w-4 text-slate-200"
                    }
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-slate-700">
                “{review.comment}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
                  {review.avatarText}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{review.author}</p>
                  <p className="text-xs text-slate-500">{review.route}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
