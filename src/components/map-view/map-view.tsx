import { Map } from '@vis.gl/react-maplibre';
import { useTheme } from '@/components/ui/theme-provider';

function MapView() {
  const { theme } = useTheme();

  return (
    <Map
      id="map"
      initialViewState={{
        longitude: 55.5378041,
        latitude: 32.6060218,
        zoom: 4.5,
      }}
      style={{ position: 'relative', width: '100%', height: '100%' }}
      mapStyle={
        theme === 'dark'
          ? 'https://tiles.openfreemap.org/styles/dark'
          : 'https://tiles.openfreemap.org/styles/positron'
      }
      RTLTextPlugin="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"
    />
  );
}

export default MapView;
