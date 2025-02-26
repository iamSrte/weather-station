import { Wind, Droplets, EqualApproximately } from 'lucide-react';
import WeatherIcon from './weather-icon';

interface Props {
  className?: string;
  name: string;
  state?: string;
  code: number;
  wind: number;
  temp: number;
  feels: number;
  humidity: number;
}

function CurrentWeatherView({
  className,
  name,
  state,
  code,
  wind,
  temp,
  feels,
  humidity,
}: Props) {
  return (
    <div className={className + " text-nowrap"}>
      <div className="p-4 mx-2 content-start">
        <div className="flex flex-row items-center space-x-2">
          <WeatherIcon code={code} className="size-8" />
          <p className="font-bold text-4xl">{temp.toFixed()}°</p>
        </div>
        <p className="text-4xl pr-2">{name}</p>
        {state && (
          <p className="text-muted-foreground text-lg self-end text-nowrap">
            {state}
          </p>
        )}
      </div>
      <div className="block justify-between border-t space-y-1 p-4 mx-2">
        <div className="flex flex-row items-center space-x-2">
          <Wind />
          <p className="">Wind {wind.toFixed()} km/s</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <Droplets />
          <p className="">Humidity {humidity.toFixed()}%</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <EqualApproximately />
          <p>Feels like {feels.toFixed()}°</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherView;
