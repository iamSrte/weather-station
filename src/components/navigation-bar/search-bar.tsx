import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import useSearchLocation from '@/hooks/useGeocoding';
import { Geocode, useMapStore } from '@/components/map-view';

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const debounceValue = useDebounce(searchInput);
  const { data, error, isLoading } = useSearchLocation(
    debounceValue.toUpperCase()
  );

  const updateGeocode = useMapStore((state) => state.updateGeocode);
  const updateIsReached = useMapStore((state) => state.updateIsReached);
  const updateIsSelected = useMapStore((state) => state.updateIsSelected);

  function handleInputChange(input: string) {
    setIsOpen(true);
    setSearchInput(input);
  }

  function handleSelect(geocode: Geocode) {
    setIsOpen(false);
    setSearchInput('');
    updateIsReached(false);
    updateIsSelected(true);
    updateGeocode(geocode);
  }

  return (
    <div className="flex-grow w-full max-w-100 min-w-0 relative">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder="Search a location..."
          value={searchInput}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      {isOpen && debounceValue && (
        <div className="absolute top-full z-50 w-100 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
          <Command>
            <CommandList>
              <CommandEmpty>
                {isLoading
                  ? 'Loading...'
                  : error
                    ? error.message
                    : 'No results found.'}
              </CommandEmpty>
              <CommandGroup>
                {data?.map((location, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => handleSelect(location)}
                  >
                    {location.name}
                    <span className="text-sm text-muted-foreground">
                      {location.state && location.state + ', '}
                      {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
