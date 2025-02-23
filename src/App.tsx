import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable.tsx';
import NavigationBar from '@/components/navigation-bar';

function App() {
  return (
    <>
      <NavigationBar />
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full flex-grow border-t"
      >
        <ResizablePanel defaultSize={25}></ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}></ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default App;
