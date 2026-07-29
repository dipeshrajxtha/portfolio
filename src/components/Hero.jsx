import { useRef, useEffect, useState, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
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
      {/* Background orbs */}
      <div className="orb hero__bg-orb-1" />
      <div className="orb hero__bg-orb-2" />
      <div className="orb hero__bg-orb-3" />

      {/* Spotlight effect that follows mouse across the whole hero */}
      <Spotlight size={520} />

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

        {/* ── Right: 21st.dev Glassmorphic Code IDE Showcase ── */}
        <motion.div
          className="hero__canvas-wrapper"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <Hero21stDevCard />
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

/* ── 21st.dev Interactive Code IDE & Terminal Component ───── */
function Hero21stDevCard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`const developer = {
  name: "Dipeshraj Shrestha",
  role: "Full Stack Engineer",
  location: "Kathmandu, Nepal",
  stack: ["React", "Java", "Python", "Node.js", "PostgreSQL"],
  status: "Available for Hire"
};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="hero-21st__card glass-card">
      {/* MacOS Header */}
      <div className="hero-21st__header">
        <div className="hero-21st__dots">
          <span className="hero-21st__dot hero-21st__dot--red" />
          <span className="hero-21st__dot hero-21st__dot--yellow" />
          <span className="hero-21st__dot hero-21st__dot--green" />
        </div>

        {/* Tabs */}
        <div className="hero-21st__tabs">
          <button
            className={`hero-21st__tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="hero-21st__tab-icon">TS</span>
            profile.ts
          </button>
          <button
            className={`hero-21st__tab ${activeTab === 'stack' ? 'active' : ''}`}
            onClick={() => setActiveTab('stack')}
          >
            <span className="hero-21st__tab-icon hero-21st__tab-icon--json">{}</span>
            stack.json
          </button>
          <button
            className={`hero-21st__tab ${activeTab === 'terminal' ? 'active' : ''}`}
            onClick={() => setActiveTab('terminal')}
          >
            <span className="hero-21st__tab-icon hero-21st__tab-icon--term">&gt;_</span>
            terminal
          </button>
        </div>

        {/* Status indicator */}
        <div className="hero-21st__actions">
          <button className="hero-21st__copy-btn" onClick={handleCopy} title="Copy Code">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code / Content Area */}
      <div className="hero-21st__body">
        {activeTab === 'profile' && (
          <div className="hero-21st__code-view">
            <div className="hero-21st__line">
              <span className="hero-21st__ln">01</span>
              <span className="code-keyword">const</span>{' '}
              <span className="code-def">developer</span> = &#123;
            </div>
            <div className="hero-21st__line">
              <span className="hero-21st__ln">02</span>
              &nbsp;&nbsp;<span className="code-prop">name</span>:&nbsp;
              <span className="code-str">"Dipeshraj Shrestha"</span>,
            </div>
            <div className="hero-21st__line">
              <span className="hero-21st__ln">03</span>
              &nbsp;&nbsp;<span className="code-prop">role</span>:&nbsp;
              <span className="code-str">"Full Stack Engineer"</span>,
            </div>
            <div className="hero-21st__line">
              <span className="hero-21st__ln">04</span>
              &nbsp;&nbsp;<span className="code-prop">degree</span>:&nbsp;
              <span className="code-str">"BSc (Hons) Computer Science"</span>,
            </div>
            <div className="hero-21st__line">
              <span className="hero-21st__ln">05</span>
              &nbsp;&nbsp;<span className="code-prop">college</span>:&nbsp;
              <span className="code-str">"PCPS College Patan"</span>,
            </div>
            <div className="hero-21st__line hero-21st__line--highlight">
              <span className="hero-21st__ln">06</span>
              &nbsp;&nbsp;<span className="code-prop">status</span>:&nbsp;
              <span className="code-status">"Open to Opportunities"</span>,
            </div>
            <div className="hero-21st__line">
              <span className="hero-21st__ln">07</span>
              &nbsp;&nbsp;<span className="code-prop">techStack</span>: [
            </div>
            <div className="hero-21st__line">
              <span className="hero-21st__ln">08</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="code-tag">"React"</span>,{' '}
              <span className="code-tag">"Java"</span>,{' '}
              <span className="code-tag">"Python"</span>,{' '}
              <span className="code-tag">"Node.js"</span>
            </div>
            <div className="hero-21st__line">
              <span className="hero-21st__ln">09</span>
              &nbsp;&nbsp;]
            </div>
            <div className="hero-21st__line">
              <span className="hero-21st__ln">10</span>
              &#125;;
            </div>
          </div>
        )}

        {activeTab === 'stack' && (
          <div className="hero-21st__stack-view">
            <div className="hero-21st__stack-grid">
              <div className="hero-21st__stack-item">
                <span className="hero-21st__stack-name">Frontend</span>
                <span className="hero-21st__stack-pills">React · TypeScript · Tailwind · Framer</span>
              </div>
              <div className="hero-21st__stack-item">
                <span className="hero-21st__stack-name">Backend</span>
                <span className="hero-21st__stack-pills">Node.js · Java Spring · Python FastAPI</span>
              </div>
              <div className="hero-21st__stack-item">
                <span className="hero-21st__stack-name">Databases</span>
                <span className="hero-21st__stack-pills">PostgreSQL · MySQL · MongoDB</span>
              </div>
              <div className="hero-21st__stack-item">
                <span className="hero-21st__stack-name">Tools & Infra</span>
                <span className="hero-21st__stack-pills">Git · Docker · Vite · REST APIs</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="hero-21st__terminal-view">
            <div className="hero-21st__term-line">
              <span className="term-prompt">$</span> npm run build
            </div>
            <div className="hero-21st__term-line term-dim">
              &gt; vite build --mode production
            </div>
            <div className="hero-21st__term-line term-success">
              ✓ 142 modules transformed.
            </div>
            <div className="hero-21st__term-line term-success">
              ✓ dist/index.html 1.25 kB │ gzip: 0.62 kB
            </div>
            <div className="hero-21st__term-line">
              <span className="term-prompt">$</span> status --check
            </div>
            <div className="hero-21st__term-line term-info">
              ● All systems 100% operational | Kathmandu, Nepal
            </div>
            <div className="hero-21st__term-line">
              <span className="term-prompt">$</span> <span className="term-cursor" />
            </div>
          </div>
        )}
      </div>

      {/* Floating 21st.dev Orbit Badges */}
      <div className="hero-21st__badge hero-21st__badge--1">
        <span className="hero-21st__badge-dot" />
        Full-Stack Ready
      </div>
      <div className="hero-21st__badge hero-21st__badge--2">
        ⚡ 100% Responsive UI
      </div>
    </div>
  );
}
