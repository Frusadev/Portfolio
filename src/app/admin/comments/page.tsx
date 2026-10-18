import * as React from "react";
import { getAllComments } from "@/app/actions/comments";
import { CommentsManager } from "@/components/admin/comments-manager";

export const metadata = {
  title: "Comments — Admin",
};

export default async function AdminCommentsPage() {
  const comments = await getAllComments();

  return <CommentsManager initialComments={comments} />;
}
