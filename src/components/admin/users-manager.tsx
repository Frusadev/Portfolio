"use client";

import * as React from "react";
import { toggleUserStatus } from "@/app/actions/users";
import { toast } from "sonner";
import { Users, Shield, CheckCircle2, XCircle, Loader2 } from "lucide-react";

export interface UserItem {
  id: string;
  name?: string | null;
  email: string;
  role?: string | null;
  isActive?: boolean | null;
  createdAt: Date;
}

export function UsersManager({ initialUsers }: { initialUsers: UserItem[] }) {
  const [users, setUsers] = React.useState<UserItem[]>(initialUsers);
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleToggleStatus = async (user: UserItem) => {
    setLoadingId(user.id);
    const current = user.isActive ?? true;
    try {
      const res = await toggleUserStatus(user.id, current);
      if (res.success) {
        toast.success(
          `User ${!current ? "activated" : "deactivated"} successfully`
        );
        setUsers((prev) =>
          prev.map((u) =>
            u.id === user.id ? { ...u, isActive: !current } : u
          )
        );
      } else {
        toast.error(res.error || "Failed to update user status");
      }
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
          Users & Accounts
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Registered readers, contributors, and administrators.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {users.length === 0 ? (
          <div className="rounded-3xl bg-surface/30 p-12 text-center text-xs font-mono text-text-muted">
            No registered users found.
          </div>
        ) : (
          users.map((user) => {
            const isActive = user.isActive ?? true;
            const isAdmin = user.role === "admin";

            return (
              <div
                key={user.id}
                className="rounded-3xl bg-surface/40 hover:bg-surface/50 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface_elevated flex items-center justify-center text-xs font-mono text-text-primary shrink-0">
                    {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-medium text-text-primary">
                        {user.name || "Anonymous User"}
                      </span>
                      {isAdmin && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-accent-secondary bg-surface_elevated px-2 py-0.5 rounded-full">
                          <Shield className="w-3 h-3" />
                          admin
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-text-muted">
                      {user.email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <span className="text-xs font-mono text-text-muted">
                    Joined{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleStatus(user)}
                    disabled={loadingId === user.id}
                    className="rounded-full bg-surface_elevated hover:bg-surface_elevated/80 px-3.5 py-1.5 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
                  >
                    {loadingId === user.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : isActive ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <XCircle className="w-3 h-3 text-red-400" />
                    )}
                    <span>{isActive ? "active" : "inactive"}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default UsersManager;
