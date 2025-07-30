import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Typography from "@/app/components/Typography";
import TextInput from "@/app/components/Inputs/TextInput";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarPicker } from "@/app/components/DatePicker/CalendarPicker";
import { useAuth } from "@/app/hooks/useAuth";
import DoctorService from "@/app/services/DoctorService";
import { showToast } from "@/app/components/Popups/Sonnet";
import { ServiceFormData } from "./type";

export const useData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const { user } = useAuth();

  const { mutate: submitDoctor, isPending } = useMutation({
    mutationFn: DoctorService.addDoctorProfile,
    onSuccess: (data) => {
      showToast({
        message: "Success",
        description: "Your service has been posted successfully. ",
        variant: "success",
      });
    },
    onError: (error: any) => {
      alert(error.message || "Failed to submit doctor profile");
    },
  });

  const onSubmit = (data: ServiceFormData) => {
    if (!selectedDate) {
      showToast({
        message: "Date error",
        description: "Please select a date",
        variant: "error",
      });
      return;
    }

    const formattedDate = format(selectedDate, "PPP");

    const payload = {
      doctor_id: user?.id!,
      specialization: data.specialization,
      consultation_fee: data.consultation_fee,
      availability: formattedDate,
      next_slot: data.next_slot,
    };

    submitDoctor(payload);
  };
  return {
    submitDoctor,
    register,
    errors,
    onSubmit,
    selectedDate,
    setSelectedDate,
    isPending,
    handleSubmit,
  };
};
