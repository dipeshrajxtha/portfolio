/**
 * GeoSphere — React Three Fiber rotating wireframe icosahedron
 * Used in the About section as a visual replacement for the Spline robot.
 *
 * A wireframe icosahedron communicates: "developer-coded, geometric precision."
 * Subtle rotation + mouse tilt. Falls back to null on mobile.
 */
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

/* ── Wireframe Icosahedron Scene ─────────────────────────── */
function IcoMesh({ mouse }) {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.12 + (mouse.current[0] || 0) * 0.22;
      outerRef.current.rotation.x = t * 0.07 + (mouse.current[1] || 0) * 0.14;
    }
    if (innerRef.current) {
      /* Inner sphere rotates slightly faster, opposite direction on one axis */
      innerRef.current.rotation.y = -t * 0.08 + (mouse.current[0] || 0) * 0.12;
      innerRef.current.rotation.x = t * 0.05;
    }
  });

  return (
    <group>
      {/* Outer icosahedron — wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          wireframe
          color="#6478ff"
          emissive="#6478ff"
          emissiveIntensity={0.35}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Inner smaller octahedron for depth */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          wireframe
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={0.25}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#6478ff" />
      <pointLight position={[-3, -2, -2]} intensity={0.6} color="#a78bfa" />
    </group>
  );
}

/* ── Public Component ────────────────────────────────────── */
export default function GeoSphere({ className = '' }) {
  const mouse = useRef([0, 0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

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

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  if (isMobile || prefersReduced) return null;

  return (
    <div className={`geo-sphere ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <IcoMesh mouse={mouse} />
      </Canvas>
    </div>
  );
}
