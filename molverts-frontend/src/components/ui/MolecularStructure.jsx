import { motion } from 'framer-motion';
import { Atom } from 'lucide-react';

const MolecularStructure = ({ molecule, size = 300 }) => {
  const glassStyle = {
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    boxShadow: '0 0 20px rgba(16, 185, 129, 0.1), inset 0 0 20px rgba(16, 185, 129, 0.05)'
  };

  // Generate a stylized 2D molecular diagram
  const atoms = molecule?.atoms || [
    { x: 0.5, y: 0.3, type: 'C', color: '#374151' },
    { x: 0.3, y: 0.5, type: 'O', color: '#EF4444' },
    { x: 0.7, y: 0.5, type: 'N', color: '#3B82F6' },
    { x: 0.5, y: 0.7, type: 'H', color: '#9CA3AF' },
    { x: 0.2, y: 0.3, type: 'C', color: '#374151' },
    { x: 0.8, y: 0.3, type: 'C', color: '#374151' },
  ];

  const bonds = molecule?.bonds || [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 0, to: 3 },
    { from: 0, to: 4 },
    { from: 0, to: 5 },
  ];

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
      }} />

      {/* Molecular Diagram */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 1 1"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Bonds */}
        {bonds.map((bond, index) => (
          <motion.line
            key={`bond-${index}`}
            x1={atoms[bond.from].x}
            y1={atoms[bond.from].y}
            x2={atoms[bond.to].x}
            y2={atoms[bond.to].y}
            stroke="rgba(16, 185, 129, 0.4)"
            strokeWidth="0.02"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          />
        ))}

        {/* Atoms */}
        {atoms.map((atom, index) => (
          <motion.g
            key={`atom-${index}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.4, type: 'spring' }}
          >
            {/* Atom circle */}
            <circle
              cx={atom.x}
              cy={atom.y}
              r="0.08"
              fill={atom.color}
              stroke="rgba(16, 185, 129, 0.5)"
              strokeWidth="0.01"
            />

            {/* Atom label */}
            <text
              x={atom.x}
              y={atom.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ffffff"
              fontSize="0.05"
              fontWeight="bold"
              style={{ pointerEvents: 'none' }}
            >
              {atom.type}
            </text>

            {/* Glow effect */}
            <circle
              cx={atom.x}
              cy={atom.y}
              r="0.12"
              fill="none"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="0.005"
              opacity="0.5"
            />
          </motion.g>
        ))}
      </svg>

      {/* Formula Display */}
      <div style={{
        position: 'absolute',
        bottom: '8px',
        left: '50%',
        transform: 'translateX(-50%)',
        ...glassStyle,
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#10B981',
        fontFamily: 'monospace',
        fontWeight: 600
      }}>
        {molecule?.formula || 'C₆H₁₂O₆'}
      </div>

      {/* Atom Type Legend */}
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        ...glassStyle,
        padding: '8px',
        borderRadius: '8px',
        fontSize: '10px',
        color: '#d1d5db'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#374151' }} />
          <span>Carbone</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <span>Oxygène</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3B82F6' }} />
          <span>Azote</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9CA3AF' }} />
          <span>Hydrogène</span>
        </div>
      </div>
    </div>
  );
};

export default MolecularStructure;
