import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Line, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const biodiversityColors = {
  'Très élevée': '#10B981',
  'Élevée': '#059669',
  'Moyenne': '#047857',
  'Modérée': '#065f46',
};

export const ProvinceMesh = ({ province, onHover, onClick, isHovered, isSelected, isHighlighted }) => {
  const pillarRef = useRef();
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  const height = province.position.y;
  const baseColor = biodiversityColors[province.biodiversity] || '#059669';
  const active = isSelected || isHovered || hovered || isHighlighted;

  useFrame(() => {
    if (pillarRef.current) {
      const targetScale = active ? 1.15 : 1;
      pillarRef.current.scale.y += (targetScale - pillarRef.current.scale.y) * 0.08;
    }
    if (ringRef.current && (isSelected || isHighlighted)) {
      ringRef.current.rotation.z += 0.02;
    }
  });

  const pos = province.position;

  return (
    <group position={[pos.x, 0, pos.z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.12, 32]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={active ? '#10B981' : '#000000'}
          emissiveIntensity={active ? 0.4 : 0}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh
        ref={pillarRef}
        position={[0, height / 2, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover?.(province);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover?.(null);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(province);
        }}
      >
        <cylinderGeometry args={[0.06, 0.08, height, 16]} />
        <meshStandardMaterial
          color={active ? '#34D399' : baseColor}
          emissive={active ? '#10B981' : baseColor}
          emissiveIntensity={active ? 0.6 : 0.15}
          metalness={0.4}
          roughness={0.5}
        />
      </mesh>

      {(isSelected || isHighlighted) && (
        <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[0.14, 0.17, 32]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}

      <mesh position={[0, height + 0.04, 0]}>
        <sphereGeometry args={[active ? 0.05 : 0.03, 16, 16]} />
        <meshBasicMaterial color="#10B981" transparent opacity={active ? 1 : 0.6} />
      </mesh>

      <Text
        position={[0, height + 0.15, 0]}
        fontSize={active ? 0.07 : 0.055}
        color={active ? '#34D399' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.003}
        outlineColor="#0B0F12"
      >
        {province.name}
      </Text>

      {province.hotspots?.map((hotspot, index) => (
        <Hotspot
          key={index}
          position={[hotspot.x - pos.x, hotspot.y, hotspot.z - pos.z]}
          name={hotspot.name}
        />
      ))}
    </group>
  );
};

const Hotspot = ({ position, name }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + position[0]) * 0.3;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={2} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color="#34D399" />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.2} />
        </mesh>
        <Text position={[0, 0.08, 0]} fontSize={0.035} color="#34D399" anchorX="center">
          {name}
        </Text>
      </group>
    </Float>
  );
};

export const RdcTerrain = () => {
  const rdcShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-1.2, -1.8);
    shape.lineTo(0.5, -2.0);
    shape.lineTo(1.8, -1.5);
    shape.lineTo(2.0, 0.5);
    shape.lineTo(1.5, 1.5);
    shape.lineTo(0.2, 1.8);
    shape.lineTo(-0.8, 1.2);
    shape.lineTo(-1.2, 0.0);
    shape.closePath();
    return shape;
  }, []);

  return (
    <group position={[0, -0.05, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <shapeGeometry args={[rdcShape]} />
        <meshStandardMaterial
          color="#111827"
          emissive="#059669"
          emissiveIntensity={0.05}
          metalness={0.2}
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <shapeGeometry args={[rdcShape]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>

      <gridHelper args={[6, 30, '#10B981', '#1a2332']} position={[0, 0.02, 0]} />
    </group>
  );
};

export const Starfield = () => {
  const stars = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 15 + 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={stars.length / 3} array={stars} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

export const ConnectionLines = ({ provinces }) => {
  const points = useMemo(() => {
    const sorted = [...provinces].sort((a, b) => a.position.x - b.position.x);
    const linePoints = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      const a = sorted[i].position;
      const b = sorted[i + 1].position;
      linePoints.push([a.x, a.y + 0.05, a.z]);
      linePoints.push([b.x, b.y + 0.05, b.z]);
    }
    return linePoints;
  }, [provinces]);

  if (points.length === 0) return null;

  return <Line points={points} color="#10B981" opacity={0.08} transparent lineWidth={1} />;
};

export const CameraRig = ({ targetProvince, controlsRef }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (!controlsRef.current) return;

    if (targetProvince) {
      const pos = targetProvince.position;
      gsap.to(camera.position, {
        x: pos.x,
        y: pos.y + 2.5,
        z: pos.z + 2.5,
        duration: 1.5,
        ease: 'power2.inOut',
      });

      gsap.to(controlsRef.current.target, {
        x: pos.x,
        y: pos.y * 0.5,
        z: pos.z,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => controlsRef.current?.update(),
      });
    } else {
      gsap.to(camera.position, { x: 0, y: 4, z: 6, duration: 1.5, ease: 'power2.inOut' });
      gsap.to(controlsRef.current.target, {
        x: 0, y: 0, z: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => controlsRef.current?.update(),
      });
    }
  }, [targetProvince, camera, controlsRef]);

  return null;
};

export { Hotspot };
