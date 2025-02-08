import { ParkCard } from './ParkCard'
import { Park } from '../types'

interface ParkGridProps {
  parks: Park[]
}

export function ParkGrid({ parks }: ParkGridProps) {
  return (
    <div className="parks-grid">
      {parks.map((park) => (
        <ParkCard key={park.fullName} {...park} />
      ))}
    </div>
  )
} 