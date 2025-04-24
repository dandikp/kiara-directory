import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children?: React.ReactNode | string;
  value?: string | number | null | undefined;
  render?: () => React.ReactNode;
};

const DatatableBodyCell = ({ className, children, value, render }: Props) => {
  if (render) return render();

  return (
    <span
      className={cn(
        "w-full line-clamp-1 group-hover:line-clamp-none hover:line-clamp-none transition duration-3",
        className,
      )}
    >
      {value ?? children}
    </span>
  );
};

export default DatatableBodyCell;
