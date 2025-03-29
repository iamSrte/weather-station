import { Map } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useMapStore } from '@/components/map-view';

function MapSwitch() {
  const map = useMapStore((state) => state.map);
  const UpdateMap = useMapStore((state) => state.UpdateMap);

  return (
    <>
      <Button
        className="flex lg:hidden"
        variant="outline"
        size="icon"
        onClick={() => {
          UpdateMap(map === 'MapLibre' ? 'OpenLayers' : 'MapLibre');
          toast(`Map engine changed to ${map}`)
        }}
      >
        <Map />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Tabs
        className="hidden lg:flex"
        defaultValue="MapLibre"
        value={map}
        onValueChange={(value) => {
          UpdateMap(value);
          toast(`Map engine changed to ${value}`);
        }}
      >
        <TabsList>
          <TabsTrigger value="OpenLayers">OpenLayers</TabsTrigger>
          <TabsTrigger value="MapLibre">MapLibre</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}

export default MapSwitch;
