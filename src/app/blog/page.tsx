import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { posts } from "@/lib/posts";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — Rally",
  description: "Practical, no-guilt advice on staying consistent with your diet.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
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
        <Link
          href="/#wishlist"
          className="rounded-full border-2 border-black px-5 py-2 text-sm font-bold transition-colors hover:bg-black hover:text-white"
        >
          Join the wishlist
        </Link>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-3xl px-6 py-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Blog</h1>
          <p className="mt-3 text-lg text-zinc-500">
            Practical, no-guilt advice for staying consistent.
          </p>

          <div className="mt-12 flex flex-col gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm"
              >
                <p className="text-sm font-semibold text-zinc-400">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-zinc-600"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-relaxed text-zinc-500">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-block rounded-full border-2 border-black px-5 py-2 text-sm font-bold transition-colors hover:bg-black hover:text-white"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
