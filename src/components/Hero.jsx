import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightning } from '@/components/ui/hero-odyssey';
import { SplineScene } from '@/components/ui/splite';
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import './Hero.css';

/* ── Animated Counter ───────────────────────────────── */
function AnimatedCounter({ end, duration = 2, suffix = '', startTrigger }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startTrigger) return;
    let start = 0;
    const endVal = parseInt(end);
    if (start === endVal) { setCount(endVal); return; }
    const totalMs = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMs / endVal), 15);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === endVal) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [end, duration, startTrigger]);
  return <>{count}{suffix}</>;
}

/* ── Typewriter ─────────────────────────────────────── */
function useTypewriter(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    if (!deleting && charIdx < word.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === word.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  useEffect(() => {
    setDisplay(words[wordIdx].substring(0, charIdx));
  }, [charIdx, wordIdx, words]);

  return display;
}

/* ── Hero ──────────────────────────────────────────── */
export default function Hero() {
  const roles = [
    'Full Stack Developer',
    'Java & Python Engineer',
    'UI/UX Enthusiast',
    'CS Student @ PCPS',
  ];
  const roleText = useTypewriter(roles, 78, 2200);
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true });


  const stats = [
    { num: 3, suffix: '+', label: 'Years Coding'  },
    { num: 5, suffix: '+', label: 'Projects Built' },
    { num: 2, suffix: '+', label: 'Internships'   },
  ];

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="hero" id="home" ref={ref}>

      {/* ══ Full-screen WebGL Lightning Background ══ */}
      <div className="hero__bg-lightning">
        <Lightning hue={255} xOffset={0} speed={1.6} intensity={0.6} size={2} />
      </div>

      {/* Dark overlay so text stays readable */}
      <div className="hero__bg-overlay" />

      {/* ══ Main grid ══ */}
      <div className="hero__inner">

        {/* ── Left: Text content ── */}
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div className="hero__greeting" variants={itemVariants}>
            <span className="hero__greeting-dot" />
            Available for work
          </motion.div>

          {/* Name */}
          <motion.h1 className="hero__name" variants={itemVariants}>
            <span className="hero__name-first">Dipeshraj</span>
            <span className="hero__name-last">Shrestha</span>
          </motion.h1>

          {/* Role typewriter */}
          <motion.p className="hero__role" variants={itemVariants}>
            {roleText}
            <span className="hero__role-cursor" />
          </motion.p>

          {/* Description */}
          <motion.p className="hero__description" variants={itemVariants}>
            BSc Computer Science student based in Kathmandu, Nepal. I craft interactive,
            performant web applications and love turning ideas into beautiful digital experiences.
          </motion.p>

          {/* CTA buttons */}
          <motion.div className="hero__actions" variants={itemVariants}>
            <motion.button
              className="btn-glow"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              View My Work
            </motion.button>
            <motion.button
              className="btn-outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div className="hero__socials" variants={itemVariants}>
            <a href="mailto:Xthadipesh921@gmail.com" className="hero__social-link" aria-label="Email">
              <Mail size={16} />
            </a>
            <a href="tel:+9779860001136" className="hero__social-link" aria-label="Phone">
              <Phone size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hero__social-link" aria-label="LinkedIn">
              <FaLinkedinIn size={15} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hero__social-link" aria-label="GitHub">
              <FaGithub size={15} />
            </a>
            <span className="hero__location">
              <MapPin size={13} color="var(--clr-accent)" />
              Kathmandu, Nepal
            </span>
          </motion.div>

          {/* Stats */}
          <motion.div className="hero__stats" variants={itemVariants}>
            {stats.map((s) => (
              <div className="hero__stat" key={s.label}>
                <div className="hero__stat-number">
                  <AnimatedCounter end={s.num} duration={2} suffix={s.suffix} startTrigger={inView} />
                </div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: 3D Robot ── */}
        <motion.div
          className="hero__robot-wrapper"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="hero__robot-spline"
          />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.1 }}
        role="button"
        aria-label="Scroll to About section"
      >
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-dot" />
        </div>
        <ChevronDown size={13} color="var(--clr-text-dim)" />
      </motion.div>
    </section>
  );
}
