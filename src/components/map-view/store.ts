import { create } from 'zustand';

export interface Geocode {
  lat: number;
  lon: number;
}

export interface Location extends Geocode {
  name: string;
  country: string;
  state?: string;
}

interface MapStore extends Geocode {
  map: string;
  isReached: boolean;
  isSelected: boolean;
  UpdateMap: (map: string) => void;
  updateGeocode: (geocode: Geocode) => void;
  updateIsReached: (isReached: boolean) => void;
  updateIsSelected: (isSelected: boolean) => void;
}

const useMapStore = create<MapStore>((set) => ({
  lat: 32.6060218,
  lon: 55.5378041,
  map: 'MapLibre',
  isReached: false,
  isSelected: false,
  UpdateMap: (map: string) => set(() => ({ map: map })),
  updateGeocode: (geocode: Geocode) => set(() => geocode),
  updateIsReached: (isReached: boolean) =>
    set(() => ({ isReached: isReached })),
  updateIsSelected: (isSelected: boolean) =>
    set(() => ({ isSelected: isSelected })),
}));

export default useMapStore;
