import * as React from "react";
import { getUsers } from "@/app/actions/users";
import { UsersManager } from "@/components/admin/users-manager";

export const metadata = {
  title: "Users — Admin",
};

export default async function AdminUsersPage() {
  const users = await getUsers();

  return <UsersManager initialUsers={users} />;
}
