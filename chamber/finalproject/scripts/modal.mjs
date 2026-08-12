// modal.mjs - controls the <dialog> recipe detail modal
import { getMealById, extractIngredients } from './data.mjs';

const modal = document.querySelector('#recipeModal');
const modalContent = document.querySelector('#modalContent');
const modalClose = document.querySelector('#modalClose');

modalClose?.addEventListener('click', () => modal.close());

modal?.addEventListener('click', (event) => {
  // close when the backdrop (the dialog element itself, outside modal-content) is clicked
  if (event.target === modal) {
    modal.close();
  }
});

export async function openRecipeModal(mealId) {
  modalContent.innerHTML = `<p class="status-msg">Loading recipe...</p>`;
  modal.showModal();

  const meal = await getMealById(mealId);

  if (!meal) {
    modalContent.innerHTML = `<p class="status-msg">Sorry, this recipe could not be loaded.</p>`;
    return;
  }

  const ingredients = extractIngredients(meal);

  modalContent.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="640" height="480" loading="lazy">
    <h2>${meal.strMeal}</h2>
    <p class="meta">
      <span class="tag">${meal.strCategory ?? 'Uncategorized'}</span>
      <span class="tag">${meal.strArea ?? 'Unknown region'}</span>
    </p>
    <h3>Ingredients</h3>
    <ul class="ingredient-list">
      ${ingredients.map((item) => `<li>${item}</li>`).join('')}
    </ul>
    <h3>Instructions</h3>
    <p>${meal.strInstructions.replace(/\r?\n/g, '<br>')}</p>
    ${meal.strYoutube ? `<p><a href="${meal.strYoutube}" target="_blank" rel="noopener">Watch video tutorial</a></p>` : ''}
  `;
}
