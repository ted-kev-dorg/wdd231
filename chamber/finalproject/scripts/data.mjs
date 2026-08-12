// data.mjs - all external API calls live here (TheMealDB free API)
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Fetch a full-detail batch of meals by first letter (used to seed the catalog)
export async function getMealsByLetter(letter) {
  try {
    const response = await fetch(`${BASE_URL}/search.php?f=${letter}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    const data = await response.json();
    return data.meals ?? [];
  } catch (error) {
    console.error('Error fetching meals by letter:', error);
    return [];
  }
}

// Fetch one random meal (used for the "Recipe of the Day" feature on the home page)
export async function getRandomMeal() {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching random meal:', error);
    return null;
  }
}

// Fetch full details for a single meal by id (used to populate the modal dialog)
export async function getMealById(id) {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching meal details:', error);
    return null;
  }
}

// Build a clean ingredient list from the flat strIngredient1..20 / strMeasure1..20 fields
export function extractIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
    }
  }
  return ingredients;
}
