import { useState, useMemo, useCallback } from 'react';
import { searchAtlas } from '../data/mockData';
import { apiService } from '../services/api';

export function useSearch(provinces) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(async (searchQuery) => {
    setQuery(searchQuery);

    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults(null);
      return;
    }

    setIsSearching(true);
    try {
      const response = await apiService.globalSearch(searchQuery);
      setResults(response.data);
    } catch {
      setResults(searchAtlas(searchQuery));
    } finally {
      setIsSearching(false);
    }
  }, []);

  const highlightedProvinceIds = useMemo(() => {
    if (!results?.provinces?.length) return new Set();
    return new Set(results.provinces.map((p) => p.id));
  }, [results]);

  const hasResults = results && (
    results.plants?.length > 0 ||
    results.provinces?.length > 0 ||
    results.molecules?.length > 0
  );

  return {
    query,
    results,
    isSearching,
    hasResults,
    highlightedProvinceIds,
    search: performSearch,
    clearSearch: () => { setQuery(''); setResults(null); },
  };
}
