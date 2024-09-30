import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantFrom from "@/forms/manage-restaurant-form/ManageRestaurantFrom";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  return (
    <ManageRestaurantFrom onSave={createRestaurant} isLoading={isLoading} />
  );
}
