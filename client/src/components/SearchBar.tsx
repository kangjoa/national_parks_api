interface SearchBarProps {
  searchTerm: string
  onSearch: (term: string) => void
}

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  const handleClear = () => {
    onSearch('')
  }

  return (
    <div className="search-container">
      <label htmlFor="park-search" className="search-label">
        Search parks
      </label>
      <input
        id="park-search"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
      <button onClick={handleClear} className="clear-button">Clear</button>
    </div>
  )
} 