import { PaginationState } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useDataTablePagination = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || undefined;
  const pageSize = searchParams.get("pageSize") || undefined;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page ? Number(page) - 1 : 0,
      pageSize: pageSize ? Number(pageSize) : 10,
    }));
  }, [page, pageSize]);

  return {
    pagination,
  };
};

export default useDataTablePagination;
