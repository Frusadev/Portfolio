import { getCurrentUserProfile } from "@/app/actions/users";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage() {
  const user = await getCurrentUserProfile();

  if (!user) {
    redirect("/auth/login");
  }

  // Only redirect to /onboarding if user hasn't onboarded yet
  if (!user.onboarded) {
    redirect("/onboarding");
  }

  // Returning onboarded user
  redirect("/");
}
