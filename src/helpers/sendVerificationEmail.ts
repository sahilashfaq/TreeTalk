import { ApiResponse } from "@/types/ApiResponse";
import { Resend } from "resend";
import VerificationEmail from "../../emails/VerificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // const { data, error } =
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Mystry message | Verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Mystry message | Verification code",
    };
  } catch (error) {
    console.error("Error sending verification email", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
