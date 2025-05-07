"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const presetStyles = ["Professional", "Funny", "Casual", "Academic"];

export function StyleSelector({
  selected,
  setSelected,
}: {
  selected: string[];
  setSelected: (styles: string[]) => void;
}) {
  const [customStyle, setCustomStyle] = useState("");

  const addStyle = (style: string) => {
    if (!selected.includes(style)) {
      setSelected([...selected, style]);
    }
  };

  const removeStyle = (style: string) => {
    setSelected(selected.filter((s) => s !== style));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {presetStyles.map((style) => (
          <Button
            key={style}
            variant="outline"
            onClick={() => addStyle(style)}
            type="button"
          >
            {style}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={customStyle}
          onChange={(e) => setCustomStyle(e.target.value)}
          placeholder="Custom style"
        />
        <Button
          type="button"
          onClick={() => {
            if (customStyle.trim()) {
              addStyle(customStyle.trim());
              setCustomStyle("");
            }
          }}
        >
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {selected.map((style) => (
          <Badge
            key={style}
            className="cursor-pointer"
            onClick={() => removeStyle(style)}
            variant="secondary"
          >
            {style} ✕
          </Badge>
        ))}
      </div>
    </div>
  );
}
