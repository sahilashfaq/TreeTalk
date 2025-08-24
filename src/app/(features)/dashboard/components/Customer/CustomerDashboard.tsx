"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

async function fetchCustomerDashboardData(userId: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/service/getAll`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch dashboard data");
  }

  return data;
}

export default function CustomerDashboardContent() {
  const { user } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["doctorDashboard", user?.id],
    queryFn: () => fetchCustomerDashboardData(user?.id!),
    enabled: !!user?.id, // only fetch when user is loaded
  });

  if (!user?.id) return <p>Loading user...</p>;
  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p>Error: {(error as Error)?.message}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground">Scheduled Appointments</p>
          <p className="text-xl font-bold">
            {data?.totalScheduledAppointments || 0}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground">Completed Appointments</p>
          <p className="text-xl font-bold">
            {data?.totalCompletedAppointments || 0}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
