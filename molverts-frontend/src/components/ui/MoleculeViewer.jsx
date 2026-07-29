import { motion } from 'framer-motion';

const MoleculeViewer = ({ formula, moleculeName }) => {
  const atoms = formula ? formula.replace(/[₀-₉]/g, (d) => '0123456789'['₀₁₂₃₄₅₆₇₈₉'.indexOf(d)] || d) : 'C';

  return (
    <div className="glass-white rounded-lg p-4 overflow-hidden">
      <p className="text-neon-emerald text-xs font-mono mb-3">
        {moleculeName && <span className="text-white font-sans font-medium mr-2">{moleculeName}</span>}
        {formula}
      </p>
      <div className="relative h-24 rounded-lg bg-gradient-to-br from-neon-emerald/10 to-transparent flex items-center justify-center overflow-hidden">
        {/* Animated molecular bonds visualization */}
        <svg viewBox="0 0 200 80" className="w-full h-full">
          <motion.circle
            cx="40" cy="40" r="12"
            fill="#10B981" opacity={0.8}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="100" cy="30" r="10"
            fill="#34D399" opacity={0.7}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
          />
          <motion.circle
            cx="100" cy="55" r="10"
            fill="#059669" opacity={0.7}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
          />
          <motion.circle
            cx="160" cy="40" r="12"
            fill="#10B981" opacity={0.8}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
          />
          <line x1="52" y1="40" x2="88" y2="32" stroke="#10B981" strokeWidth="2" opacity="0.5" />
          <line x1="52" y1="40" x2="88" y2="52" stroke="#10B981" strokeWidth="2" opacity="0.5" />
          <line x1="112" y1="32" x2="148" y2="38" stroke="#34D399" strokeWidth="2" opacity="0.5" />
          <line x1="112" y1="52" x2="148" y2="42" stroke="#34D399" strokeWidth="2" opacity="0.5" />
          <text x="40" y="44" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">C</text>
          <text x="100" y="34" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">O</text>
          <text x="100" y="59" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">N</text>
          <text x="160" y="44" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">H</text>
        </svg>

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-deep-slate/40 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      <p className="text-gray-500 text-[10px] mt-2 text-center italic">
        Représentation schématique — {atoms}
      </p>
    </div>
  );
};

export default MoleculeViewer;
