"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarDays,
  Clock,
  Mail,
  CheckCircle,
  AlertTriangle,
  Trash,
} from "lucide-react";
import { CalendarPicker } from "@/app/components/DatePicker/CalendarPicker";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useAuth } from "@/app/hooks/useAuth";
import { Loader } from "@/app/components/Loader/spinner";
import { useCustomerData } from "../hooks/useData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StarRating from "@/app/components/Rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Add this

export default function MyBookings() {
  const { user } = useAuth();
  const {
    rescheduleDate,
    rescheduleMutation,
    data,
    isLoading,
    cancelMutation,
    setRescheduleTime,
    setRescheduleDate,
    giveRating,
  } = useCustomerData();
  const [rating, setRating] = useState(0);

  const scheduledBookings = data?.data?.filter(
    (b: any) => b.status === "scheduled"
  );
  const pastBookings = data?.data?.filter((b: any) => b.status === "completed");

  const renderBookings = (bookings: any[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings?.map((booking: any, index: number) => (
        <Card
          key={index}
          className="rounded-lg shadow-sm hover:shadow-xl h-full flex flex-col justify-between"
        >
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-1">
                Id: {booking?.id}
                {booking?.status === "scheduled" ? (
                  <CheckCircle className="text-green-500 w-5 h-5" />
                ) : (
                  <AlertTriangle className="text-yellow-500 w-5 h-5" />
                )}
                <h2 className="text-lg font-semibold">
                  {booking?.post?.doctor?.username}
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {booking?.post?.specialization}
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  {booking?.appointment_date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {booking?.appointment_time}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {booking?.post?.doctor?.email}
                </div>
                <div className="text-blue-600 font-semibold mt-2">
                  Consultation Fee: ${booking?.post?.consultation_fee}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-between items-center gap-3">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  booking?.status === "scheduled"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-300 text-black"
                }`}
              >
                {booking?.status}
              </span>

              <div className="flex gap-2">
                {/* Reschedule */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={
                        booking?.status === "cancelled" ||
                        booking?.status === "completed"
                      }
                    >
                      Reschedule
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4 mt-2 space-y-3">
                    <CalendarPicker
                      selected={rescheduleDate}
                      onSelect={(date) => setRescheduleDate(date)}
                    />
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      disabled={!rescheduleDate}
                      onClick={() => {
                        if (!rescheduleDate || !user?._id) return;
                        const formattedDate = format(
                          rescheduleDate,
                          "MMMM do, yyyy"
                        );
                        rescheduleMutation.mutate({
                          id: booking?.id,
                          appointment_date: formattedDate,
                        });
                      }}
                    >
                      Submit New Date
                    </Button>
                  </PopoverContent>
                </Popover>

                {/* Cancel */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={
                        booking?.status === "cancelled" ||
                        booking?.status === "completed"
                      }
                    >
                      <Trash className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to cancel this booking?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          if (!booking?.id) return;
                          cancelMutation.mutate({
                            id: booking.id,
                            status: "cancelled",
                          });
                        }}
                      >
                        Confirm Cancel
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="mt-4"
                  size="sm"
                  disabled={
                    booking?.status === "cancelled" ||
                    booking?.status === "completed"
                  }
                >
                  Complete Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rate your experience</DialogTitle>
                </DialogHeader>
                <div className="my-4 text-center">
                  <StarRating onChange={(val) => setRating(val)} />
                </div>
                <Button
                  className="w-full"
                  disabled={rating === 0}
                  onClick={() => {
                    if (!booking?.id) return;
                    cancelMutation.mutate({
                      id: booking.id,
                      status: "completed",
                    });
                    giveRating.mutate({
                      currentUserId: user?._id!,
                      post_id: booking?.post_id,
                      rating,
                    });
                  }}
                >
                  Submit & Complete
                </Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-6 bg-[#f0f9ff] min-h-screen">
          <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

          <Tabs defaultValue="scheduled" className="w-full">
            <TabsList>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="scheduled">
              {renderBookings(scheduledBookings)}
            </TabsContent>
            <TabsContent value="completed">
              {renderBookings(pastBookings)}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}
