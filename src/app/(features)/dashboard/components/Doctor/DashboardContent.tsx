"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const base_url = "http://localhost:3002"; // Replace if different

async function fetchDoctorDashboardData() {
  const res = await fetch(
    `${base_url}/api/v1/appointment/calculateTotalIncome/35`
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch income data");
  }

  return data;
}

export default function DoctorDashboardContent() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctorIncome"],
    queryFn: fetchDoctorDashboardData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load data</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">Upcoming Appointments</p>
            <p className="text-xl font-bold">{data?.scheduledCount || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">Monthly Earnings</p>
            <p className="text-xl font-bold">Rs {data?.totalIncome || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground">Monthly Earnings</p>
            <p className="text-xl font-bold">
              Completed: {data?.completedCount || 0}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
