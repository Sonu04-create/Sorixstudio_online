import { useEffect, useMemo, useRef, useState } from 'react';
import { GlowingCodeBrackets3D } from './components/GlowingCodeBrackets3D';
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

  const previewUrl = activeSlug && activeSlug !== '' && projects.find((p) => p.name.toLowerCase().includes(activeSlug.replace('-', '')))
    ? projects.find((p) => p.name.toLowerCase().includes(activeSlug.replace('-', '')))!.url
    : 'https://browserkit.in/';

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
          <div className="nav-brand-group">
            <button className="wordmark" onClick={() => scrollTo('top')} aria-label="Go to top">
              <span className="wordmark-mark"><Zap size={15} fill="currentColor" /></span>
              <span>SORIX<span className="wordmark-dot">.</span></span>
            </button>
            <div className="nav-founder-badge">
              <img src="/images/sonu-avatar.jpg" alt="Sonu M" className="nav-avatar" />
              <span>Sonu M <small>· Founder</small></span>
            </div>
          </div>

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
          <CreatorHero lead={lead} slug={activeSlug} url={previewUrl} onCta={() => scrollTo('contact')} />
        ) : (
          <AgencyHero url="https://browserkit.in/" onCta={() => scrollTo('contact')} onWork={() => scrollTo('work')} />
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
          <div className="footer-founder-badge">
            <img src="/images/sonu-avatar.jpg" alt="Sonu M" className="footer-avatar" />
            <span>Founder &amp; Lead Architect · Sonu M</span>
          </div>
          <span>© {new Date().getFullYear()} Sorix Studio. Crafted with intent.</span>
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

function Hero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 240);
    let height = (canvas.height = 240);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) * 0.005;
      mouseY = (e.clientY - rect.top - height / 2) * 0.005;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let angleX = 0;
    let angleY = 0;

    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    const scale = 65;
    const vertices = rawVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [(x / len) * scale, (y / len) * scale, (z / len) * scale];
    });

    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < scale * 1.3) {
          edges.push([i, j]);
        }
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleX += 0.008 + mouseY * 0.3;
      angleY += 0.012 + mouseX * 0.3;

      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);

      const projected = vertices.map(([x, y, z]) => {
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const perspective = 260 / (260 + z2);
        return {
          x: width / 2 + x1 * perspective,
          y: height / 2 + y2 * perspective,
          scale: perspective,
          z: z2,
        };
      });

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];

        const avgZ = (p1.z + p2.z) / 2;
        const opacity = Math.max(0.2, Math.min(0.9, (avgZ + scale) / (scale * 2)));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
        ctx.lineWidth = 1.8 * p1.scale;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 12;
        ctx.stroke();
      });

      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 14;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hero-3d-crystal-badge">
      <canvas ref={canvasRef} className="hero-3d-canvas" />
      <span className="crystal-tag">INTERACTIVE 3D CORE</span>
    </div>
  );
}

function HeroDeviceMockup({ url, slug, title }: { url: string; slug?: string; title: string }) {
  const displayUrl = slug ? `sorixstudio.online/?id=${slug}` : 'sorixstudio.online/browserkit';

  return (
    <div className="hero-device-wrap">
      <div className="device-glow-orb" />
      <div className="device-laptop-frame">
        <div className="laptop-top-bar">
          <div className="laptop-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="laptop-address-bar">
            <Globe size={11} />
            <span>{displayUrl}</span>
          </div>
          <span className="live-status-pill">LIVE PREVIEW</span>
        </div>
        <div className="laptop-screen">
          <iframe
            src={url}
            title={`${title} live interactive preview`}
            className="device-iframe"
          />
        </div>
        <div className="laptop-bottom-notch" />
      </div>
    </div>
  );
}

function AgencyHero({ url, onCta, onWork }: { url: string; onCta: () => void; onWork: () => void }) {
  const [heroView, setHeroView] = useState<'3d-brackets' | 'device'>('3d-brackets');

  return (
    <section className="hero agency-hero">
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <div className="container hero-content">
        <div className="hero-copy">
          <div className="hero-header-row">
            <div className="kicker">
              <span className="status-pulse-dot" />
              <span>Available for Select Projects &amp; Creator Portals · 2026</span>
            </div>
            <GlowingCodeBrackets3D variant="badge" />
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
        </div>

        <div className="hero-visual-column">
          <div className="hero-view-toggle">
            <button
              className={`toggle-tab ${heroView === '3d-brackets' ? 'active' : ''}`}
              onClick={() => setHeroView('3d-brackets')}
            >
              <Sparkles size={13} />
              <span>3D Metallic &lt;/&gt;</span>
            </button>
            <button
              className={`toggle-tab ${heroView === 'device' ? 'active' : ''}`}
              onClick={() => setHeroView('device')}
            >
              <Globe size={13} />
              <span>Browser Preview</span>
            </button>
          </div>

          {heroView === '3d-brackets' ? (
            <GlowingCodeBrackets3D variant="hero-card" />
          ) : (
            <HeroDeviceMockup url={url} title="BrowserKit" />
          )}
        </div>
      </div>
      <div className="scroll-cue">
        <span>Scroll to discover</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

function CreatorHero({ lead, slug, url, onCta }: { lead: Lead; slug?: string; url: string; onCta: () => void }) {
  const [heroView, setHeroView] = useState<'3d-brackets' | 'device'>('3d-brackets');

  return (
    <section className="hero creator-hero" style={{ '--hero-image': `url(${lead.heroBg})` } as React.CSSProperties}>
      <div className="creator-image" />
      <div className="creator-overlay" />
      <div className="container creator-content">
        <div className="creator-copy">
          <div className="hero-header-row">
            <div className="kicker">
              <span className="status-pulse-dot" />
              <span>{lead.category} · Concept Proposal</span>
            </div>
            <GlowingCodeBrackets3D variant="badge" accentColor={lead.primaryColor} />
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

        <div className="hero-visual-column">
          <div className="hero-view-toggle">
            <button
              className={`toggle-tab ${heroView === '3d-brackets' ? 'active' : ''}`}
              onClick={() => setHeroView('3d-brackets')}
            >
              <Sparkles size={13} />
              <span>3D Metallic &lt;/&gt;</span>
            </button>
            <button
              className={`toggle-tab ${heroView === 'device' ? 'active' : ''}`}
              onClick={() => setHeroView('device')}
            >
              <Globe size={13} />
              <span>Live Website Preview</span>
            </button>
          </div>

          {heroView === '3d-brackets' ? (
            <GlowingCodeBrackets3D variant="hero-card" accentColor={lead.primaryColor} />
          ) : (
            <HeroDeviceMockup url={url} slug={slug} title={lead.businessName} />
          )}
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
