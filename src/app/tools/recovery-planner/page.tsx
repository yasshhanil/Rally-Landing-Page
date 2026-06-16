import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import RecoveryPlannerForm from "@/components/RecoveryPlannerForm";

export const metadata: Metadata = {
  title: "Overeating Recovery Tool — Rally",
  description:
    "Had a heavier day than planned? See exactly how to ease back on track — no guilt, just a simple plan.",
};

export default function RecoveryPlannerPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/mascot/Logo.jpg"
            alt="Rally logo"
            width={56}
            height={56}
            className="rounded-full"
          />
          <span className="text-base font-bold tracking-tight">Rally</span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link href="/blog" className="text-sm font-semibold text-zinc-500 transition-colors hover:text-black">
            Blog
          </Link>
          <Link
            href="/#wishlist"
            className="rounded-full border-2 border-black px-5 py-2 text-sm font-bold transition-colors hover:bg-black hover:text-white"
          >
            Join the wishlist
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-3xl px-6 py-16">
          <span className="rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-bold text-zinc-500">
            Free tool
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Overeating Recovery Tool
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-zinc-500">
            Running a bit higher than planned? Enter where things stand and get
            a gentle, no-guilt plan to ease back on track.
          </p>

          <div className="mt-12">
            <RecoveryPlannerForm />
          </div>

          <div className="mt-16 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">
              This is just a taste — the full app does this automatically.
            </h2>
            <p className="mt-3 leading-relaxed text-zinc-500">
              Rally remembers your routine and suggests adjustments in
              real time, without you having to enter a thing.
            </p>
            <Link
              href="/#wishlist"
              className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
            >
              Join the wishlist
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 px-6 py-8">
        <p className="mx-auto max-w-5xl text-sm font-medium text-zinc-400">
          Rally — built for adherence, not perfection.
        </p>
      </footer>
    </div>
  );
}
