import { SafeDepartmentType } from "@/features/department/types/department.type";
import { SafeDivisionType } from "@/features/division/types/division.type";
import { SafeFieldType } from "@/features/field/types/field.type";
import { StandardResponse } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ROLE_QUERY_KEYS } from "../config/role.config";

type ScopeType = "DIVISION" | "FIELD" | "DEPARTMENT";
type RoleScopeMap = {
  DIVISION: SafeDivisionType[];
  FIELD: SafeFieldType[];
  DEPARTMENT: SafeDepartmentType[];
};
const ENDPOINTS: Record<ScopeType, string> = {
  DIVISION: "/api/roles/divisions",
  FIELD: "/api/roles/fields",
  DEPARTMENT: "/api/roles/departments",
};

async function fetchRoleScope<T extends ScopeType>(
  type: T,
): Promise<StandardResponse<RoleScopeMap[T]>> {
  const res = await fetch(ENDPOINTS[type]);
  if (!res.ok) throw new Error("Failed to fetch role scope");
  const json = (await res.json()) as StandardResponse<RoleScopeMap[T]>;
  return json;
}

export default function useRoleScope(type: ScopeType) {
  const query = useQuery({
    queryKey: [ROLE_QUERY_KEYS.API_GET_SCOPE, type],
    queryFn: () => fetchRoleScope(type),
    staleTime: 1000 * 60, // 1 menit
    gcTime: 5 * 60 * 1000, // 5 menit
    retry: 1,
  });

  return useMemo(
    () => ({
      data:
        query.data?.status === "success" && Array.isArray(query.data?.data)
          ? query.data?.data
          : [],
      loading: query.isFetching || query.isLoading,
    }),
    [query.isFetching, query.isLoading, query.data],
  );
}
