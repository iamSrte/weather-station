import { useEffect } from 'react';
import { MapPin } from 'lucide-react';
import {
  Map,
  Marker,
  NavigationControl,
  ScaleControl,
  useMap,
} from 'react-map-gl/maplibre';
import { useTheme } from '@/components/ui/theme-provider';
import { Geocode, useMapStore } from '@/components/map-view';

function MaplibreMapView() {
  const { map } = useMap();
  const { theme } = useTheme();

  const lat = useMapStore((state) => state.lat);
  const lon = useMapStore((state) => state.lon);
  const isReached = useMapStore((state) => state.isReached);
  const isSelected = useMapStore((state) => state.isSelected);
  const updateGeocode = useMapStore((state) => state.updateGeocode);
  const updateIsReached = useMapStore((state) => state.updateIsReached);
  const updateIsSelected = useMapStore((state) => state.updateIsSelected);

  function handleClick(geocode: Geocode) {
    updateIsReached(false);
    updateIsSelected(true);
    updateGeocode(geocode);
  }

  useEffect(() => {
    if (isSelected) {
      map?.flyTo({
        center: [lon, lat],
        zoom: 11,
        ...(isReached ? { duration: 0 } : { speed: 0.8 }),
      });
      updateIsReached(true);
    }
  }, [lat, lon, map]);

  return (
    <Map
      id="map"
      minZoom={2}
      dragRotate={false}
      initialViewState={{ latitude: lat, longitude: lon, zoom: 4.5 }}
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
      <NavigationControl showCompass={false} position="top-left" />
      <ScaleControl />
      {isSelected && (
        <Marker longitude={lon} latitude={lat} anchor="bottom">
          <MapPin className="fill-white dark:fill-black" />
        </Marker>
      )}
    </Map>
  );
}

export default MaplibreMapView;
