import ParkCard from './ParkCard';
import { Park, ParkViewProps } from '../types';
import { useParksByIds } from '../hooks/useParksByIds';

export function FavoritesList({ favorites, onToggleFavorite }: ParkViewProps) {
  const { parks, loading, error } = useParksByIds(favorites);

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error loading favorites: {error}</p>;

  return (
    <div className="app-container">
      <header>
        <h1>My Favorite Parks</h1>
      </header>
      {parks.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <div className="parks-grid">
          {parks.map((park: Park) => (
            <ParkCard
              key={park.id}
              {...park}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesList;
