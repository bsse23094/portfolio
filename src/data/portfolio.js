import logo from '../assets/images/brand/BATLOGO.png';
import profileImage from '../assets/images/profile/ahmed_batman.jpg';
import resumePdf from '../assets/documents/cv_ahmed.pdf';
import codeGenImage from '../assets/images/projects/Codegen.png';
import studyBuddyImage from '../assets/images/projects/studybuddy.png';
import cinetexImage from '../assets/images/projects/cinetex.png';
import issueBeaconImage from '../assets/images/projects/issue-beacon.png';
import idealImage from '../assets/images/projects/ideal.png';
import orionexImage from '../assets/images/projects/orionex.png';
import humanRightsImage from '../assets/images/projects/hrs.png';
import restaurantImage from '../assets/images/projects/skime.jpg';

export const assets = {
  logo,
  profileImage,
  resumePdf,
};

export const navigation = [
  { href: '#about', icon: 'fas fa-user', label: 'About' },
  { href: '#resume', icon: 'fas fa-briefcase', label: 'Resume' },
  { href: '#ai-projects', icon: 'fas fa-folder', label: 'Projects' },
  { href: '#contact', icon: 'fas fa-envelope', label: 'Contact' },
];

export const socialLinks = [
  { href: 'https://github.com/bsse23094', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/ahmed-ayyan-8b25b72b0/', icon: 'fab fa-linkedin', label: 'LinkedIn' },
];

export const technologies = [
  'fab fa-html5',
  'fab fa-css3-alt',
  'fab fa-js',
  'fab fa-react',
  'fab fa-angular',
  'fab fa-bootstrap',
  'fab fa-node-js',
  'fab fa-php',
  'fas fa-database',
  'fab fa-wordpress',
  'fab fa-shopify',
  'fab fa-google',
  'fab fa-git-alt',
  'fab fa-github',
  'fab fa-figma',
  'fab fa-java',
  'fab fa-python',
  'fab fa-npm',
  'fas fa-brain',
  'fas fa-robot',
  'fas fa-network-wired',
  'fas fa-microchip',
  'fas fa-eye',
  'fas fa-diagram-project',
];

export const resume = {
  contacts: [
    { icon: 'fas fa-envelope', text: 'ahmedayyan555@gmail.com', href: 'mailto:ahmedayyan555@gmail.com' },
    { icon: 'fas fa-phone', text: '+92-300-9586306', href: 'tel:+923009586306' },
    { icon: 'fas fa-map-marker-alt', text: 'Lahore, Pakistan' },
  ],
  links: [
    { icon: 'fab fa-github', text: 'github.com/bsse23094', href: 'https://github.com/bsse23094' },
    { icon: 'fab fa-linkedin', text: 'linkedin.com/in/ahmed-ayyan', href: 'https://www.linkedin.com/in/ahmed-ayyan-8b25b72b0/' },
    { icon: 'fas fa-globe', text: 'ahmedayyan.codes', href: 'https://ahmedayyan.codes' },
  ],
  skills: [
    { name: 'Python & AI Systems', level: 95 },
    { name: 'TypeScript / Angular / React', level: 95 },
    { name: 'RAG / LangChain / LangGraph', level: 92 },
    { name: 'FastAPI / Node.js / SQL', level: 90 },
    { name: 'ML / XGBoost / scikit-learn', level: 86 },
    { name: 'Docker / AWS / GitHub Actions', level: 88 },
  ],
  softSkills: ['Systems Thinking', 'AI Architecture', 'Technical Leadership', 'Problem Solving', 'Team Collaboration'],
  intro: 'Software Engineering student focused on practical AI systems, robust backend services, and high-quality front-end delivery. I build grounded RAG workflows, developer tools, and production interfaces with an emphasis on reliability, observability, and clear user experience.',
  jobs: [
    {
      title: 'Front-End Developer Intern',
      company: 'CyberSoft Solutions - Lahore - Feb to Jul 2025',
      achievements: [
        'Shipped production UI for the UBL banking app with Angular 17.',
        'Built a reusable component library that cut per-feature development time by about 25%.',
        'Applied lazy loading and OnPush change detection to meet banking-grade performance expectations.',
      ],
    },
    {
      title: 'AI Engineer Intern',
      company: 'Systems Limited - 2026 to Current',
      achievements: [
        'Current AI engineering internship at Systems Limited.',
      ],
    },
  ],
  education: {
    title: 'Bachelor of Science in Software Engineering',
    school: 'Information Technology University, Lahore - 2023 to 2027',
    description: 'Coursework and project work span AI systems, software architecture, data-driven applications, and production web engineering.',
  },
  projects: [
    {
      title: 'MediSense AI - Hybrid RAG Clinical Assistant',
      meta: 'Python, LangChain, ChromaDB',
      description: 'Built hybrid RAG over WHO and NIH guidance plus OCR-scanned reports, with isolated user vector spaces, structured Pydantic outputs, and dual retrieval for safety-conscious answers.',
    },
    {
      title: 'Reply Mirror - Multi-Agent Fraud Detection',
      meta: 'LangGraph, Langfuse, Python',
      description: 'Designed a credit-aware seven-agent graph that routes LLM calls only to high-risk users, combining deterministic signals, phishing and vishing analysis, guard rails, and adaptive thresholding.',
    },
    {
      title: 'A-EYE J.A.R.V.I.S. - Local Multimodal Assistant',
      meta: 'Ollama, YOLOv8, FastAPI, Angular',
      description: 'Created a local multimodal assistant with capability-aware model routing, JSON-schema tool calling, local voice and vision support, and no cloud dependency.',
    },
    {
      title: 'SentinelAI - AI Code Review VS Code Extension',
      meta: 'VS Code API, Groq, Next.js',
      description: 'Developed a VS Code extension and three-agent analysis backend for real-time security, complexity, and code-smell diagnostics, Quick Fixes, and near-zero-ms cached analysis.',
    },
  ],
  achievements: [
    '5th / 200+ teams - HEC Generative AI National Hackathon 2025 (MediSense AI)',
    '20+ public projects on GitHub',
    'Delivered production-hosted client sites for Orionex, Ideal Janitorial Services, and Human Rights Organisation',
  ],
};

export const featuredProjects = [
  {
    image: codeGenImage,
    alt: 'CodeGen visual landing page builder',
    title: 'CodeGen - Visual Landing Page Builder',
    description: 'A powerful visual landing page builder with drag-and-drop editing, customizable themes, 15+ components, code export, 50-level undo/redo, auto-save, and real-time preview.',
    stack: [
      ['fab fa-angular', 'Angular 19'],
      ['fas fa-code', 'TypeScript 5.7'],
      ['fas fa-palette', 'Drag & Drop'],
      ['fab fa-react', 'Code Export'],
    ],
    highlights: ['Drag & Drop Builder', '15+ Components', 'HTML/React Export'],
    demo: 'https://bsse23094.github.io/codeGen/',
  },
  {
    image: studyBuddyImage,
    alt: 'AI-powered learning platform',
    title: 'AI-Powered Learning Platform',
    description: 'An intelligent learning platform leveraging AI to create personalised study experiences with adaptive learning paths, interactive quizzes, and real-time progress analytics.',
    stack: [
      ['fab fa-angular', 'Angular'],
      ['fas fa-route', 'OpenRouter'],
      ['fas fa-brain', 'AI/ML'],
      ['fab fa-cloudflare', 'Cloudflare Workers'],
    ],
    highlights: ['Personalized Study Plans', 'Interactive Assessments', 'Real-time Analytics'],
    demo: 'https://bsse23094.github.io/studyBuddy/home',
  },
  {
    image: cinetexImage,
    alt: 'Cinetex movie streaming platform',
    title: 'Cinetex - AI-Powered Movie Streaming Platform',
    description: 'A full-featured movie platform for browsing, watchlists, ratings, favourites, and advanced search and filtering.',
    stack: [
      ['fab fa-angular', 'Angular'],
      ['fas fa-database', 'TMDB API'],
      ['fab fa-html5', 'HTML5'],
      ['fab fa-css3-alt', 'CSS3'],
    ],
    highlights: ['Extensive Movie Database', 'Custom Watchlists', 'Rating System'],
    demo: 'https://cinetex.app/',
  },
  {
    image: orionexImage,
    alt: 'Orionex AI-powered digital solutions site',
    title: 'Orionex - AI-Powered Digital Solutions',
    description: 'An interactive React portfolio with a GPU-accelerated galaxy background, 3D navigation, and advanced GSAP and Motion animations.',
    stack: [
      ['fab fa-react', 'React 19'],
      ['fas fa-bolt', 'Vite'],
      ['fas fa-cube', 'WebGL/OGL'],
      ['fas fa-magic', 'GSAP'],
    ],
    highlights: ['Real-time WebGL Galaxy', '3D GSAP Animations', 'Single Page Application'],
    demo: 'https://orionex.site/',
  },
  {
    image: issueBeaconImage,
    alt: 'Issue Beacon GitHub issue explorer',
    title: 'Issue Beacon - GitHub Explorer',
    description: 'A web application for exploring, filtering, and managing GitHub issues across repositories with real-time updates and analytics.',
    stack: [
      ['fab fa-angular', 'Angular'],
      ['fab fa-github', 'GitHub API'],
      ['fas fa-code', 'TypeScript'],
      ['fas fa-wind', 'Tailwind'],
    ],
    highlights: ['Advanced Filtering', 'Real-time Updates', 'Issue Analytics'],
    demo: 'https://bsse23094.github.io/issue-beacon/',
  },
];

export const aiProjects = [
  {
    id: 'AI // 01',
    name: 'A-EYE · JARVIS',
    category: 'Local-first AI operating system',
    description: 'A privacy-first desktop assistant that talks, types, reads and edits files, runs commands, monitors system health, remembers context, schedules tasks, and routes work to locally available models.',
    stack: ['Python', 'FastAPI + SSE', 'SQLite', 'Ollama', 'Whisper'],
    capabilities: ['Local model discovery and role routing', 'File, shell, system, web, memory, and task tools', 'Streaming web workspace with live diffs'],
    repository: 'https://github.com/bsse23094/A-EYE',
  },
  {
    id: 'AI // 02',
    name: 'MediSense AI',
    category: 'Medical report intelligence companion',
    description: 'A safety-conscious medical companion that turns report PDFs and images into grounded patient and doctor summaries, medicine intelligence, follow-up chat, and multilingual voice assistance.',
    stack: ['Angular 19', 'Flask', 'RAG', 'OCR', 'Groq + Whisper'],
    capabilities: ['OCR with fallback extraction for report uploads', 'Pakistan-first medicine alternatives and safety triage', 'Longitudinal report memory with source-aware follow-ups'],
    repository: 'https://github.com/BSSE23102/MediSense',
  },
  {
    id: 'AI // 03',
    name: 'SentinelAI',
    category: 'AI code analysis for VS Code',
    description: 'A real-time VS Code extension and AI analysis backend that catches security issues, complexity problems, and code smells inside the editor before they reach CI.',
    stack: ['TypeScript', 'VS Code API', 'Next.js', 'Groq', 'OpenRouter'],
    capabilities: ['Inline diagnostics for security, complexity, and smell agents', 'AI-generated quick fixes and workspace scanning', 'Debounced analysis with SHA-256 caching and model fallback'],
    repository: 'https://github.com/bsse23094/SentinelAI',
  },
  {
    id: 'AI // 04',
    name: 'Reply Mirror Fraud Detection',
    category: 'Credit-aware multi-agent fraud pipeline',
    description: 'A multi-modal fraud detection pipeline that combines deterministic behavioral and geo signals with selectively invoked LLM analysis to flag suspicious users cost-effectively.',
    stack: ['Python', 'SQLite', 'OpenRouter', 'Langfuse', 'Multi-agent AI'],
    capabilities: ['Behavior and impossible-travel anomaly detection', 'SMS, email, and optional vishing risk assessment', 'Adaptive score fusion and thresholding for fraud IDs'],
    repository: 'https://github.com/bsse23094/reply-mirror-fraud-detection',
  },
];

export const projects = [
  {
    image: studyBuddyImage,
    alt: 'AI Study Buddy',
    title: 'StudyBuddy: AI-Powered Learning Platform',
    description: 'An intelligent learning platform that leverages artificial intelligence to create personalized study experiences. The platform adapts to individual learning styles, tracks progress in real time, and provides interactive assessments to maximize engagement and knowledge retention.',
    technologies: ['Angular', 'Cloudflare Workers', 'AI/ML', 'API Integration', 'TypeScript', 'GitHub Pages'],
    features: ['Personalized study plans based on learning patterns and performance', 'Interactive quizzes with instant feedback and explanations', 'Real-time progress tracking with detailed analytics dashboard', 'AI-powered content recommendations tailored to individual needs', 'Gamification elements to boost engagement and motivation', 'Collaborative study rooms for peer-to-peer learning'],
    demo: 'https://bsse23094.github.io/studyBuddy/home',
    code: 'https://github.com/bsse23094/studyBuddy',
  },
  {
    image: cinetexImage,
    alt: 'Cinetex movie platform',
    title: 'Cinetex - Movie Streaming Platform',
    description: 'A full-featured movie streaming platform where users can browse thousands of movies, create watchlists, rate films, and manage favourites. It has a sleek responsive design with advanced search and filtering.',
    technologies: ['Angular', 'CSS3', 'HTML5', 'TMDB API', 'Local Storage', 'Responsive Design'],
    features: ['Extensive movie database with detailed information and trailers', 'Advanced search with genre, year, and rating filters', 'Custom movie lists and watchlists', 'Personal ratings and reviews', 'Favourites for quick access', 'Responsive design for all devices'],
    demo: 'https://bsse23094.github.io/cinetex_/search',
    code: 'https://github.com/bsse23094/cinetex_',
  },
  {
    image: issueBeaconImage,
    alt: 'Issue Beacon',
    title: 'Issue Beacon - GitHub Issue Explorer',
    description: 'A powerful application that streamlines GitHub issue management across multiple repositories with advanced search, real-time updates, and comprehensive issue analytics.',
    technologies: ['Angular', 'GitHub API', 'REST API', 'TypeScript', 'Tailwind CSS', 'OAuth'],
    features: ['Seamless GitHub authentication and repository access', 'Advanced filtering by status, labels, assignees, and milestones', 'Real-time issue updates and notifications', 'Interactive statistics and trends dashboard', 'Quick actions for commenting, labeling, and closing issues', 'Report and analytics export', 'Dark mode support'],
    demo: 'https://bsse23094.github.io/issue-beacon/',
    code: 'https://github.com/bsse23094/issue-beacon',
  },
  {
    image: idealImage,
    alt: 'Ideal Janitorial Services',
    title: 'Ideal Janitorial Services Website',
    description: 'A professional, conversion-focused website for a janitorial service company with clear navigation, strategic calls to action, performance-minded implementation, and SEO considerations.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'SEO Optimization'],
    features: ['Professional landing page with clear value propositions', 'Service showcase with detailed descriptions and pricing', 'Email-integrated contact forms', 'Testimonials for social proof', 'Mobile-responsive design', 'Performance optimisation', 'SEO-optimised content'],
    demo: 'https://idealjanitorialservices.org/',
  },
  {
    image: orionexImage,
    alt: 'Orionex Agency',
    title: 'Orionex Agency Portfolio',
    description: 'A sophisticated portfolio for a creative digital agency, showcasing work, services, and team members through a modern visual system and interactive effects.',
    technologies: ['React', 'Vite', 'JavaScript', 'GSAP Animations', 'Parallax Effects'],
    features: ['Visual design with smooth animations', 'Portfolio gallery with case studies', 'Service offerings with detailed breakdowns', 'Team profiles', 'Interactive elements and micro-animations', 'Business contact integration'],
    demo: 'https://bsse23094.github.io/orionex/',
    code: 'https://github.com/bsse23094/orionex',
  },
  {
    image: humanRightsImage,
    alt: 'Human Rights Organization',
    title: 'Human Rights Organization Website',
    description: 'A website designed to amplify a human-rights organization’s mission and facilitate community engagement, including content management and news publishing capabilities.',
    technologies: ['HTML5', 'Tailwind CSS', 'MySQL', 'JavaScript', 'Custom Plugins'],
    features: ['Content management for easy updates', 'Event calendar with registration', 'Secure donation payment gateway integration', 'Categorised news and blog', 'Volunteer sign-up and management', 'Multi-language support', 'Accessibility features'],
    demo: 'https://humanrightsitu.site/',
  },
  {
    image: restaurantImage,
    alt: 'Restaurant Management System',
    title: 'Restaurant Management System',
    description: 'A restaurant management system that streamlines table reservations, menu management, order processing, and customer relationship management.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'LocalStorage'],
    features: ['Online reservations with real-time availability', 'Interactive menu with filters', 'Order management and tracking', 'Customer feedback and ratings', 'Responsive tablet and mobile experience', 'Dishes and ambience gallery', 'Contact and location integration'],
    demo: 'https://bsse23094.github.io/RMS/',
    code: 'https://github.com/bsse23094/RMS',
  },
];

export const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How personal information is handled on this portfolio website',
    contentClass: 'policy-content',
    sections: [
      { heading: 'Introduction', paragraphs: ['Welcome to the Dark Knight Portfolio. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website. Your privacy is important to us, and we are committed to safeguarding your personal data.'] },
      { heading: 'Information We Collect', subheading: 'Personal Information', paragraphs: ['When you contact us through our website, we may collect the following personal information:'], list: ['Name', 'Email address', 'Phone number (if provided)', 'Message content', 'Any other information you choose to provide'] },
      { subheading: 'Automated Information', paragraphs: ['We automatically collect certain information about your device when you visit our website, including:'], list: ['IP address', 'Browser type and version', 'Operating system', 'Referring website', 'Pages viewed and time spent on pages', 'Date and time of visit'] },
      { heading: 'How We Use Your Information', paragraphs: ['We use the information we collect for the following purposes:'], list: ['Communication: To respond to inquiries and discuss potential opportunities', 'Website Improvement: To analyze usage and improve content and user experience', 'Security: To protect against fraudulent or unauthorized activity', 'Legal Compliance: To comply with applicable laws and regulations'] },
      { heading: 'Data Storage and Security', paragraphs: ['We implement appropriate technical and organizational measures to protect personal information against unauthorized access, alteration, disclosure, or destruction. No method of transmission over the internet is 100% secure.', 'Your data is stored securely and is only accessible by authorised personnel who need it to perform their duties.'] },
      { heading: 'Cookies and Tracking Technologies', paragraphs: ['Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. Disabling cookies may affect some features.'] },
      { heading: 'Third-Party Services', paragraphs: ['We may use third-party services for analytics, hosting, or other purposes. They may access information only to perform specific tasks on our behalf and are obligated not to disclose or use it for other purposes.'], list: ['Google Analytics for website analytics', 'Web hosting providers', 'Email service providers'] },
      { heading: 'Your Rights', paragraphs: ['You have the following rights regarding your personal information:'], list: ['Access: Request the personal data we hold about you', 'Correction: Request correction of inaccurate or incomplete data', 'Deletion: Request deletion of personal data', 'Objection: Object to processing of personal data', 'Portability: Request transfer of your data to another provider'] },
      { heading: 'Children’s Privacy', paragraphs: ['This website is not intended for children under 13. We do not knowingly collect their personal information. If you believe we have collected information from a child, please contact us immediately.'] },
      { heading: 'Changes to This Privacy Policy', paragraphs: ['We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.'] },
      { heading: 'Contact Information', paragraphs: ['If you have questions about this Privacy Policy or our data practices, please contact us through the website contact options or at the email address in the footer.'] },
      { heading: 'Consent', paragraphs: ['By using this website, you consent to this Privacy Policy and agree to its terms.'] },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    subtitle: 'The terms governing the use of this portfolio website',
    contentClass: 'terms-content',
    sections: [
      { heading: 'Agreement to Terms', paragraphs: ['Welcome to the Dark Knight Portfolio. By accessing and using this website, you accept and agree to be bound by these Terms & Conditions. If you do not agree, please do not use the website.'] },
      { heading: 'Use License', paragraphs: ['Permission is granted to temporarily view and navigate the materials on this website for personal, non-commercial, transitory viewing only. This is a license, not a transfer of title. Under this license, you may not:'], list: ['Modify or copy the materials', 'Use the materials for commercial purposes or public display', 'Attempt to decompile or reverse engineer software on the website', 'Remove copyright or proprietary notices', 'Transfer the materials or mirror them on another server'] },
      { heading: 'Intellectual Property', paragraphs: ['All content on this website, including text, graphics, logos, images, code, and software, is the property of the Dark Knight Portfolio and is protected by international copyright laws.'] },
      { subheading: 'Portfolio Projects', paragraphs: ['Projects and work samples displayed on this website are the intellectual property of their respective owners. They are shown for demonstration and may not be reproduced without permission.'] },
      { heading: 'Disclaimer', paragraphs: ["The materials on this website are provided on an 'as is' basis. We make no warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose, or non-infringement."] },
      { heading: 'Limitations of Liability', paragraphs: ['In no event shall Dark Knight Portfolio or its suppliers be liable for damages arising out of the use of, or inability to use, the materials on this website, even if advised of the possibility of such damage.'] },
      { heading: 'Accuracy of Materials', paragraphs: ['The materials on this website could include technical, typographical, or photographic errors. We do not warrant that materials are accurate, complete, or current, and may make changes at any time without notice.'] },
      { heading: 'Links to Third-Party Websites', paragraphs: ['This website may contain links to third-party websites or services not owned or controlled by Dark Knight Portfolio. We are not responsible for their content, privacy policies, practices, or any loss connected with using them.'] },
      { heading: 'User Conduct', paragraphs: ['You agree not to use the website to:'], list: ['Upload or transmit unlawful, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable content', 'Impersonate another person or entity', 'Interfere with or disrupt the website, servers, or networks', 'Violate applicable local, state, national, or international law', 'Restrict or inhibit anyone’s use or enjoyment of the website'] },
      { heading: 'Contact Form Submissions', paragraphs: ['By submitting information through our contact form, you agree that:'], list: ['The information provided is accurate and truthful', 'You grant permission to be contacted regarding your inquiry', 'Your submission does not violate third-party rights', 'We are not obligated to respond to every submission'] },
      { heading: 'Privacy', paragraphs: ['Your use of this website is also governed by the Privacy Policy. Please review it to understand our practices.'] },
      { heading: 'Modifications to Terms', paragraphs: ['We reserve the right to revise these Terms & Conditions at any time without notice. By using the website, you agree to be bound by the then-current version.'] },
      { heading: 'Governing Law', paragraphs: ['These Terms & Conditions are governed by and construed in accordance with the laws of the applicable jurisdiction.'] },
      { heading: 'Severability', paragraphs: ['If any provision is found invalid or unenforceable, the remaining provisions will continue in full force and effect.'] },
      { heading: 'Entire Agreement', paragraphs: ['These Terms & Conditions constitute the entire agreement regarding the use of this website and supersede all prior written or oral agreements.'] },
      { heading: 'Termination', paragraphs: ['We may terminate or suspend your access immediately, without prior notice or liability, for any reason, including a breach of these terms.'] },
      { heading: 'Contact Information', paragraphs: ['If you have questions about these Terms & Conditions, please contact us through the website contact options or the email address in the footer.'] },
      { heading: 'Acknowledgment', paragraphs: ['By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.'] },
    ],
  },
};
