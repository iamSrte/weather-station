import { Tornado } from 'lucide-react';
import ModeToggle from './mode-toggle';
import SearchBar from './search-bar';
import MapSwitch from './map-switch';

function NavigationBar() {
  return (
    <div className="flex w-screen justify-between p-2 overflow-visible">
      <div className="flex flex-row items-center space-x-4 ml-2 md:mr-4">
        <Tornado />
        <p className="font-mono text-xl hidden md:block">Weather Station</p>
      </div>
      <SearchBar/>
      <div className="flex flex-row items-center space-x-2 ml-2">
        <MapSwitch />
        <ModeToggle />
      </div>
    </div>
  );
}

export default NavigationBar;
