import { useEffect, useRef, useState } from 'react';
import {
  aiProjects,
  assets,
  featuredProjects,
  legalPages,
  navigation,
  projects,
  resume,
  socialLinks,
  technologies,
} from './data/portfolio';
import { usePortfolioMotion, useSmoothScroll } from './hooks/useMotion';

const roles = ['AI Engineer', 'RAG Systems Builder', 'Full Stack Developer', 'Frontend Engineer', 'Creative Developer'];
const taglineLead = 'I juggle frontends and backends like a sleep-deprived circus act, crafting interfaces that flirt with users while my APIs quietly keep the universe from collapsing.';
const taglineAccent = 'Powered by caffeine, chaos, and questionable life choices—yet everything still works somehow.';

function getPageKind() {
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith('/projects') || path.endsWith('/projects.html')) return 'projects';
  if (path.endsWith('/privacy') || path.endsWith('/privacy.html')) return 'privacy';
  if (path.endsWith('/terms') || path.endsWith('/terms.html')) return 'terms';
  return path.endsWith('/') || path.endsWith('/index.html') ? 'home' : 'not-found';
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maximum > 0 ? Math.min((window.scrollY / maximum) * 100, 100) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return progress;
}

function useTypingText(words, typingDelay = 60) {
  const [text, setText] = useState('');

  useEffect(() => {
    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timeoutId;

    const type = () => {
      const word = words[wordIndex];
      characterIndex += deleting ? -1 : 1;
      setText(word.slice(0, characterIndex));

      if (!deleting && characterIndex === word.length) {
        deleting = true;
        timeoutId = window.setTimeout(type, 1200);
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeoutId = window.setTimeout(type, 300);
      } else {
        timeoutId = window.setTimeout(type, deleting ? 30 : typingDelay);
      }
    };

    timeoutId = window.setTimeout(type, typingDelay);
    return () => window.clearTimeout(timeoutId);
  }, [typingDelay, words]);

  return text;
}

function useTaglineTypewriter(text, shouldStart, typingDelay = 24) {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (!shouldStart) return undefined;

    let characterIndex = 0;
    let timeoutId;
    const type = () => {
      characterIndex += 1;
      setTypedText(text.slice(0, characterIndex));
      if (characterIndex < text.length) timeoutId = window.setTimeout(type, typingDelay);
    };

    timeoutId = window.setTimeout(type, typingDelay);
    return () => window.clearTimeout(timeoutId);
  }, [shouldStart, text, typingDelay]);

  return typedText;
}

function useCount(target) {
  const elementRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    let frameId;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const duration = 900;
        const animate = (now) => {
          const ratio = Math.min((now - startedAt) / duration, 1);
          setCount(Math.floor(target * ratio));
          if (ratio < 1) frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [target]);

  return [elementRef, count];
}

function PageShell({ children }) {
  const progress = useScrollProgress();
  const shellRef = useRef(null);
  useSmoothScroll();
  usePortfolioMotion(shellRef);

  return (
    <div className="site-shell" ref={shellRef}>
      <div className="scroll-progress scroll-progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />
      {children}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contracted, setContracted] = useState(false);

  useEffect(() => {
    let previousScroll = window.scrollY;
    const updateHeader = () => {
      const currentScroll = window.scrollY;
      setContracted(currentScroll > 100 && currentScroll > previousScroll);
      previousScroll = currentScroll;
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`floating-nav ${contracted ? 'contracted' : ''}`}>
      <div className="nav-container">
        <a className="logo" href="index.html" aria-label="Ahmed Ayyan home">
          <img src={assets.logo} alt="Ahmed Ayyan logo" className="logo-img" />
          <span className="brand-lockup"><b>AHMED</b><span>AYYAN // SE</span></span>
        </a>
        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`} aria-label="Primary navigation">
          {navigation.map((item) => (
            <a className="nav-item" href={item.href} key={item.label} onClick={closeMenu}>
              <i className={`nav-icon ${item.icon}`} aria-hidden="true" />
              <span className="nav-text">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="nav-end">
          <span className="nav-availability">Open for work</span>
          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="hamburger" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer fade-in">
      <span className="footer-watermark" data-footer-mark aria-hidden="true">Ahmed Ayyan</span>
      <div className="container">
        <div className="footer-cta" data-reveal>
          <div>
            <span className="footer-cta-kicker">Let’s collaborate</span>
            <h2>Make the next build <em>count.</em></h2>
          </div>
          <a className="footer-cta-link" href="mailto:ahmedayyan555@gmail.com">Start a conversation <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" /></a>
        </div>
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={assets.logo} alt="Ahmed Ayyan logo" className="footer-logo-img" />
            </div>
            <span className="footer-system">Portfolio // System Online</span>
          </div>
          <p className="footer-text">Crafting digital experiences with passion and precision.</p>
          <div className="footer-social-links">
            {socialLinks.map((link) => (
              <a className="footer-social-link" href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} key={link.label}>
                <i className={link.icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Ahmed Ayyan. All rights reserved.</p>
          <div className="footer-links">
            <a href="privacy.html">Privacy Policy</a>
            <a href="terms.html">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ title, subtitle, className = '', eyebrow = 'SELECTED WORK', reveal = true }) {
  return (
    <div className={`section-header ${className}`} {...(reveal ? { 'data-reveal': true } : {})}>
      <span className="section-eyebrow">{eyebrow}</span>
      <span className="section-signal" data-section-signal aria-hidden="true" />
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

function AboutStats() {
  const items = [
    { value: 20, label: 'Public Projects' },
    { value: 5, label: 'Hackathon Rank' },
    { value: 4, label: 'AI Systems' },
  ];

  return (
    <div className="about-stats scroll-stagger-container">
      {items.map((item) => <CountStat key={item.label} {...item} />)}
    </div>
  );
}

function CountStat({ value, label }) {
  const [ref, count] = useCount(value);
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-number">{count}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function TechnologySlider() {
  const slides = [...technologies, ...technologies];
  return (
    <section className="tech-slider-section" aria-label="Technologies I work with">
      <div className="tech-slider-header">TECHNOLOGIES I WORK WITH</div>
      <div className="tech-slider-wrapper">
        <div className="tech-slider">
          {slides.map((icon, index) => (
            <div className="tech-slide" key={`${icon}-${index}`}>
              <i className={icon} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tagline() {
  const sectionRef = useRef(null);
  const [shouldType, setShouldType] = useState(false);
  const typedAccent = useTaglineTypewriter(taglineAccent, shouldType);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldType(true);
      observer.disconnect();
    }, { rootMargin: '0px 0px -35% 0px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="tagline-section" ref={sectionRef}>
      <i className="tagline-icon fas fa-mug-hot" data-tagline-icon aria-hidden="true" />
      <span className="tagline-kicker">02 // BUILT UNDER PRESSURE</span>
      <div className="tagline-content">
        <p className="tagline-text">{taglineLead}</p>
        <p className="tagline-text tagline-accent">{typedAccent}<span className="tagline-cursor" aria-hidden="true">_</span></p>
      </div>
    </section>
  );
}

function ContactList({ title, icon, items }) {
  return (
    <div className="resume-sidebar-section">
      <h3 className="resume-sidebar-title"><i className={icon} aria-hidden="true" /> {title}</h3>
      {items.map((item) => (
        <div className="resume-contact-item" key={item.text}>
          <i className={item.icon} aria-hidden="true" />
          {item.href ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>{item.text}</a> : <span>{item.text}</span>}
        </div>
      ))}
    </div>
  );
}

function Resume() {
  return (
    <section id="resume" className="section resume-section fade-in">
      <div className="container">
        <div className="section-header" data-reveal>
          <h2 className="resume-section-title">Engineering Profile</h2>
          <p className="section-subtitle">AI systems, production front-end delivery, technical leadership, and practical software engineering.</p>
        </div>
        <div className="resume-card-container scroll-fade-up" data-reveal>
          <aside className="resume-sidebar">
            <div className="resume-profile">
              <div className="resume-profile-img">
                <img src={assets.profileImage} alt="Ahmed Ayyan" />
              </div>
              <div className="resume-profile-identity">
                <strong>Ahmed Ayyan Mukhtar</strong>
                <span>Software Engineering · AI Systems</span>
              </div>
            </div>
            <ContactList title="Contact" icon="fas fa-envelope" items={resume.contacts} />
            <ContactList title="Links" icon="fas fa-link" items={resume.links} />
            <div className="resume-sidebar-section">
              <h3 className="resume-sidebar-title"><i className="fas fa-code" aria-hidden="true" /> Technical Skills</h3>
              {resume.skills.map((skill) => (
                <div className="resume-skill-item" key={skill.name}>
                  <div className="resume-skill-header"><span>{skill.name}</span><span>{skill.level}%</span></div>
                  <div className="resume-skill-bar"><div className="resume-skill-fill" style={{ '--skill-level': `${skill.level}%` }} /></div>
                </div>
              ))}
            </div>
            <div className="resume-sidebar-section">
              <h3 className="resume-sidebar-title"><i className="fas fa-lightbulb" aria-hidden="true" /> Soft Skills</h3>
              <div className="resume-soft-skills">
                {resume.softSkills.map((skill) => <span className="resume-soft-skill-tag" key={skill}>{skill}</span>)}
              </div>
            </div>
            <a href={assets.resumePdf} download="AHMED AYYAN CV_latest.pdf" className="resume-download-btn">
              <i className="fas fa-download" aria-hidden="true" /> Download Resume
            </a>
          </aside>
          <div className="resume-content">
            <div className="resume-content-section">
              <h3 className="resume-content-title">Introduction</h3>
              <p className="resume-intro-text">{resume.intro}</p>
            </div>
            <div className="resume-content-section">
              <h3 className="resume-content-title"><i className="fas fa-briefcase" aria-hidden="true" /> Work Experience</h3>
              {resume.jobs.map((job) => (
                <div className="resume-job" key={job.title}>
                  <div className="resume-job-header"><div><h4 className="resume-job-title">{job.title}</h4><p className="resume-job-company">{job.company}</p></div></div>
                  <ul className="resume-job-list">{job.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="resume-content-section">
              <h3 className="resume-content-title"><i className="fas fa-graduation-cap" aria-hidden="true" /> Education</h3>
              <div className="resume-education">
                <h4 className="resume-education-title">{resume.education.title}</h4>
                <p className="resume-education-school">{resume.education.school}</p>
                <p>{resume.education.description}</p>
              </div>
            </div>
            <div className="resume-content-section">
              <h3 className="resume-content-title"><i className="fas fa-brain" aria-hidden="true" /> Selected AI Projects</h3>
              <div className="resume-projects">
                {resume.projects.map((project) => (
                  <article className="resume-project" key={project.title}>
                    <h4>{project.title}</h4>
                    <p className="resume-project-meta">{project.meta}</p>
                    <p>{project.description}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="resume-content-section">
              <h3 className="resume-content-title"><i className="fas fa-trophy" aria-hidden="true" /> Achievements</h3>
              <div className="resume-certifications">{resume.achievements.map((achievement) => <div className="resume-cert-item" key={achievement}>{achievement}</div>)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RolesSlider() {
  const rolesList = ['AI Engineer', 'RAG Systems Builder', 'Angular Developer', 'React Developer', 'Full Stack Developer', 'VS Code Extension Developer'];
  return (
    <section className="roles-slider-section" aria-label="Roles">
      <div className="roles-slider-wrapper">
        <div className="roles-slider">
          {[...rolesList, ...rolesList].map((role, index) => <span className="role-slide" key={`${role}-${index}`}>{role}<span className="role-separator">✦</span></span>)}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project }) {
  return (
    <article className="featured-project-card slide-in-up" data-reveal>
      <div className="featured-project-image">
        <img src={project.image} alt={project.alt} />
        <span className="featured-overlay-badge">Featured</span>
      </div>
      <div className="featured-project-content">
        <div className="featured-tech-stack">
          {project.stack.map(([icon, name]) => <span className="tech-pill" key={name}><i className={icon} aria-hidden="true" /> {name}</span>)}
        </div>
        <h3 className="featured-project-title">{project.title}</h3>
        <p className="featured-project-description">{project.description}</p>
        <div className="featured-highlights">
          {project.highlights.map((highlight) => <div className="highlight" key={highlight}><i className="fas fa-check" aria-hidden="true" /><span>{highlight}</span></div>)}
        </div>
        <div className="featured-project-actions">
          <a href={project.demo} className="btn-featured btn-demo" target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt" aria-hidden="true" /> Live Demo</a>
          <a href="projects.html" className="btn-featured btn-details"><i className="fas fa-info-circle" aria-hidden="true" /> Full Details</a>
        </div>
      </div>
    </article>
  );
}

function AIProjectCard({ project }) {
  return (
    <article className="ai-project-card" data-ai-card data-gsap-stagger-item>
      <div className="ai-project-card-header">
        <span>{project.id}</span>
        <span className="ai-project-status"><i className="fas fa-circle" aria-hidden="true" /> AI System</span>
      </div>
      <div className="ai-project-card-body">
        <p className="ai-project-category">{project.category}</p>
        <h3>{project.name}</h3>
        <p className="ai-project-description">{project.description}</p>
        <div className="ai-project-stack">
          {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
        <ul className="ai-project-capabilities">
          {project.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>
      </div>
      <a className="ai-project-link" href={project.repository} target="_blank" rel="noreferrer">
        View repository <i className="fab fa-github" aria-hidden="true" />
      </a>
    </article>
  );
}

function AIProjects() {
  return (
    <section id="ai-projects" className="section ai-projects-section">
      <i className="ai-section-robot fas fa-robot" data-ai-robot aria-hidden="true" />
      <div className="container">
        <SectionHeader reveal={false} eyebrow="03 // AI SYSTEMS" title="Intelligence, applied." subtitle="Local assistants, healthcare intelligence, developer tooling, and security systems built around practical AI workflows." />
        <div className="ai-projects-grid" data-gsap-stagger>
          {aiProjects.map((project) => <AIProjectCard project={project} key={project.name} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const contacts = [
    { icon: 'fas fa-envelope', title: 'Email Me', subtitle: 'Drop me a line anytime', href: 'mailto:ahmedayyan555@gmail.com', text: 'ahmedayyan555@gmail.com' },
    { icon: 'fas fa-phone', title: 'Call Me', subtitle: 'Mon-Fri from 9am to 6pm', href: 'tel:+923009586306', text: '+92 300 9586306' },
    { icon: 'fas fa-map-marker-alt', title: 'Visit Me', subtitle: 'Come say hello', href: 'https://www.google.com/maps/search/?api=1&query=Lahore%2C+Pakistan', text: 'Lahore, Pakistan' },
  ];

  return (
    <section id="contact" className="section contact-section fade-in">
      <div className="container">
        <SectionHeader eyebrow="04 // COMMS" title="Get In Touch" subtitle="I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision." />
        <div className="contact-cards-grid">
          {contacts.map((contact) => (
            <article className="contact-card" data-reveal key={contact.title}>
              <div className="contact-card-icon"><i className={contact.icon} aria-hidden="true" /></div>
              <h3 className="contact-card-title">{contact.title}</h3>
              <p className="contact-card-subtitle">{contact.subtitle}</p>
              <a href={contact.href} className="contact-card-link" target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}>{contact.text}</a>
            </article>
          ))}
        </div>
        <div className="social-section" data-reveal>
          <h3 className="social-section-title">Connect on Social Media</h3>
          <div className="social-links-large">
            {socialLinks.map((link) => <a href={link.href} className="social-link-large" target="_blank" rel="noreferrer" aria-label={link.label} key={link.label}><i className={link.icon} aria-hidden="true" /></a>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const typedRole = useTypingText(roles);

  return (
    <PageShell>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <i className="hero-code-icon fas fa-code" data-hero-code aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-meta" data-hero-meta><p className="hero-greeting">Portfolio // 2026</p><span className="hero-status">AVAILABLE FOR SELECTED WORK</span></div>
            <h1 className="hero-title" aria-label="Ahmed Ayyan">
              <span data-hero-line>Ahmed</span>
              <span data-hero-line><em>Ayyan.</em></span>
            </h1>
            <div className="hero-footer">
              <div className="hero-roles" data-hero-copy><span className="role-prefix">BUILDING AS A </span><span className="typing-text">{typedRole}</span><span className="cursor-blink">_</span></div>
              <div className="hero-actions"><a href="#ai-projects" className="btn btn-primary" data-hero-action>View Selected Work</a><a href="#contact" className="btn btn-secondary" data-hero-action>Start a Conversation</a></div>
            </div>
          </div>
        </section>
        <section id="about" className="section about-section fade-in">
          <div className="container">
            <SectionHeader eyebrow="01 // PROFILE" title="About" />
            <div className="about-content scroll-fade-up" data-reveal>
              <div className="about-text">
                <p className="about-intro">I’m a Software Engineering student at Information Technology University, building practical AI systems and digital experiences that blend intelligent workflows with reliable engineering.</p>
                <p className="about-description">My work spans grounded RAG applications, local AI assistants, developer tooling, fraud analysis, and responsive production interfaces. I care about clear UX, maintainable systems, and measurable outcomes.</p>
                <AboutStats />
              </div>
            </div>
          </div>
        </section>
        <TechnologySlider />
        <Tagline />
        <Resume />
        <RolesSlider />
        <AIProjects />
        <section id="portfolio" className="section portfolio-section gotham-section fade-in">
          <div className="container">
            <SectionHeader eyebrow="04 // SELECTED WORK" title="Featured Projects" subtitle="A selection of work across web development, AI, and interactive experiences." />
            <div className="featured-projects-grid">{featuredProjects.map((project) => <FeaturedProjectCard project={project} key={project.title} />)}</div>
            <div className="text-center view-all-section" data-reveal>
              <a href="projects.html" className="btn btn-primary btn-view-all"><i className="fas fa-folder-open" aria-hidden="true" /> View All Projects</a>
              <p className="view-all-subtitle">Explore detailed information on all my projects</p>
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </PageShell>
  );
}

function ProjectDetailCard({ project }) {
  return (
    <article className="project-detail-card" data-reveal>
      <div className="project-header">
        <div className="project-thumbnail"><img src={project.image} alt={project.alt} /></div>
        <div className="project-info">
          <h2 className="project-title">{project.title}</h2>
          <span className="project-category">Web Development</span>
          <p className="project-description">{project.description}</p>
        </div>
      </div>
      <div className="project-technologies">
        <h3>Technologies Used</h3>
        <div className="tech-tags">{project.technologies.map((technology) => <span className="tech-tag" key={technology}>{technology}</span>)}</div>
      </div>
      <div className="project-features">
        <h3>Key Features</h3>
        <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      </div>
      <div className="project-links">
        <a href={project.demo} className="project-link" target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt" aria-hidden="true" /> Live Demo</a>
        {project.code && <a href={project.code} className="project-link" target="_blank" rel="noreferrer"><i className="fab fa-github" aria-hidden="true" /> View Code</a>}
      </div>
    </article>
  );
}

function ProjectsPage() {
  return (
    <PageShell>
      <main>
        <a href="index.html#portfolio" className="back-button"><i className="fas fa-arrow-left" aria-hidden="true" /> Back to Portfolio</a>
        <section className="projects-hero">
          <div className="container"><div className="projects-hero-content"><h1>All Projects</h1><p>A comprehensive collection of my development work, showcasing expertise across technologies and domains.</p></div></div>
        </section>
        <section className="projects-section"><div className="container">{projects.map((project) => <ProjectDetailCard project={project} key={project.title} />)}</div></section>
      </main>
      <Footer />
    </PageShell>
  );
}

function LegalPage({ type }) {
  const page = legalPages[type];
  const heroClass = type === 'privacy' ? 'policy-hero' : 'terms-hero';

  return (
    <PageShell>
      <main>
        <a href="index.html" className="back-button"><i className="fas fa-arrow-left" aria-hidden="true" /> Back to Portfolio</a>
        <section className={heroClass}>
          <div className="container">
            <div className="section-header" data-reveal>
              <h1 className="section-title">{page.title}</h1>
              <div className="section-divider" />
              <p className="section-subtitle">{page.subtitle}</p>
            </div>
          </div>
        </section>
        <section className="section legal-section"><div className="container"><div className={page.contentClass} data-reveal><p className="last-updated">Last Updated: November 6, 2025</p>
          {page.sections.map((section, index) => (
            <div key={`${section.heading || section.subheading}-${index}`}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.subheading && <h3>{section.subheading}</h3>}
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
            </div>
          ))}
        </div></div></section>
      </main>
      <Footer />
    </PageShell>
  );
}

function NotFoundPage() {
  return (
    <PageShell>
      <main className="route-not-found"><div><h1>Page not found</h1><p>The page you requested does not exist.</p><a className="btn btn-primary" href="index.html">Go home</a></div></main>
    </PageShell>
  );
}

export default function App() {
  const page = getPageKind();

  useEffect(() => {
    document.title = page === 'home' ? 'Ahmed Ayyan | Portfolio' : `${page === 'not-found' ? 'Page not found' : legalPages[page]?.title || 'Projects'} | Ahmed Ayyan`;
  }, [page]);

  if (page === 'projects') return <ProjectsPage />;
  if (page === 'privacy' || page === 'terms') return <LegalPage type={page} />;
  if (page === 'not-found') return <NotFoundPage />;
  return <HomePage />;
}
