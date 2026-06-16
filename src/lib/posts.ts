export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ol"; items: string[] }
  | { type: "cta"; text: string; href: string; label: string }
  | { type: "related"; slugs: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  keywords: string[];
  content: ContentBlock[];
};

export const posts: Post[] = [
  {
    slug: "overeating-is-not-a-failure",
    title: "You overate. Here's what actually helps next.",
    excerpt:
      "One big meal — or one rough day — doesn't undo your progress. Here's what to do in the next hour, and why 'just get back on track tomorrow' is the wrong advice.",
    date: "2026-06-15",
    keywords: ["i overate", "overeating", "overate at dinner", "what to do after overeating"],
    content: [
      {
        type: "p",
        text: "It happens to almost everyone: a work dinner runs long, a bag of chips disappears while you're stressed, or 'just one slice' turns into half the pizza. And then comes the spiral — the guilt, the 'I've ruined everything' feeling, and the urge to either punish yourself with an extra-hard workout or just give up on the day entirely.",
      },
      {
        type: "p",
        text: "Here's the thing: one meal, even a big one, has almost no effect on your long-term progress. What actually moves the needle is what you do in the hours and days after — and that's exactly where most people make it worse, not better.",
      },
      { type: "h2", text: "Why 'just skip your next meal' backfires" },
      {
        type: "p",
        text: "The most common reaction to overeating is to compensate — skip the next meal, or eat as little as possible for the rest of the day. It feels logical, but it usually backfires. Skipping meals after overeating tends to spike hunger later, which often leads to another round of overeating that evening. You end up trading one off-plan moment for two.",
      },
      { type: "h2", text: "What to do instead" },
      {
        type: "ol",
        items: [
          "Drink some water and move on. You don't need to 'fix' anything in the next 10 minutes — just have a glass of water and let your body do what it does.",
          "Eat your next meal normally. Not smaller, not bigger — just your normal next meal, at roughly your normal time. This is the single most effective thing you can do.",
          "Add a short walk if you feel like it. 10–15 minutes after a big meal can help with digestion and feels good — not as a penalty, just because it's pleasant.",
          "Zoom out to the week, not the day. Your weekly average matters far more than any single meal. If today was heavier than planned, the rest of the week doesn't need to change drastically.",
          "Notice the pattern, gently. Was it stress? Skipping breakfast? Being around a specific food? A quick, judgment-free note can help you spot triggers over time.",
        ],
      },
      { type: "h2", text: "The real goal: staying in the game" },
      {
        type: "p",
        text: "The biggest risk after overeating isn't the extra calories — it's the all-or-nothing thinking that follows ('I already messed up today, might as well order dessert too'). The people who make the most progress over months and years aren't the ones who never overeat. They're the ones who treat it as a normal Tuesday and keep showing up.",
      },
      {
        type: "p",
        text: "That's the whole idea behind our Recovery Engine: instead of a guilt trip or a red 'you went over' warning, you get a small, doable next step — adjust the next meal, take a short walk, or just acknowledge it and move on. No streaks broken, no lectures.",
      },
      {
        type: "cta",
        text: "Not sure what 'getting back on track' looks like tonight? Plug today's numbers into our free Recovery Day Planner and get a no-guilt plan in seconds.",
        href: "/tools/recovery-planner",
        label: "Try the Recovery Day Planner",
      },
      { type: "related", slugs: ["emotional-overeating", "how-to-maintain-a-diet"] },
    ],
  },
  {
    slug: "emotional-overeating",
    title: "Emotional Overeating: Why It Happens and What Actually Helps",
    excerpt:
      "Eating because of stress, boredom, or sadness isn't a character flaw — it's a pattern. Here's how to recognize emotional overeating and what to do instead of just 'using willpower.'",
    date: "2026-06-16",
    keywords: [
      "emotional overeating",
      "stress eating",
      "binge eating help",
      "why do I overeat when stressed",
    ],
    content: [
      {
        type: "p",
        text: "You weren't hungry. You knew you weren't hungry. And you still ate anyway — maybe standing up at the counter, maybe scrolling your phone, maybe finishing the bag before you'd really registered you'd started. If that sounds familiar, you're dealing with emotional overeating, and it's one of the most common (and most misunderstood) eating patterns out there.",
      },
      { type: "h2", text: "Emotional hunger vs. physical hunger" },
      {
        type: "p",
        text: "Physical hunger builds gradually, can be satisfied by lots of different foods, and stops when you're full. Emotional hunger tends to show up suddenly, craves something very specific (usually salty, sweet, or creamy), and often doesn't go away even after you're full — because food was never really the thing being asked for.",
      },
      { type: "h2", text: "Why it happens" },
      {
        type: "p",
        text: "Food is fast, reliable, and effective — for about ten minutes. Stress, boredom, loneliness, and even excitement can all trigger a craving, because eating genuinely does soothe in the short term. The problem isn't that it 'works' — it's that the underlying feeling is usually still there afterward, sometimes joined by guilt about the eating itself.",
      },
      { type: "h2", text: "What actually helps" },
      {
        type: "ol",
        items: [
          "Name the feeling before you eat. Not to talk yourself out of eating — just 'stressed,' 'bored,' 'tired' takes the decision out of autopilot.",
          "Keep a couple of go-to alternatives on hand for when you're not actually hungry: a short walk, a glass of water, texting a friend, stepping outside for two minutes.",
          "If you do eat, eat. Don't restrict afterward to 'make up for it' — that's the move that turns a single moment into a restrict-binge cycle.",
          "Log it without judgment. A quick note on time and mood (not just food) helps you spot patterns — maybe it's always 9pm, or always after a certain meeting.",
          "Have a plan for the after, not just the before. A lot of the anxiety around emotional eating comes from not knowing what to do next — having a simple recovery step removes that.",
        ],
      },
      { type: "h2", text: "Breaking the restrict-binge cycle" },
      {
        type: "p",
        text: "Emotional overeating gets worse when it's followed by restriction, because restriction increases both hunger and the emotional charge around food — setting up the next episode. The way out isn't more willpower, it's removing the punishment step entirely: eat your next meal normally, and let the day continue as planned.",
      },
      {
        type: "cta",
        text: "If you've already had one of those moments today, our free Recovery Day Planner can turn 'what now?' into a simple, doable next step.",
        href: "/tools/recovery-planner",
        label: "Try the Recovery Day Planner",
      },
      {
        type: "p",
        text: "This is exactly the kind of moment our Recovery Engine is built for — a gentle, judgment-free response instead of a guilt trip, so one hard moment doesn't turn into a hard week.",
      },
      { type: "related", slugs: ["overeating-is-not-a-failure", "how-to-maintain-a-diet"] },
    ],
  },
  {
    slug: "how-to-maintain-a-diet",
    title: "How to Maintain a Diet Long-Term (Without Burning Out)",
    excerpt:
      "Most diets don't fail because of the food — they fail because they have no plan for real life. Here's what actually makes a diet sustainable for months and years, not just weeks.",
    date: "2026-06-17",
    keywords: [
      "how to maintain diet",
      "diet consistency",
      "sustainable diet tips",
      "how to stay consistent with diet",
    ],
    content: [
      {
        type: "p",
        text: "If you've ever started a diet feeling motivated and confident, only to fall off within a few weeks, you're not alone — and it's probably not a willpower problem. Most diets are built for a perfect version of your life: no late meetings, no birthday cake, no bad days. Real life doesn't cooperate, and when it doesn't, the whole plan can feel like it's broken.",
      },
      { type: "h2", text: "Why most diets don't 'stick'" },
      {
        type: "p",
        text: "Rigid plans treat every deviation as a failure. One missed workout, one bigger meal, one skipped log, and it can feel like the whole thing is ruined — so why not just start fresh on Monday? That all-or-nothing loop is the single biggest reason diets don't last, far more than any specific food choice.",
      },
      { type: "h2", text: "What sustainable actually looks like" },
      {
        type: "ol",
        items: [
          "Build templates, not daily plans. A 'typical weekday' and a 'typical weekend' you can log in one tap beats re-deciding every meal from scratch.",
          "Track trends weekly, not daily. A single day tells you almost nothing. Your weekly average is what actually reflects your progress.",
          "Plan for off-plan days in advance. Holidays, travel, and busy weeks are predictable — decide ahead of time that they're part of the plan, not exceptions to it.",
          "Make recovery automatic. The faster and easier it is to get back to normal after a heavier day, the less that day matters in the long run.",
          "Celebrate consistency, not just results. Showing up after a gap, logging honestly on a hard day — these matter more than any single number on the scale.",
        ],
      },
      { type: "h2", text: "A companion, not a tracker" },
      {
        type: "p",
        text: "Most tracking apps are great at telling you when you've gone over — and not much else. What actually keeps people consistent is having something that reacts the way a supportive friend would: noticing the off-plan moment, suggesting a small next step, and then moving on without dwelling on it.",
      },
      {
        type: "cta",
        text: "Curious how this plays out on a real day? Try our free Recovery Day Planner — it's the same logic our app uses to suggest a next step.",
        href: "/tools/recovery-planner",
        label: "Try the Recovery Day Planner",
      },
      { type: "related", slugs: ["overeating-is-not-a-failure", "emotional-overeating"] },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
