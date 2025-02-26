import { Droplets } from 'lucide-react';
import WeatherIcon from './weather-icon';

export interface Daily {
  date: Date;
  weather_code: number;
  temperature_max: number;
  temperature_min: number;
  precipitation_probability: number;
}

interface Props {
  className?: string;
  dailyData: Daily[];
}

function DailyWeatherView({ className, dailyData }: Props) {
  return (
    <div className={className}>
      {dailyData.map((day, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between h-20 border-b space-x-4 p-4 mx-2 "
        >
          <div className="block">
            <p className="text-lg">
              {new Date().setHours(0, 0, 0, 0) == day.date.setHours(0, 0, 0, 0)
                ? 'TODAY'
                : day.date
                    .toLocaleDateString('en-us', { weekday: 'short' })
                    .toUpperCase()}
            </p>
            <p className="text-muted-foreground">
              {day.date.getMonth() + 1}/{day.date.getDate()}
            </p>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <WeatherIcon code={day.weather_code} className="size-8" />
            <p className="font-bold text-2xl">
              {day.temperature_max.toFixed()}°
            </p>
            <p className="text-muted-foreground self-end">
              {day.temperature_min.toFixed()}°
            </p>
          </div>
          <div className="flex flex-row items-center space-x-1">
            <Droplets className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {day.precipitation_probability}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DailyWeatherView;
