import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useParks } from './hooks/useParks'
import { ParkGrid } from './components/ParkGrid'
import { ParkPagination } from './components/ParkPagination'
import { SearchBar } from './components/SearchBar'
import { ParkInfo } from './components/ParkInfo'
import './App.css'

function App() {
  const ITEMS_PER_PAGE = 9
  const { 
    currentParks, 
    loading, 
    error, 
    pageCount, 
    handlePageChange,
    handleSearch,
    searchTerm
  } = useParks(ITEMS_PER_PAGE)

  if (loading) return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  )
  if (error) return <div>Error: {error}</div>

  return (
    <Router>
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <header>
                  <h1>National Parks</h1>
                  <h2>United States</h2>
                </header>
                <SearchBar 
                  searchTerm={searchTerm} 
                  onSearch={handleSearch} 
                />
                <ParkGrid parks={currentParks} />
                <ParkPagination 
                  pageCount={pageCount} 
                  onPageChange={handlePageChange} 
                />
              </>
            } />
            <Route path="/park/:parkName" element={<ParkInfo />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
