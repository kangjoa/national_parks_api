export interface Park {
  id: string;
  fullName: string;
  description: string;
  states: string;
  images: Array<{
    url: string;
    altText: string;
  }>;
  weatherInfo: string;
  directionsUrl: string;
}

export interface ParksResponse {
  data: Park[];
}

export interface ParkViewProps {
  parks: Park[];
  favorites: string[];
  onToggleFavorite: (parkId: string) => void;
}

export interface ParkCardProps extends Park {
  isFavorite: boolean;
  onToggleFavorite: (parkId: string) => void;
}
