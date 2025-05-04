import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
  labelPosition?: "center" | "left" | "right";
  thickness?: string; // e.g. "1px", "2px"
  color?: string; // e.g. "border-gray-300"
  length?: string; // e.g. "w-full", "w-1/2", etc.
  className?: string;
}

export function Divider({
  orientation = "horizontal",
  label,
  labelPosition = "center",
  thickness = "1px",
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
    isHorizontal ? `h-[${thickness}] ${length}` : `w-[${thickness}] h-full`,
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
