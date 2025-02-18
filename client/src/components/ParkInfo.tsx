import { Link, useLocation } from 'react-router-dom';
import { Park, FavoritesProps } from '../types';

// React Router location state
interface LocationState {
  park: Park;
}

export function ParkInfo({ favorites, onToggleFavorite }: FavoritesProps) {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state?.park) {
    return (
      <div className="park-info">
        <Link to="/" className="back-button">
          ← Back to Parks
        </Link>
        <div>Please select a park from the home page</div>
      </div>
    );
  }

  const { park } = state;
  const {
    id,
    fullName,
    description,
    states,
    images,
    weatherInfo,
    directionsUrl,
  } = park;
  const isFavorite = favorites.includes(id);
  // console.log('directions URL:', park.directionsUrl);

  return (
    <div className="park-info">
      <Link to="/" className="back-button">
        ← Back to Parks
      </Link>
      <div className="park-details">
        <h1>{fullName}</h1>
        {images?.[0] && (
          <img
            src={images[0].url}
            alt={images[0].altText}
            className="park-detail-image"
          />
        )}
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
        <p className="park-states">
          <strong>States:</strong> {states}
        </p>
        <p className="park-description">{description}</p>
        <p className="park-weather-info">
          <strong>Weather Info:</strong> {weatherInfo}
        </p>
        <div className="park-directions-container">
          <a
            href={directionsUrl}
            className="park-directions-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Directions →
          </a>
        </div>
      </div>
    </div>
  );
}
