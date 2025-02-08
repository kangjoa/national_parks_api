import { Link, useLocation } from 'react-router-dom'
import { Park } from '../types'

// React Router location state
interface LocationState {
  park: Park
}

export function ParkInfo() {
  const location = useLocation()
  const state = location.state as LocationState | null
  
  if (!state?.park) {
    return (
      <div className="park-info">
        <Link to="/" className="back-button">← Back to Parks</Link>
        <div>Please select a park from the home page</div>
      </div>
    )
  }

  const { park } = state

  return (
    <div className="park-info">
      <Link to="/" className="back-button">← Back to Parks</Link>
      <div className="park-details">
      <h1>{park.fullName}</h1>
        {park.images?.[0] && (
          <img
            src={park.images[0].url}
            alt={park.images[0].altText}
            className="park-detail-image"
          />
        )}
        <p className="park-states"><strong>States:</strong> {park.states}</p>
        <p className="park-description">{park.description}</p>
        <p className="park-weather-info"><strong>Weather Info:</strong> {park.weatherInfo}</p>
        <div className="park-directions-container">
          <button className="park-directions-button" onClick={() => window.open(park.directionsUrl, '_blank')}>
            Directions →
          </button>
        </div>
      </div>
    </div>
  )
}