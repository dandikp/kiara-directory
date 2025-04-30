export type DatatableFilterItem = {
  key: string;
  placeholder?: string;
  label?: string;
  component?: React.ReactElement | null;
};

export type PaginationSearchParams = {
  page?: string;
  pageSize?: string;
  search?: string;
};
