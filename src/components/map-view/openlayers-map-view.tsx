import { useCallback, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Map, View, Overlay } from 'ol';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorTileLayer from 'ol/layer/VectorTile';
import { applyStyle } from 'ol-mapbox-style';
import { useTheme } from '@/components/ui/theme-provider.tsx';
import { useMapStore } from '@/components/map-view';
import 'ol/ol.css';

function OpenLayersMapView() {
  const { theme } = useTheme();

  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const markerInstance = useRef<Overlay | null>(null);

  const lat = useMapStore((state) => state.lat);
  const lon = useMapStore((state) => state.lon);
  const isReached = useMapStore((state) => state.isReached);
  const isSelected = useMapStore((state) => state.isSelected);
  const updateGeocode = useMapStore((state) => state.updateGeocode);
  const updateIsReached = useMapStore((state) => state.updateIsReached);
  const updateIsSelected = useMapStore((state) => state.updateIsSelected);

  const applyMapTiles = useCallback(
    (map: Map) => {
      const openFreeMapTileLayer = new VectorTileLayer();
      applyStyle(
        openFreeMapTileLayer,
        theme === 'dark'
          ? 'https://tiles.openfreemap.org/styles/dark'
          : 'https://tiles.openfreemap.org/styles/positron'
      ).then();
      map.setLayers([openFreeMapTileLayer]);
    },
    [theme]
  );

  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;

    const map = new Map({
      target: 'map',
      view: new View({
        zoom: 5.5,
        center: fromLonLat([55.5378041, 32.6060218]),
        enableRotation: false,
      }),
    });
    applyMapTiles(map);
    mapInstance.current = map;

    const markerOverlay = new Overlay({
      element: markerRef.current,
      positioning: 'center-center',
      stopEvent: false,
    });
    map.addOverlay(markerOverlay);
    markerInstance.current = markerOverlay;

    map.on('click', (event) => {
      const clickedCoordinate = event.coordinate;
      const clickedGeocode = toLonLat(clickedCoordinate);
      updateIsReached(false);
      updateIsSelected(true);
      updateGeocode({ lon: clickedGeocode[0], lat: clickedGeocode[1] });
    });

    return () => map.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    applyMapTiles(mapInstance.current);
  }, [theme]);

  useEffect(() => {
    if (!mapInstance.current || !markerInstance.current || !isSelected) return;

    const targetCoordinate = fromLonLat([lon, lat]);
    mapInstance.current.getView().animate({
      zoom: 12,
      center: targetCoordinate,
      duration: isReached ? 0 : 2000,
    });
    markerInstance.current.setPosition(targetCoordinate);
    updateIsReached(true);
  }, [lon, lat]);

  return (
    <div className="w-full h-full relative" id="map-container">
      <div ref={mapRef} className="w-full h-full" id="map" />
      <div ref={markerRef} className="absolute bottom-0 left-[-12px]">
        <MapPin className="fill-white dark:fill-black" />
      </div>
    </div>
  );
}

export default OpenLayersMapView;
