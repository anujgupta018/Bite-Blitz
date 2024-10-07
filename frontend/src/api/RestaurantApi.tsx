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
      params.set("page", searchState.page.toString()); // Correcting the parameter case

      const url = `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`;
      console.log("Fetching URL:", url); // Logging the URL for debugging

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch restaurants: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      // Optionally, you can throw the error again to let react-query handle it
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
      retry: false, // Optional: disable automatic retries if the API fails
    }
  );

  return { results, isLoading, error };
};
