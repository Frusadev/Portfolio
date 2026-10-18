"use client";

import * as React from "react";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { GitHubIcon } from "@/components/icons/github-icon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleGithubSignIn = async () => {
    setLoading(true);
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/onboarding",
      });
    } catch {
      toast.error("Failed to sign in with GitHub");
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn.magicLink({
        email,
        callbackURL: "/onboarding",
      });
      setSent(true);
      toast.success("Magic link sent to your email");
    } catch {
      toast.error("Failed to send magic link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground flex items-center justify-center px-6 py-28 md:py-36 select-none">
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col text-center gap-2">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
            Welcome back
          </h1>
          <p className="text-sm text-text-secondary">
            Sign in to access admin tools or leave comments on articles.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-surface/50 p-8 sm:p-10 flex flex-col gap-6 shadow-2xl">
          {sent ? (
            <div className="text-center flex flex-col items-center gap-4 py-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-surface_elevated flex items-center justify-center text-text-primary">
                ✉️
              </div>
              <h2 className="text-lg font-medium text-text-primary">
                Check your inbox
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                We sent a secure magic link to{" "}
                <span className="text-text-primary font-mono">{email}</span>. Click
                the link to sign in automatically.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-4 text-xs font-mono text-accent-secondary hover:text-white transition-colors"
              >
                ← Use a different email
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* GitHub Button */}
              <button
                type="button"
                onClick={handleGithubSignIn}
                disabled={loading}
                className="w-full py-3.5 px-5 flex items-center justify-center gap-3 rounded-full bg-white hover:bg-neutral-100 text-[#0a0a0a] font-medium text-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-neutral-800" />
                ) : (
                  <GitHubIcon className="w-4 h-4 text-neutral-900" />
                )}
                <span>Continue with GitHub</span>
              </button>

              {/* Soft Divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="w-full h-px bg-white/[0.06]" />
                <span className="absolute bg-[#0a0a0a] px-3 text-[11px] font-mono text-text-muted">
                  or with email
                </span>
              </div>

              {/* Magic Link Email Form */}
              <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-mono text-text-secondary ml-1"
                  >
                    email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    required
                    disabled={loading}
                    className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all border-0"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="w-full py-3.5 px-5 mt-2 rounded-full bg-surface_elevated hover:bg-surface_elevated/80 text-text-primary text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Send magic link</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
