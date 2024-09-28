import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "restaurant name is required",
  }),
  city: z.string({
    required_error: "city is required",
  }),
  country: z.string({
    required_error: "country is required",
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
  imageFile: z.instanceof(File, { message: "Image is required" }),
});
type restaurantFormData = z.infer<typeof formSchema>;
type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};
export default function ManageRestaurantFrom({ onSave, isLoading }: Props) {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });
  const onSubmit = (formDataJson: restaurantFormData) => {};
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="spacey-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator className="my-6 border-t border-gray-200" />
        <CuisinesSection />
      </form>
    </Form>
  );
}
