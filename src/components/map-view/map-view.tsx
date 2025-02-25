import { useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Map, Marker, useMap } from '@vis.gl/react-maplibre';
import { useTheme } from '@/components/ui/theme-provider';
import { Geocode, useLocationStore } from '@/components/map-view';

function MapView() {
  const { map } = useMap();
  const { theme } = useTheme();

  const lat = useLocationStore((state) => state.lat);
  const lon = useLocationStore((state) => state.lon);
  const updateGeocode = useLocationStore((state) => state.updateGeocode);

  function handleClick(geocode: Geocode) {
    updateGeocode(geocode);
  }

  useEffect(() => {
    if (lat >= -90) {
      map?.flyTo({ center: [lon, lat], zoom: 11, speed: 0.8 });
    }
  }, [lat, lon, map]);

  return (
    <Map
      id="map"
      minZoom={2}
      dragRotate={false}
      initialViewState={{
        latitude: 32.6060218,
        longitude: 55.5378041,
        zoom: 4.5,
      }}
      style={{ position: 'relative', width: '100%', height: '100%' }}
      mapStyle={
        theme === 'dark'
          ? 'https://tiles.openfreemap.org/styles/dark'
          : 'https://tiles.openfreemap.org/styles/positron'
      }
      RTLTextPlugin="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"
      onClick={({ lngLat: { lat, lng } }) =>
        handleClick({ lat: lat, lon: lng })
      }
    >
      {lon >= -90 && (
        <Marker longitude={lon} latitude={lat} anchor="bottom">
          <MapPin fill="true" />
        </Marker>
      )}
    </Map>
  );
}

export default MapView;
