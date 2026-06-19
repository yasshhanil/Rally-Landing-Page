import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm font-medium text-zinc-400">
          Rally — built for adherence, not perfection.
        </p>
        <div className="flex items-center gap-5 text-sm font-medium text-zinc-400">
          <Link href="/about" className="transition-colors hover:text-zinc-700">
            About
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-zinc-700">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
