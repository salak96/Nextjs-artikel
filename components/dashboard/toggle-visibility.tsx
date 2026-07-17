"use client";

import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  id: string;
  hidden: boolean;
}

export function ToggleVisibility({ id, hidden }: Props) {
  const router = useRouter();

  async function handleToggle() {
    await fetch("/api/paneladmin/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, hidden: !hidden }),
    });
    router.refresh();
  }

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
        hidden
          ? "text-muted-foreground hover:text-foreground"
          : "text-green-600 hover:text-green-700"
      }`}
      title={hidden ? "Show" : "Hide"}
    >
      {hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      {hidden ? "Hidden" : "Visible"}
    </button>
  );
}
