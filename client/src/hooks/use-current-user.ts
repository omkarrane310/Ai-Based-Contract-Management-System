"use client"

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const {
    isLoading,
    isError,
    data: user,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const response = await api.get("/auth/current-user");
        return response.data;
      } catch (error) {
        console.log("Error fetching current user:", error);
        return null; // ✅ Ensuring a proper return instead of breaking the app
      }
    },
  });

  return { isLoading, isError, user };
};
// --------------------

