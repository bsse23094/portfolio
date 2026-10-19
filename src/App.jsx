import Arrow from "./components/Arrow";
import ProjectActionIcon from "./components/ProjectActionIcon";
import PipelineVisual from "./components/PipelineVisual";
import { useEffect, useRef, useState } from "react";
import {
  profile,
  experience,
  selectedProjects,
  capabilities,
  archiveProjects,
} from "./data/portfolio";
import SystemWorkbench, {
  ArchitectureButton,
} from "./components/SystemWorkbench";
import TechRail from "./components/TechRail";
import DesignAccent from "./components/DesignAccent";
import ProjectSignalIndex from "./components/ProjectSignalIndex";
import { usePortfolioMotion } from "./hooks/useMotion";

function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Arrow diagonal />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
function Tags({ items }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Header({ home }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef(null);
  const prefix = home ? "" : "/";
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => {
      document.removeEventListener("keydown", close);
      observer.disconnect();
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          className="brand"
          href={home ? "#top" : "/"}
          aria-label="Ahmed Ayyan home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            a<span>.</span>
          </span>
          <span className="brand-name">
            AHMED AYYAN<span>AI ENGINEER & DEVELOPER</span>
          </span>
        </a>
        <button
          className="menu-toggle"
          ref={toggleRef}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="primary-navigation"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="primary-navigation"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Main navigation"
        >
          {["work", "experience", "about", "contact"].map((id, index) => (
            <a
              key={id}
              href={`${prefix}#${id}`}
              aria-current={home && active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="nav-index">0{index + 1}</span>
              {id === "work"
                ? "Selected work"
                : id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a
            className="nav-resume"
            href={profile.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé <Arrow diagonal />
            <span className="sr-only">PDF, opens in a new tab</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow hero-intro" data-enter>
          <span className="tiny-cross" aria-hidden="true">
            +
          </span>{" "}
          AI ENGINEER / SOFTWARE DEVELOPER <span className="eyebrow-rule" />
        </div>
        <h1 id="hero-title" aria-label="Ahmed Ayyan Mukhtar">
          <span className="hero-line">
            <span>Ahmed</span>
          </span>
          <span className="hero-line">
            <span>
              Ayyan<span className="name-period">.</span>
            </span>
          </span>
        </h1>
        <p className="hero-description" data-enter>
          I build agentic workflows, retrieval systems, and{" "}
          <strong>C#/.NET services.</strong> My focus is the engineering that
          turns a model into a useful product.
        </p>
        <div className="hero-actions" data-enter>
          <a href="#work" className="button button-primary">
            Explore my work <Arrow />
          </a>
          <a
            className="text-link resume-link"
            href={profile.resumePdf}
            download="Ahmed_Ayyan_Mukhtar_Resume.pdf"
          >
            Download résumé <span className="file-label">PDF</span>
            <Arrow diagonal />
          </a>
        </div>
        <div className="hero-location" data-enter>
          <span className="location-symbol" aria-hidden="true">
            ◎
          </span>
          <span>Based in Lahore, Pakistan</span>
          <span className="location-line" />
          <span className="mono">AI / BACKEND / APPLIED ML</span>
        </div>
        <div className="hero-experience">
          <span className="hero-experience-label">RECENT EXPERIENCE</span>
          <div>
            {experience.map((item) => (
              <a href="#experience" key={item.company}>
                <strong>{item.company}</strong>
                <span>{item.role}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="hero-visual" data-enter>
        <SystemWorkbench appearance="paper" />
      </div>
      <div className="hero-footnote">
        <span>
          AGENTIC AI <span>/</span> APPLIED ML <span>/</span> BACKEND
          ENGINEERING
        </span>
        <a href="#work">
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <div className="proof-strip">
      <div className="container proof-inner">
        <p className="proof-label">
          <span className="tiny-cross" aria-hidden="true">
            +
          </span>{" "}
          SELECTED
          <br />
          MILESTONES
        </p>
        <div>
          <strong>
            5th <span>/ 200+</span>
          </strong>
          <p>HEC GenAI National Hackathon ’25</p>
        </div>
        <div>
          <strong>20,000</strong>
          <p>CI logs modeled for build prediction</p>
        </div>
        <div>
          <strong>155</strong>
          <p>Tests in the UFC prediction pipeline</p>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ index, label, title, children }) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <div className="eyebrow">
          <span className="section-number">{index}</span>
          {label}
        </div>
        <h2 className="heading-reveal">
          <span>{title}</span>
        </h2>
      </div>
      {children}
      <span className="section-rule" aria-hidden="true" />
    </div>
  );
}

function ProjectVisual({ type }) {
  if (type === "cicd" || type === "ufc") return <PipelineVisual type={type} />;
  if (type === "reply-mirror")
    return (
      <div
        className="project-visual fraud-visual"
        aria-label="Reply Mirror architecture: ingestion, four signal agents, fusion, and decision"
        role="img"
      >
        <div className="visual-label">
          <span>REPLY MIRROR / SYSTEM MAP</span>
          <span>7 AGENTS</span>
        </div>
        <svg viewBox="0 0 560 270" fill="none" aria-hidden="true">
          <defs>
            <pattern
              id="fraud-grid"
              width="22"
              height="22"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r=".6" fill="#63645e" opacity=".4" />
            </pattern>
          </defs>
          <rect width="560" height="270" fill="url(#fraud-grid)" />
          <g stroke="#62625a" strokeWidth="1">
            <path d="M111 135H155V51H206M155 107H206M155 163H206M155 219H206M155 135V219M310 51H348V135H388M310 107H348M310 163H348M310 219H348V135M449 135H478" />
          </g>
          <g className="diagram-pulse" fill="#d99770">
            <circle cx="155" cy="135" r="3" />
            <circle cx="348" cy="135" r="3" />
          </g>
          <rect
            x="27"
            y="113"
            width="84"
            height="44"
            rx="3"
            fill="#272924"
            stroke="#64665c"
          />
          <text x="69" y="139" textAnchor="middle" fill="#e8e8dd">
            INGEST
          </text>
          {["BEHAVIOR", "GEO", "COMMS", "AUDIO"].map((name, i) => (
            <g key={name}>
              <rect
                x="206"
                y={29 + i * 56}
                width="104"
                height="44"
                rx="3"
                fill="#242721"
                stroke="#64665c"
              />
              <circle cx="222" cy={51 + i * 56} r="2.5" fill="#c98d6d" />
              <text x="265" y={55 + i * 56} textAnchor="middle" fill="#e8e8dd">
                {name}
              </text>
            </g>
          ))}
          <path d="m418 105 30 30-30 30-30-30Z" fill="#d59873" />
          <text
            x="418"
            y="138"
            textAnchor="middle"
            fill="#20231d"
            style={{ fontSize: 8 }}
          >
            FUSE
          </text>
          <circle cx="495" cy="135" r="17" fill="#323c2d" stroke="#aab897" />
          <path d="m488 135 5 5 9-10" stroke="#d8e2c8" strokeWidth="1.5" />
          <text
            x="495"
            y="172"
            textAnchor="middle"
            fill="#aab897"
            style={{ fontSize: 8 }}
          >
            DECIDE
          </text>
        </svg>
        <div className="visual-bottom">
          <span>
            <i className="status-dot" /> RISK-AWARE ROUTING
          </span>
          <span>TRACEABLE BY DESIGN <Arrow diagonal className="inline-arrow" /></span>
        </div>
      </div>
    );
  return (
    <div
      className="project-visual medical-visual"
      aria-label="MediSense architecture: medical guidance and patient report retrieval combined in a grounded response"
      role="img"
    >
      <div className="visual-label">
        <span>MEDISENSE AI / RETRIEVAL MAP</span>
        <span>HYBRID RAG</span>
      </div>
      <svg viewBox="0 0 560 270" fill="none" aria-hidden="true">
        <circle
          cx="280"
          cy="135"
          r="113"
          stroke="#c5cbc0"
          strokeDasharray="3 7"
        />
        <circle cx="280" cy="135" r="84" stroke="#c5cbc0" />
        <circle cx="280" cy="135" r="57" stroke="#c5cbc0" />
        <path
          d="M133 90H185L241 124M133 182H185L241 147M319 135H400"
          stroke="#899580"
          strokeWidth="1.2"
        />
        <rect
          x="30"
          y="67"
          width="122"
          height="46"
          rx="3"
          fill="#f6f7ef"
          stroke="#bbc4b5"
        />
        <text x="91" y="87" textAnchor="middle" fill="#3c4836">
          WHO / NIH
        </text>
        <text
          x="91"
          y="101"
          textAnchor="middle"
          fill="#707b69"
          style={{ fontSize: 8 }}
        >
          MEDICAL GUIDANCE
        </text>
        <rect
          x="30"
          y="158"
          width="122"
          height="46"
          rx="3"
          fill="#f6f7ef"
          stroke="#bbc4b5"
        />
        <text x="91" y="178" textAnchor="middle" fill="#3c4836">
          PATIENT REPORT
        </text>
        <text
          x="91"
          y="192"
          textAnchor="middle"
          fill="#707b69"
          style={{ fontSize: 8 }}
        >
          OCR EXTRACTION
        </text>
        <rect x="242" y="97" width="76" height="76" rx="38" fill="#3d4e37" />
        <path d="M280 115v40M260 135h40" stroke="#dce6d3" strokeWidth="1.5" />
        <circle cx="280" cy="135" r="13" fill="#3d4e37" stroke="#dce6d3" />
        <rect
          x="400"
          y="104"
          width="133"
          height="62"
          rx="3"
          fill="#f6f7ef"
          stroke="#bbc4b5"
        />
        <text x="466" y="131" textAnchor="middle" fill="#3c4836">
          GROUNDED
        </text>
        <text x="466" y="147" textAnchor="middle" fill="#3c4836">
          RESPONSE
        </text>
        <circle
          className="diagram-pulse"
          cx="363"
          cy="135"
          r="3"
          fill="#536449"
        />
      </svg>
      <div className="visual-bottom">
        <span>CONTEXT + KNOWLEDGE</span>
        <span>ISOLATED COLLECTIONS <Arrow diagonal className="inline-arrow" /></span>
      </div>
    </div>
  );
}

function ProjectDetails({ project }) {
  return (
    <details className="project-details">
      <summary className="project-action">
        <ProjectActionIcon notes />
        Engineering notes<span className="sr-only"> for {project.title}</span>
        <span className="project-action-trailing details-plus" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" focusable="false">
            <path d="M5 12h14M12 5v14" />
          </svg>
        </span>
      </summary>
      <div className="details-content">
        <div>
          <h4>The problem</h4>
          <p>{project.challenge}</p>
        </div>
        <div>
          <h4>What I built</h4>
          <p>{project.approach}</p>
        </div>
        <div>
          <h4>The evidence</h4>
          <p>{project.evidence}</p>
        </div>
      </div>
    </details>
  );
}

function FeaturedProject({ project }) {
  return (
    <article
      id={project.id}
      className={`featured-project ${project.id}`}
      data-reveal
    >
      <ProjectVisual type={project.id} />
      <div className="project-info">
        <div className="project-kicker">
          <span>{project.category}</span>
          <span>/{project.number}</span>
        </div>
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <a
            className="circle-link"
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source on GitHub (opens in a new tab)`}
          >
            <Arrow diagonal />
          </a>
        </div>
        <p className="project-description">{project.description}</p>
        <Tags items={project.stack} />
        <div className="project-actions">
          <div className="project-result">
            <strong>{project.metric}</strong>
            <span>{project.metricLabel}</span>
          </div>
          <ArchitectureButton project={project} />
          <ProjectDetails project={project} />
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="section container">
      <SectionHeading
        index="01"
        label="SELECTED WORK"
        title="Selected projects."
      >
        <p>
          Agent orchestration, retrieval, and predictive models.
          <br className="desktop-break" /> Open a project’s notes for the
          engineering decisions.
        </p>
      </SectionHeading>
      <ProjectSignalIndex />
      <div className="featured-grid">
          {selectedProjects.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}
      </div>
      <div className="archive-callout" data-reveal>
        <p>
          There’s more in the workshop.
          <span>Developer tools, web apps, and work for clients.</span>
        </p>
        <a href="/projects.html" className="text-link">
          Explore all projects <Arrow />
        </a>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="container section">
        <SectionHeading
          index="02"
          label="EXPERIENCE"
          title="Where I’ve worked."
        >
          <a
            className="text-link"
            href={profile.resumePdf}
            download="Ahmed_Ayyan_Mukhtar_Resume.pdf"
          >
            Full résumé <Arrow diagonal />
          </a>
        </SectionHeading>
        <div className="experience-list">
          {experience.map((job) => (
            <article className="experience-row" key={job.company} data-reveal>
              <div className="experience-meta">
                <p className="experience-dates">
                  <span>{job.start}</span> <span className="date-divider">—</span> <span>{job.end}</span>
                </p>
                <span>{job.location}</span>
              </div>
              <div className="experience-content">
                <div className="job-heading">
                  <div>
                    <h3>{job.company}</h3>
                    <p className="job-role">{job.role}</p>
                  </div>
                  <span className="job-mark" aria-hidden="true">
                    <Arrow diagonal className="inline-arrow" />
                  </span>
                </div>
                <p className="job-description">{job.description}</p>
                <ul className="job-points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Tags items={job.stack} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section container about-section">
      <SectionHeading
        index="03"
        label="ABOUT ME"
        title="The person behind the code."
      />
      <div className="about-grid">
        <div className="portrait-block" data-reveal>
          <div className="portrait-frame">
            <img
              src={profile.portrait}
              width="720"
              height="900"
              alt="Ahmed Ayyan Mukhtar wearing a suit outdoors"
              loading="lazy"
            />
            <span className="portrait-corner" aria-hidden="true">
              <Arrow diagonal className="inline-arrow" />
            </span>
          </div>
          <div className="portrait-caption">
            <span>AHMED AYYAN MUKHTAR</span>
            <span>LAHORE, PK</span>
          </div>
        </div>
        <div className="about-copy" data-reveal>
          <p className="about-lead">
            A model is only one part
            <br />
            of a useful product.
          </p>
          <p>
            I’m interested in everything around it: how data gets in, how tools
            connect, how decisions are traced, and how the result reaches a
            person who needs it.
          </p>
          <p>
            I’m studying Software Engineering at Information Technology
            University, Lahore, while building across AI, backend services, and
            product interfaces.
          </p>
          <div className="about-facts">
            <div>
              <span className="eyebrow">EDUCATION</span>
              <h3>BS Software Engineering</h3>
              <p>
                Information Technology University, Lahore
                <br />
                2023–2027 <span className="subtle">(expected)</span>
              </p>
            </div>
            <div>
              <span className="eyebrow">COMMUNITY</span>
              <h3>Tech Lead, Code Rush</h3>
              <p>
                GDG on Campus, ITU · A competitive programming event for 100+
                participants, from problem design to live troubleshooting.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="capabilities">
        {capabilities.map((item, index) => (
          <article key={item.title} data-reveal>
            <span className="capability-number">0{index + 1} /</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="capability-tools">{item.tools}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [copyState, setCopyState] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("Email copied");
    } catch {
      setCopyState("Copy unavailable. Select the email address to copy it.");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState(""), 4500);
  };
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-top">
          <span className="eyebrow">
            <span className="section-number">04</span> START A CONVERSATION
          </span>
          <span className="mono">LAHORE, PAKISTAN / UTC +05</span>
        </div>
        <div className="contact-main" data-reveal>
          <h2>
            Good problems.
            <br />
            <em>Let’s solve them.</em>
          </h2>
          <a
            className="contact-arrow"
            href={`mailto:${profile.email}`}
            aria-label="Send Ahmed an email"
          >
            <DesignAccent kind="orbit" className="contact-orbits" />
            <Arrow diagonal />
          </a>
        </div>
        <div className="contact-bottom">
          <div>
            <p>
              Hiring for AI or backend engineering?
              <br />
              I’d like to hear what you’re building.
            </p>
            <div className="email-row">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                title="Copy email address"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="8"
                    y="8"
                    width="12"
                    height="13"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 8V3H3v12h5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
            <span className="copy-status" role="status">
              {copyState}
            </span>
          </div>
          <div className="contact-socials">
            <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
            <a
              href={profile.resumePdf}
              download="Ahmed_Ayyan_Mukhtar_Resume.pdf"
            >
              Download résumé <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer container">
      <a href="/" className="footer-wordmark">
        ahmed ayyan<span>.</span>
      </a>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} Ahmed Ayyan Mukhtar</span>
        <div>
          <a href="/privacy.html">Privacy</a>
          <a href="/terms.html">Site notes</a>
          <a href="#top" className="back-top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState("All work");
  const allProjects = [
    ...selectedProjects.map((project) => ({ ...project, category: "AI & ML" })),
    ...archiveProjects,
  ];
  const filtered =
    filter === "All work"
      ? allProjects
      : allProjects.filter((project) => project.category === filter);
  return (
    <>
      <section className="container archive-hero">
        <a href="/#work" className="text-link">
          ← Back to selected work
        </a>
        <div className="eyebrow">THE EXTENDED COLLECTION</div>
        <h1>
          From the
          <br />
          <em>workshop.</em>
        </h1>
        <p>
          AI systems, useful tools, and interfaces for real people.
          <br />A broader look at what I build.
        </p>
      </section>
      <section
        className="container archive-section"
        aria-label="Project archive"
      >
        <div className="archive-toolbar">
          <div className="filter-buttons" aria-label="Filter projects">
            {["All work", "AI & ML", "Web applications", "Client work"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                >
                  {item}
                </button>
              ),
            )}
          </div>
          <span className="mono" aria-live="polite">
            {String(filtered.length).padStart(2, "0")} PROJECTS
          </span>
        </div>
        <div className="archive-grid">
          {filtered.map((project, index) => (
            <article className="archive-card" key={project.title}>
              {project.image ? (
                <div className="archive-image">
                  <img
                    src={project.image}
                    alt={`${project.title} interface`}
                    loading="lazy"
                    width="720"
                    height="450"
                  />
                </div>
              ) : (
                <div className="archive-code-art" aria-hidden="true">
                  <span>{project.category}</span>
                  <strong>
                    {project.id === "medisense"
                      ? "+"
                      : project.title.includes("UFC")
                        ? "VS"
                        : "{ }"}
                  </strong>
                  <span>{project.stack.join(" / ")}</span>
                </div>
              )}
              <div className="archive-card-body">
                <div className="project-kicker">
                  <span>{project.category}</span>
                  <span>/{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <Tags items={project.stack} />
                <div className="archive-links">
                  {project.status && (
                    <span className="archived-status">{project.status}</span>
                  )}
                  {project.repository && (
                    <ExternalLink href={project.repository}>
                      Source code
                    </ExternalLink>
                  )}
                  {project.demo && (
                    <ExternalLink href={project.demo}>Visit site</ExternalLink>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Contact />
    </>
  );
}

function InformationPage({ type }) {
  const privacy = type === "privacy";
  return (
    <section className="container information-page">
      <a href="/" className="text-link">
        ← Back to the portfolio
      </a>
      <div className="eyebrow">{privacy ? "PRIVACY" : "SITE NOTES"}</div>
      <h1>
        {privacy ? (
          <>
            A little
            <br />
            <em>transparency.</em>
          </>
        ) : (
          <>
            About
            <br />
            <em>this website.</em>
          </>
        )}
      </h1>
      <div className="information-copy">
        {privacy ? (
          <>
            <h2>A simple portfolio</h2>
            <p>
              This site does not use analytics trackers, advertising cookies,
              account registration, or contact-form storage. Project filters and
              animation controls run in your browser.
            </p>
            <h2>Contacting me</h2>
            <p>
              Email links open your email application. Messages you choose to
              send are handled by your email provider and mine. The copy-email
              button writes only the displayed email address to your clipboard
              when you click it.
            </p>
            <h2>External services</h2>
            <p>
              This site is hosted on GitHub Pages. The hosting provider may
              process standard request logs. Links to GitHub, LinkedIn, and
              project websites take you to services with their own privacy
              practices.
            </p>
            <h2>Questions</h2>
            <p>
              Contact <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>
          </>
        ) : (
          <>
            <h2>Work and attribution</h2>
            <p>
              This is the personal portfolio of Ahmed Ayyan Mukhtar. Project
              names, company names, and third-party marks belong to their
              respective owners. Source-code licenses are available in the
              linked repositories.
            </p>
            <h2>Project context</h2>
            <p>
              Project summaries describe work completed and results reported in
              my résumé. Research and prototype projects are presented in that
              context. External demos may change or become unavailable.
            </p>
            <h2>Built with care</h2>
            <p>
              Built with React and Vite, with GSAP motion, an interactive
              Three.js architecture study, keyboard-accessible controls, and
              support for reduced motion.
            </p>
            <h2>Get in touch</h2>
            <p>
              For questions about my work, email{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default function App() {
  const root = useRef(null);
  const path = window.location.pathname.toLowerCase();
  const page = /\/projects(?:\.html)?$/.test(path)
    ? "projects"
    : /\/privacy(?:\.html)?$/.test(path)
      ? "privacy"
      : /\/terms(?:\.html)?$/.test(path)
        ? "terms"
        : path === "/" || path === "/index.html"
          ? "home"
          : "not-found";
  usePortfolioMotion(root);
  useEffect(() => {
    let cancelled = false;
    // Hash targets do not exist when the static HTML first loads. Resolve them
    // after React mounts and fonts settle, including links from the archive.
    const scrollToInitialHash = async () => {
      await document.fonts.ready;
      if (cancelled || !window.location.hash) return;
      const legacyTargets = { resume: "experience", "ai-projects": "work" };
      const hash = window.location.hash.slice(1);
      document
        .getElementById(legacyTargets[hash] || hash)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    scrollToInitialHash();
    return () => {
      cancelled = true;
    };
  }, [page]);
  useEffect(() => {
    document.title = `${page === "home" ? "AI Engineer & Developer" : page === "projects" ? "Project Archive" : page === "privacy" ? "Privacy" : page === "terms" ? "Site Notes" : "Page Not Found"} — Ahmed Ayyan Mukhtar`;
  }, [page]);
  return (
    <div ref={root} id="top">
      <div className="reading-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header home={page === "home"} />
      <main id="main">
        {page === "home" ? (
          <>
            <Hero />
            <ProofStrip />
            <Work />
            <TechRail />
            <Experience />
            <About />
            <Contact />
          </>
        ) : page === "projects" ? (
          <ProjectsPage />
        ) : page === "privacy" || page === "terms" ? (
          <InformationPage type={page} />
        ) : (
          <section className="container information-page">
            <span className="eyebrow">404 / NOT FOUND</span>
            <h1>
              A wrong turn.
              <br />
              <em>An easy fix.</em>
            </h1>
            <a className="button button-primary" href="/">
              Back to the portfolio <Arrow />
            </a>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
