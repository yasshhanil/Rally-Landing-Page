import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";

function PostLink({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) return null;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="rounded-2xl border border-zinc-200 bg-white p-5 font-semibold leading-snug text-zinc-800 shadow-sm transition-colors hover:border-zinc-900"
    >
      {post.title}
    </Link>
  );
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Rally Blog`,
    description: post.excerpt,
    keywords: post.keywords,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

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
        <article className="mx-auto w-full max-w-3xl px-6 py-16">
          <Link href="/blog" className="text-sm font-semibold text-zinc-400 transition-colors hover:text-black">
            ← All posts
          </Link>

          <p className="mt-8 text-sm font-semibold text-zinc-400">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-10 flex flex-col gap-6 text-lg leading-relaxed text-zinc-600">
            {post.content.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2 key={i} className="mt-4 text-2xl font-bold text-zinc-900">
                      {block.text}
                    </h2>
                  );
                case "ol":
                  return (
                    <ol key={i} className="list-decimal space-y-4 pl-6 text-zinc-600">
                      {block.items.map((item, j) => (
                        <li key={j} className="leading-relaxed">{item}</li>
                      ))}
                    </ol>
                  );
                case "cta":
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                    >
                      <p className="font-semibold text-zinc-700">{block.text}</p>
                      <Link
                        href={block.href}
                        className="mt-4 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
                      >
                        {block.label}
                      </Link>
                    </div>
                  );
                case "related":
                  return (
                    <div key={i} className="mt-4 border-t border-zinc-100 pt-10">
                      <h2 className="text-xl font-bold text-zinc-900">Keep reading</h2>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {block.slugs.map((s) => (
                          <PostLink key={s} slug={s} />
                        ))}
                      </div>
                    </div>
                  );
                default:
                  return <p key={i}>{block.text}</p>;
              }
            })}
          </div>

          <div className="mt-16 flex flex-col items-start gap-5 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:flex-row sm:items-center">
            <Image
              src="/mascot/Encouraging.gif"
              alt="Rally the mascot encouraging you"
              width={100}
              height={100}
              unoptimized
              className="shrink-0 mix-blend-multiply"
            />
            <div>
              <h2 className="text-2xl font-bold">
                Want a companion that handles moments like this automatically?
              </h2>
              <p className="mt-2 leading-relaxed text-zinc-500">
                Rally reacts to off-plan moments with a gentle next step — no guilt, no lectures.
              </p>
              <Link
                href="/#wishlist"
                className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-800"
              >
                Join the wishlist
              </Link>
            </div>
          </div>
        </article>
      </main>

      <footer className="border-t border-zinc-200 px-6 py-8">
        <p className="mx-auto max-w-5xl text-sm font-medium text-zinc-400">
          Rally — built for adherence, not perfection.
        </p>
      </footer>
    </div>
  );
}
