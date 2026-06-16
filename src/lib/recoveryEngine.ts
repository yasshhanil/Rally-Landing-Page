export interface MealEvent {
  id: number;
  name: string;
  calories: number;
}

export type Suggestion =
  | {
      type: "lighten_meal";
      routineEventId: number;
      originalCalories: number;
      suggestedCalories: number;
    }
  | { type: "suggest_walk"; minutes: number; offsetsCalories: number };

export type RedemptionStatus = "on_track" | "full" | "full_with_activity" | "partial";

export interface EvaluationResult {
  predictedCalories: number;
  redemptionStatus: RedemptionStatus;
  suggestions: Suggestion[];
}

const ON_TRACK_GRACE_CALORIES = 150;
const LIGHTEN_MEAL_RATIO = 0.25;
const WALK_CALORIES_PER_MINUTE = 5;
const MAX_WALK_MINUTES = 45;

export function evaluateDay(
  targetCalories: number,
  consumedCalories: number,
  remainingMealEvents: MealEvent[]
): EvaluationResult {
  const remainingPlanned = remainingMealEvents.reduce((sum, e) => sum + e.calories, 0);
  const predictedTotal = consumedCalories + remainingPlanned;
  const excess = predictedTotal - targetCalories;

  if (excess <= ON_TRACK_GRACE_CALORIES) {
    return { predictedCalories: predictedTotal, redemptionStatus: "on_track", suggestions: [] };
  }

  const suggestions: Suggestion[] = [];
  let remainingExcess = excess;

  if (remainingPlanned > 0) {
    const reducible = Math.min(remainingExcess, remainingPlanned * LIGHTEN_MEAL_RATIO);
    for (const e of remainingMealEvents) {
      const cut = reducible * (e.calories / remainingPlanned);
      suggestions.push({
        type: "lighten_meal",
        routineEventId: e.id,
        originalCalories: e.calories,
        suggestedCalories: Math.round(e.calories - cut),
      });
    }
    remainingExcess -= reducible;
  }

  if (remainingExcess > 0) {
    const walkMinutes = Math.min(Math.round(remainingExcess / WALK_CALORIES_PER_MINUTE), MAX_WALK_MINUTES);
    suggestions.push({
      type: "suggest_walk",
      minutes: walkMinutes,
      offsetsCalories: walkMinutes * WALK_CALORIES_PER_MINUTE,
    });
    remainingExcess -= walkMinutes * WALK_CALORIES_PER_MINUTE;
  }

  const predictedCalories = predictedTotal - (excess - remainingExcess);
  const status: RedemptionStatus =
    remainingExcess <= ON_TRACK_GRACE_CALORIES
      ? suggestions.some((s) => s.type === "suggest_walk")
        ? "full_with_activity"
        : "full"
      : "partial";

  return { predictedCalories: Math.round(predictedCalories), redemptionStatus: status, suggestions };
}
