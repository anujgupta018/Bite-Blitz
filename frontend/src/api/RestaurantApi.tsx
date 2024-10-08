import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<
    RestaurantSearchResponse | undefined
  > => {
    try {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectedCuisines", searchState.selectedCuisines.join(","));

      const url = `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`;
      console.log("Fetching URL:", url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch restaurants: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching restaurants:", error);

      throw error;
    }
  };

  const {
    data: results,
    isLoading,
    error,
  } = useQuery(
    ["searchRestaurants", searchState.searchQuery, searchState.page, city],
    createSearchRequest,
    {
      enabled: !!city,
      retry: false,
    }
  );

  return { results, isLoading, error };
};
