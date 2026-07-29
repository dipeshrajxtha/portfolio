import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import './Contact.css';

const infoItems = [
  { icon: <Mail size={18} />, label: 'Email', val: 'Xthadipesh921@gmail.com', href: 'mailto:Xthadipesh921@gmail.com' },
  { icon: <Phone size={18} />, label: 'Phone', val: '+977 9860001136', href: 'tel:+9779860001136' },
  { icon: <MapPin size={18} />, label: 'Location', val: 'Gagalphedi, Kathmandu', href: null },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1600));
    setSending(false);
    setSent(true);
  };

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="orb contact__orb-1" />

      <div className="contact__inner">
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="contact__header">
            <p className="section__label">Let's Talk</p>
            <h2 className="section__title">
              Get In <span>Touch</span>
            </h2>
            <p className="section__subtitle">
              I'm always open to new opportunities, collaborations, or just a friendly chat about tech!
            </p>
          </div>

          <div className="contact__info-list">
            {infoItems.map((item, i) =>
              item.href ? (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="contact__info-item"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  whileHover={{ x: 6 }}
                >
                  <div className="contact__info-icon">{item.icon}</div>
                  <div className="contact__info-text">
                    <span className="contact__info-label">{item.label}</span>
                    <span className="contact__info-val">{item.val}</span>
                  </div>
                </motion.a>
              ) : (
                <motion.div
                  key={item.label}
                  className="contact__info-item"
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  <div className="contact__info-icon">{item.icon}</div>
                  <div className="contact__info-text">
                    <span className="contact__info-label">{item.label}</span>
                    <span className="contact__info-val">{item.val}</span>
                  </div>
                </motion.div>
              )
            )}
          </div>

          <motion.div
            className="contact__socials"
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact__social" aria-label="LinkedIn">
              <FaLinkedinIn size={15} />
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="contact__social" aria-label="GitHub">
              <FaGithub size={15} />
              GitHub
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          className="contact__form-card"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          {sent ? (
            <motion.div
              className="contact__success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="contact__success-icon">🎉</div>
              <div className="contact__success-title">Message Sent!</div>
              <div className="contact__success-msg">
                Thanks for reaching out! I'll get back to you within 24 hours.
              </div>
            </motion.div>
          ) : (
            <>
              <h3 className="contact__form-title">Send a Message</h3>
              <p className="contact__form-sub">
                Fill out the form below and I'll respond as soon as possible.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="contact__form-fields">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name" name="name" type="text"
                        placeholder="Your name"
                        value={form.name} onChange={handleChange} required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email" name="email" type="email"
                        placeholder="your@email.com"
                        value={form.email} onChange={handleChange} required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      id="subject" name="subject" type="text"
                      placeholder="What's this about?"
                      value={form.subject} onChange={handleChange} required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message" name="message"
                      placeholder="Tell me about your project, idea, or opportunity..."
                      value={form.message} onChange={handleChange} required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="contact__submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {sending ? (
                      <>
                        <motion.span
                          style={{
                            display: 'inline-block', width: 16, height: 16,
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: '#fff', borderRadius: '50%',
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
