export const FAVORITES_KEY = 'parkFavorites';

/**
 * Loads favorites from localStorage
 * @returns Array of favorite park IDs, or empty array if none exist
 */
export function loadFavoritesFromStorage(): string[] {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
}

/**
 * Saves favorites to localStorage
 * @param favorites - Array of favorite park IDs to save
 */
export function saveFavoritesToStorage(favorites: string[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
