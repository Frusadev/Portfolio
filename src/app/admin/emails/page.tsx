import * as React from "react";
import { EmailSender } from "@/components/admin/email-sender";

export const metadata = {
  title: "Send Email — Admin",
};

export default function AdminEmailsPage() {
  return <EmailSender />;
}
