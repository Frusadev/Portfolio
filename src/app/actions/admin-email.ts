"use server";

import { sendEmail } from "@/core/services/email";
import { getCurrentUser } from "./auth";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function sendAdminDirectEmail({
  to,
  subject,
  message,
}: {
  to: string;
  subject: string;
  message: string;
}) {
  await requireAdmin();

  try {
    await sendEmail({
      to,
      subject,
      text: message,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send admin email:", error);
    return {
      success: false,
      error: (error as Error).message || "Failed to send email",
    };
  }
}
