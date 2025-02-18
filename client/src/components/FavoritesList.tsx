import { useQuery } from '@apollo/client';
import { GET_PARKS_BY_IDS } from '../queries/getParksByIds';
import ParkCard from './ParkCard';
import { Park, ParkViewProps } from '../types';

function FavoritesList({ favorites, onToggleFavorite }: ParkViewProps) {
  const { loading, error, data } = useQuery(GET_PARKS_BY_IDS, {
    variables: { ids: favorites },
    skip: favorites.length === 0,
  });

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error loading favorites: {error.message}</p>;

  const favoriteParksList = data?.getParksByIds.data || [];

  return (
    <div className="app-container">
      <header>
        <h1>My Favorite Parks</h1>
      </header>
      {favoriteParksList.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <div className="parks-grid">
          {favoriteParksList.map((park: Park) => (
            <ParkCard
              key={park.id}
              id={park.id}
              fullName={park.fullName}
              description={park.description}
              states={park.states}
              images={park.images}
              weatherInfo={park.weatherInfo}
              directionsUrl={park.directionsUrl}
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
