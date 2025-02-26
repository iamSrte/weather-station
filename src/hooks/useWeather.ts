import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Geocode } from '@/components/map-view';


export interface CurrentWeather {
  time: string;
  weather_code: number;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

export interface Weather {
  timezone: string;
  timezone_abbreviation: string;
  current: CurrentWeather;
  daily: DailyWeather;
}

function useWeather(geocode: Geocode | null) {
  const fetchWeather = useCallback(
    () =>
      axios
        .get<Weather>('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: geocode?.lat,
            longitude: geocode?.lon,
            forecast_days: 14,
            current: [
              'temperature_2m',
              'relative_humidity_2m',
              'apparent_temperature',
              'weather_code',
              'wind_speed_10m',
            ],
            daily: [
              'weather_code',
              'temperature_2m_max',
              'temperature_2m_min',
              'precipitation_probability_max',
            ],
            timezone: 'auto',
          },
        })
        .then((response) => response.data),
    [geocode?.lat, geocode?.lon]
  );

  return useQuery<Weather, Error>({
    queryKey: ['weather', geocode?.lat, geocode?.lon],
    queryFn: fetchWeather,
    enabled: !!geocode,
    staleTime: 1000 * 60 * 10,
  });
}

export default useWeather;
