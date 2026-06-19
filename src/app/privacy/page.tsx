import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Rally",
  description: "What Rally collects, why, and how you can ask us to delete it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm font-semibold text-zinc-400">
            Last updated June 2026
          </p>

          <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-zinc-600">
            <p>
              This page covers what we collect on this website, why, and how
              you can ask us to delete it. We&apos;ve kept this short because
              we&apos;ve kept what we collect short.
            </p>

            <h2 className="mt-4 text-2xl font-bold text-zinc-900">
              What we collect
            </h2>
            <ul className="list-disc space-y-3 pl-6">
              <li>
                <span className="font-bold text-zinc-900">Your email address</span>,
                only if you join the wishlist. We use it for one thing: telling
                you when Rally is ready to try. We don&apos;t sell it, rent it,
                or use it for anything else.
              </li>
              <li>
                <span className="font-bold text-zinc-900">Anonymous page-view analytics</span>,
                via Vercel Analytics. This is cookieless and doesn&apos;t track
                you across other sites — it just tells us which pages get
                visited, in aggregate, so we know what&apos;s useful.
              </li>
            </ul>

            <h2 className="mt-4 text-2xl font-bold text-zinc-900">
              What we don&apos;t collect
            </h2>
            <p>
              The Overeating Recovery Tool runs entirely in your browser. The
              calories, meals, and numbers you enter into it are never sent to
              our servers — they exist only on your device for that session
              and disappear when you close or refresh the page.
            </p>

            <h2 className="mt-4 text-2xl font-bold text-zinc-900">
              Where your data lives
            </h2>
            <p>
              Wishlist emails are stored with Supabase, our database provider.
              This site is hosted on Vercel. Neither has access to use your
              data beyond providing the infrastructure we run on.
            </p>

            <h2 className="mt-4 text-2xl font-bold text-zinc-900">
              Deleting your data
            </h2>
            <p>
              Email us at{" "}
              <a href="mailto:hello@rallywell.co" className="font-bold text-zinc-900 underline">
                hello@rallywell.co
              </a>{" "}
              and we&apos;ll remove your email from the wishlist within a few
              days.
            </p>

            <h2 className="mt-4 text-2xl font-bold text-zinc-900">
              Changes to this policy
            </h2>
            <p>
              If this changes meaningfully — for example, once the Rally app
              itself launches and starts handling health data directly —
              we&apos;ll update this page and the &quot;last updated&quot;
              date above.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
