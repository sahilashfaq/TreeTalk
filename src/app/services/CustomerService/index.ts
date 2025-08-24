// services/customer.service.ts
type Provider = {
  _id: number;
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

type Appointment = {
  id: number;
  patient_id: number;
  appointment_date: string;
  appointment_time: string;
  status: string;
  post: {
    doctor: {
      username: string;
      email: string;
    };
    specialization: string;
    consultation_fee: string;
  };
};

type GetAppointmentsResponse = {
  message: string;
  appointments: Appointment[];
};

class Customer {
  async getAllProviders(): Promise<Provider[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/service/getAll`
    );

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to fetch providers");
    }

    return json;
  }

  async bookAppointment({
    service_id,
    patient_id,
    appointment_date,
    appointment_time,
  }: {
    service_id: any;
    patient_id: any;
    appointment_date: string;
    appointment_time: string;
  }): Promise<{ message: string }> {
    console.log(
      "service_id",
      service_id,
      "patient_id",
      patient_id,
      "appointment_date",
      appointment_date
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id,
          patient_id,
          appointment_date,
          appointment_time,
        }),
      }
    );

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to book appointment");
    }

    return json;
  }

  async getAppointmentsById({
    patient_id,
  }: {
    patient_id: number;
  }): Promise<any> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/getUserBookings/${patient_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to fetch appointment");
    }

    return json;
  }

  async rescheduleAppointment({
    id,
    appointment_date,
  }: {
    id: number;
    appointment_date: string;
  }): Promise<{
    message: string;
    appointment: Appointment;
  }> {
    const res = await fetch("http://localhost:3002/api/v1/appointment/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, appointment_date }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to reschedule appointment");
    }

    return json;
  }

  async cancelAppointment({
    id,
    status,
  }: {
    id: number;
    status: string;
  }): Promise<any> {
    const res = await fetch(
      `http://localhost:3002/api/v1/appointment/updateStatus/${id}/${status}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to cancel appointment");
    }

    return json;
  }

  async storeRatingForDoctor({
    currentUserId,
    post_id,
    rating,
  }: {
    currentUserId: number;
    post_id: number;
    rating: any;
  }): Promise<any> {
    const res = await fetch(`http://localhost:3002/api/v1/rating/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient_id: currentUserId,
        post_id,
        rating,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to add rating");
    }

    return json;
  }
}

const CustomerService = new Customer();
export default CustomerService;
