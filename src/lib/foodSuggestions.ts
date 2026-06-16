export interface FoodSuggestion {
  name: string;
  calories: number;
  note: string;
}

export const lowCalHighSatiationFoods: FoodSuggestion[] = [
  {
    name: "Big mixed salad with grilled chicken",
    calories: 350,
    note: "High volume and protein help you feel full on fewer calories.",
  },
  {
    name: "Vegetable or broth-based soup",
    calories: 150,
    note: "Warm and filling — easy to make a whole meal of.",
  },
  {
    name: "Greek yogurt with berries",
    calories: 180,
    note: "High protein, naturally sweet, very filling for its size.",
  },
  {
    name: "Cottage cheese with cucumber & tomato",
    calories: 200,
    note: "Protein-rich and refreshing, great for a lighter dinner.",
  },
  {
    name: "Air-popped popcorn (large bowl)",
    calories: 120,
    note: "Lots of volume for an evening snack without much calorie cost.",
  },
  {
    name: "Roasted veggies with a lean protein",
    calories: 300,
    note: "Fiber and protein together keep hunger away longer.",
  },
];
