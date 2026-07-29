import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Leaf, Atom, Stethoscope, Scroll } from 'lucide-react';
import { useState, useEffect } from 'react';

const filterConfig = [
  { key: 'plants', icon: Leaf, label: 'Plantes', desc: 'Espèces médicinales' },
  { key: 'molecules', icon: Atom, label: 'Molécules', desc: 'Composés actifs' },
  { key: 'pathologies', icon: Stethoscope, label: 'Pathologies', desc: 'Usages médicaux' },
  { key: 'traditional', icon: Scroll, label: 'Traditionnel', desc: 'Usages ancestraux' },
];

const SidebarFilters = ({ isOpen, onClose, filters, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState(filters);

  useEffect(() => {
    setActiveFilters(filters);
  }, [filters]);

  const toggleFilter = (key) => {
    const updated = { ...activeFilters, [key]: !activeFilters[key] };
    setActiveFilters(updated);
    onFilterChange?.(updated);
  };

  const resetFilters = () => {
    const defaults = { plants: true, molecules: true, pathologies: true, traditional: true };
    setActiveFilters(defaults);
    onFilterChange?.(defaults);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 glass z-50 overflow-y-auto"
          >
            <div className="sticky top-0 glass border-b border-white/10 p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-emerald to-neon-emerald-dark flex items-center justify-center neon-glow">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Filtres</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {filterConfig.map(({ key, icon: Icon, label, desc }) => {
                const active = activeFilters[key];
                return (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => toggleFilter(key)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      active ? 'glass neon-border' : 'glass-white opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          active ? 'bg-neon-emerald/20' : 'bg-gray-700'
                        }`}>
                          <Icon className={`w-5 h-5 ${active ? 'text-neon-emerald' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{label}</p>
                          <p className="text-gray-400 text-xs">{desc}</p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        active ? 'border-neon-emerald bg-neon-emerald' : 'border-gray-500'
                      }`}>
                        {active && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetFilters}
                className="w-full py-3 mt-6 glass-white rounded-xl text-white text-sm font-medium hover:neon-border transition-all"
              >
                Réinitialiser les filtres
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidebarFilters;
