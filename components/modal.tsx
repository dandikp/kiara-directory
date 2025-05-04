"use client";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { JSX } from "react/jsx-runtime";

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  renderContent: JSX.Element;
  className?: string;
  fullWidth?: boolean;
};

const Modal = ({
  open,
  handleClose,
  title,
  description,
  renderContent,
  className,
  fullWidth = false,
}: Props) => {
  const rootClasses = cn(
    "flex flex-col gap-4",
    fullWidth ? "max-h-[calc(100vh-2rem)] w-fit max-w-[calc(100vw-2rem)]" : "",
    className,
  );
  const bodyClasses = cn(fullWidth ? "flex-1 h-full overflow-y-auto pr-2" : "");
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={rootClasses}>
        <DialogHeader className="space-y-0 gap-2 justify-start">
          <DialogTitle className="text-left">{title}</DialogTitle>
          <DialogDescription className="text-left">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className={bodyClasses}>{renderContent}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
