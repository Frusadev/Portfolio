"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { updateCurrentUserProfile } from "@/app/actions/users";
import { toast } from "sonner";
import { Loader2, ArrowRight, UserCheck, Mail } from "lucide-react";

interface OnboardingFormProps {
  user: {
    id: string;
    email: string;
    name?: string | null;
    handle?: string | null;
    receiveEmails?: boolean | null;
  };
}

export function OnboardingForm({ user }: OnboardingFormProps) {
  const router = useRouter();
  const [handle, setHandle] = React.useState(user.handle || "");
  const [name, setName] = React.useState(user.name || "");
  const [receiveEmails, setReceiveEmails] = React.useState(
    user.receiveEmails ?? true
  );
  const [saving, setSaving] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateCurrentUserProfile({
        handle: handle.trim().replace(/^@/, ""),
        name: name.trim() || undefined,
        receiveEmails,
      });

      if (res.success) {
        toast.success("Profile preferences saved");
        router.push("/");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to update profile");
      }
    } catch {
      toast.error("An error occurred while saving profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-surface/50 p-8 sm:p-12 flex flex-col gap-8 shadow-2xl max-w-lg w-full"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-mono text-accent-secondary">
          <UserCheck className="w-4 h-4" />
          <span>Profile & preferences</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
          Welcome
        </h1>
        <p className="text-sm text-text-secondary">
          Choose how you appear in discussions and set your email notification preferences.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Username / Handle */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="handle"
            className="text-xs font-mono text-text-secondary ml-1"
          >
            username
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-sm font-mono text-text-muted">
              @
            </span>
            <input
              id="handle"
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/\s+/g, ""))}
              placeholder="username"
              required
              className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl pl-9 pr-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all border-0 font-mono"
            />
          </div>
          <span className="text-[11px] font-mono text-text-muted ml-1">
            Used to identify you in discussions and comments.
          </span>
        </div>

        {/* Display Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-xs font-mono text-text-secondary ml-1"
          >
            display name (optional)
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all border-0"
          />
        </div>

        {/* Email notifications opt-in / opt-out */}
        <div className="pt-2">
          <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-surface_elevated/40 hover:bg-surface_elevated/60 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={receiveEmails}
              onChange={(e) => setReceiveEmails(e.target.checked)}
              className="mt-1 w-4 h-4 rounded bg-surface_elevated border-0 text-text-primary focus:ring-0 cursor-pointer"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-text-primary flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-accent-secondary" />
                Receive emails from Daniel
              </span>
              <span className="text-[11px] text-text-secondary leading-relaxed">
                Occasional emails about new long-form essays, creative experiments, and replies to your comments. You can uncheck this to opt out anytime.
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors py-2"
        >
          skip for now
        </button>

        <button
          type="submit"
          disabled={saving || !handle.trim()}
          className="rounded-full bg-text-primary text-background hover:bg-white text-xs font-medium px-6 py-3 transition-all disabled:opacity-40 flex items-center gap-2"
        >
          {saving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <ArrowRight className="w-3.5 h-3.5" />
          )}
          <span>save & continue</span>
        </button>
      </div>
    </form>
  );
}

export default OnboardingForm;
