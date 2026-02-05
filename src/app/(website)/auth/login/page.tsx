"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2, Github } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleGithubSignIn = async () => {
    setLoading(true);
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/",
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
        callbackURL: "/",
      });
      setSent(true);
      toast.success("Magic link sent to your email!");
    } catch {
      toast.error("Failed to send magic link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#e6dcc6]">
      <div className="w-full max-w-md bg-background border-4 border-red-950 shadow-[8px_8px_0px_0px_rgba(69,10,10,1)]">
        <div className="p-8 border-b-4 border-red-950 bg-red-950 text-[#e6dcc6]">
          <h2 className="text-3xl font-bold uppercase tracking-widest text-center">Login</h2>
          <p className="text-center opacity-80 mt-2 text-sm font-mono">
             Admin Access Only
          </p>
        </div>
        
        <div className="p-8 space-y-6">
          {sent ? (
            <div className="text-center space-y-6 animate-in fade-in zoom-in-95">
              <div className="bg-red-950/5 border-2 border-red-950 text-red-950 p-6">
                <p className="font-bold text-lg mb-2">Check your email!</p>
                <p className="opacity-80 text-sm">We&apos;ve sent a magic link to your inbox.</p>
              </div>
              <button 
                onClick={() => setSent(false)} 
                className="w-full py-3 bg-transparent border-2 border-red-950 text-red-950 font-bold uppercase tracking-wider hover:bg-red-950 hover:text-[#e6dcc6] transition-colors"
              >
                Try another email
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <button 
                className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-[#e6dcc6] border-2 border-red-950 text-red-950 font-bold uppercase tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_0px_rgba(69,10,10,1)] transition-all"
                onClick={handleGithubSignIn} 
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Github className="h-5 w-5" />
                )}
                <span>GitHub Login</span>
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t-2 border-red-950/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                  <span className="bg-[#e6dcc6] px-4 text-red-950/60">
                    Or via Email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-red-950 tracking-wider ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="flex h-12 w-full bg-white/50 border-2 border-red-950 px-3 py-2 text-red-950 placeholder:text-red-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-950 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 font-bold"
                  />
                </div>
                <button 
                    type="submit" 
                    className="w-full py-3 bg-red-950 text-[#e6dcc6] font-bold uppercase tracking-wider hover:bg-red-900 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]" 
                    disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Magic Link"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
