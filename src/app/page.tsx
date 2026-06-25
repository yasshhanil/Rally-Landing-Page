import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import WishlistForm from "@/components/WishlistForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const principles = [
  {
    title: "Adherence over perfection",
    description:
      "Slipped up today? That's not a failure — it's just part of eating like a human. No guilt, no red warnings, just a gentle nudge on what to do next.",
  },
  {
    title: "Recovery over punishment",
    description:
      "Cravings, social meals, stressful days — they happen to everyone. Rally is right there with a calm, doable next step instead of a lecture about what you should have done.",
  },
  {
    title: "A healthy relationship with food",
    description:
      "Food isn't the enemy. Rally helps you eat well most of the time without guilt, fear, or obsession — and reminds you of that whenever you need to hear it.",
  },
  {
    title: "Minimal-friction logging",
    description:
      "Typical weekday, typical weekend, one-tap re-log. The easier it is to log, the easier it is to stay on track.",
  },
];

const streaksFeature = {
  title: "Streaks that celebrate showing up",
  description:
    "Every streak started with one good day. Rally cheers you on as consistency builds — celebrating honest logs, comeback moments, and the quiet weeks where you just kept showing up.",
};

const upcomingTools = [
  {
    title: "Overeating Recovery Tool",
    description: "Had a big day off-plan? Get a simple, no-guilt plan to ease back in.",
    href: "/tools/recovery-planner",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Image
            src="/mascot/Logo.jpg"
            alt="Rally logo"
            width={100}
            height={100}
            className="h-9 w-9 rounded-full sm:h-[72px] sm:w-[72px]"
          />
          <span className="text-xl font-bold tracking-tight sm:text-4xl">Rally</span>
        </div>
        <nav className="flex items-center gap-3 sm:gap-5">
          <Link href="/blog" className="text-sm font-semibold text-zinc-500 transition-colors hover:text-black">
            Blog
          </Link>
          <a
            href="#wishlist"
            className="rounded-full border-2 border-black px-4 py-2 text-sm font-bold transition-colors hover:bg-black hover:text-white sm:px-5"
          >
            Join the wishlist
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
          <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
            {/* Text */}
            <div className="flex flex-1 flex-col items-start gap-6">
              <span className="rounded-full bg-zinc-100 px-5 py-1.5 text-sm font-semibold text-zinc-500">
                iOS app — coming soon
              </span>
              <h1 className="text-5xl font-extrabold leading-[1.1] sm:text-6xl">
                Build a{" "}
                <span className="italic">healthier relationship</span>{" "}
                with food — and actually stick to it.
              </h1>
              <p className="text-lg leading-relaxed text-zinc-500">
                Most people already know what to eat. The hard part is staying
                consistent through cravings, busy weeks, and setbacks — without
                guilt getting in the way. Rally is with you through all of it:
                the good days, the hard ones, and everything in between.
              </p>
              <WishlistForm />
              <p className="text-sm text-zinc-400">
                No spam — just a heads-up when the iOS app launches.
              </p>
            </div>

            {/* Mojo */}
            <div className="flex shrink-0 flex-col items-center gap-3">
              <Image
                src="/mascot/Greeting.gif"
                alt="Rally the mascot, waving hello"
                width={260}
                height={260}
                unoptimized
                priority
                className="mix-blend-multiply"
              />
              <p className="text-sm font-semibold text-zinc-400">Meet Rally 👋</p>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Food should feel good, not stressful.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-zinc-500">
            Rally is with you through the wins and the slip-ups alike — removing
            the guilt cycle so eating well actually feels sustainable long-term.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:col-span-2">
              <h3 className="text-xl font-bold">{principles[0].title}</h3>
              <p className="mt-3 leading-relaxed text-zinc-500">{principles[0].description}</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:col-span-2">
              <h3 className="text-xl font-bold">{principles[1].title}</h3>
              <p className="mt-3 leading-relaxed text-zinc-500">{principles[1].description}</p>
            </div>
            {/* Center — streaks feature */}
            <div className="flex flex-col items-center rounded-2xl border border-zinc-900 bg-white p-8 text-center shadow-sm sm:col-span-2 sm:col-start-2">
              <Image
                src="/mascot/Celebrate.jpg"
                alt="Rally celebrating your streak"
                width={80}
                height={80}
                className="rounded-full mix-blend-multiply"
              />
              <h3 className="mt-4 text-xl font-bold">{streaksFeature.title}</h3>
              <p className="mt-3 leading-relaxed text-zinc-500">{streaksFeature.description}</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:col-span-2">
              <h3 className="text-xl font-bold">{principles[2].title}</h3>
              <p className="mt-3 leading-relaxed text-zinc-500">{principles[2].description}</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:col-span-2">
              <h3 className="text-xl font-bold">{principles[3].title}</h3>
              <p className="mt-3 leading-relaxed text-zinc-500">{principles[3].description}</p>
            </div>
          </div>
        </section>

        {/* Free tools */}
        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Free tools
          </h2>
          <p className="mt-4 max-w-xl text-lg text-zinc-500">
            Available now, before the app launches.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingTools.map((tool) => (
              <div
                key={tool.title}
                className={`flex flex-col rounded-2xl border p-6 ${
                  tool.href
                    ? "border-zinc-900 bg-white shadow-sm"
                    : "border-zinc-200 bg-white"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  {tool.href ? "Live now" : "Coming soon"}
                </span>
                <h3 className="mt-4 text-lg font-bold">{tool.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{tool.description}</p>
                {tool.href && (
                  <Link
                    href={tool.href}
                    className="mt-6 self-start rounded-full bg-black px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
                  >
                    Open tool →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Wishlist CTA */}
        <section id="wishlist" className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
          <div className="flex flex-col items-center gap-8 rounded-3xl bg-black px-8 py-16 text-center text-white">
            <div className="rounded-2xl bg-white p-3">
              <Image
                src="/mascot/Encouraging.gif"
                alt="Rally encouraging you to join"
                width={160}
                height={160}
                unoptimized
                className="mix-blend-multiply"
              />
            </div>
            <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              Join others and be among the first to try the diet companion that actually gets it.
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-zinc-400">
              Join the wishlist and we&apos;ll reach out the moment the iOS app is ready —
              built for people who want to stick to their goals without the guilt.
            </p>
            <WishlistForm variant="dark" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
