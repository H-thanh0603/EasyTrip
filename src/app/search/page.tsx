import { Suspense } from "react";
import { SearchResults } from "@/components/search/SearchResults";
import { LoadingState } from "@/components/ui/LoadingState";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-16">
          <LoadingState label="Đang tải kết quả tìm kiếm..." />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
