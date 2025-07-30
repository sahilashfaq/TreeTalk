"use client";

import Typography from "@/app/components/Typography";
import ProviderCard from "./components/ProviderCard";
import { useQuery } from "@tanstack/react-query";
import CustomerService from "@/app/services/CustomerService";

type Provider = {
  id: number;
  name: string;
  specialization: string;
  consultation_fee: string;
  availability: string;
  next_slot: string;
  createdAt: string;
  updatedAt: string;
  doctor: {
    id: number;
    username: string;
    email: string;
  };
};

export default function ProvidersList() {
  const { data, isLoading, isError } = useQuery<Provider[]>({
    queryKey: ["providers"],
    queryFn: CustomerService.getAllProviders,
  });

  console.log("All Providers list", data);

  return (
    <>
      <Typography className="text-center">
        Find Your Service Provider
      </Typography>
      <Typography variant="h4" className="text-center mt-4 mb-4">
        Browse through our network of verified healthcare professionals and book
        your appointment
      </Typography>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          <p className="col-span-full text-center">Loading providers...</p>
        )}
        {isError && (
          <p className="col-span-full text-center text-red-500">
            Failed to load providers.
          </p>
        )}

        {data?.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={{
              id: provider.id,
              name: provider.name,
              specialization: provider.specialization,
              consultation_fee: provider.consultation_fee,
              availability: provider.availability,
              nextAvailable: provider.next_slot,
              doctor: provider.doctor, // now matches the expected type
            }}
          />
        ))}
      </div>
    </>
  );
}
