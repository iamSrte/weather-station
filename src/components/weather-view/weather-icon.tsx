import { useCallback } from 'react';
import {
  Sun,
  Cloudy,
  CircleX,
  CloudFog,
  CloudSun,
  CloudHail,
  CloudRain,
  CloudSnow,
  Snowflake,
  SunMedium,
  CloudDrizzle,
  CloudRainWind,
} from 'lucide-react';

interface Props {
  code: number;
  className?: string;
}

function WeatherIcon({ code, className }: Props) {
  const weatherCodeToIcon = useCallback((code: number, className?: string) => {
    switch (code) {
      case 0:
        return <Sun className={className} />;
      case 1:
        return <SunMedium className={className} />;
      case 2:
        return <CloudSun className={className} />;
      case 3:
        return <Cloudy className={className} />;
      case 45:
      case 48:
        return <CloudFog className={className} />;
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return <CloudDrizzle className={className} />;
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
        return <CloudRain className={className} />;
      case 71:
      case 73:
      case 75:
        return <Snowflake className={className} />;
      case 77:
      case 85:
      case 86:
        return <CloudSnow className={className} />;
      case 95:
        return <CloudRainWind className={className} />;
      case 96:
      case 99:
        return <CloudHail className={className} />;
      default:
        return <CircleX className={className} />;
    }
  }, []);

  return <>{weatherCodeToIcon(code, className)}</>;
}

export default WeatherIcon;
