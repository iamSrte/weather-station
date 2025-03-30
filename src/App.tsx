import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import {
  useMapStore,
  MaplibreMapView,
  OpenLayersMapView,
} from '@/components/map-view';
import WeatherView from '@/components/weather-view';
import NavigationBar from '@/components/navigation-bar';
import { useEffect, useState } from 'react';

function App() {
  const lat = useMapStore((state) => state.lat);
  const lon = useMapStore((state) => state.lon);
  const map = useMapStore((state) => state.map);
  const isSelected = useMapStore((state) => state.isSelected);

  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = () => window.innerWidth >= 800;

  const mapView =
    map === 'MapLibre' ? (
      <MaplibreMapView />
    ) : map === 'OpenLayers' ? (
      <OpenLayersMapView />
    ) : (
      'Map not found!'
    );

  useEffect(() => {
    setIsOpen(isSelected);
  }, [isSelected, lat, lon])

  if (isDesktop()) {
    return (
      <>
        <NavigationBar />
        <ResizablePanelGroup
          direction={'horizontal'}
          className="w-full h-full flex-grow border-t"
        >
          <ResizablePanel
            defaultSize={25}
            minSize={17}
            maxSize={30}
            className="hidden md:flex md:flex-col"
          >
            <WeatherView />
          </ResizablePanel>
          <ResizableHandle withHandle className="hidden md:flex" />
          <ResizablePanel defaultSize={75}>{mapView}</ResizablePanel>
        </ResizablePanelGroup>
      </>
    );
  }

  return (
    <>
      <NavigationBar />
      {mapView}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTitle hidden={true}>Weather View</DrawerTitle>
        <DrawerTrigger asChild>
          <div className="fixed py-2 rounded-t-md outline bg-background bottom-0 left-0 right-0 z-50 flex justify-center cursor-pointer">
            <div className="h-2 w-25 rounded-full bg-muted-foreground/30 my-2" />
          </div>
        </DrawerTrigger>
        <DrawerContent className="h-full max-h-[90vh] mb-2 pb-2">
          <div className="h-full py-2">
            <WeatherView />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default App;
