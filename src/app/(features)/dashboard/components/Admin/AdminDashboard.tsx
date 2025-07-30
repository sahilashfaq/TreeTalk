"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:3002/api/v1/appointment/allData"
      );
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading data</div>;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Total Revenue
            </h2>
            <p className="text-2xl font-bold text-green-600">
              $ {data.totalRevenue}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              Total Completed Appointments
            </h2>
            <p className="text-2xl font-bold text-blue-600">
              {data.totalCompletedAppointments}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">#</TableHead>
                <TableHead className="text-left">Doctor Email</TableHead>
                <TableHead className="text-left">Total Income</TableHead>
                <TableHead className="text-left">Completed</TableHead>
                <TableHead className="text-left">Scheduled</TableHead>
                <TableHead className="text-left">Avg. Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.doctors.map((doctor: any, index: any) => (
                <TableRow key={doctor.doctorId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>Rs. {doctor.totalIncome}</TableCell>
                  <TableCell>{doctor.completedCount}</TableCell>
                  <TableCell>{doctor.scheduledCount}</TableCell>
                  <TableCell>{doctor.averageRating} ⭐</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
