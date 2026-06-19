import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Rally",
  description:
    "Why we're building Rally: a diet companion focused on helping people recover from off-plan moments, not punish themselves for having one.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
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
            Why we&apos;re building Rally
          </h1>

          <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-zinc-600">
            <p>
              Most diet apps are built around tracking — log every bite, hit
              your numbers, and if you go over, you get a red warning that
              feels a lot like being told you failed. That framing doesn&apos;t
              match how people actually eat, or how change actually happens.
            </p>
            <p>
              Most people already know roughly what they should be eating.
              What derails progress isn&apos;t a lack of knowledge — it&apos;s
              the cravings, the stressful weeks, the social dinners, the days
              that go sideways. And the usual response to one of those days —
              restrict harder tomorrow, or give up on the week entirely — tends
              to make things worse, not better.
            </p>
            <p>
              Rally is built around the moment after the slip-up, not the
              slip-up itself. When a day goes off-plan, Rally&apos;s job is to
              offer a small, doable next step — a lighter next meal, a short
              walk, or just permission to move on — instead of a guilt trip.
              Consistency over time matters far more than any single day, and
              we wanted an app that actually behaved like it believed that.
            </p>
            <h2 className="mt-4 text-2xl font-bold text-zinc-900">
              What we believe
            </h2>
            <ul className="list-disc space-y-3 pl-6">
              <li>Adherence over perfection — no guilt, no red warnings.</li>
              <li>Recovery over punishment — every off-plan moment gets a next step, not a lecture.</li>
              <li>Consistency is worth celebrating, not just results.</li>
              <li>Logging should take seconds, not feel like homework.</li>
            </ul>
            <p>
              Rally is currently in development, with a free recovery tool
              and a handful of articles live while we build out the full iOS
              app. If this resonates, the wishlist is the best way to hear
              when it&apos;s ready.
            </p>
            <Link
              href="/#wishlist"
              className="mt-2 inline-block w-fit rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
            >
              Join the wishlist
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
