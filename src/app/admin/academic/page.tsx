import * as React from "react";
import { getCurrentAcademicWork } from "@/app/actions/portfolio";
import { AcademicEditor } from "@/components/admin/academic-editor";

export const metadata = {
  title: "Academic Occupation — Admin",
};

export default async function AdminAcademicPage() {
  const currentWork = await getCurrentAcademicWork();

  return <AcademicEditor initialData={currentWork} />;
}
