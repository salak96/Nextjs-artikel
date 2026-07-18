"use client";

import { Monitor, LayoutGrid, Newspaper, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  currentLayout: string;
}

const layouts = [
  {
    id: "blog",
    name: "Blog Modern",
    description: "Minimalist reading-focused layout with sidebar, similar to Medium or Hashnode.",
    icon: LayoutGrid,
    features: [
      "Featured post hero",
      "2-column latest posts",
      "Sidebar with search, categories, popular posts",
      "Newsletter subscription",
      "Optimized for long-form reading",
    ],
  },
  {
    id: "magazine",
    name: "Magazine / News Portal",
    description: "Dense news layout with slider, trending, and multiple sections, similar to Kompas or Detik.",
    icon: Newspaper,
    features: [
      "Breaking news ticker",
      "Hero image slider",
      "Trending & popular sections",
      "Editor's choice highlights",
      "Multiple category sections",
      "More ad placement slots",
    ],
  },
];

export default function AppearanceForm({ currentLayout }: Props) {
  const router = useRouter();
  const [layout, setLayout] = useState(currentLayout);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/paneladmin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "layout", value: layout }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Layout Selection */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Monitor className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Website Layout</h3>
            <p className="text-sm text-muted-foreground">
              Choose between Blog or Magazine layout for your website
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {layouts.map((l) => {
            const Icon = l.icon;
            const isSelected = layout === l.id;
            return (
              <button
                key={l.id}
                onClick={() => setLayout(l.id)}
                className={cn(
                  "rounded-xl border-2 p-5 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 bg-background"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{l.name}</h4>
                    {isSelected && (
                      <span className="text-xs font-medium text-primary">Active</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{l.description}</p>
                <ul className="space-y-1">
                  {l.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || layout === currentLayout}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Layout"}
        </button>
      </div>
    </div>
  );
}
