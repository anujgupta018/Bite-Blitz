import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantFrom from "@/forms/manage-restaurant-form/ManageRestaurantFrom";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  return (
    <ManageRestaurantFrom
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isLoading}
    />
  );
}
