import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Typography from "@/app/components/Typography";
import TextInput from "@/app/components/Inputs/TextInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarPicker } from "@/app/components/DatePicker/CalendarPicker";
import { useAuth } from "@/app/hooks/useAuth";
import DoctorService from "@/app/services/DoctorService";
import { showToast } from "@/app/components/Popups/Sonnet";
import { ServiceFormData } from "../../service-providers/type";
import CustomerService from "@/app/services/CustomerService";

export const useCustomerData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>();
  const queryClient = useQueryClient();

  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>();
  const [rescheduleTime, setRescheduleTime] = useState<any>();

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

  const { data, isLoading } = useQuery({
    queryKey: ["appointmentsByPatientId", user?.id], // Unique cache key
    queryFn: () =>
      CustomerService.getAppointmentsById({ patient_id: user?.id! }),
    enabled: !!user?.id,
  });

  const rescheduleMutation = useMutation({
    mutationFn: (data: { id: number; appointment_date: string }) =>
      CustomerService.rescheduleAppointment(data),
    onSuccess: (response) => {
      showToast({
        message: "Success",
        description: response?.message || "Rescheduled successfully",
        variant: "success",
      });

      //  Invalidate query to refetch updated appointments
      if (user?.id) {
        queryClient.invalidateQueries({
          queryKey: ["appointmentsByPatientId", user.id],
        });
      }
      setRescheduleDate(undefined);
    },
    onError: (error: any) => {
      alert(error.message || "Something went wrong while rescheduling.");
    },
  });

  const cancelMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      CustomerService.cancelAppointment({ id, status }),
    onSuccess: () => {
      showToast({
        message: "Success",
        description: "Appointment status updated successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["appointmentsByPatientId"] });
    },
    onError: (error: any) => {
      showToast({
        message: "Error",
        description: error?.message || "Something went wrong",
        variant: "error",
      });
    },
  });

  const giveRating = useMutation({
    mutationFn: ({
      currentUserId,
      post_id,
      rating,
    }: {
      currentUserId: number;
      post_id: number;
      rating: any;
    }) =>
      CustomerService.storeRatingForDoctor({
        currentUserId,
        post_id,
        rating,
      }),
    onSuccess: () => {
      showToast({
        message: "Success",
        description: "Appointment status updated successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["storeRatingForDoctor"] });
    },
    onError: (error: any) => {
      showToast({
        message: "Error",
        description: error?.message || "Something went wrong",
        variant: "error",
      });
    },
  });

  return {
    submitDoctor,
    register,
    errors,
    onSubmit,
    selectedDate,
    setSelectedDate,
    isPending,
    handleSubmit,
    rescheduleDate,
    setRescheduleDate,
    rescheduleMutation,
    data,
    giveRating,
    isLoading,
    rescheduleTime,
    setRescheduleTime,
    cancelMutation,
  };
};
