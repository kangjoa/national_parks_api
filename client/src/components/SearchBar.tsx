import { useState } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <label htmlFor="park-search" className="search-label">
        Search parks
      </label>
      <input
        id="park-search"
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
      <button type="button" onClick={handleClear} className="clear-button">
        Clear
      </button>
    </form>
  );
}
