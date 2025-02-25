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
          defaultSize={25}
          className="hidden md:flex"
        ></ResizablePanel>
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={75}>
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
