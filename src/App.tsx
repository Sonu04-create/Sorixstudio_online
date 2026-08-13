import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Check,
  ChevronDown,
  Globe,
  Instagram,
  Mail,
  Menu,
  Phone,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';

type Lead = {
  category: string;
  businessName: string;
  city: string;
  primaryColor: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  heroBg: string;
  features: string[];
};

type Leads = Record<string, Lead>;

type Project = {
  number: string;
  name: string;
  type: string;
  description: string;
  url: string;
  previewImage: string;
  tone: string;
  metric: string;
  isFlagship?: boolean;
  category: 'saas' | 'concept';
};

const projects: Project[] = [
  {
    number: '01',
    name: 'BrowserKit',
    type: 'SaaS / Utility Tool',
    description: 'An all-in-one browser utility toolkit for modern creators & digital builders. Live product built by Sonu M.',
    url: 'https://browserkit.in/',
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    tone: 'project-blue',
    metric: 'Live SaaS Product',
    isFlagship: true,
    category: 'saas',
  },
  {
    number: '02',
    name: 'Abhi & Niyu Hub',
    type: 'Creator Concept Hub',
    description: 'A 3D knowledge & storytelling digital portal crafted for top creators with 5M+ subscribers.',
    url: 'https://abhiandniyu.lovable.app/',
    previewImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
    tone: 'project-sand',
    metric: '5M+ Subscribers',
    category: 'concept',
  },
  {
    number: '03',
    name: 'Total Gaming Web',
    type: 'Gaming / Media Portal',
    description: 'An immersive gaming & esports hub with live stream stats for 30M+ gaming fans.',
    url: 'https://totalgamingweb.lovable.app',
    previewImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85',
    tone: 'project-orange',
    metric: '30M+ Gamers',
    category: 'concept',
  },
  {
    number: '04',
    name: 'Gyan Therapy Hub',
    type: 'Tech & Education',
    description: 'Minimal, calming interface for tech reviews, buying guides, and educational content for 1M+ learners.',
    url: 'https://gyan-therapy-hub.lovable.app',
    previewImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=85',
    tone: 'project-green',
    metric: '1M+ Learners',
    category: 'concept',
  },
  {
    number: '05',
    name: 'Vedant Rusty Hub',
    type: 'Creator Portfolio',
    description: 'Bold, industrial-themed digital experience for podcasts, pop-culture essays, and media projects.',
    url: 'https://vedantrusty.lovable.app',
    previewImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=85',
    tone: 'project-red',
    metric: 'Creator Platform',
    category: 'concept',
  },
  {
    number: '06',
    name: 'Techbar Spotlight',
    type: 'Glassmorphic Review Hub',
    description: 'High-impact glassmorphic tech review spotlight with interactive unboxing stories.',
    url: 'https://techbar-spotlight-hub.lovable.app',
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
    tone: 'project-purple',
    metric: 'Review Platform',
    category: 'concept',
  },
];

const fallbackLead: Lead = {
  category: 'High-performance digital experiences',
  businessName: 'Sorix Studio',
  city: 'Worldwide',
  primaryColor: '#ef4444',
  heroTitle: 'We build digital experiences that move at your speed.',
  heroSubtitle: 'Conversion-focused websites, SaaS products, and 3D web experiences for ambitious creators and brands.',
  ctaText: 'Start a conversation',
  heroBg: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2200&q=85',
  features: [],
};

function App() {
  const [leads, setLeads] = useState<Leads>({});
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [activeSlug, setActiveSlug] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('id') ?? '';
    setActiveSlug(slug);
    fetch('/leads.json')
      .then((response) => response.json() as Promise<Leads>)
      .then((data) => {
        setLeads(data);
        if (slug && data[slug]) setActiveLead(data[slug]);
      })
      .catch(() => setLeads({}));
  }, []);

  const lead = activeLead ?? fallbackLead;
  const isDemo = Boolean(activeLead);
  const accentStyle = { '--accent': lead.primaryColor } as React.CSSProperties;
  const otherLeads = useMemo(() => Object.entries(leads).filter(([slug]) => slug !== activeSlug), [leads, activeSlug]);

  useEffect(() => {
    document.title = isDemo
      ? `${lead.businessName} | Concept Proposal by Sorix Studio`
      : 'Sorix Studio — Custom Web & Creator Experiences by Sonu M';
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', document.title);
  }, [isDemo, lead.businessName]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className={`site-shell ${isDemo ? 'demo-shell' : ''}`} style={accentStyle}>
      {isDemo && (
        <div className="demo-banner">
          <Sparkles size={14} />
          <span>Exclusive website proposal tailored for <strong>{lead.businessName}</strong></span>
          <button onClick={() => scrollTo('contact')}>Talk to Sonu <ArrowUpRight size={14} /></button>
        </div>
      )}

      <header className="nav-wrap">
        <nav className="nav container">
          <button className="wordmark" onClick={() => scrollTo('top')} aria-label="Go to top">
            <span className="wordmark-mark"><Zap size={15} fill="currentColor" /></span>
            <span>SORIX<span className="wordmark-dot">.</span></span>
          </button>

          <div className={`nav-links ${mobileMenuOpen ? 'nav-links-open' : ''}`}>
            <button onClick={() => scrollTo('work')}>Selected Work</button>
            <button onClick={() => scrollTo('process')}>Process</button>
            <button onClick={() => scrollTo('founder')}>About Sonu</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>

            {isDemo && (
              <div className="lead-picker">
                <span>Previewing Proposal</span>
                <ChevronDown size={13} />
                <div className="lead-menu">
                  {otherLeads.map(([slug, item]) => (
                    <a key={slug} href={`/?id=${slug}`}>{item.businessName}</a>
                  ))}
                  <a href="/">← Back to Main Studio Site</a>
                </div>
              </div>
            )}
          </div>

          <button className="nav-cta" onClick={() => scrollTo('contact')}>Let&apos;s talk <ArrowUpRight size={15} /></button>
          <button className="menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <main id="top">
        {isDemo ? (
          <CreatorHero lead={lead} onCta={() => scrollTo('contact')} />
        ) : (
          <AgencyHero onCta={() => scrollTo('contact')} onWork={() => scrollTo('work')} />
        )}

        {isDemo && <DemoFeatureStrip lead={lead} />}

        <section className="proof-strip">
          <div className="container proof-inner">
            <span className="eyebrow">FEATURED PRODUCTS &amp; CREATOR CONCEPTS</span>
            <div className="proof-logos">
              <span className="logo-highlight">BROWSERKIT</span>
              <span>ABHI<span className="logo-amp">&amp;</span>NIYU</span>
              <span>TOTAL<span className="logo-light">GAMING</span></span>
              <span>GYAN THERAPY</span>
              <span>VEDANT RUSTY</span>
              <span>TECHBAR</span>
            </div>
          </div>
        </section>

        <WorkSection />
        <ProcessSection />
        <FounderSection />
        <ContactSection isDemo={isDemo} lead={lead} onCta={() => scrollTo('contact')} />
      </main>

      <footer className="footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <button className="wordmark" onClick={() => scrollTo('top')}>
              <span className="wordmark-mark"><Zap size={15} fill="currentColor" /></span>
              <span>SORIX<span className="wordmark-dot">.</span></span>
            </button>
            <p>Digital experiences &amp; products<br />for brands with something to say.</p>
          </div>
          <div className="footer-links">
            <button onClick={() => scrollTo('work')}>Work</button>
            <button onClick={() => scrollTo('process')}>Process</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </div>
          <div className="footer-social">
            <a href="https://www.instagram.com/sorixstudio.in/" target="_blank" rel="noreferrer">
              <Instagram size={16} /> Instagram
            </a>
            <a href="mailto:sorixm149@gmail.com">
              <Mail size={16} /> Email us
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Sorix Studio. Crafted with intent.</span>
          <span>Founder &amp; lead architect · Sonu M</span>
        </div>
      </footer>

      {isDemo && (
        <div className="mobile-actions">
          <a href="https://wa.me/918152044640" target="_blank" rel="noreferrer">
            <span>WhatsApp</span><ArrowUpRight size={15} />
          </a>
          <a href="tel:+918152044640">
            <span>Call Sonu</span><Phone size={15} />
          </a>
        </div>
      )}
    </div>
  );
}

function AgencyHero({ onCta, onWork }: { onCta: () => void; onWork: () => void }) {
  return (
    <section className="hero agency-hero">
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="container hero-content">
        <div className="hero-copy">
          <div className="kicker">
            <span className="kicker-line" /> Independent Digital Studio · Founded by Sonu M
          </div>
          <h1>
            Make your brand<br />
            <em>impossible</em> to ignore.
          </h1>
          <p className="hero-subtitle">
            We build high-converting digital experiences, flagship SaaS products like <strong>BrowserKit</strong>, and custom 3D web portals for creators &amp; ambitious brands.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={onCta}>
              Start a project <ArrowUpRight size={17} />
            </button>
            <button className="text-button" onClick={onWork}>
              Explore selected work <ArrowDownRight size={17} />
            </button>
          </div>
          <div className="hero-note">
            <span className="avatar-stack">
              <img src="/images/sonu-avatar.jpg" alt="Sonu M" className="avatar-img-sm" />
              <span className="avatar-plus">+</span>
            </span>
            <span>
              Designing high-impact web products<br />
              <strong>for creators &amp; ambitious founders.</strong>
            </span>
          </div>
        </div>

        <div className="hero-card-wrap">
          <div className="hero-card-lines" />
          <div className="hero-card">
            <div className="card-top">
              <span>01 — SORIX STUDIO</span>
              <span>IND / GLOBAL</span>
            </div>
            <div className="portrait-container">
              <img src="/images/sonu-avatar.jpg" alt="Sonu M - Founder & Lead Architect" className="portrait-img" />
              <div className="portrait-glow" />
              <div className="portrait-tag">
                SONU M<br />
                <small>FOUNDER &amp; LEAD ARCHITECT</small>
              </div>
            </div>
            <div className="card-bottom">
              <span>Strategy · Product · 3D Web</span>
              <span>Scroll to explore <ArrowDownRight size={14} /></span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        <span>Scroll to discover</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

function CreatorHero({ lead, onCta }: { lead: Lead; onCta: () => void }) {
  return (
    <section className="hero creator-hero" style={{ '--hero-image': `url(${lead.heroBg})` } as React.CSSProperties}>
      <div className="creator-image" />
      <div className="creator-overlay" />
      <div className="container creator-content">
        <div className="creator-copy">
          <div className="kicker">
            <span className="kicker-line" /> {lead.category} · Concept Proposal
          </div>
          <h1>{lead.heroTitle}</h1>
          <p className="hero-subtitle">{lead.heroSubtitle}</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={onCta}>
              {lead.ctaText} <ArrowUpRight size={17} />
            </button>
            <a className="button button-secondary-outline" href="https://wa.me/918152044640" target="_blank" rel="noreferrer">
              Chat on WhatsApp <ExternalLink size={15} />
            </a>
          </div>
          <div className="creator-proof">
            <Check size={15} />
            <span>Custom website proposal designed specifically for {lead.businessName}.</span>
          </div>
        </div>
        <div className="creator-badge">
          <Sparkles size={20} />
          <span>Exclusive Concept<br /><strong>{lead.businessName}</strong></span>
        </div>
      </div>
      <div className="container creator-meta">
        <span>01 / {lead.businessName.toUpperCase()} CONCEPT PREVIEW</span>
        <span>Scroll to see details <ArrowDownRight size={15} /></span>
      </div>
    </section>
  );
}

function DemoFeatureStrip({ lead }: { lead: Lead }) {
  return (
    <section className="feature-strip" id="features">
      <div className="container">
        <div className="feature-intro">
          <span className="eyebrow">TAILORED FEATURES</span>
          <h2>Everything built<br /><em>for your brand.</em></h2>
        </div>
        <div className="feature-list">
          {lead.features.map((feature, index) => (
            <div className="feature-item" key={feature}>
              <span className="feature-number">0{index + 1}</span>
              <div>
                <h3>{feature}</h3>
                <p>Designed to engage your audience and build lasting digital brand equity.</p>
              </div>
              <ArrowUpRight size={18} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  const [filter, setFilter] = useState<'all' | 'saas' | 'concept'>('all');

  const filteredProjects = useMemo(() => {
    if (filter === 'saas') return projects.filter((p) => p.category === 'saas');
    if (filter === 'concept') return projects.filter((p) => p.category === 'concept');
    return projects;
  }, [filter]);

  return (
    <section className="section work-section" id="work">
      <div className="container">
        <SectionHeading
          number="01"
          eyebrow="SELECTED WORK &amp; CREATOR CONCEPTS"
          title="Good work gets"
          italic="remembered."
          description="Click any project thumbnail card to visit the live website directly."
        />

        <div className="filter-bar">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects ({projects.length})
          </button>
          <button
            className={`filter-tab ${filter === 'saas' ? 'active' : ''}`}
            onClick={() => setFilter('saas')}
          >
            Live SaaS Product (1)
          </button>
          <button
            className={`filter-tab ${filter === 'concept' ? 'active' : ''}`}
            onClick={() => setFilter('concept')}
          >
            Creator Concepts (5)
          </button>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project) => (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={`project-card ${project.tone} ${project.isFlagship ? 'flagship-card' : ''}`}
              key={project.name}
            >
              <div className="browser-mockup">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <div className="browser-url-bar">
                    <Globe size={11} />
                    <span>{project.url.replace(/^https?:\/\//, '')}</span>
                  </div>
                  {project.isFlagship && <span className="flagship-badge">SAAS</span>}
                </div>

                <div className="thumbnail-frame">
                  <img
                    src={project.previewImage}
                    alt={`${project.name} website preview`}
                    className="card-thumbnail-img"
                    loading="lazy"
                  />
                  <div className="thumbnail-overlay">
                    <span className="visit-pill">
                      Visit Site <ExternalLink size={13} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="project-info">
                <div>
                  <div className="project-meta-row">
                    <span className="project-type">{project.type}</span>
                    <span className="project-metric-tag">{project.metric}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="direct-visit-cta">
                  <span>Visit Website</span>
                  <ArrowUpRight size={17} />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="work-footer">
          <span>Have an idea for a custom product or creator portal?</span>
          <a href="mailto:sorixm149@gmail.com">Ask Sonu directly <ArrowUpRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ number, eyebrow, title, italic, description }: { number: string; eyebrow: string; title: string; italic: string; description: string }) {
  return (
    <div className="section-heading">
      <div className="heading-number">{number}<span /></div>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}<br /><em>{italic}</em></h2>
      </div>
      <p>{description}</p>
    </div>
  );
}

function ProcessSection() {
  const items = [
    ['01', 'Find the core signal', 'We deeply understand your brand identity, product goals, and the exact audience experience you want to craft.'],
    ['02', 'Architect & design', 'Ideas become high-converting visual design, custom 3D web logic, and polished user journeys.'],
    ['03', 'Launch & scale', 'We build, launch, and refine the experience so it delivers measurable brand authority and engagement.'],
  ];
  return (
    <section className="section process-section" id="process">
      <div className="container">
        <SectionHeading
          number="02"
          eyebrow="HOW WE WORK"
          title="Direct collaboration."
          italic="Zero fluff."
          description="Work directly with Sonu M from initial strategy and design to production deployment."
        />
        <div className="process-list">
          {items.map(([number, title, text]) => (
            <div className="process-item" key={number}>
              <span className="process-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <ArrowUpRight size={20} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="founder-section" id="founder">
      <div className="container founder-inner">
        <div className="founder-portrait">
          <img src="/images/sonu-avatar.jpg" alt="Sonu M - Founder" className="founder-img" />
          <div className="founder-caption">
            SONU M<br />
            <small>FOUNDER · PRODUCT ARCHITECT</small>
          </div>
        </div>
        <div className="founder-copy">
          <span className="eyebrow">THE PERSON BEHIND THE PIXELS</span>
          <h2>Hi, I&apos;m Sonu.<br /><em>I make digital ideas feel real.</em></h2>
          <p>
            Sorix Studio is an independent digital studio focused on building flagship web products like BrowserKit and bespoke custom experiences for creators &amp; brands. I combine strategy, modern design, and robust web engineering to build things that stand out immediately.
          </p>
          <div className="stack-row">
            <span>BrowserKit</span>
            <span>React / TypeScript</span>
            <span>WebGL &amp; 3D</span>
            <span>Tailwind CSS</span>
            <span>Node.js</span>
            <span>AI Automation</span>
          </div>
          <a className="text-button" href="mailto:sorixm149@gmail.com">
            Discuss your project with Sonu <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ isDemo, lead, onCta }: { isDemo: boolean; lead: Lead; onCta: () => void }) {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-glow" />
      <div className="container contact-inner">
        <span className="eyebrow">START A CONVERSATION</span>
        <h2>
          {isDemo ? (
            <>Let&apos;s build <em>{lead.businessName}</em>&apos;s<br />digital experience.</>
          ) : (
            <>Ready to elevate<br /><em>your brand?</em></>
          )}
        </h2>
        <p>Tell us what you&apos;re building or pitching. We&apos;ll collaborate directly with you to make it happen.</p>
        <div className="contact-actions">
          <a className="button button-light" href="mailto:sorixm149@gmail.com">
            sorixm149@gmail.com <ArrowUpRight size={17} />
          </a>
          <a className="button button-secondary-outline" href="https://wa.me/918152044640" target="_blank" rel="noreferrer">
            WhatsApp Sonu <ArrowUpRight size={17} />
          </a>
          <button className="contact-phone" onClick={onCta}>
            <Phone size={15} /> +91 81520 44640
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
