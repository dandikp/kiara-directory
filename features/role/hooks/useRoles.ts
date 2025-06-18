import { StandardResponse } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";
import { ROLE_QUERY_KEYS } from "../config/role.config";
import { SafeRoleType } from "../types/role.types";
import { useMemo } from "react";

const fetchRoles = async () => {
  const res = await fetch("/api/roles");
  if (!res.ok) throw new Error("Failed to fetch roles");
  return res.json();
};

export default function useRoles(): {
  roles: SafeRoleType[];
  loading: boolean;
} {
  const query = useQuery<StandardResponse<SafeRoleType>>({
    queryKey: [ROLE_QUERY_KEYS.API_GET],
    queryFn: fetchRoles,
    staleTime: 1000 * 60, // 1 menit
    gcTime: 5 * 60 * 1000, // 5 menit
    retry: 1,
  });

  return useMemo(
    () => ({
      roles:
        query.data?.status === "success" && Array.isArray(query.data?.data)
          ? query.data?.data
          : [],
      loading: query.isFetching || query.isLoading,
    }),
    [query.isFetching, query.isLoading, query.data],
  );
}
