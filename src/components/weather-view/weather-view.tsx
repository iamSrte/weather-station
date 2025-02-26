import { ScrollArea } from '@/components/ui/scroll-area';
import useWeather from '@/hooks/useWeather';
import useReverseGeocoding from '@/hooks/useReverseGeocoding';
import { Geocode, useMapStore } from '@/components/map-view';
import DailyWeatherView, { Daily } from './daily-weather-view';
import DailyWeatherSkeleton from './daily-weather-skeleton';
import CurrentWeatherView from './current-weather-view';
import CurrentWeatherSkeleton from './current-weather-skeleton';

function WeatherView() {
  const lat = useMapStore((state) => state.lat);
  const lon = useMapStore((state) => state.lon);
  const isSelected = useMapStore((state) => state.isSelected);
  const { data: location, isLoading: isLoadingGeocode } = useReverseGeocoding({
    lat: lat,
    lon: lon,
  });
  const { data: weather, isLoading: isLoadingWeather } = useWeather(
    location ? (location[0] as Geocode) : null
  );

  if (!isSelected) {
    return (
      <div className="w-full h-full content-center justify-items-center p-5">
        <p className="text-muted-foreground overflow-clip">
          Select a location on the map first!
        </p>
      </div>
    );
  }

  if (weather && location && isSelected) {
    const dailyData: Daily[] = [];
    for (let i = 0; i < weather.daily.time.length; i++) {
      dailyData.push({
        date: new Date(weather.daily.time[i]),
        weather_code: weather.daily.weather_code[i],
        temperature_max: weather.daily.temperature_2m_max[i],
        temperature_min: weather.daily.temperature_2m_min[i],
        precipitation_probability:
          weather.daily.precipitation_probability_max[i],
      });
    }

    return (
      <div className="flex flex-col h-full p-2 space-y-2 ">
        <CurrentWeatherView
          className="h-auto rounded-md border overflow-x-clip"
          name={location[0].name}
          state={location[0].state}
          code={weather.current.weather_code}
          wind={weather.current.wind_speed_10m}
          temp={weather.current.temperature_2m}
          feels={weather.current.apparent_temperature}
          humidity={weather.current.relative_humidity_2m}
        />
        <ScrollArea className="h-full w-full rounded-md border overflow-y-auto">
          <DailyWeatherView dailyData={dailyData} />
        </ScrollArea>
      </div>
    );
  }

  if ((isLoadingWeather || isLoadingGeocode) && isSelected) {
    return (
      <div className="h-full p-2 overflow-auto space-y-2">
        <CurrentWeatherSkeleton />
        <div className="h-full w-full rounded-md border">
          {[...Array(14).keys()].map((index) => (
            <DailyWeatherSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return <div>Nothing</div>;
}

export default WeatherView;
