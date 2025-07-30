"use client";

import { Button } from "@/components/ui/button";
import Typography from "@/app/components/Typography";
import TextInput from "@/app/components/Inputs/TextInput";

import { CalendarPicker } from "@/app/components/DatePicker/CalendarPicker";

import { useData } from "../../hooks/useData";

export default function AddService() {
  const {
    submitDoctor,
    register,
    errors,
    onSubmit,
    selectedDate,
    setSelectedDate,
    isPending,
    handleSubmit,
  } = useData();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg p-8 rounded-xl">
        <Typography className="text-center">Doctor Profile</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <TextInput
            id="specialization"
            label="Specialization"
            placeholder="e.g: Cardiologist , Dermatologist"
            register={register}
            error={errors.specialization}
          />

          <TextInput
            id="consultation_fee"
            label="Consultation Fee ($)"
            placeholder="e.g: 50 , 100"
            register={register}
            error={errors.consultation_fee}
            type="number"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability Date
            </label>
            <CalendarPicker
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>

          <TextInput
            label="Next Slot"
            id="next_slot"
            placeholder="e.g. 2:00 pm"
            register={register}
            error={errors.next_slot}
          />

          <Button
            type="submit"
            variant={"default"}
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit Doctor Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}
