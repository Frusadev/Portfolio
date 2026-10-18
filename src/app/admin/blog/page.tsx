import { redirect } from "next/navigation";

export default function AdminBlogRedirect() {
  redirect("/admin/articles");
}
