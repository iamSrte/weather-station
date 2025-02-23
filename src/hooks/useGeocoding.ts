import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Location {
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
}

function useGeocoding(value: string) {
  const fetchLocation = useCallback(() => {
    return axios
      .get<Location[]>('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: value.toUpperCase(),
          limit: 5,
          appid: import.meta.env.VITE_WEATHER_API_KEY,
        },
      })
      .then((response) => response.data);
  }, [value]);

  return useQuery<Location[], Error>({
    queryKey: ['searchLocation', value],
    queryFn: fetchLocation,
    enabled: !!value,
    staleTime: 1000 * 60 * 5,
  });
}

export default useGeocoding;
