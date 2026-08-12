// favorites.mjs - persist a user's favorite recipe ids/names in localStorage
const STORAGE_KEY = 'wre-favorites';

export function getFavorites() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function isFavorite(mealId) {
  return getFavorites().some((fav) => fav.id === mealId);
}

export function toggleFavorite(mealId, mealName) {
  const favorites = getFavorites();
  const index = favorites.findIndex((fav) => fav.id === mealId);

  if (index === -1) {
    favorites.push({ id: mealId, name: mealName });
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return isFavorite(mealId);
}
