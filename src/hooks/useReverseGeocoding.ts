import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Location } from '@/components/map-view/store.ts';

function useReverseGeocoding(location: { lat: number; lon: number } | null) {
  const fetchLocation = useCallback(
    () =>
      axios
        .get<Location[]>('http://api.openweathermap.org/geo/1.0/reverse', {
          params: {
            lat: location?.lat,
            lon: location?.lon,
            limit: 1,
            appid: import.meta.env.VITE_WEATHER_API_KEY,
          },
        })
        .then((response) => response.data),
    [location?.lat, location?.lon]
  );

  return useQuery<Location[], Error>({
    queryKey: ['searchLocation', location?.lat, location?.lon],
    queryFn: fetchLocation,
    enabled: !!location,
    staleTime: 1000 * 60 * 5,
  });
}

export default useReverseGeocoding;
