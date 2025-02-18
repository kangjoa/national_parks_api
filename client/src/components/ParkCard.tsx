import { Link } from 'react-router-dom';

interface ParkCardProps {
  fullName: string;
  description: string;
  states: string;
  images: Array<{
    url: string;
    altText: string;
  }>;
  weatherInfo: string;
  id: string;
  onToggleFavorite: (parkId: string) => void;
  isFavorite: boolean;
}

export function ParkCard({
  fullName,
  description,
  states,
  images,
  weatherInfo,
  id,
  onToggleFavorite,
  isFavorite,
}: ParkCardProps) {
  return (
    <div className="park-card">
      <Link
        to={`/park/${encodeURIComponent(fullName)}`}
        state={{
          park: { fullName, description, states, images, weatherInfo, id },
        }}
        className="park-link"
      >
        <h3>{fullName}</h3>
        {images?.[0] && (
          <img
            src={images[0].url}
            alt={images[0].altText}
            className="park-image"
          />
        )}
        <p className="park-states">
          <strong>States:</strong> {states}
        </p>
        <p>{description}</p>
      </Link>
      <button
        onClick={(e) => {
          // Prevent from navigating to park details
          e.stopPropagation();
          onToggleFavorite(id);
        }}
        className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
      >
        {isFavorite ? '❤️' : '♡'}
      </button>
    </div>
  );
}

export default ParkCard;
