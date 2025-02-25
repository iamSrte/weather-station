import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable.tsx';
import MapView from '@/components/map-view';
import NavigationBar from '@/components/navigation-bar';

function App() {
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
          <MapView />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default App;
