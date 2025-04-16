import { cn } from "@/lib/utils";
import type { IconProps } from "@phosphor-icons/react";
import React from "react";

interface WrapperProps {
  icon: React.ElementType<IconProps>;
  className?: string;
  size?: number;
}

export const IconWrapper: React.FC<WrapperProps> = ({
  icon: Icon,
  className,
  size,
}) => {
  const classes = cn(
    `inline-flex justify-center items-center `,
    className,
    size
      ? `size-${size} [&_svg]:w-${size} [&_svg]:h-${size}`
      : `size-6 [&_svg]:w-6 [&_svg]:h-6`,
  );
  return (
    <div className={classes}>
      <Icon />
    </div>
  );
};
