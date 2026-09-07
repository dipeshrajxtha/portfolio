import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Briefcase } from 'lucide-react';
import {
  FaGithub, FaJava, FaKey, FaBook, FaTaxi,
} from 'react-icons/fa';
import {
  SiReact, SiDotnet, SiMysql, SiPython,
  SiFlutter, SiNodedotjs, SiJsonwebtokens,
} from 'react-icons/si';
import { MdElevator } from 'react-icons/md';
import { GiCook } from 'react-icons/gi';
import { BsDropletFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import './Projects.css';

/* ── Project icon display component ────────────────────── */
function ProjectIcon({ icon: Icon, color, bg }) {
  return (
    <div
      className="project-card__icon-wrap"
      style={{ background: bg }}
    >
      <Icon size={52} color={color} style={{ filter: `drop-shadow(0 0 18px ${color}88)` }} />
    </div>
  );
}

const projects = [
  {
    title: 'Chef Port',
    Icon: GiCook,
    iconColor: '#f97316',
    iconBg: 'linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #1a0808 100%)',
    bannerBg: 'linear-gradient(135deg, #1a0a00 0%, #3d1800 60%, #1a0a00 100%)',
    status: 'ongoing',
    description:
      'A React + .NET C# application for chefs to post recipes and food lovers to explore culinary creations from professionals.',
    highlights: [
      'Secure user login with JWT authentication',
      'Recipe submission and full-text search features',
      'Responsive design with modern UI/UX principles',
    ],
    tags: ['React', 'C#', '.NET', 'MySQL', 'JWT'],
    github: 'https://github.com/dipeshrajxtha/portfolio',
    demo: null,
    tagIcons: [SiReact, SiDotnet, SiMysql, SiJsonwebtokens],
  },
  {
    title: 'CareerLink Platform',
    Icon: Briefcase,
    iconColor: '#a78bfa',
    iconBg: 'linear-gradient(135deg, #1a0033 0%, #3b0764 50%, #1a0033 100%)',
    bannerBg: 'linear-gradient(135deg, #1a0033 0%, #3b0764 60%, #1a0033 100%)',
    status: 'completed',
    description:
      'A full-stack recruitment & job portal connecting job seekers with employers featuring candidate matching and dual dashboard management.',
    highlights: [
      'Dual portal dashboards for Employers & Job Seekers',
      'Role-based authentication & route protection',
      'Job posting, application tracking & candidate management',
    ],
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'JWT'],
    github: '#',
    demo: null,
    tagIcons: [SiReact, SiNodedotjs, SiMysql],
  },
  {
    title: 'AquaMate',
    Icon: BsDropletFill,
    iconColor: '#38bdf8',
    iconBg: 'linear-gradient(135deg, #001a2e 0%, #003a5c 50%, #001220 100%)',
    bannerBg: 'linear-gradient(135deg, #001220 0%, #003a5c 60%, #001220 100%)',
    status: 'completed',
    description:
      'A full-stack water delivery management solution featuring a Flutter mobile app and Node.js REST API backend for order tracking.',
    highlights: [
      'Flutter mobile UI with real-time order tracking',
      'Node.js + Express REST API backend',
      'MySQL database for persistent user & order data',
    ],
    tags: ['Flutter', 'Dart', 'Node.js', 'MySQL', 'REST API'],
    github: 'https://github.com/dipeshrajxtha/aqua-mate-frontend',
    demo: null,
    tagIcons: [SiFlutter, SiNodedotjs, SiMysql],
  },
  {
    title: 'Elevator System',
    Icon: MdElevator,
    iconColor: '#818cf8',
    iconBg: 'linear-gradient(135deg, #0d0020 0%, #2a0060 50%, #0d0020 100%)',
    bannerBg: 'linear-gradient(135deg, #0d0020 0%, #2a0060 60%, #0d0020 100%)',
    status: 'completed',
    description:
      'A C# elevator simulation system modeling multi-floor dispatch algorithms, direction handling, and queue state management.',
    highlights: [
      'Multi-floor elevator dispatch and queue logic',
      'Direction-aware request handling (up/down)',
      'Clean OOP design patterns in C#',
    ],
    tags: ['C#', '.NET', 'OOP', 'Simulation'],
    github: 'https://github.com/dipeshrajxtha/Elevator-System',
    demo: null,
    tagIcons: [SiDotnet],
  },
  {
    title: 'Auth Lab',
    Icon: FaKey,
    iconColor: '#fbbf24',
    iconBg: 'linear-gradient(135deg, #1a1000 0%, #3d2a00 50%, #1a1000 100%)',
    bannerBg: 'linear-gradient(135deg, #1a1000 0%, #3d2a00 60%, #1a1000 100%)',
    status: 'completed',
    description:
      'An authentication micro-service exploring JWT session management, bcrypt password hashing, and middleware route protection.',
    highlights: [
      'JWT token issuance and verification flow',
      'Protected route middleware implementation',
      'Password hashing and secure session handling',
    ],
    tags: ['JavaScript', 'Node.js', 'JWT', 'Bcrypt'],
    github: 'https://github.com/dipeshrajxtha/auth_lab',
    demo: null,
    tagIcons: [SiNodedotjs, SiJsonwebtokens],
  },
  {
    title: 'Taxi Booking System',
    Icon: FaTaxi,
    iconColor: '#facc15',
    iconBg: 'linear-gradient(135deg, #1a1400 0%, #3d3000 50%, #1a1400 100%)',
    bannerBg: 'linear-gradient(135deg, #0a1a0a 0%, #1a3a1a 60%, #0a1a0a 100%)',
    status: 'completed',
    description:
      'A Python GUI booking application with modules for customer registration, driver dispatch, fare calculations, and admin controls.',
    highlights: [
      'GUI built with Tkinter for intuitive user interaction',
      'MySQL database for persistent data storage',
      'Admin panel with full data management capabilities',
    ],
    tags: ['Python', 'Tkinter', 'MySQL'],
    github: '#',
    demo: null,
    tagIcons: [SiPython, SiMysql],
  },
  {
    title: 'Library Management System',
    Icon: FaBook,
    iconColor: '#f59e0b',
    iconBg: 'linear-gradient(135deg, #1a1500 0%, #332a00 50%, #1a1500 100%)',
    bannerBg: 'linear-gradient(135deg, #1a1000 0%, #2a2000 60%, #1a1000 100%)',
    status: 'completed',
    description:
      'A Java Servlet-based web application for managing book inventories, member registrations, and borrowing records.',
    highlights: [
      'Full CRUD for book inventory and member management',
      'Issuing and return records with automated tracking',
      'Built and tested with Apache Tomcat & MySQL',
    ],
    tags: ['Java', 'JSP', 'Apache Tomcat', 'MySQL'],
    github: '#',
    demo: null,
    tagIcons: [FaJava, SiMysql],
  },
  {
    title: 'Service Management System',
    Icon: IoSettingsSharp,
    iconColor: '#60a5fa',
    iconBg: 'linear-gradient(135deg, #001020 0%, #002040 50%, #001020 100%)',
    bannerBg: 'linear-gradient(135deg, #001020 0%, #002040 60%, #001020 100%)',
    status: 'completed',
    description:
      'A dynamic Java backend system for handling service request scheduling, status tracking, and database persistence.',
    highlights: [
      'Dynamic service request management and scheduling',
      'Real-time status tracking system',
      'Integrated with Jakarta Servlet and MySQL backend',
    ],
    tags: ['Java', 'Jakarta Servlet', 'JSP', 'MySQL'],
    github: '#',
    demo: null,
    tagIcons: [FaJava, SiMysql],
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 48 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section projects" id="projects" ref={ref}>
      <div className="orb projects__orb-1" />

      {/* Header */}
      <div className="projects__header">
        <motion.p
          className="section__label"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          What I've Built
        </motion.p>
        <motion.h2
          className="section__title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Featured <span>Projects</span>
        </motion.h2>
        <motion.p
          className="section__subtitle"
          style={{ margin: '0 auto' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Real-world applications built to solve genuine problems — from mobile apps to backend systems.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="projects__grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="project-card"
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            whileHover={{ y: -10, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
          >
            {/* Banner with SVG icon */}
            <div className="project-card__banner" style={{ background: project.bannerBg }}>
              <ProjectIcon
                icon={project.Icon}
                color={project.iconColor}
                bg={project.iconBg}
              />
              <div className={`project-card__badge badge-${project.status}`}>
                {project.status === 'ongoing' ? '🔴 Live / Ongoing' : '✅ Completed'}
              </div>
              {/* Decorative orb */}
              <div
                className="project-card__banner-orb"
                style={{ background: `radial-gradient(circle, ${project.iconColor}22 0%, transparent 70%)` }}
              />
            </div>

            {/* Body */}
            <div className="project-card__body">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>

              <div className="project-card__highlights">
                {project.highlights.map((h, hi) => (
                  <div key={hi} className="project-card__highlight">
                    <div
                      className="project-card__highlight-dot"
                      style={{ background: project.iconColor, boxShadow: `0 0 6px ${project.iconColor}88` }}
                    />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="project-card__tags">
                {project.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              <div className="project-card__actions">
                {project.github && project.github !== '#' ? (
                  <motion.a
                    href={project.github}
                    className="project-card__action project-card__action-secondary"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <FaGithub size={15} />
                    Source Code
                  </motion.a>
                ) : (
                  <motion.span
                    className="project-card__action project-card__action-disabled"
                    title="Private repository"
                  >
                    <FaGithub size={15} />
                    Private Repo
                  </motion.span>
                )}
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    className="project-card__action project-card__action-primary"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} live demo`}
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
