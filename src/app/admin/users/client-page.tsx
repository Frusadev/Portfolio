"use client";

import { useState } from "react";
import { toggleUserStatus } from "@/app/actions/users";
import { toast } from "sonner";
import { Loader2, Ban, CheckCircle } from "lucide-react";

interface UsersClientPageProps {
  initialUsers: { id: string; name: string | null; email: string; role: string; isActive: boolean; createdAt: Date }[];
}

export default function UsersClientPage({ initialUsers }: UsersClientPageProps) {
  const [users, setUsers] = useState(initialUsers);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    setLoadingId(id);
    const result = await toggleUserStatus(id, currentStatus);
    setLoadingId(null);

    if (result.success) {
      toast.success(currentStatus ? "User deactivated" : "User activated");
      setUsers(users.map(u => u.id === id ? { ...u, isActive: !currentStatus } : u));
    } else {
      toast.error(result.error || "Failed to update user status");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b-4 border-red-950">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-red-950">Users Management</h1>
      </div>

      <div className="overflow-x-auto bg-background border-4 border-red-950 shadow-[8px_8px_0px_0px_rgba(69,10,10,1)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-red-950 text-[#e6dcc6] border-b-4 border-red-950">
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Name</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Email</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Role</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Status</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b-2 border-red-950/20 hover:bg-red-950/5 transition-colors">
                <td className="p-4 font-bold text-red-950">{user.name}</td>
                <td className="p-4 font-medium text-red-950/80">{user.email}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-red-950/10 text-red-950 text-xs font-bold uppercase tracking-widest border-2 border-red-950">
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  {user.isActive ? (
                    <span className="flex items-center gap-2 text-green-700 font-bold uppercase text-xs tracking-wider">
                      <CheckCircle size={14} /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-red-700 font-bold uppercase text-xs tracking-wider">
                      <Ban size={14} /> Inactive
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleToggleStatus(user.id, user.isActive)}
                      disabled={loadingId === user.id}
                      className={`px-3 py-1 font-bold uppercase tracking-wider text-xs border-2 transition-all ${
                        user.isActive
                          ? "border-red-700 text-red-700 hover:bg-red-700 hover:text-white"
                          : "border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
                      }`}
                    >
                      {loadingId === user.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : user.isActive ? (
                        "Deactivate"
                      ) : (
                        "Activate"
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-red-950/60 font-bold uppercase tracking-widest">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
