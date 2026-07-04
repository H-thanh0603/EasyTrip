import type { BusOperator } from "@/lib/types";

// Fictional Vietnamese bus operators (text names only, no real brand logos).
export const operators: BusOperator[] = [
  {
    id: "op-phuong-nam",
    name: "Phương Nam Express",
    logoText: "PN",
    rating: 4.8,
    reviewCount: 3240,
    established: 2005,
    description:
      "Hãng xe chất lượng cao với đội xe giường nằm hiện đại, phục vụ tuyến Nam - Trung.",
    accentColor: "#1D4ED8",
  },
  {
    id: "op-hoang-long",
    name: "Hoàng Long Limousine",
    logoText: "HL",
    rating: 4.7,
    reviewCount: 2810,
    established: 2001,
    description:
      "Dịch vụ limousine cao cấp, ghế da massage, phục vụ tận tâm trên mọi hành trình.",
    accentColor: "#7C3AED",
  },
  {
    id: "op-thanh-buoi",
    name: "Thành Bưởi Group",
    logoText: "TB",
    rating: 4.6,
    reviewCount: 5120,
    established: 1999,
    description:
      "Thương hiệu lâu đời, giá hợp lý, tần suất chuyến dày đặc tuyến TP.HCM - Đà Lạt.",
    accentColor: "#059669",
  },
  {
    id: "op-futa",
    name: "FUTA Bus Lines",
    logoText: "FT",
    rating: 4.5,
    reviewCount: 8940,
    established: 2003,
    description:
      "Mạng lưới phủ khắp cả nước, xe đời mới, trung chuyển miễn phí tận nơi.",
    accentColor: "#EA580C",
  },
  {
    id: "op-kumho",
    name: "Kumho Việt Thanh",
    logoText: "KV",
    rating: 4.4,
    reviewCount: 1980,
    established: 2008,
    description:
      "Xe liên doanh tiêu chuẩn quốc tế, an toàn và đúng giờ trên tuyến miền Trung.",
    accentColor: "#0891B2",
  },
  {
    id: "op-tam-hanh",
    name: "Tâm Hạnh Travel",
    logoText: "TH",
    rating: 4.3,
    reviewCount: 1440,
    established: 2012,
    description:
      "Xe giường nằm phòng đơn VIP, không gian riêng tư, wifi tốc độ cao.",
    accentColor: "#DB2777",
  },
];

export function getOperator(id: string): BusOperator | undefined {
  return operators.find((o) => o.id === id);
}
