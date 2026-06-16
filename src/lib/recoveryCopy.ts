import type { EvaluationResult, MealEvent } from "./recoveryEngine";

function joinWithAnd(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function getMascotCopy(result: EvaluationResult, mealEvents: MealEvent[]): string {
  const nameById = new Map(mealEvents.map((e) => [e.id, e.name.toLowerCase()]));

  const lightenedMeals = result.suggestions.filter((s) => s.type === "lighten_meal");
  const walk = result.suggestions.find((s) => s.type === "suggest_walk");

  const lightenedNames = lightenedMeals.map((s) =>
    s.type === "lighten_meal" ? (nameById.get(s.routineEventId) ?? "next meal") : "next meal"
  );

  switch (result.redemptionStatus) {
    case "on_track":
      return "You're right on track for today — keep doing what you're doing! 🎯";

    case "full":
      return `You're right on pace for today — just a slightly lighter ${joinWithAnd(
        lightenedNames
      )} and you'll land exactly on target. 🎯`;

    case "full_with_activity": {
      const mealPart =
        lightenedMeals.length === 1 && lightenedMeals[0].type === "lighten_meal"
          ? `A lighter ${lightenedNames[0]} (~${lightenedMeals[0].suggestedCalories} kcal)`
          : lightenedMeals.length > 0
            ? `A lighter ${joinWithAnd(lightenedNames)}`
            : "A short adjustment";
      const walkPart = walk && walk.type === "suggest_walk" ? `a ${walk.minutes}-ish min walk` : "";
      return `${mealPart}${walkPart ? ` plus ${walkPart}` : ""} and today's totally back on track — nice work staying ahead of it. 🚶`;
    }

    case "partial": {
      const parts: string[] = [];
      if (lightenedNames.length > 0) parts.push(`a smaller ${joinWithAnd(lightenedNames)}`);
      if (walk && walk.type === "suggest_walk" && walk.minutes > 0)
        parts.push(`a ${walk.minutes} min walk`);
      const helpPart = parts.length > 0 ? joinWithAnd(parts) : "small adjustments";
      return `Big day — it happens. ${helpPart.charAt(0).toUpperCase() + helpPart.slice(1)} still help, and the rest you just pick up from tomorrow. Consistency isn't perfection, it's showing up again. 🌙`;
    }

    default:
      return "Got it — here's how today's looking. 🐾";
  }
}
