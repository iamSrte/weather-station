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
import useSearchLocation, { Location } from '@/hooks/useGeocoding';

interface Props {
  onSelect: (value: Location) => void;
}

function SearchBar({ onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const debounceValue = useDebounce(searchInput);
  const { data, error, isLoading } = useSearchLocation(debounceValue);

  function handleInputChange(input: string) {
    setIsOpen(true);
    setSearchInput(input);
  }

  function handleSelect(data: Location) {
    setIsOpen(false);
    setSearchInput('');
    onSelect(data);
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          className="w-100 pl-8"
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
                      {location.state ? location.state : 'Unknown'}
                      {', '}
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
