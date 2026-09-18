/**
 * NodeField — React Three Fiber floating node network
 * Used as the Hero section background.
 *
 * 55 nodes distributed on a sphere, connected by proximity lines.
 * Responds subtly to mouse movement. Falls back to null on mobile.
 *
 * Performance: dpr [1, 1.5], frustum culled, no shadows.
 */
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Node Network Scene ──────────────────────────────────── */
function NodeNetwork({ mouse }) {
  const groupRef = useRef();
  const NODE_COUNT = 55;
  const CONNECT_DIST = 2.0;

  /* Generate node positions on a sphere */
  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      const r = 2.2 + Math.random() * 1.8;
      arr.push(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta)
      );
    }
    return new Float32Array(arr);
  }, []);

  /* Generate line segment positions for nearby nodes */
  const linePositions = useMemo(() => {
    const pts = [];
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({ x: positions[i * 3], y: positions[i * 3 + 1], z: positions[i * 3 + 2] });
    }
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECT_DIST) {
          pts.push(nodes[i].x, nodes[i].y, nodes[i].z);
          pts.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    return new Float32Array(pts);
  }, [positions]);

  /* Animation: slow rotation + subtle mouse parallax */
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.05 + (mouse.current[0] || 0) * 0.18;
    groupRef.current.rotation.x = t * 0.02 + (mouse.current[1] || 0) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Node points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={NODE_COUNT}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color="#6478ff"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6478ff"
          transparent
          opacity={0.18}
        />
      </lineSegments>

      {/* Ambient light to give the scene some depth */}
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#6478ff" />
    </group>
  );
}

/* ── Public Component ────────────────────────────────────── */
export default function NodeField({ className = '' }) {
  const mouse = useRef([0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile — skip R3F canvas */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Track mouse position (normalized -1 to 1) */
  useEffect(() => {
    const onMove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      ];
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Reduced motion: skip animation (CSS handles opacity) */
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  if (isMobile || prefersReduced) return null;

  return (
    <div
      className={`node-field ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <NodeNetwork mouse={mouse} />
      </Canvas>
    </div>
  );
}
