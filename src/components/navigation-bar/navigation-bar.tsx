import { Tornado } from 'lucide-react';
import ModeToggle from './mode-toggle';
import SearchBar from './search-bar';

function NavigationBar() {
  return (
    <div className="flex w-screen justify-between p-2 overflow-visible">
      <div className="flex flex-row items-center">
        <Tornado />
        <p className="pl-2 font-mono text-xl hidden md:block">
          Weather Station
        </p>
      </div>
      <SearchBar />
      <ModeToggle />
    </div>
  );
}

export default NavigationBar;
