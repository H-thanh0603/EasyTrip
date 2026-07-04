import { Hero } from "@/components/home/Hero";
import { PopularRoutes } from "@/components/home/PopularRoutes";
import { FeaturedOperators } from "@/components/home/FeaturedOperators";
import { WhyUs } from "@/components/home/WhyUs";
import { BookingSteps } from "@/components/home/BookingSteps";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Reviews } from "@/components/home/Reviews";
import { FAQ } from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularRoutes />
      <WhyUs />
      <BookingSteps />
      <FeaturedOperators />
      <PromoBanner />
      <Reviews />
      <FAQ />
    </>
  );
}
