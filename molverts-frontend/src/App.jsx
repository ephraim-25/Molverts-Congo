import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Loader2 } from 'lucide-react';
import HeaderNav from './components/ui/HeaderNav';
import RdcMap3D from './components/3d/RdcMap3D';
import ProvinceDrawer from './components/ui/ProvinceDrawer';
import SidebarFilters from './components/ui/SidebarFilters';
import SubscriptionModal from './components/ui/SubscriptionModal';
import SearchResults from './components/ui/SearchResults';
import { useAtlasData } from './hooks/useAtlasData';
import { useSearch } from './hooks/useSearch';

function App() {
  const { provinces, plants, loading, source, getPlantsByProvince } = useAtlasData();
  const { query, results, isSearching, hasResults, highlightedProvinceIds, search, clearSearch } = useSearch(provinces);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [filters, setFilters] = useState({
    plants: true,
    molecules: true,
    pathologies: true,
    traditional: true,
  });

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    clearSearch();
  };

  const handleSearchResultClick = (province) => {
    setSelectedProvince(province);
    clearSearch();
  };

  return (
    <div className="relative w-full h-screen bg-deep-slate overflow-hidden">
      <HeaderNav
        onSearch={search}
        searchQuery={query}
        onProfileClick={() => setIsSubscriptionOpen(true)}
        dataSource={source}
      />

      {/* 3D Map */}
      <div className="absolute inset-0 pt-20">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-neon-emerald animate-spin" />
              <p className="text-gray-400 text-sm">Chargement de l&apos;Atlas Moléculaire...</p>
            </div>
          </div>
        ) : (
          <RdcMap3D
            provinces={provinces}
            onProvinceSelect={handleProvinceSelect}
            selectedProvince={selectedProvince}
            highlightedProvinceIds={highlightedProvinceIds}
          />
        )}
      </div>

      {/* Filter Toggle */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsFiltersOpen(true)}
        className="fixed top-24 right-6 z-30 glass px-4 py-3 rounded-xl flex items-center gap-2 cursor-pointer hover:neon-border transition-all"
      >
        <Filter className="w-5 h-5 text-neon-emerald" />
        <span className="text-white text-sm font-medium">Filtres</span>
      </motion.button>

      {/* Search Results */}
      {hasResults && (
        <SearchResults
          results={results}
          provinces={provinces}
          onSelectProvince={handleSearchResultClick}
          onClose={clearSearch}
        />
      )}

      {/* Province Drawer */}
      <ProvinceDrawer
        province={selectedProvince}
        onClose={() => setSelectedProvince(null)}
      />

      {/* Sidebar Filters */}
      <SidebarFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
      />

      {/* Info Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-6 z-30 glass px-6 py-4 rounded-xl max-w-sm"
      >
        <h3 className="text-neon-emerald font-bold text-sm mb-2 neon-text">
          Atlas Moléculaire 3D de la RDC
        </h3>
        <p className="text-gray-300 text-xs leading-relaxed">
          Explorez les {provinces.length} provinces et découvrez les plantes médicinales,
          leurs molécules actives et propriétés thérapeutiques.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-[11px] text-neon-emerald-light px-2 py-1 rounded-full bg-neon-emerald/10">
            🖱️ Cliquez sur une province
          </span>
          <span className="text-[11px] text-neon-emerald-light px-2 py-1 rounded-full bg-neon-emerald/10">
            🔄 Faites pivoter la carte
          </span>
          {isSearching && (
            <span className="text-[11px] text-yellow-400 px-2 py-1 rounded-full bg-yellow-400/10">
              🔍 Recherche...
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default App;
