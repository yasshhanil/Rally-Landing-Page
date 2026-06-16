"use client";

import { useState } from "react";
import Image from "next/image";
import { evaluateDay, type MealEvent, type EvaluationResult } from "@/lib/recoveryEngine";
import { getMascotCopy } from "@/lib/recoveryCopy";
import { lowCalHighSatiationFoods } from "@/lib/foodSuggestions";

const STATUS_LABELS: Record<string, string> = {
  on_track: "On track",
  full: "Fully redeemable",
  full_with_activity: "Fully redeemable",
  partial: "Partially redeemable",
};

interface ResultSnapshot {
  target: number;
  predictedTotal: number;
  meals: MealEvent[];
  result: EvaluationResult;
  mascotCopy: string;
}

let nextId = 1;

export default function RecoveryPlannerForm() {
  const [targetCalories, setTargetCalories] = useState("");
  const [consumedCalories, setConsumedCalories] = useState("");
  const [meals, setMeals] = useState<MealEvent[]>([]);
  const [snapshot, setSnapshot] = useState<ResultSnapshot | null>(null);

  function updateMeal(id: number, field: "name" | "calories", value: string) {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, [field]: field === "calories" ? Number(value) || 0 : value } : m
      )
    );
  }

  function addMeal() {
    setMeals((prev) => [...prev, { id: nextId++, name: "", calories: 0 }]);
  }

  function removeMeal(id: number) {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  }

  function handleCalculate() {
    const target = Number(targetCalories) || 0;
    const consumed = Number(consumedCalories) || 0;
    const frozenMeals = meals.map((m) => ({ ...m }));
    const predictedTotal = consumed + frozenMeals.reduce((sum, m) => sum + m.calories, 0);
    const result = evaluateDay(target, consumed, frozenMeals);
    setSnapshot({
      target,
      predictedTotal,
      meals: frozenMeals,
      result,
      mascotCopy: getMascotCopy(result, frozenMeals),
    });
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-black focus:outline-none";

  return (
    <div className="flex flex-col gap-6">
      {/* Calorie inputs */}
      <div className="grid gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-zinc-700">Daily calorie target</span>
          <input
            type="number"
            min={0}
            value={targetCalories}
            onChange={(e) => setTargetCalories(e.target.value)}
            placeholder="e.g. 2000"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-bold text-zinc-700">Consumed so far today</span>
          <input
            type="number"
            min={0}
            value={consumedCalories}
            onChange={(e) => setConsumedCalories(e.target.value)}
            placeholder="e.g. 1400"
            className={inputClass}
          />
        </label>
      </div>

      {/* Remaining meals */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-zinc-900">Remaining planned meals</h2>
        <p className="mt-1 text-sm text-zinc-500">What you still have planned for today.</p>

        <div className="mt-4 flex flex-col gap-3">
          {meals.map((meal) => (
            <div key={meal.id} className="flex items-center gap-3">
              <input
                type="text"
                value={meal.name}
                onChange={(e) => updateMeal(meal.id, "name", e.target.value)}
                placeholder="Meal name"
                className="flex-1 rounded-xl border border-zinc-200 px-4 py-3 text-base shadow-sm focus:border-black focus:outline-none"
              />
              <input
                type="number"
                min={0}
                value={meal.calories || ""}
                onChange={(e) => updateMeal(meal.id, "calories", e.target.value)}
                placeholder="kcal"
                className="w-28 rounded-xl border border-zinc-200 px-4 py-3 text-base shadow-sm focus:border-black focus:outline-none"
              />
              <button
                type="button"
                onClick={() => removeMeal(meal.id)}
                aria-label={`Remove ${meal.name || "meal"}`}
                className="rounded-full px-3 py-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addMeal}
          className="mt-4 rounded-full border-2 border-zinc-200 px-5 py-2 text-sm font-bold text-zinc-600 transition-colors hover:border-black hover:text-black"
        >
          + Add meal
        </button>
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={handleCalculate}
        disabled={!targetCalories || !consumedCalories}
        className="rounded-full bg-black px-8 py-4 text-base font-bold text-white transition-colors hover:bg-zinc-800 disabled:opacity-40"
      >
        Get my recovery plan
      </button>

      {/* Result — frozen at submit time */}
      {snapshot && (() => {
        const { target, predictedTotal, meals: snapMeals, result, mascotCopy } = snapshot;
        const caloriesSaved = Math.max(0, predictedTotal - result.predictedCalories);
        const hasLightenedMeal = result.suggestions.some((s) => s.type === "lighten_meal");

        return (
          <div className="rounded-2xl border border-zinc-900 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-bold text-zinc-900">Today&apos;s outlook</h2>
              <span className="rounded-full bg-zinc-100 px-4 py-1.5 text-xs font-bold text-zinc-600">
                {STATUS_LABELS[result.redemptionStatus] ?? result.redemptionStatus}
              </span>
            </div>

            <p className="mt-3 text-sm text-zinc-500">
              {caloriesSaved > 0 ? (
                <>
                  Without changes:{" "}
                  <span className="font-bold text-zinc-900">{predictedTotal} kcal</span>
                  {" · "}With these tweaks:{" "}
                  <span className="font-bold text-zinc-900">{result.predictedCalories} kcal</span>
                </>
              ) : (
                <>
                  Predicted total:{" "}
                  <span className="font-bold text-zinc-900">{result.predictedCalories} kcal</span>
                </>
              )}{" "}
              of a {target} kcal target.
            </p>

            {caloriesSaved > 0 && (
              <p className="mt-2 inline-flex rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-bold text-zinc-700">
                ↓ {caloriesSaved} kcal saved through these adjustments
              </p>
            )}

            {/* Mascot message */}
            <div className="mt-5 flex items-start gap-4 rounded-2xl bg-zinc-50 p-5">
              <Image
                src={
                  result.redemptionStatus === "partial"
                    ? "/mascot/Calm.gif"
                    : "/mascot/Encouraging.gif"
                }
                alt="Rally"
                width={72}
                height={72}
                unoptimized
                className="shrink-0 mix-blend-multiply"
              />
              <p className="text-base font-semibold leading-relaxed text-zinc-700">{mascotCopy}</p>
            </div>

            {/* Suggestion list */}
            {result.suggestions.length > 0 && (
              <ul className="mt-5 flex flex-col gap-3 text-sm">
                {result.suggestions.map((s, i) => {
                  if (s.type === "lighten_meal") {
                    const meal = snapMeals.find((m) => m.id === s.routineEventId);
                    return (
                      <li key={i} className="flex items-baseline gap-2 rounded-xl bg-zinc-50 px-4 py-3">
                        <span className="text-zinc-400">→</span>
                        <span>
                          Lighten{" "}
                          <span className="font-bold text-zinc-900">{meal?.name ?? "this meal"}</span>:{" "}
                          {s.originalCalories} kcal → {s.suggestedCalories} kcal
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={i} className="flex items-baseline gap-2 rounded-xl bg-zinc-50 px-4 py-3">
                      <span className="text-zinc-400">→</span>
                      <span>
                        Take a ~{s.minutes} min walk{" "}
                        <span className="text-zinc-500">(offsets ~{s.offsetsCalories} kcal)</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Food swaps */}
            {hasLightenedMeal && (
              <div className="mt-6 rounded-2xl border border-zinc-100 p-5">
                <h3 className="text-sm font-bold text-zinc-900">
                  Lighter swaps that still keep you full
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Ideas for swapping a meal entirely — high-volume, low-calorie options.
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {lowCalHighSatiationFoods.slice(0, 3).map((food) => (
                    <li key={food.name} className="flex items-start justify-between gap-4 rounded-xl bg-zinc-50 px-4 py-3 text-sm">
                      <div>
                        <p className="font-bold text-zinc-900">{food.name}</p>
                        <p className="mt-0.5 text-zinc-500">{food.note}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-zinc-500 shadow-sm">
                        ~{food.calories} kcal
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
