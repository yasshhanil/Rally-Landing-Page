import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";
import Footer from "@/components/Footer";

const INLINE_PATTERN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  for (const match of text.matchAll(INLINE_PATTERN)) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [, bold, linkLabel, linkHref] = match;
    if (bold !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-zinc-900">
          {bold}
        </strong>
      );
    } else if (linkHref?.startsWith("/")) {
      nodes.push(
        <Link
          key={key++}
          href={linkHref}
          className="font-semibold text-zinc-900 underline underline-offset-2 hover:text-zinc-600"
        >
          {linkLabel}
        </Link>
      );
    } else if (linkHref) {
      nodes.push(
        <a
          key={key++}
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zinc-900 underline underline-offset-2 hover:text-zinc-600"
        >
          {linkLabel}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function toPlainText(text: string): string {
  return text.replace(INLINE_PATTERN, (_match, bold, linkLabel) => bold ?? linkLabel ?? "");
}

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
    alternates: { canonical: `/blog/${post.slug}` },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    keywords: post.keywords.join(", "),
    author: { "@type": "Organization", name: "Rally" },
    publisher: { "@type": "Organization", name: "Rally" },
    mainEntityOfPage: `https://www.rallywell.co/blog/${post.slug}`,
  };

  const faqBlock = post.content.find((block) => block.type === "faq");
  const faqJsonLd = faqBlock
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqBlock.items.map((item) => ({
          "@type": "Question",
          name: toPlainText(item.q),
          acceptedAnswer: { "@type": "Answer", text: toPlainText(item.a) },
        })),
      }
    : null;

  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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
            })}{" "}
            · By the Rally team
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-10 flex flex-col gap-6 text-lg leading-relaxed text-zinc-600">
            {post.content.map((block, i) => {
              switch (block.type) {
                case "p":
                  return <p key={i}>{renderInline(block.text)}</p>;
                case "h2":
                  return (
                    <h2 key={i} className="mt-4 text-2xl font-bold text-zinc-900">
                      {block.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={i} className="mt-2 text-xl font-bold text-zinc-900">
                      {block.text}
                    </h3>
                  );
                case "ol":
                  return (
                    <ol key={i} className="list-decimal space-y-4 pl-6 text-zinc-600">
                      {block.items.map((item, j) => (
                        <li key={j} className="leading-relaxed">{renderInline(item)}</li>
                      ))}
                    </ol>
                  );
                case "table":
                  return (
                    <div
                      key={i}
                      className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm"
                    >
                      <table className="w-full text-left text-base">
                        <thead className="bg-zinc-50">
                          <tr>
                            {block.headers.map((header, j) => (
                              <th key={j} className="px-5 py-3 font-semibold text-zinc-900">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                          {block.rows.map((row, j) => (
                            <tr key={j}>
                              {row.map((cell, k) => (
                                <td key={k} className="px-5 py-3 align-top text-zinc-600">
                                  {renderInline(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                case "faq":
                  return (
                    <div
                      key={i}
                      className="flex flex-col divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white shadow-sm"
                    >
                      {block.items.map((item, j) => (
                        <div key={j} className="p-5">
                          <p className="font-semibold text-zinc-900">{item.q}</p>
                          <p className="mt-2 leading-relaxed text-zinc-600">
                            {renderInline(item.a)}
                          </p>
                        </div>
                      ))}
                    </div>
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

      <Footer />
    </div>
  );
}
