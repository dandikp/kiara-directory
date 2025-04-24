import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

type Props = { className?: string };

const DatatableLoadingCell = ({ className }: Props) => {
  const rootClasses = cn("w-full h-4 min-w-[100px] max-w-[200px]", className);
  return <Skeleton className={rootClasses} />;
};

export default DatatableLoadingCell;
