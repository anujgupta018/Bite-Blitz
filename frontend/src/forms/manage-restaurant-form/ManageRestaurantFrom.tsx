import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "Restaurant Name is required",
    }),
    city: z.string({
      required_error: "City is required",
    }),
    country: z.string({
      required_error: "Country is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery Price is required",
      invalid_type_error: "Must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated Delivery Time is required",
      invalid_type_error: "Must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image url or image file is to be provided",
    path: ["imageFile"],
  });
type RestaurantFormData = z.infer<typeof formSchema>;
type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};
export default function ManageRestaurantFrom({
  onSave,
  isLoading,
  restaurant,
}: Props) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });
  useEffect(() => {
    if (!restaurant) {
      return;
    }
    form.reset(restaurant);
  }, [form, restaurant]);
  const onSubmit = async (formDataJson: RestaurantFormData) => {
    try {
      const formData = new FormData();
      formData.append("restaurantName", formDataJson.restaurantName);
      formData.append("city", formDataJson.city);
      formData.append("country", formDataJson.country);
      formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
      formData.append(
        "estimatedDeliveryTime",
        formDataJson.estimatedDeliveryTime.toString()
      );
      formDataJson.cuisines.forEach((cuisine, index) => {
        formData.append(`cuisines[${index}]`, cuisine);
      });
      formDataJson.menuItems.forEach((menuItem, index) => {
        formData.append(`menuItems[${index}][name]`, menuItem.name);
        formData.append(
          `menuItems[${index}][price]`,
          menuItem.price.toString()
        );
      });
      // formData.append(`imageFile`, formDataJson.imageFile);
      if (formDataJson.imageFile) {
        formData.append("imageFile", formDataJson.imageFile);
      } else {
        console.error("Image file is required but was not provided");
      }
      console.log("Submitting form data:", formDataJson);
      console.log("Menu items:", formDataJson.menuItems);
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      onSave(formData);
      console.log("Restaurant created successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator className="my-6 border-t border-gray-200" />
        <CuisinesSection />
        <Separator className="my-6 border-t border-gray-200" />
        <MenuSection />
        <Separator className="my-6 border-t border-gray-200" />
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            className="bg-gray-700 mt-2 text-white hover:bg-gray-100 hover:text-black"
            type="submit"
          >
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
