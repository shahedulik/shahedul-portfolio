import { Link, useNavigate } from 'react-router-dom';
import { PROFILE } from '../data/portfolioData';
import './HeroLight.css';

const PARTNERS = ['B2B', 'Upskill Consultancy', 'Prezio Australia', 'Aetheria Alliance', 'Top 10 Startups'];

export default function HeroLight() {
  const navigate = useNavigate();
  const enterPortfolio = () => navigate('/telemetry');

  return (
    <div className="hero-light">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-mark hero-mark-sh" aria-hidden="true">SH</div>
      <div className="hero-mark hero-mark-in" aria-hidden="true">IN</div>
      <img
        className="hero-portrait"
        src="/assets/shahedul-portrait-cutout.png"
        alt="Portrait of Shahedul Islam Khan, Business Intelligence Analyst"
      />
      <header className="hero-header">
        <Link to="/" className="hero-logo">SHAHEDUL ISLAM KHAN</Link>
        <nav className="hero-nav" aria-label="Hero">
          <Link to="/" aria-current="page">Home</Link>
          <Link to="/career">Experience</Link>
          <Link to="/credentials">Startup</Link>
          <a href={`mailto:${PROFILE.email}`}>Contact</a>
        </nav>
      </header>
      <main className="hero-main">
        <div className="hero-copy">
          <p className="hero-eyebrow">| Business Intelligence Analyst</p>
          <h1 className="hero-title">I BUILD AND SHIP DATA SYSTEMS</h1>
          <p className="hero-lead">
            Data-trained BI Analyst adept at combining predictive analytics to unlock enterprise profitability.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="/SHAH-CV.pdf" target="_blank" rel="noopener">
              View Resume <span aria-hidden="true">→</span>
            </a>
            <a className="btn-ghost" href={`mailto:${PROFILE.email}`}>Let&apos;s Chat</a>
          </div>
          <p className="hero-availability">Available UTC+6 · Overlaps US EST 7pm–11pm weekdays</p>
        </div>
        <div className="hero-side">
          <div className="hero-widget">
            <button type="button" className="hero-widget-open" onClick={enterPortfolio}>
              PORTFOLIO
            </button>
            <button
              type="button"
              className="hero-widget-btn"
              aria-label="Enter portfolio dashboard"
              onClick={enterPortfolio}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="hero-partners-block">
            <p className="hero-partners-label">Partnership</p>
            <ul className="hero-partners">
              {PARTNERS.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <footer className="hero-status">
        <span>• Certified Data Analyst (CDA)</span>
        <span>• Based in DHK</span>
        <span>• Business Growth Analyst</span>
      </footer>
    </div>
  );
}
