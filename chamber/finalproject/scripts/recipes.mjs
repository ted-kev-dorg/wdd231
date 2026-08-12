// recipes.mjs - the recipe catalog page: fetch, search, filter, favorite, and open detail modal
import { getMealsByLetter } from './data.mjs';
import { openRecipeModal } from './modal.mjs';
import { getFavorites, isFavorite, toggleFavorite } from './favorites.mjs';

const grid = document.querySelector('#recipeGrid');
const searchInput = document.querySelector('#searchInput');
const areaSelect = document.querySelector('#areaSelect');
const favToggle = document.querySelector('#favToggle');
const resultCount = document.querySelector('#resultCount');

let allMeals = [];
let showFavoritesOnly = false;

function renderMeals(meals) {
  if (meals.length === 0) {
    grid.innerHTML = `<p class="status-msg">No recipes match your search. Try a different term or filter.</p>`;
    resultCount.textContent = '0 recipes found';
    return;
  }

  grid.innerHTML = meals
    .map((meal) => {
      const favorited = isFavorite(meal.idMeal);
      return `
        <article class="recipe-card card" data-id="${meal.idMeal}">
          <img src="${meal.strMealThumb}/preview" alt="${meal.strMeal}" width="320" height="240" loading="lazy">
          <div class="card-body">
            <h3>${meal.strMeal}</h3>
            <p class="meta">
              <span class="tag">${meal.strCategory ?? 'Uncategorized'}</span>
              <span class="tag">${meal.strArea ?? 'Unknown'}</span>
            </p>
            <div class="card-actions">
              <button type="button" class="btn view-btn" data-id="${meal.idMeal}">View Recipe</button>
              <button type="button" class="fav-btn" data-id="${meal.idMeal}" data-name="${meal.strMeal}"
                aria-pressed="${favorited}" aria-label="${favorited ? 'Remove from favorites' : 'Add to favorites'}">
                ${favorited ? '\u2665' : '\u2661'}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  resultCount.textContent = `${meals.length} recipe${meals.length === 1 ? '' : 's'} found`;
}

function applyFilters() {
  const term = searchInput.value.trim().toLowerCase();
  const area = areaSelect.value;

  let filtered = allMeals.filter((meal) => meal.strMeal.toLowerCase().includes(term));

  if (area !== 'all') {
    filtered = filtered.filter((meal) => meal.strArea === area);
  }

  if (showFavoritesOnly) {
    filtered = filtered.filter((meal) => isFavorite(meal.idMeal));
  }

  renderMeals(filtered);
}

function populateAreaFilter(meals) {
  const areas = [...new Set(meals.map((meal) => meal.strArea).filter(Boolean))].sort();
  areaSelect.innerHTML =
    `<option value="all">All Regions</option>` +
    areas.map((area) => `<option value="${area}">${area}</option>`).join('');
}

async function loadCatalog() {
  grid.innerHTML = `<p class="status-msg">Loading recipes...</p>`;

  const [batchC, batchB] = await Promise.all([getMealsByLetter('c'), getMealsByLetter('b')]);
  const combined = [...batchC, ...batchB];

  // de-duplicate by id in case a meal appears in both batches
  const seen = new Set();
  allMeals = combined.filter((meal) => {
    if (seen.has(meal.idMeal)) return false;
    seen.add(meal.idMeal);
    return true;
  });

  populateAreaFilter(allMeals);
  renderMeals(allMeals);
}

grid.addEventListener('click', (event) => {
  const viewBtn = event.target.closest('.view-btn');
  const favBtn = event.target.closest('.fav-btn');

  if (viewBtn) {
    openRecipeModal(viewBtn.dataset.id);
  }

  if (favBtn) {
    const nowFavorited = toggleFavorite(favBtn.dataset.id, favBtn.dataset.name);
    favBtn.setAttribute('aria-pressed', nowFavorited);
    favBtn.textContent = nowFavorited ? '\u2665' : '\u2661';
    favBtn.setAttribute('aria-label', nowFavorited ? 'Remove from favorites' : 'Add to favorites');
    if (showFavoritesOnly && !nowFavorited) {
      applyFilters();
    }
  }
});

searchInput.addEventListener('input', applyFilters);
areaSelect.addEventListener('change', applyFilters);
favToggle.addEventListener('click', () => {
  showFavoritesOnly = !showFavoritesOnly;
  favToggle.setAttribute('aria-pressed', showFavoritesOnly);
  favToggle.textContent = showFavoritesOnly
    ? `Showing Favorites (${getFavorites().length})`
    : 'Show Favorites Only';
  applyFilters();
});

loadCatalog();
