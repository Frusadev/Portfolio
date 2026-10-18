import * as React from "react";
import { getProjects } from "@/app/actions/portfolio";
import { ProjectsManager } from "@/components/admin/projects-manager";

export const metadata = {
  title: "Projects — Admin",
};

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return <ProjectsManager initialProjects={projects} />;
}
