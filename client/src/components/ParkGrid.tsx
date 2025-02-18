import { ParkCard } from './ParkCard';
import { Park } from '../types';

interface ParkGridProps {
  parks: Park[];
  favorites: string[];
  onToggleFavorite: (parkId: string) => void;
}

export function ParkGrid({
  parks,
  favorites,
  onToggleFavorite,
}: ParkGridProps) {
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
          isFavorite={favorites.includes(park.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
