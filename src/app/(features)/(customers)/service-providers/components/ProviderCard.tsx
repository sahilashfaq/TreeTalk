import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/app/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailIcon, Calendar, Clock } from "lucide-react";
import CustomerService from "@/app/services/CustomerService";
import { showToast } from "@/app/components/Popups/Sonnet";

type ProviderCardProps = {
  provider: {
    _id: any;
    name: string;
    specialization: string;
    consultation_fee: string;
    availability: string; // e.g. "July 31st, 2025"
    nextAvailable: string; // e.g. "11:30 am"
    doctor: {
      id: number;
      username: string;
      email: string;
    };
  };
};

export default function ProviderCard({ provider }: ProviderCardProps) {
  const { user } = useAuth();
  console.log("Provider data", provider);

  const { mutate: bookAppointment, isPending } = useMutation({
    mutationFn: () =>
      CustomerService.bookAppointment({
        service_id: provider._id,
        patient_id: user?._id!,
        appointment_date: provider.availability,
        appointment_time: provider.nextAvailable,
      }),
    onSuccess: (data) => {
      showToast({
        message: "Success",
        description: "Appointment booked successfully!",
        variant: "success",
      });
    },
    onError: (error: any) => {
      showToast({
        message: "Error",
        description: error.message || "Appointment Booking Error!",
        variant: "error",
      });
    },
  });

  return (
    <Card className="rounded-2xl shadow-md p-4 w-full max-w-sm bg-white">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 rounded-full p-4">
            <span className="text-2xl">👨‍⚕️</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold"> {provider?.doctor?.username}</h2>
            <p className="text-sm text-gray-500">{provider.specialization}</p>
          </div>
        </div>

        <div className="text-sm text-blue-500 font-bold flex items-center gap-1">
          Consultation Fee: ${provider.consultation_fee}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MailIcon className="w-4 h-4 text-yellow-500" />
          <span className="font-semibold text-gray-700">
            {provider?.doctor?.email}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-green-600" />
          <span className="text-green-600">
            Available: {provider.availability}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          Available Slot: {provider.nextAvailable}
        </div>

        {user?.role !== "Admin" && (
          <div className="flex flex-col gap-2 pt-2">
            <Button onClick={() => bookAppointment()} disabled={isPending}>
              {isPending ? "Booking..." : "Book Appointment"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
