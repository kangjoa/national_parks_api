import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { Park, ParksResponse } from '../types'

export function useParks(itemsPerPage: number) {
  const [parks, setParks] = useState<Park[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await axios.get<ParksResponse>(
          'https://developer.nps.gov/api/v1/parks',
          {
            params: {
              limit: 1000,
              api_key: import.meta.env.VITE_API_KEY
            }
          }
        )
        setParks(response.data.data)
        setPageCount(Math.ceil(response.data.data.length / itemsPerPage))
        setLoading(false)
      } catch (error) {
        const errorMessage = error instanceof AxiosError 
          ? error.response?.data?.message || 'Failed to fetch parks data'
          : 'Failed to fetch parks data'
        setError(errorMessage)
        setLoading(false)
      }
    }

    fetchParks()
  }, [itemsPerPage])

  const handlePageChange = (selected: number) => {
    setItemOffset((selected * itemsPerPage) % filteredParks.length)
  }

  // Reset to first page when searching
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setItemOffset(0)
  }

  // Filter parks based on search term; prioritize states over names
  const filteredParks = parks.filter(park => {
    const nameMatch = park.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const stateMatch = park.states.toLowerCase().includes(searchTerm.toLowerCase());
    return stateMatch || (nameMatch && !stateMatch);
  })

  // Update page count based on filtered results
  useEffect(() => {
    setPageCount(Math.ceil(filteredParks.length / itemsPerPage))
  }, [filteredParks.length, itemsPerPage])

  const currentParks = filteredParks.slice(itemOffset, itemOffset + itemsPerPage)

  return {
    currentParks,
    loading,
    error,
    pageCount,
    handlePageChange,
    handleSearch,
    searchTerm
  }
} 