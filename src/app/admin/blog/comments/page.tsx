import { getAllComments } from "@/app/actions/comments";
import CommentsClientPage from "./client-page";

export default async function AdminCommentsPage() {
  const comments = await getAllComments();
  
  return <CommentsClientPage initialComments={comments} />;
}
