export type DataTableFilterItem = {
  key: string;
  placeholder?: string;
  label?: string;
  component?: React.ReactElement | null;
};

export type PaginationSearchParams = {
  page?: string;
  pageSize?: string;
};

export type ResponseDataTable<T> = {
  data: T[];
  totalData: number;
  rowCount: number;
};
