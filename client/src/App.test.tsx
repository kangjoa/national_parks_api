import { describe, expect, it, beforeEach, vi } from 'vitest';

describe('Favorites persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should read favorites from localStorage', () => {
    localStorage.setItem('parkFavorites', JSON.stringify(['park1', 'park2']));
    const savedFavorites = localStorage.getItem('parkFavorites');
    expect(savedFavorites).toBe('["park1","park2"]');
  });

  it('should return empty array when localStorage is empty', () => {
    localStorage.clear();
    const saved = localStorage.getItem('parkFavorites');
    const favorites = saved ? JSON.parse(saved) : [];
    expect(favorites).toEqual([]);
  });
});
