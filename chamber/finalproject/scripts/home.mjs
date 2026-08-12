// home.mjs - loads a random "Recipe of the Day" feature on the landing page
import { getRandomMeal } from './data.mjs';

const featureEl = document.querySelector('#recipeOfDay');

async function loadFeaturedRecipe() {
  if (!featureEl) return;

  featureEl.innerHTML = `<p class="status-msg">Finding today's recipe...</p>`;

  const meal = await getRandomMeal();

  if (!meal) {
    featureEl.innerHTML = `<p class="status-msg">Couldn't load a recipe right now. Please try again later.</p>`;
    return;
  }

  featureEl.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="400" height="300" loading="lazy">
    <div class="card-body">
      <h3>${meal.strMeal}</h3>
      <p class="meta">
        <span class="tag">${meal.strCategory ?? 'Uncategorized'}</span>
        <span class="tag">${meal.strArea ?? 'Unknown'}</span>
      </p>
      <a class="btn" href="recipes.html">Explore More Recipes</a>
    </div>
  `;
}

loadFeaturedRecipe();
