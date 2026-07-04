import { LoadingState } from "@/components/ui/LoadingState";

export default function TripDetailLoading() {
  return (
    <div className="container-page py-16">
      <LoadingState label="Đang tải thông tin chuyến xe..." />
    </div>
  );
}
