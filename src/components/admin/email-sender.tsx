"use client";

import * as React from "react";
import { sendAdminDirectEmail } from "@/app/actions/admin-email";
import { toast } from "sonner";
import { Mail, Send, Loader2 } from "lucide-react";

export function EmailSender() {
  const [to, setTo] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill in recipient, subject, and message");
      return;
    }

    setSending(true);
    try {
      const res = await sendAdminDirectEmail({
        to: to.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      if (res.success) {
        toast.success(`Email transmitted to ${to}`);
        setTo("");
        setSubject("");
        setMessage("");
      } else {
        toast.error(res.error || "Failed to transmit email");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
          Send Email
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Compose and dispatch notifications, transactional updates, or direct inquiries.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-surface/40 p-6 sm:p-10 flex flex-col gap-6"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-accent-secondary">
          <Mail className="w-4 h-4" />
          <span>Outbound mail transmitter</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted">
              recipient email address *
            </label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@domain.com"
              required
              className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted">subject line *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Update regarding research project"
              required
              className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-text-muted">message content *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your email body here..."
            rows={6}
            required
            className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-white/20 border-0 resize-none"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={sending}
            className="rounded-full bg-text-primary text-background hover:bg-white text-xs font-medium px-6 py-2.5 transition-all disabled:opacity-40 flex items-center gap-2"
          >
            {sending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>send email</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailSender;
