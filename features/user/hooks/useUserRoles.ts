import { USER_ROLE_QUERY_KEYS } from "@/features/user/consts/user-hooks.const";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const ENDPOINTS = {
  USER_ROLES: "/api/users/[userId]/roles",
};

function getEndpoint(type: keyof typeof ENDPOINTS, userId?: number): string {
  let endpoint = ENDPOINTS[type];
  if (userId !== undefined)
    endpoint = endpoint.replace("[userId]", userId.toString());
  return endpoint;
}

async function fetchUserRoles(userId: number, signal?: AbortSignal) {
  const res = await fetch(getEndpoint("USER_ROLES", userId), { signal });
  if (res.ok) throw new Error("Failed to fetch user roles.");
  return await res.json();
}

export default function useUserRoles(
  userId: number,
  options?: { enabled?: boolean },
) {
  const query = useQuery({
    queryKey: [USER_ROLE_QUERY_KEYS.API_GET, userId],
    queryFn: ({ signal }) => fetchUserRoles(userId, signal),
    enabled: !!userId && options?.enabled,
    staleTime: 60_000,
    gcTime: 300_000,
    retry: 1,
  });

  return useMemo(
    () => ({
      data: query.data && Array.isArray(query.data) ? query.data : [],
      isLoading: query.isFetching || query.isLoading,
      error: query.error,
      refetch: query.refetch,
    }),
    [query.data, query.isFetching, query.isLoading, query.error, query.refetch],
  );
}
