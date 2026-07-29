import { motion, AnimatePresence } from 'framer-motion';
import { X, Flask, Leaf, Activity, BookOpen } from 'lucide-react';
import { getPlantsByProvince } from '../../data/mockData';
import MolecularStructure from './MolecularStructure';

const ProvinceDrawer = ({ province, onClose }) => {
  const plants = province ? getPlantsByProvince(province.id) : [];

  const glassStyle = {
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  };

  const glassWhiteStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.12)'
  };

  const neonGlowStyle = {
    boxShadow: '0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.1)'
  };

  const neonBorderStyle = {
    boxShadow: '0 0 5px rgba(16, 185, 129, 0.5), inset 0 0 5px rgba(16, 185, 129, 0.2)'
  };

  return (
    <AnimatePresence>
      {province && (
        <>
          {/* Backdrop with enhanced blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 40
            }}
          />

          {/* Drawer with perfect glassmorphism */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              height: '100%',
              width: '100%',
              maxWidth: '672px',
              ...glassStyle,
              zIndex: 50,
              overflowY: 'auto'
            }}
          >
            {/* Header */}
            <div style={{
              position: 'sticky',
              top: 0,
              ...glassStyle,
              borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '24px',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}
                  >
                    PROVINCE : {province.name}
                  </motion.h2>
                  <p style={{ color: '#34D399', fontSize: '14px', marginTop: '4px' }}>{province.description}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  style={{ padding: '8px', borderRadius: '8px', cursor: 'pointer', background: 'transparent', border: 'none' }}
                >
                  <X style={{ width: '24px', height: '24px', color: '#ffffff' }} />
                </motion.button>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', ...glassStyle, borderRadius: '8px' }}>
                  <Leaf style={{ width: '16px', height: '16px', color: '#10B981' }} />
                  <span style={{ color: '#ffffff', fontSize: '14px' }}>{plants.length} Plantes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', ...glassStyle, borderRadius: '8px' }}>
                  <Activity style={{ width: '16px', height: '16px', color: '#10B981' }} />
                  <span style={{ color: '#ffffff', fontSize: '14px' }}>{province.biodiversity}</span>
                </div>
              </div>
            </div>

            {/* Plants List */}
            <div style={{ padding: '24px' }}>
              {plants.map((plant, index) => (
                <motion.div
                  key={plant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  style={{
                    ...glassStyle,
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '24px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = neonBorderStyle.boxShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = glassStyle.boxShadow;
                  }}
                >
                  {/* Plant Header with high-quality illustration */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '40px',
                      ...neonGlowStyle,
                      flexShrink: 0
                    }}>
                      {plant.image}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '4px' }}>
                        {plant.name}
                      </h3>
                      <p style={{ color: '#34D399', fontSize: '14px', fontStyle: 'italic' }}>
                        {plant.commonName}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ color: '#d1d5db', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>
                    {plant.description}
                  </p>

                  {/* Molecules */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <Flask style={{ width: '16px', height: '16px', color: '#10B981' }} />
                      <h4 style={{ color: '#ffffff', fontWeight: 600, fontSize: '14px' }}>Molécules Actives</h4>
                    </div>
                    <div>
                      {plant.molecules.map((molecule, idx) => (
                        <div
                          key={idx}
                          style={{
                            ...glassWhiteStyle,
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <p style={{ color: '#ffffff', fontWeight: 500, fontSize: '14px' }}>{molecule.name}</p>
                            <p style={{ color: '#9ca3af', fontSize: '12px', fontFamily: 'monospace' }}>{molecule.formula}</p>
                          </div>
                          <span style={{
                            color: '#34D399',
                            fontSize: '12px',
                            padding: '4px 8px',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)'
                          }}>
                            {molecule.properties}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Therapeutic Uses */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <Activity style={{ width: '16px', height: '16px', color: '#10B981' }} />
                      <h4 style={{ color: '#ffffff', fontWeight: 600, fontSize: '14px' }}>Propriétés Thérapeutiques</h4>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {plant.therapeuticUses.map((use, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '6px 12px',
                            fontSize: '12px',
                            color: '#ffffff',
                            ...glassStyle,
                            borderRadius: '9999px'
                          }}
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Traditional Uses */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <BookOpen style={{ width: '16px', height: '16px', color: '#10B981' }} />
                      <h4 style={{ color: '#ffffff', fontWeight: 600, fontSize: '14px' }}>Usage Traditionnel</h4>
                    </div>
                    <p style={{ color: '#d1d5db', fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6' }}>
                      {plant.traditionalUses}
                    </p>
                  </div>

                  {/* Molecular Structure Component */}
                  <div style={{ ...glassWhiteStyle, borderRadius: '12px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <Flask style={{ width: '16px', height: '16px', color: '#10B981' }} />
                      <h4 style={{ color: '#ffffff', fontWeight: 600, fontSize: '14px' }}>Structure Moléculaire</h4>
                    </div>
                    <MolecularStructure 
                      molecule={{
                        formula: plant.molecules[0]?.formula || 'C₆H₁₂O₆',
                        atoms: [
                          { x: 0.5, y: 0.3, type: 'C', color: '#374151' },
                          { x: 0.3, y: 0.5, type: 'O', color: '#EF4444' },
                          { x: 0.7, y: 0.5, type: 'N', color: '#3B82F6' },
                          { x: 0.5, y: 0.7, type: 'H', color: '#9CA3AF' },
                          { x: 0.2, y: 0.3, type: 'C', color: '#374151' },
                          { x: 0.8, y: 0.3, type: 'C', color: '#374151' },
                        ],
                        bonds: [
                          { from: 0, to: 1 },
                          { from: 0, to: 2 },
                          { from: 0, to: 3 },
                          { from: 0, to: 4 },
                          { from: 0, to: 5 },
                        ]
                      }}
                      size={280}
                    />
                  </div>
                </motion.div>
              ))}

              {plants.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ textAlign: 'center', padding: '64px 0' }}
                >
                  <Leaf style={{ width: '64px', height: '64px', color: '#4b5563', margin: '0 auto 16px' }} />
                  <p style={{ color: '#9ca3af', fontSize: '14px' }}>
                    Aucune plante médicinale répertoriée pour cette province
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProvinceDrawer;
