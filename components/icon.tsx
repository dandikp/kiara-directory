import { cn } from "@/lib/utils";
import { IconName, Icons } from "@/types/menu.type";
import type { IconProps } from "@phosphor-icons/react";
import React from "react";
import { Skeleton } from "./ui/skeleton";

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

type DynamicIconProp = {
  icon: IconName;
};

export const DynamicIcon = ({ icon }: DynamicIconProp) => {
  const [IconComponent, setIconComponent] =
    React.useState<React.FC<IconProps> | null>(null);

  React.useEffect(() => {
    function loadIcon() {
      const component = Icons[icon] as React.FC<IconProps> | undefined;
      if (component) setIconComponent(component);
    }

    loadIcon();
  }, [icon]);

  return IconComponent ? <IconComponent /> : <Skeleton className="size-4" />;
};
