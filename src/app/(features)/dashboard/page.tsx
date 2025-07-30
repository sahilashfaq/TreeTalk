"use client";

import { useState, useEffect } from "react";
import Typography from "@/app/components/Typography";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/app/hooks/useAuth";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/constants";
import AddService from "./components/Doctor/DoctorDashboard";
import DoctorDashboardContent from "./components/Doctor/DashboardContent";
import AdminDashboard from "./components/Admin/AdminDashboard";

type User = {
  id: number;
  username: string;
  email: string;
  role: "Admin" | "Service Provider" | "Customer";
  createdAt: string;
};

export default function Dashboard() {
  // const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const dummyData = {
    totalBookings: 148,
    revenue: 87000,
    providers: 24,
    upcomingAppointments: 7,
    earnings: 52522,
    upcoming: [
      { id: 1, date: "2025-08-01", providerName: "Dr. Sana" },
      { id: 2, date: "2025-08-03", providerName: "Dr. Khan" },
    ],
  };

  if (!user) {
    return (
      <div className="text-center">
        <Typography className="text-center">
          Please Sign In to view your dashboard.
        </Typography>
        <Button className="mt-5" onClick={() => router.push(ROUTES.SIGN_IN)}>
          Click here to Sign In!
        </Button>
      </div>
    );
  }

  const { username, role } = user;

  return (
    <div className="space-y-6">
      <Typography variant="h1">Welcome, {username}!</Typography>
      <Typography variant="h2">Role: {role}</Typography>

      {/* ==== ADMIN DASHBOARD ==== */}
      {role === "Admin" && <AdminDashboard />}

      {/* ==== SERVICE PROVIDER DASHBOARD ==== */}
      {role === "Service Provider" && (
        <>
          <AddService />
          <DoctorDashboardContent />
        </>
      )}

      {/* ==== CUSTOMER DASHBOARD ==== */}
      {role === "Customer" && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-muted-foreground">Upcoming Bookings</p>
              {dummyData.upcoming.length === 0 ? (
                <p>No upcoming appointments</p>
              ) : (
                <ul className="list-disc pl-5">
                  {dummyData.upcoming.map((appt) => (
                    <li key={appt.id}>
                      {appt.date} with {appt.providerName}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
