import type { Metadata } from "next";
import { MyTickets } from "@/components/tickets/MyTickets";

export const metadata: Metadata = {
  title: "Vé của tôi — EasyTrip",
  description: "Quản lý và tra cứu các vé xe khách bạn đã đặt.",
};

export default function TicketsPage() {
  return <MyTickets />;
}
