"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function WishlistForm({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className={`text-sm font-semibold ${variant === "dark" ? "text-zinc-300" : "text-zinc-600"} ${className}`}>
        You&apos;re on the list — we&apos;ll be in touch when we launch.
      </p>
    );
  }

  const inputClass =
    variant === "dark"
      ? "w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-base text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
      : "w-full rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-black focus:outline-none shadow-sm";

  const buttonClass =
    variant === "dark"
      ? "shrink-0 rounded-full bg-white px-6 py-3 text-base font-bold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
      : "shrink-0 rounded-full bg-black px-6 py-3 text-base font-bold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50";

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className={inputClass}
        />
        <button type="submit" disabled={status === "loading"} className={buttonClass}>
          {status === "loading" ? "Joining…" : "Join waitlist"}
        </button>
      </form>
      {status === "error" && (
        <p className={`mt-2 text-sm font-medium ${variant === "dark" ? "text-red-400" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
