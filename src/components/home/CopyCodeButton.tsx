"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success(`Đã sao chép mã ${code}`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Không sao chép được mã. Vui lòng thử lại.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-lg bg-white/25 px-2.5 py-1.5 text-xs font-semibold transition hover:bg-white/35"
      aria-label={`Sao chép mã ${code}`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Đã chép" : "Sao chép"}
    </button>
  );
}
