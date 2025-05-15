interface ControlledSliderProps {
  value: number;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  onChange?: (value: number) => void;
}

import { cn } from "@/lib/utils";
import React from "react";
import { Slider } from "./ui/slider";

const ControlledSlider = ({
  value,
  className,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  label = "Nilai",
}: ControlledSliderProps) => (
  <div className={cn("w-full flex flex-col gap-2", className)}>
    <Slider
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={(val) => {
        if (onChange) {
          onChange(val[0]);
        }
      }}
    />
    <span className="text-sm leading-5 text-muted-foreground">
      {label}: {value}
    </span>
  </div>
);

export default ControlledSlider;
