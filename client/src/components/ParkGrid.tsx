import { ParkCard } from './ParkCard';
import { ParkViewProps } from '../types';

export function ParkGrid({
  parks,
  favorites,
  onToggleFavorite,
}: ParkViewProps) {
  return (
    <div className="parks-grid">
      {parks.map((park) => (
        <ParkCard
          key={park.id}
          id={park.id}
          fullName={park.fullName}
          description={park.description}
          states={park.states}
          images={park.images}
          weatherInfo={park.weatherInfo}
          directionsUrl={park.directionsUrl}
          isFavorite={favorites.includes(park.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
