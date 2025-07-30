// components/Rating/StarRating.tsx
import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({
  onChange,
}: {
  onChange: (value: number) => void;
}) {
  const [rating, setRating] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          onClick={() => handleClick(value)}
          className={`w-6 h-6 cursor-pointer ${
            value <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
