import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useParks } from './hooks/useParks';
import { ParkGrid } from './components/ParkGrid';
import { ParkPagination } from './components/ParkPagination';
import { SearchBar } from './components/SearchBar';
import { ParkInfo } from './components/ParkInfo';
import './App.css';
import { useState, useEffect } from 'react';
import FavoritesList from './components/FavoritesList';
import {
  loadFavoritesFromStorage,
  saveFavoritesToStorage,
} from './utils/favoritesStorage';

function App() {
  const ITEMS_PER_PAGE = 9;
  const {
    currentParks,
    loading,
    error,
    pageCount,
    handlePageChange,
    handleSearch,
    searchTerm,
    currentPage,
    resetToFirstPage,
  } = useParks(ITEMS_PER_PAGE);

  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    return loadFavoritesFromStorage();
  });

  // Update localStorage when favorites change
  useEffect(() => {
    saveFavoritesToStorage(favorites);
  }, [favorites]);

  const toggleFavorite = (parkId: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(parkId)) {
        return prevFavorites.filter((id) => id !== parkId);
      } else {
        return [...prevFavorites, parkId];
      }
    });
  };

  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          <Link to="/" onClick={resetToFirstPage}>
            Home
          </Link>
          <Link to="/favorites">My Favorites</Link>
        </nav>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <header>
                    <h1>National Parks</h1>
                    <h2>United States</h2>
                  </header>
                  <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
                  <ParkGrid
                    parks={currentParks}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                  />
                  <ParkPagination
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    forcePage={currentPage}
                  />
                </>
              }
            />
            <Route
              path="/park/:parkName"
              element={
                <ParkInfo
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritesList
                  favorites={favorites}
                  parks={currentParks}
                  onToggleFavorite={toggleFavorite}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
