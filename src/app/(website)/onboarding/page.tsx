import * as React from "react";
import { getCurrentUserProfile } from "@/app/actions/users";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/auth/onboarding-form";

export const metadata = {
  title: "Onboarding — Daniel Ametsowou",
  description: "Set up your username and notification preferences.",
};

export default async function OnboardingPage() {
  const user = await getCurrentUserProfile();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <main className="min-h-screen w-full bg-background text-foreground flex items-center justify-center px-6 py-28 md:py-36 select-none">
      <OnboardingForm user={user} />
    </main>
  );
}
