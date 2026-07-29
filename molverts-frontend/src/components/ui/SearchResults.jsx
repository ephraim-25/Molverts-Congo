import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, MapPin, FlaskConical } from 'lucide-react';

const SearchResults = ({ results, provinces, onSelectProvince, onClose }) => {
  const handlePlantClick = (plant) => {
    const province = provinces.find((p) => p.id === plant.provinceId);
    if (province) onSelectProvince(province);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4"
      >
        <div className="glass rounded-xl overflow-hidden neon-border max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 sticky top-0 glass">
            <p className="text-white text-sm font-medium">Résultats de recherche</p>
            <button onClick={onClose} className="p-1 rounded hover:bg-white/10">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {results.provinces?.length > 0 && (
            <div className="p-3">
              <p className="text-neon-emerald text-xs font-medium mb-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Provinces
              </p>
              {results.provinces.map((province) => (
                <button
                  key={province.id}
                  onClick={() => onSelectProvince(province)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <p className="text-white text-sm">{province.name}</p>
                  <p className="text-gray-400 text-xs">{province.description}</p>
                </button>
              ))}
            </div>
          )}

          {results.plants?.length > 0 && (
            <div className="p-3 border-t border-white/5">
              <p className="text-neon-emerald text-xs font-medium mb-2 flex items-center gap-1">
                <Leaf className="w-3 h-3" /> Plantes
              </p>
              {results.plants.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => handlePlantClick(plant)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <p className="text-white text-sm">{plant.name}</p>
                  <p className="text-neon-emerald-light text-xs italic">{plant.commonName}</p>
                </button>
              ))}
            </div>
          )}

          {results.molecules?.length > 0 && (
            <div className="p-3 border-t border-white/5">
              <p className="text-neon-emerald text-xs font-medium mb-2 flex items-center gap-1">
                <FlaskConical className="w-3 h-3" /> Molécules
              </p>
              {results.molecules.map((mol) => (
                <button
                  key={mol.id}
                  onClick={() => {
                    const province = provinces.find((p) => p.id === mol.provinceId);
                    if (province) onSelectProvince(province);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <p className="text-white text-sm">{mol.name}</p>
                  <p className="text-gray-400 text-xs">{mol.formula} — {mol.properties}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchResults;
