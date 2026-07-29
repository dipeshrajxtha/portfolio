import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, Bot, Sparkles } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

const certs = [
  'Cisco Intro to Networks',
  'HP Digital Marketing',
  'Coursera Excel & Data Analysis',
];

const infoItems = [
  { key: 'Location',  val: 'Gagalphedi, Kathmandu' },
  { key: 'Email',     val: 'Xthadipesh921@gmail.com' },
  { key: 'Phone',     val: '+977 9860001136' },
  { key: 'Status',    val: 'Open to Work' },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section about" id="about" ref={ref}>
      <div className="orb about__orb-1" />

      <div className="about__inner">
        {/* ── Visual Side: 3D Robot ──────────────────────────── */}
        <motion.div
          className="about__visual"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="about__robot-card glass-card">
            {/* Header tag */}
            <div className="about__robot-header">
              <span className="about__robot-tag">
                <Bot size={14} color="var(--clr-neon)" />
                Interactive 3D Assistant
              </span>
              <span className="about__robot-badge">
                <span className="about__robot-badge-dot" />
                Live 3D Scene
              </span>
            </div>

            {/* 3D Spline Robot */}
            <div className="about__spline-container">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="about__spline"
              />
            </div>
          </div>

          {/* Floating stat cards */}
          <motion.div
            className="about__float-card about__float-card-1"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="about__float-value">3+</div>
            <div className="about__float-label">Years Experience</div>
          </motion.div>

          <motion.div
            className="about__float-card about__float-card-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="about__float-value">5+</div>
            <div className="about__float-label">Projects Completed</div>
          </motion.div>
        </motion.div>

        {/* ── Content ─────────────────────────── */}
        <div className="about__content">
          <motion.p className="section__label" custom={0} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            About Me
          </motion.p>
          <motion.h2 className="section__title" custom={1} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            Crafting Code with <span>Purpose</span>
          </motion.h2>

          <motion.p className="about__body" custom={2} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            I'm <strong>Dipeshraj Shrestha</strong>, a passionate Computer Science student at{' '}
            <strong>PCPS College, Patan</strong> pursuing a BSc (Hons). I love building
            full-stack applications that solve real problems — from library management systems
            to recipe-sharing platforms.
          </motion.p>

          <motion.p className="about__body" custom={3} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            My internship at <strong>PCPS College</strong> sharpened my skills in backend
            development and database integration, while freelancing has taught me to deliver
            polished, client-ready solutions independently.
          </motion.p>

          {/* Info Grid */}
          <motion.div className="about__info-grid" custom={4} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            {infoItems.map((item) => (
              <div className="about__info-item" key={item.key}>
                <span className="about__info-key">{item.key}</span>
                <span className="about__info-val">{item.val}</span>
              </div>
            ))}
          </motion.div>

          {/* Education */}
          <motion.div custom={5} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="about__section-title">
              <GraduationCap size={18} color="var(--clr-accent)" />
              <span>Education</span>
            </div>
            <div className="glass-card about__edu-card">
              <div className="about__edu-title">BSc (Hons) in Computer Science</div>
              <div className="about__edu-sub">PCPS College, Patan College for Professional Studies</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--clr-text-muted)', lineHeight: 1.7 }}>
                OOP · Database Systems · Software Engineering · Web Development · Algorithms & Data Structures · Networks
              </p>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="about__section-title">
              <Award size={18} color="var(--clr-accent)" />
              <span>Certifications</span>
            </div>
            <div className="about__cert-list">
              {certs.map((c) => (
                <motion.span key={c} className="tag" whileHover={{ scale: 1.06, y: -2 }}>
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

