"use client";

import { USER_ROLE_QUERY_KEYS } from "@/features/user/consts/user-hooks.const";
import { StandardResponse } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { UserRoleScopeType } from "../types/user.types";

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
  if (!res.ok) throw new Error("Failed to fetch user roles.");
  const result = await res.json();
  return result;
}

export default function useUserRoles(
  userId: number,
  options?: { enabled?: boolean },
) {
  const query = useQuery<StandardResponse<UserRoleScopeType>>({
    queryKey: [USER_ROLE_QUERY_KEYS.API_GET, userId],
    queryFn: ({ signal }) => fetchUserRoles(userId, signal),
    enabled: !!userId && options?.enabled,
    staleTime: 100,
    gcTime: 100,
    retry: 1,
  });

  useEffect(() => {
    console.log({ data: query.data, query });
  }, [query.data, query]);

  return useMemo(
    () => ({
      data:
        query.data?.status === "success" && Array.isArray(query.data?.data)
          ? query.data?.data
          : [],
      isLoading: query.isFetching || query.isLoading,
      error: query.error,
      refetch: query.refetch,
    }),
    [query.data, query.isFetching, query.isLoading, query.error, query.refetch],
  );
}
