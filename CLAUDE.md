@AGENTS.md

## Writing blog posts

Posts live in `src/lib/posts.ts` as typed `ContentBlock[]` arrays, rendered by
`src/app/blog/[slug]/page.tsx`. Don't switch to raw markdown files or a CMS —
the typed block model is deliberate, keep new posts in that format.

### Available blocks

`p`, `h2`, `h3`, `ol` (items), `table` (headers + rows), `faq` (q/a items —
auto-emits `FAQPage` JSON-LD), `cta` (text/href/label), `related` (slugs of
2-3 other posts).

Inline formatting inside any text field (`p`, `ol` items, table cells, faq
text): `**bold**` and `[label](url)`. Internal links (`href` starting with
`/`) render as `next/link`; anything else opens in a new tab. Link to other
Rally posts with relative paths (`/blog/<slug>`), never the full
`rallywell.co` URL. Never invent an external citation URL — only link to
sources you've actually been given; an unverifiable link is worse than no
link.

### Structure to follow

Mirror the shape of `are-you-what-you-eat` and the posts after it, not the
original three (which were shorter drafts since brought up to the same bar):

1. Open with the felt truth or common misconception — validate why it seems
   true before reframing it.
2. A `table` contrasting the unhelpful interpretation/mindset with the
   healthier one.
3. A deeper "what actually helps" section broken into `h3` sub-sections
   (one idea each, 1-2 paragraphs), not a long flat list.
4. A `faq` block (4-6 questions) near the end — this is also free SEO via the
   JSON-LD it generates.
5. Close with a `cta` to `/tools/recovery-planner` (when relevant to the
   topic) and a `related` block linking 2-3 sibling posts.

### Voice and SEO

Same tone rules as the rest of the product (see root `CLAUDE.md`): adherence
over perfection, recovery over punishment, no guilt/clinical language. Every
post should read like Rally talking, not a generic health blog.

For each post set: a slug, a title, an excerpt written as a meta description
(~150-160 chars), `date` in `YYYY-MM-DD`, and 4-6 `keywords` as real
search-intent phrases (not single words).
