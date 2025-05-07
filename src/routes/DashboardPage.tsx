import { GenerateTab } from "@/components/dashboard/GenerateTab";
import { ManualTab } from "@/components/dashboard/ManualTab";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DashboardPage() {
  const [tab, setTab] = useState<"generate" | "manual">("generate");

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex gap-2">
        <Button
          variant={tab === "generate" ? "default" : "outline"}
          onClick={() => setTab("generate")}
        >
          AI Generated
        </Button>
        <Button
          variant={tab === "manual" ? "default" : "outline"}
          onClick={() => setTab("manual")}
        >
          Write Manually
        </Button>
      </div>

      {tab === "generate" ? <GenerateTab /> : <ManualTab />}
    </div>
  );
}
