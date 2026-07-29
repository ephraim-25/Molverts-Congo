import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { provinces } from '../../data/mockData';

// Deep radial gradient background component
const RadialBackground = () => {
  const { scene } = useThree();
  
  useEffect(() => {
    // Create a large sphere with radial gradient texture
    const geometry = new THREE.SphereGeometry(50, 64, 64);
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Create radial gradient from #0B0F12 to #000000
    const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
    gradient.addColorStop(0, '#0B0F12');
    gradient.addColorStop(0.5, '#080a0c');
    gradient.addColorStop(1, '#000000');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    return () => {
      scene.remove(sphere);
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [scene]);
  
  return null;
};

// Province with extruded geometry and light path borders
const Province = ({ province, onHover, onClick, isHovered, isSelected, isDimmed }) => {
  const meshRef = useRef();
  const borderRef = useRef();
  const [hovered, setHovered] = useState(false);
  const pulseRef = useRef({ value: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = province.position.y + Math.sin(state.clock.elapsedTime * 0.5 + province.id) * 0.02;
    }
    
    // Pulsation effect for selected province
    if (isSelected && borderRef.current) {
      pulseRef.current.value = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5;
      borderRef.current.material.opacity = 0.3 + pulseRef.current.value * 0.7;
    }
  });

  const baseColor = isDimmed ? '#1a1f2e' : (isSelected ? '#10B981' : (hovered || isHovered) ? '#34D399' : '#059669');
  const emissiveColor = isSelected ? '#10B981' : (hovered || isHovered) ? '#10B981' : '#000000';
  const emissiveIntensity = isSelected ? 0.4 : (hovered ? 0.2 : 0.05);

  return (
    <group position={[province.position.x, province.position.y, province.position.z]}>
      {/* Main province mesh with extruded geometry */}
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          setHovered(true);
          onHover?.(province);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover?.(null);
        }}
        onClick={() => onClick?.(province)}
      >
        {/* Use a more complex geometry for better visual representation */}
        <cylinderGeometry args={[0.12, 0.15, 0.08, 32]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      
      {/* Light path border - neon emerald line */}
      <lineSegments ref={borderRef}>
        <edgesGeometry attach="geometry" args={[new THREE.CylinderGeometry(0.12, 0.15, 0.08, 32)]} />
        <lineBasicMaterial
          attach="material"
          color="#10B981"
          transparent
          opacity={isSelected ? 0.8 : (hovered || isHovered ? 0.6 : 0.3)}
          linewidth={isSelected ? 3 : (hovered || isHovered ? 2 : 1)}
        />
      </lineSegments>
      
      {/* Topographic relief bump effect */}
      <mesh position={[0, 0.05, 0]} scale={[1.05, 1, 1.05]}>
        <cylinderGeometry args={[0.12, 0.15, 0.02, 32]} />
        <meshStandardMaterial
          color="#1a1f2e"
          transparent
          opacity={0.3}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      
      {/* Hotspots with pulsating effect */}
      {province.hotspots?.map((hotspot, index) => (
        <group key={index} position={[hotspot.x, hotspot.y + 0.1, hotspot.z]}>
          <mesh>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
          <mesh scale={[1.5, 1.5, 1.5]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color="#10B981" transparent opacity={0.3} />
          </mesh>
        </group>
      ))}
      
      {/* Province name label */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial color="#34D399" />
      </mesh>
    </group>
  );
};

// Connection lines between nearby provinces
const ConnectionLines = ({ selectedProvince }) => {
  const linesRef = useRef();
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  const linePositions = [];
  provinces.forEach((province, i) => {
    provinces.forEach((otherProvince, j) => {
      if (i < j) {
        const distance = Math.sqrt(
          Math.pow(province.position.x - otherProvince.position.x, 2) +
          Math.pow(province.position.y - otherProvince.position.y, 2) +
          Math.pow(province.position.z - otherProvince.position.z, 2)
        );
        if (distance < 2.5) {
          linePositions.push(
            province.position.x, province.position.y, province.position.z,
            otherProvince.position.x, otherProvince.position.y, otherProvince.position.z
          );
        }
      }
    });
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={linePositions.length / 3}
          array={new Float32Array(linePositions)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color="#10B981" 
        transparent 
        opacity={selectedProvince ? 0.05 : 0.1} 
      />
    </lineSegments>
  );
};

// Ambient particles for depth
const AmbientParticles = () => {
  const particlesRef = useRef();
  
  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015} 
        color="#10B981" 
        transparent 
        opacity={0.3} 
      />
    </points>
  );
};

const RdcMap3D = ({ onProvinceSelect, selectedProvince }) => {
  const [hoveredProvince, setHoveredProvince] = useState(null);
  const cameraRef = useRef();
  const controlsRef = useRef();

  // GSAP camera transition when province is selected
  useEffect(() => {
    if (selectedProvince && cameraRef.current) {
      const targetPosition = {
        x: selectedProvince.position.x * 2,
        y: selectedProvince.position.y + 2,
        z: selectedProvince.position.z + 3
      };
      
      gsap.to(cameraRef.current.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1.5,
        ease: "power2.inOut"
      });
      
      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: selectedProvince.position.x,
          y: selectedProvince.position.y,
          z: selectedProvince.position.z,
          duration: 1.5,
          ease: "power2.inOut"
        });
      }
    } else if (!selectedProvince && cameraRef.current) {
      // Reset camera when no province is selected
      gsap.to(cameraRef.current.position, {
        x: 0,
        y: 3,
        z: 5,
        duration: 1.5,
        ease: "power2.inOut"
      });
      
      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.5,
          ease: "power2.inOut"
        });
      }
    }
  }, [selectedProvince]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 3, 5], fov: 60 }}
        style={{ background: '#0B0F12' }}
        gl={{ antialias: true, alpha: true }}
      >
        <RadialBackground />
        
        {/* Lighting setup with rase light effect */}
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[5, 2, 5]} 
          intensity={0.8} 
          color="#10B981"
          castShadow
        />
        <pointLight 
          position={[0, 5, 0]} 
          intensity={0.5} 
          color="#059669"
        />
        <pointLight 
          position={[-5, 1, -5]} 
          intensity={0.3} 
          color="#34D399"
        />
        
        <AmbientParticles />
        <ConnectionLines selectedProvince={selectedProvince} />
        
        {provinces.map((province) => (
          <Province
            key={province.id}
            province={province}
            onHover={setHoveredProvince}
            onClick={onProvinceSelect}
            isHovered={hoveredProvince?.id === province.id}
            isSelected={selectedProvince?.id === province.id}
            isDimmed={selectedProvince && selectedProvince.id !== province.id}
          />
        ))}
        
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Hover tooltip */}
      {hoveredProvince && !selectedProvince && (
        <div style={{
          position: 'absolute',
          bottom: '96px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '12px 24px',
          borderRadius: '12px',
          pointerEvents: 'none',
          zIndex: 10
        }}>
          <p style={{ color: '#ffffff', fontWeight: 600, fontSize: '14px' }}>{hoveredProvince.name}</p>
          <p style={{ color: '#34D399', fontSize: '12px', marginTop: '4px' }}>{hoveredProvince.description}</p>
          <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>
            Biodiversité : <span style={{ color: '#10B981' }}>{hoveredProvince.biodiversity}</span>
          </p>
        </div>
      )}

      {/* Province count badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '8px 16px',
        borderRadius: '12px',
        zIndex: 10
      }}>
        <p style={{ color: '#34D399', fontSize: '12px', fontWeight: 500 }}>
          {provinces.length} Provinces
        </p>
      </div>
    </div>
  );
};

export default RdcMap3D;
