import { cn } from "@/lib/utils";
import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
}) => {
  const classes = cn("relative flex-1 space-y-6 pb-6 min-h-screen", className);
  return <div className={classes}>{children}</div>;
};
