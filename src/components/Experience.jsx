import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Zap } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    role: 'Web Development Intern',
    company: 'PCPS College',
    location: 'Kathmandu',
    period: 'Feb 2024 – Apr 2024',
    bullets: [
      'Built interactive, responsive web pages using HTML, CSS, JavaScript, and Java Servlet.',
      'Designed and integrated backend systems using MySQL and Jakarta Servlet to manage service requests.',
      'Collaborated on UI/UX improvements and optimized performance on college-level systems.',
      'Conducted internal testing for quality assurance and database functionality.',
    ],
  },
  {
    role: 'Freelance Developer',
    company: 'Remote',
    location: 'Remote',
    period: 'Jan 2023 – Present',
    bullets: [
      'Developed custom client applications, including a Library Management System and a Service Management System using Java, JSP, and Apache Tomcat.',
      'Built responsive interfaces and ensured seamless server-client interactions.',
      'Delivered production-ready, client-facing solutions autonomously under tight timelines.',
    ],
  },
];

const activities = [
  'Library Management System',
  'Participation in Clockmakers',
  'Service Management System',
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
              <div className="glass-card timeline-item__card">
                <div className="timeline-item__header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Briefcase size={16} color="var(--clr-accent)" />
                    <span className="timeline-item__role">{exp.role}</span>
                  </div>
                  <span className="timeline-item__period">{exp.period}</span>
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
              </div>
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
            Academic Activities
          </div>
          <div className="experience__activities-grid">
            {activities.map((a) => (
              <motion.span
                key={a}
                className="tag"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {a}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
