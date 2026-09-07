import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Zap } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    role: 'Graphic Design Intern',
    company: 'The Brandghar',
    location: 'Kathmandu',
    period: 'Mar 2024 – Aug 2024',
    duration: '5 months',
    tags: ['Photoshop', 'Illustrator', 'Figma', 'Brand Identity', 'Social Media Design'],
    bullets: [
      'Designed brand identity assets including logos, social media graphics, and marketing collateral for multiple clients.',
      'Collaborated with the creative team to develop visual concepts that aligned with client brand guidelines.',
      'Produced print and digital design materials using industry-standard tools under real agency timelines.',
      'Gained hands-on experience in client communication, design iteration, and professional creative workflows.',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'PCPS College',
    location: 'Kathmandu',
    period: 'Feb 2024 – Apr 2024',
    duration: '3 months',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Jakarta Servlet', 'MySQL', 'QA Testing'],
    bullets: [
      'Built interactive, responsive web pages using HTML, CSS, JavaScript, and Java Servlet.',
      'Designed and integrated backend systems using MySQL and Jakarta Servlet to manage service requests.',
      'Collaborated on UI/UX improvements and optimized performance on college-level systems.',
      'Conducted internal testing for quality assurance and database functionality.',
    ],
  },
];

const activities = [
  {
    title: 'Library Management System',
    tag: 'Academic Project',
    description: 'Built a full CRUD system to manage catalog inventory, borrowing records, and student memberships.',
  },
  {
    title: 'Participation in Clockmakers',
    tag: 'Hackathon & Workshop',
    description: 'Engaged in competitive problem-solving and software development sessions within the college community.',
  },
  {
    title: 'Service Management System',
    tag: 'College System',
    description: 'Developed backend services with relational database schemas to streamline request tracking.',
  },
];

const cardVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section experience" id="experience" ref={ref}>
      <div className="orb experience__orb-1" />

      <div className="experience__inner">
        {/* Header */}
        <div className="experience__header">
          <motion.p
            className="section__label"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Work History
          </motion.p>
          <motion.h2
            className="section__title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Professional <span>Experience</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              className="timeline-item"
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {/* Dot */}
              <div className="timeline-item__dot" />

              {/* Card */}
              <motion.div
                className="glass-card timeline-item__card"
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              >
                <div className="timeline-item__header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Briefcase size={16} color="var(--clr-accent)" />
                    <span className="timeline-item__role">{exp.role}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="timeline-item__period">{exp.period}</span>
                    {exp.duration && (
                      <span className="timeline-item__duration">{exp.duration}</span>
                    )}
                  </div>
                </div>

                <div className="timeline-item__company">
                  <MapPin size={13} />
                  {exp.company} · {exp.location}
                </div>

                <div className="timeline-item__bullets">
                  {exp.bullets.map((b, bi) => (
                    <motion.div
                      key={bi}
                      className="timeline-item__bullet"
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + bi * 0.08 }}
                    >
                      <div className="timeline-item__bullet-dot" />
                      <span>{b}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Tech tags */}
                {exp.tags && (
                  <div className="timeline-item__tags">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="timeline-item__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Activities */}
        <motion.div
          className="experience__activities"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="experience__activities-title">
            <Zap size={16} color="var(--clr-neon)" />
            Academic Activities & Projects
          </div>
          <div className="experience__activities-grid">
            {activities.map((a) => (
              <motion.div
                key={a.title}
                className="activity-card"
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="activity-card__header">
                  <span className="activity-card__title">{a.title}</span>
                  <span className="activity-card__tag">{a.tag}</span>
                </div>
                <p className="activity-card__desc">{a.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
