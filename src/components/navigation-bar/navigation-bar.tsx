import { LngLatLike, useMap } from '@vis.gl/react-maplibre';
import { Location } from '@/hooks/useGeocoding';
import ModeToggle from './mode-toggle';
import SearchBar from './search-bar';

function NavigationBar() {
  const { map } = useMap();

  function handleSearch(value: Location) {
    map?.flyTo({ center: [value.lon, value.lat] as LngLatLike, zoom: 12 });
  }

  return (
    <div className="flex w-screen justify-between p-2 overflow-visible">
      <div></div>
      <SearchBar onSelect={handleSearch} />
      <ModeToggle />
    </div>
  );
}

export default NavigationBar;
