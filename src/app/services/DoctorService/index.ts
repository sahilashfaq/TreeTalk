// services/doctor.service.ts

class Doctor {
  async addDoctorProfile(payload: {
    doctor_id: number;
    specialization: string;
    consultation_fee: string;
    availability: string;
    next_slot: string;
  }) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/service/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit doctor profile");
    }

    return response.json();
  }
}

const DoctorService = new Doctor();
export default DoctorService;
