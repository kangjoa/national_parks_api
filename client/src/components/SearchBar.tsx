import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { AUTOCOMPLETE } from '../queries/autocomplete';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchTerm);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [fetchSuggestions, { data }] = useLazyQuery(AUTOCOMPLETE);
  const suggestions = data?.autocomplete ?? [];

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      fetchSuggestions({ variables: { prefix: value } });
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    setShowSuggestions(false);
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <label htmlFor="park-search" className="search-label">
        Search parks
      </label>
      <div className="search-input-wrapper">
        <input
          id="park-search"
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleChange}
          className="search-input"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion: string) => (
              <li key={suggestion} onClick={() => handleSelect(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className="search-button">
        Search
      </button>
      <button type="button" onClick={handleClear} className="clear-button">
        Clear
      </button>
    </form>
  );
}
