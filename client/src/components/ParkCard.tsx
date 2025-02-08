import { Link } from 'react-router-dom'

interface ParkCardProps {
  fullName: string
  description: string
  states: string
  images: Array<{
    url: string
    altText: string
  }>
  weatherInfo: string
}

export function ParkCard(park: ParkCardProps) {
  return (
    <div className="park-card">
      <Link 
        to={`/park/${encodeURIComponent(park.fullName)}`} 
        state={{ park }}
        className="park-link"
      >
        <h3>{park.fullName}</h3>
        {park.images?.[0] && (
          <img
            src={park.images[0].url}
            alt={park.images[0].altText}
            className="park-image"
          />
        )}
        <p className="park-states"><strong>States:</strong> {park.states}</p>
        <p>{park.description}</p>
      </Link>
    </div>
  )
} 