import { Search, User, Sparkles, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const HeaderNav = ({ onSearch, searchQuery, onProfileClick, dataSource }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.03 }}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-emerald to-neon-emerald-dark flex items-center justify-center neon-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-emerald rounded-full animate-pulse-glow" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Molverts-Congo</h1>
            <motion.span
              className="text-xs text-neon-emerald-light font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Atlas Moléculaire 3D
            </motion.span>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery || ''}
              placeholder="Rechercher plante, molécule ou pathologie..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-white rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:neon-border transition-all"
            />
          </div>
        </div>

        {/* User Profile + Data Source */}
        <div className="flex items-center gap-3">
          {dataSource === 'mock' && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <Database className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-yellow-400 text-xs">Mode Démo</span>
            </div>
          )}

          <motion.button
            onClick={onProfileClick}
            className="flex items-center gap-3 px-4 py-2 glass rounded-xl hover:neon-border transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-emerald to-neon-emerald-dark flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">Professeur</p>
              <p className="text-xs text-neon-emerald-light">Premium Actif</p>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default HeaderNav;
