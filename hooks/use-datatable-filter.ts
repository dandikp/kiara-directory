import { TInputFilterValue } from "@/components/datatable/filter-input";
import {
  availableKeyDate,
  availableKeyDateRanges,
  dateRangeToQueryString,
  dateToQueryString,
  parseQueryStringToDate,
  parseQueryStringToDateRange,
} from "@/lib/date";
import { DatatableFilterItem } from "@/types/datatable.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import useDebounce from "./use-debounce";

const useDataTableFilter = (
  filters: DatatableFilterItem[],
  initialValues: { [key: string]: TInputFilterValue } = {},
  delay: number = 300,
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const parseFilters = useCallback(() => {
    const entries = filters.map((filter) => {
      const searchValue =
        searchParams.get(filter.key) ?? initialValues[filter.key];

      if (availableKeyDateRanges.includes(filter.key)) {
        return [filter.key, parseQueryStringToDateRange(searchValue as string)];
      }

      if (availableKeyDate.includes(filter.key)) {
        return [filter.key, parseQueryStringToDate(searchValue as string)];
      }

      return [filter.key, searchValue ?? undefined];
    });

    return Object.fromEntries(entries);
  }, [filters, searchParams, initialValues]);

  const initialFilterValues = useMemo(() => parseFilters(), [parseFilters]);

  const [filterValues, setFilterValues] = useState<{
    [key: string]: TInputFilterValue;
  }>(initialFilterValues);

  const debouncedValues = useDebounce(filterValues, delay);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(debouncedValues).forEach(([key, value]) => {
      if (filters.some((filter) => filter.key === key)) {
        if (value !== undefined) {
          if (
            typeof value === "object" &&
            value !== null &&
            "from" in value &&
            "to" in value
          ) {
            if (value.from && value.to) {
              params.set(key, dateRangeToQueryString(value));
            } else {
              console.log(`DateRange for key "${key}" is incomplete.`, value);
            }
          } else if (value instanceof Date) {
            params.set(key, dateToQueryString(value));
          } else {
            params.set(key, value.toString());
          }
        } else {
          params.delete(key);
        }
      }
    });

    params.delete("page");
    params.delete("pageSize");
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedValues, filters, pathname, router, searchParams]);

  const handleInputChange = useCallback(
    (key: string, value: TInputFilterValue) => {
      setFilterValues((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleReset = useCallback(() => {
    setFilterValues((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([key]) => [key, "" as TInputFilterValue]),
      ),
    );
    const params = new URLSearchParams(searchParams.toString());
    filters.forEach((filter) => params.delete(filter.key));
    router.push(`${pathname}?${params.toString()}`);
  }, [filters, pathname, router, searchParams]);

  const isAllEmpty = Object.values(filterValues).every(
    (value) => value === undefined,
  );

  const hasSearchParams = Array.from(searchParams.entries()).length > 0;

  const canReset = hasSearchParams || !isAllEmpty;

  const isAnyValuePresent = Object.values(filterValues).some(
    (value) => value !== undefined,
  );

  const handleKeyDown = useCallback(
    (
      key: string,
      e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (e.key === "Enter") {
        applyFilters();
      }
    },
    [applyFilters],
  );

  const memoizedResults = useMemo(() => {
    return {
      filterValues,
      applyFilters,
      handleInputChange,
      handleReset,
      handleKeyDown,
      canReset,
      isAnyValuePresent,
    };
  }, [
    filterValues,
    applyFilters,
    handleInputChange,
    handleReset,
    handleKeyDown,
    canReset,
    isAnyValuePresent,
  ]);

  return memoizedResults;
};

export default useDataTableFilter;
