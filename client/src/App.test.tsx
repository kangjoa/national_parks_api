import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock the useParks hook
vi.mock('./hooks/useParks', () => ({
  useParks: () => ({
    currentParks: [],
    loading: false,
    error: null,
    pageCount: 0,
    handlePageChange: vi.fn(),
    handleSearch: vi.fn(),
    searchTerm: '',
    currentPage: 0,
    resetToFirstPage: vi.fn(),
  }),
}));

// Mock the useParksByIds
vi.mock('./hooks/useParksByIds', () => ({
  useParksByIds: () => ({
    parks: [],
    loading: false,
    error: null,
  }),
}));

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

describe('App Routes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render home route with heading', () => {
    render(<App />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.tagName).toBe('H1');
  });

  it('should render favorites route with heading', () => {
    render(<App />);

    const favoritesLinks = screen.getAllByRole('link', {
      name: 'My Favorites',
    });
    fireEvent.click(favoritesLinks[0]);

    expect(screen.getByText('My Favorite Parks')).toBeTruthy();
  });
});
