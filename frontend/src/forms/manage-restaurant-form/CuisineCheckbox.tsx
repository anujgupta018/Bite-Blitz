import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};
export default function CuisineCheckbox({ cuisine, field }: Props) {
  const values = Array.isArray(field.value) ? field.value : [];
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none h-5 w-5"
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...values, cuisine]);
            } else {
              field.onChange(
                values.filter((value: string) => value !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
}
