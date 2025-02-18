export interface Park {
  fullName: string;
  description: string;
  states: string;
  images: Array<{
    url: string;
    altText: string;
  }>;
  weatherInfo: string;
  directionsUrl: string;
  id: string;
}

export interface ParksResponse {
  data: Park[];
}
