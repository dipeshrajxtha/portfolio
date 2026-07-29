import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  SiJavascript, SiPython, SiHtml5, SiMysql,
  SiApachetomcat, SiGit
} from 'react-icons/si';
import { FaJava, FaCss3Alt } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import './Skills.css';

/* Map skill names to react-icons components for real SVG icons */
const IconMap = {
  Java:            <FaJava size={24} color="#f89820" />,
  Python:          <SiPython size={24} color="#3776ab" />,
  JavaScript:      <SiJavascript size={24} color="#f7df1e" />,
  HTML:            <SiHtml5 size={24} color="#e34f26" />,
  CSS:             <FaCss3Alt size={24} color="#1572b6" />,
  MySQL:           <SiMysql size={24} color="#00758f" />,
  'Apache Tomcat': <SiApachetomcat size={24} color="#f8dc75" />,
  Git:             <SiGit size={24} color="#f05032" />,
  'VS Code':       <VscCode size={24} color="#007acc" />,
};

const categories = {
  All: null,
  Languages: ['Java', 'Python', 'JavaScript', 'HTML', 'CSS'],
  Backend:   ['Jakarta Servlet', 'JSP', 'Apache Tomcat', 'MySQL'],
  Frontend:  ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
  Tools:     ['Eclipse', 'VS Code', 'Git', 'Debugging'],
};

const skills = [
  { name: 'Java',            color: '#f89820', level: 85, cat: ['Languages', 'Backend'] },
  { name: 'Python',          color: '#3776ab', level: 78, cat: ['Languages'] },
  { name: 'JavaScript',      color: '#f7df1e', level: 80, cat: ['Languages', 'Frontend'] },
  { name: 'HTML',            color: '#e34f26', level: 90, cat: ['Languages', 'Frontend'] },
  { name: 'CSS',             color: '#1572b6', level: 85, cat: ['Languages', 'Frontend'] },
  { name: 'Jakarta Servlet', color: '#6478ff', level: 75, cat: ['Backend'] },
  { name: 'JSP',             color: '#a78bfa', level: 72, cat: ['Backend'] },
  { name: 'Apache Tomcat',   color: '#f8dc75', level: 70, cat: ['Backend', 'Tools'] },
  { name: 'MySQL',           color: '#00758f', level: 78, cat: ['Backend'] },
  { name: 'Eclipse',         color: '#7c5cbf', level: 80, cat: ['Tools'] },
  { name: 'VS Code',         color: '#007acc', level: 90, cat: ['Tools'] },
  { name: 'Git',             color: '#f05032', level: 72, cat: ['Tools'] },
  { name: 'UI/UX',           color: '#ff6b6b', level: 75, cat: ['Frontend'] },
  { name: 'Debugging',       color: '#00f5d4', level: 82, cat: ['Tools'] },
];

const softSkills = [
  'Team Collaboration', 'Problem-Solving', 'Data Management',
  'Quality Assurance', 'UI/UX Design', 'Client Communication',
];

const tabVariant = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: (i) => ({ opacity: 1, scale: 1, y: 0, transition: { delay: i * 0.055, duration: 0.35 } }),
  exit: { opacity: 0, scale: 0.9, y: -8, transition: { duration: 0.18 } },
};

export default function Skills() {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });
  const [tab, setTab] = useState('All');

  const filtered = tab === 'All' ? skills : skills.filter((s) => s.cat.includes(tab));

  return (
    <section className="section skills" id="skills" ref={ref}>
      <div className="orb skills__orb-1" />

      {/* Header */}
      <div className="skills__header">
        <motion.p
          className="section__label"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          What I Know
        </motion.p>
        <motion.h2
          className="section__title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          My <span>Tech Stack</span>
        </motion.h2>
        <motion.p
          className="section__subtitle"
          style={{ margin: '0 auto' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Technologies I've worked with professionally and academically.
        </motion.p>
      </div>

      {/* Tabs */}
      <motion.div
        className="skills__tabs"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {Object.keys(categories).map((t) => (
          <button
            key={t}
            className={`skills__tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          className="skills__grid"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              custom={i}
              variants={tabVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div
                className="skill-card__icon"
                style={{
                  background: `${skill.color}14`,
                  border: `1px solid ${skill.color}28`,
                }}
              >
                {IconMap[skill.name] ?? (
                  <span style={{ color: skill.color, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 600 }}>
                    {skill.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="skill-card__name">{skill.name}</div>
              <div className="skill-card__bar-track">
                <motion.div
                  className="skill-card__bar-fill"
                  style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)` }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: skill.level / 100 } : {}}
                  transition={{ duration: 1.1, delay: 0.3 + i * 0.04, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <div className="skill-card__level">{skill.level}%</div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Soft Skills */}
      <motion.div
        className="skills__soft"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="skills__soft-label">Soft Skills</p>
        <div className="skills__soft-grid">
          {softSkills.map((s) => (
            <motion.div key={s} className="skills__soft-pill" whileHover={{ scale: 1.05, y: -2 }}>
              <div className="skills__soft-dot" />
              {s}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
