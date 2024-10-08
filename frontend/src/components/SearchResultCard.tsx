import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

export default function SearchResultCard({ restaurant }: Props) {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr]"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt=""
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="ml-3 text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex ml-3">
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-green-500">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery From ₹{restaurant.deliveryPrice}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
