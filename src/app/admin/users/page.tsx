import { getUsers } from "@/app/actions/users";
import UsersClientPage from "./client-page";

export default async function UsersPage() {
  const users = await getUsers();
  
  return <UsersClientPage initialUsers={users} />;
}
