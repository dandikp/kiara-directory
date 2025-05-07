import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
  labelPosition?: "center" | "left" | "right";
  thickness?: "light" | "default" | "medium" | "bold" | "heavy";
  color?: string; // e.g. "border-gray-300"
  length?: string; // e.g. "w-full", "w-1/2", etc.
  className?: string;
}

function getThicknessClass(
  thickness: DividerProps["thickness"],
  orientation: DividerProps["orientation"],
): string {
  const isHorizontal = orientation === "horizontal";
  switch (thickness) {
    case "light":
      return isHorizontal ? "h-[1px]" : "w-[1px]";
    case "medium":
      return isHorizontal ? "h-[3px]" : "w-[3px]";
    case "bold":
      return isHorizontal ? "h-[4px]" : "w-[4px]";
    case "heavy":
      return isHorizontal ? "h-[8px]" : "w-[8px]";
    default:
      return isHorizontal ? "h-[2px]" : "w-[2px]";
  }
}

export function Divider({
  orientation = "horizontal",
  label,
  thickness = "light",
  labelPosition = "center",
  color = "border-border",
  length = "w-full",
  className,
  ...props
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";

  const baseClass = cn(
    "flex items-center",
    isHorizontal ? "w-full" : "h-full flex-col",
    className,
  );

  const lineClass = cn(
    "shrink-0 bg-border",
    color,
    getThicknessClass(thickness, orientation),
    isHorizontal ? length : "h-full",
  );

  const labelClass = cn(
    "text-sm text-muted-foreground px-2 whitespace-nowrap",
    labelPosition === "left" && isHorizontal && "pr-2",
    labelPosition === "right" && isHorizontal && "pl-2",
  );

  if (!label) {
    return <div className={cn(lineClass, className)} {...props} />;
  }

  return (
    <div className={baseClass} {...props}>
      {isHorizontal && labelPosition === "left" && (
        <span className={labelClass}>{label}</span>
      )}
      <div className={cn(lineClass, isHorizontal && "flex-grow shrink")} />
      {isHorizontal && labelPosition === "center" && (
        <span className={labelClass}>{label}</span>
      )}
      <div className={cn(lineClass, isHorizontal && "flex-grow shrink")} />
      {isHorizontal && labelPosition === "right" && (
        <span className={labelClass}>{label}</span>
      )}
    </div>
  );
}
