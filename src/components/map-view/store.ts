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

interface LocationStore extends Geocode {
  isSelected: boolean;
  updateGeocode: (geocode: Geocode) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  lat: -100,
  lon: -100,
  isSelected: false,
  updateGeocode: (geocode: Geocode) => set(() => geocode),
}));

export default useLocationStore;
