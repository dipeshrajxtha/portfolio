import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

/* ── Loading Screen ─────────────────────────────────────── */
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [20, 45, 70, 90, 100];
    let i = 0;
    const next = () => {
      if (i < steps.length) {
        setProgress(steps[i++]);
        setTimeout(next, 220 + Math.random() * 160);
      } else {
        setTimeout(onDone, 280);
      }
    };
    const t = setTimeout(next, 150);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="loading-screen">
      <motion.div
        className="loading-logo"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        &lt;<span>DR</span>/&gt;
      </motion.div>

      <motion.div
        className="loading-bar-track"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="loading-bar-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ width: 0 }}
        />
      </motion.div>

      <motion.p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--clr-text-dim)',
          letterSpacing: '0.1em',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        {progress < 100 ? 'Initializing...' : 'Ready'}
      </motion.p>
    </div>
  );
}

/* ── Scroll Progress ─────────────────────────────────────── */
function ScrollProgress() {
  const [scaleX, setScaleX] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setScaleX(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ transform: `scaleX(${scaleX})` }}
    />
  );
}

/* ── App ─────────────────────────────────────────────────── */
function App() {
  const cursorRef  = useRef(null);
  const [loaded, setLoaded] = useState(false);

  /* Smooth cursor glow */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    let raf;
    let cx = -500, cy = -500, tx = -500, ty = -500;

    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      cursor.style.left = `${cx}px`;
      cursor.style.top  = `${cy}px`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      {loaded && <ScrollProgress />}

      {/* Custom cursor glow */}
      <div className="cursor-glow" ref={cursorRef} />

      {/* Fixed backgrounds */}
      <div className="bg-grid" />
      <div className="bg-noise" />

      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LoadingScreen onDone={() => setLoaded(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main app — always mounted, opacity controlled */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: loaded ? 'auto' : 'none' }}
      >
        <Navbar />
        <main>
          <Hero />
          <div className="divider" style={{ maxWidth: '80%' }} />
          <About />
          <div className="divider" style={{ maxWidth: '80%' }} />
          <Skills />
          <div className="divider" style={{ maxWidth: '80%' }} />
          <Experience />
          <div className="divider" style={{ maxWidth: '80%' }} />
          <Projects />
          <div className="divider" style={{ maxWidth: '80%' }} />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}

export default App;
