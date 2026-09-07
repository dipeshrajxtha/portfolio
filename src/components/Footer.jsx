import { motion } from 'framer-motion';
import { ChevronUp, Heart } from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import './Footer.css';

const navLinks = [
  { label: 'Home',       id: 'home' },
  { label: 'About',      id: 'about' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Contact',    id: 'contact' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Logo */}
        <motion.div
          className="footer__logo"
          onClick={scrollTop}
          whileHover={{ scale: 1.04 }}
          role="button"
          aria-label="Back to top"
          tabIndex={0}
        >
          <span className="footer__logo-bracket">&lt;</span>
          <span className="footer__logo-name">DR</span>
          <span className="footer__logo-bracket">/&gt;</span>
        </motion.div>

        {/* Copy */}
        <p className="footer__copy">
          Built with{' '}
          <Heart size={12} style={{ display: 'inline', color: '#f472b6', verticalAlign: 'middle' }} />
          {' '}by <span>Dipeshraj Shrestha</span> · {new Date().getFullYear()}
        </p>

        {/* Nav links */}
        <nav className="footer__links" aria-label="Footer navigation">
          {navLinks.map(({ label, id }) => (
            <span
              key={id}
              className="footer__link"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              {label}
            </span>
          ))}
        </nav>

        {/* Social links */}
        <div className="footer__socials">
          <a
            href="https://www.linkedin.com/in/dipeshraj-shrestha/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="footer__social"
          >
            <FaLinkedinIn size={14} />
          </a>
          <a
            href="https://github.com/dipeshrajxtha"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="footer__social"
          >
            <FaGithub size={14} />
          </a>
        </div>

        {/* Back to top */}
        <motion.button
          className="footer__back-top"
          onClick={scrollTop}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Back to top"
        >
          <ChevronUp size={14} />
          Back to Top
        </motion.button>
      </div>

      <div className="footer__bottom">
        Designed & Built by Dipeshraj Shrestha · Open to Work
      </div>
    </footer>
  );
}
