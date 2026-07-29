import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    title: 'Chef Port',
    emoji: '👨‍🍳',
    status: 'ongoing',
    bannerBg: 'linear-gradient(135deg, #1a1040 0%, #2d1b69 50%, #1a0a40 100%)',
    description:
      'A React + .NET C# application for chefs to post recipes and food lovers to explore culinary creations from professionals.',
    highlights: [
      'Secure user login with JWT authentication',
      'Recipe submission and full-text search features',
      'Responsive design with modern UI/UX principles',
    ],
    tags: ['React', 'C#', '.NET', 'MySQL', 'JWT'],
    github: '#',
    demo: '#',
  },
  {
    title: 'Taxi Booking System',
    emoji: '🚕',
    status: 'completed',
    bannerBg: 'linear-gradient(135deg, #0a2a1a 0%, #1a4a2a 50%, #0a1a0a 100%)',
    description:
      'A complete Python-based booking system with modules for customer registration, driver login, admin control, and fare calculation.',
    highlights: [
      'GUI built with Tkinter for intuitive user interaction',
      'MySQL database for persistent data storage',
      'Admin panel with full data management capabilities',
    ],
    tags: ['Python', 'Tkinter', 'MySQL'],
    github: '#',
    demo: null,
  },
  {
    title: 'Library Management System',
    emoji: '📚',
    status: 'completed',
    bannerBg: 'linear-gradient(135deg, #1a1a0a 0%, #2a2a1a 50%, #0a0a0a 100%)',
    description:
      'A Java Servlet-based system for managing book inventory, issuing records, and member services with a robust backend.',
    highlights: [
      'Full CRUD for book inventory and member management',
      'Issuing and return records with automated tracking',
      'Built and tested with Apache Tomcat & MySQL',
    ],
    tags: ['Java', 'JSP', 'Apache Tomcat', 'MySQL', 'HTML', 'CSS'],
    github: '#',
    demo: null,
  },
  {
    title: 'Service Management System',
    emoji: '⚙️',
    status: 'completed',
    bannerBg: 'linear-gradient(135deg, #0a1a2a 0%, #1a2a3a 50%, #0a0a1a 100%)',
    description:
      'A dynamic backend system for handling service requests, scheduling, and status tracking for college-level operations.',
    highlights: [
      'Dynamic service request management and scheduling',
      'Real-time status tracking system',
      'Integrated with Jakarta Servlet and MySQL backend',
    ],
    tags: ['Java', 'Jakarta Servlet', 'JSP', 'MySQL'],
    github: '#',
    demo: null,
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 48 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
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
          Real-world applications built to solve genuine problems.
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
          >
            {/* Banner */}
            <div className="project-card__banner" style={{ background: project.bannerBg }}>
              <div className="project-card__banner-emoji">{project.emoji}</div>
              <div className={`project-card__badge badge-${project.status}`}>
                {project.status === 'ongoing' ? 'Live / Ongoing' : 'Completed'}
              </div>
            </div>

            {/* Body */}
            <div className="project-card__body">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>

              <div className="project-card__highlights">
                {project.highlights.map((h, hi) => (
                  <div key={hi} className="project-card__highlight">
                    <div className="project-card__highlight-dot" />
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
                <motion.a
                  href={project.github}
                  className="project-card__action project-card__action-secondary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <FaGithub size={14} />
                  Code
                </motion.a>
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
