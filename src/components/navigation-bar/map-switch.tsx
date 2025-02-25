import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMapStore } from '@/components/map-view';

function MapSwitch() {
  const map = useMapStore((state) => state.map);
  const UpdateMap = useMapStore((state) => state.UpdateMap);

  function handleChange(value: string) {
    UpdateMap(value);
  }

  return (
    <Tabs defaultValue="MapLibre" value={map} onValueChange={handleChange}>
      <TabsList>
        <TabsTrigger value="OpenLayers">OpenLayers</TabsTrigger>
        <TabsTrigger value="MapLibre">MapLibre</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default MapSwitch;
