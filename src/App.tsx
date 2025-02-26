import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable.tsx';
import {
  MaplibreMapView,
  OpenLayersMapView,
  useMapStore,
} from '@/components/map-view';
import WeatherView from '@/components/weather-view';
import NavigationBar from '@/components/navigation-bar';

function App() {
  const map = useMapStore((state) => state.map);

  return (
    <>
      <NavigationBar />
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full flex-grow border-t"
      >
        <ResizablePanel
          defaultSize={20}
          minSize={16}
          maxSize={30}
          className="hidden md:flex md:flex-col"
        >
          <WeatherView />
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={80}>
          {map === 'MapLibre' ? (
            <MaplibreMapView />
          ) : map === 'OpenLayers' ? (
            <OpenLayersMapView />
          ) : (
            'Map not found!'
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default App;
