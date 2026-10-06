export interface Project {
  id: string;
  slug: string;
  title: string;
  badge?: string;
  tagline: string;
  summary: string;
  period: string;
  role: string;
  liveUrl?: string;
  repoUrl: string;
  stars?: number;
  featured: boolean;
  tags: string[];
  problem: string;
  overview: string;
  architectureDetails: string[];
  keyFeatures: { title: string; desc: string }[];
  challengesAndLearnings: { title: string; desc: string }[];
  outcomes: string[];
  futureMilestones?: string[];
  terminalMockup: {
    command: string;
    outputLines: string[];
  };
}

export interface RecognitionItem {
  year: string;
  title: string;
  category: 'Hackathon Win' | 'Hackathon Finalist' | 'Leadership' | 'Academic';
  description: string;
  event: string;
  statusBadge: string;
}

export const PERSONAL_INFO = {
  name: 'Airil Asyraff Zulkifli',
  handle: 'airilakio29',
  title: 'Software Developer | Cloud Enthusiast',
  status: 'OPEN_TO_INTERNSHIPS',
  location: 'Ampang, Selangor, Malaysia',
  education: {
    institution: 'Universiti Teknologi PETRONAS (UTP)',
    major: 'Information Technology',
    year: '2nd Year Undergraduate',
    expectedGraduation: '2029',
    honors: "Dean's List (2 Times - 2026)",
  },
  goal: 'Seeking an internship with a focus on Full Stack Engineering and Cloud Systems.',
  email: 'airil_25009515@utp.edu.my',
  social: {
    github: 'https://github.com/airilakio29',
    linkedin: 'https://www.linkedin.com/in/airil-asyraff-zulkifli-50b810328',
  },
  currentlyLearning: 'AWS Cloud Architecture and Serverless application patterns',
  bio: `Second-year Information Technology student at Universiti Teknologi PETRONAS with a proven track record in hackathons and full-stack software development. Passionate about architecting scalable web applications, real-time data platforms, and cloud infrastructure. Recognized for building user-centric solutions under high-pressure competitive environments.`
};

export const SKILL_CATEGORIES = [
  {
    category: 'Languages & Core',
    icon: 'code',
    skills: ['C#', 'JavaScript (ES6+)', 'TypeScript', 'Python', 'HTML5', 'CSS3 / Modern CSS', 'SQL (MySQL)', 'PHP'],
  },
  {
    category: 'Cloud & Backend Systems',
    icon: 'cloud',
    skills: ['Amazon Web Services (AWS)', 'Google Firebase (Firestore & Auth)', 'FastAPI (Python)', 'RESTful APIs', 'Database Architecture'],
  },
  {
    category: 'Modern Frontend & Libraries',
    icon: 'layout',
    skills: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Chart & Canvas Visualizations'],
  },
  {
    category: 'AI-Assisted Engineering & Tools',
    icon: 'cpu',
    skills: ['Antigravity AI', 'Git & GitHub', 'Prompt Engineering', 'Gemini AI API', 'Vercel Deployment'],
  },
];

export const RECOGNITIONS: RecognitionItem[] = [
  {
    year: '2026',
    title: 'Terra Guard Finalist',
    category: 'Hackathon Finalist',
    event: 'MyAI Future Hackathon by Google Developer Group @ UTM',
    description: 'Selected as top finalist with Terra Guard, an AI-powered tactical natural disaster situational utility integrating multimodal AI models and real-time hazard analytics.',
    statusBadge: 'FINALIST [TOP TEAMS]',
  },
  {
    year: '2026',
    title: '1 Time Hackathon Winner',
    category: 'Hackathon Win',
    event: 'KrackedDev Build Day Mini Hackathon',
    description: 'Secured 1st place champion title with KampusKash, a student-focused financial management tool conceived, prototyped, and pitched during the sprint. Continued development independently into KiroKash.',
    statusBadge: 'CHAMPION [1ST PLACE]',
  },
  {
    year: '2026',
    title: 'KIRO AI Hackathon Finalist',
    category: 'Hackathon Finalist',
    event: 'KIRO AI Hackathon @ PuO',
    description: 'Finished in top finalist brackets at the KIRO AI Hackathon hosted by Politeknik Ungku Omar (PuO) with an AI-driven student financial intelligence prototype.',
    statusBadge: 'FINALIST [TOP TEAMS]',
  },
  {
    year: '2025 - 2026',
    title: 'Hackathon Project Director (2x)',
    category: 'Leadership',
    event: 'Student Technology Initiatives & Competitions',
    description: 'Served twice as Project Director, coordinating interdisciplinary developer and designer squads, driving development sprint milestones, and presenting final technical pitches.',
    statusBadge: 'PROJECT DIRECTOR',
  },
  {
    year: '2026',
    title: "Dean's List Award (2x)",
    category: 'Academic',
    event: 'Universiti Teknologi PETRONAS',
    description: "Awarded Dean's List academic distinction across 2 semesters for sustained academic excellence in Information Technology coursework.",
    statusBadge: 'DEANS LIST',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'kirokash',
    slug: 'kirokash',
    title: 'KiroKash',
    badge: 'FLAGSHIP PROJECT',
    tagline: 'Student Financial Command Center & Multi-Account Tracker',
    summary: 'A modern, student-tailored personal finance platform designed to track multi-account balances, monthly category budgets, savings milestones, and expenses in Ringgit Malaysia (RM).',
    period: '2026',
    role: 'Lead Developer (Conceived at KrackedDev Build Day, evolved solo)',
    liveUrl: 'https://kampuskash.vercel.app',
    repoUrl: 'https://github.com/airilakio29/KiroKash',
    featured: true,
    tags: ['React 19', 'Vite 8', 'Firebase Firestore', 'Firebase Auth', 'jsPDF', 'Canvas API'],
    problem: 'College and university students juggle fragmented allowances, PTPTN loan disbursements, part-time wages, hostel fees, and daily food expenses across multiple bank accounts and e-wallets (Touch \'n Go, GrabPay, Boost). Existing commercial budgeting apps are over-engineered, cluttered with subscription paywalls, or fail to cater to Malaysian student realities.',
    overview: 'KiroKash began its life as KampusKash, which captured 1st Place at the KrackedDev Build Day mini hackathon. Seeing its immediate potential to genuinely assist fellow university peers, Airil continued development as a solo developer, rebranding and re-engineering the application into KiroKash with a multi-account foundation, responsive budget thresholds, and 9 curated themes.',
    architectureDetails: [
      'Multi-Account Balance Engine: Synchronizes individual account balances (Savings, Current, TnG, GrabPay, Cash) with real-time recalculation without double counting.',
      'Safe Legacy Compatibility: Backwards-compatible schema mapper handles legacy unassigned transactions seamlessly while preserving historical integrity.',
      'Cloud Synchronization: Real-time user document isolation via Google Firebase Firestore and Firebase Authentication (Email/Password & Google OAuth).',
      'Zero Technical Leakage: Regex safeguards ensure Firebase UIDs, database keys, and hashes are never exposed in user-facing UI elements.',
      'Planned AWS Architecture: Backend migration currently planned to transition data layer to AWS Serverless (API Gateway, AWS Lambda, Amazon DynamoDB) for decoupled enterprise scalability.'
    ],
    keyFeatures: [
      {
        title: 'Multi-Account Foundation',
        desc: 'Supports Bank Accounts, E-Wallets (Touch \'n Go, GrabPay, Boost), and Cash with automated aggregate balance rollups.'
      },
      {
        title: 'Category Budgeting & Visual Alerts',
        desc: 'Set spending caps with instant dynamic status thresholds: On Track (<80%), Warning (80%-100%), and Over-Budget (>100%) in RM.'
      },
      {
        title: 'Savings Milestones',
        desc: 'Target-based milestone progress bars for semester tuition, emergency reserves, or new tech hardware.'
      },
      {
        title: 'Report Generation & Statement Exports',
        desc: 'Client-side branded PDF statement generation via jsPDF and CSV export for spreadsheet analytics.'
      },
      {
        title: '16-Step Non-Blocking Onboarding',
        desc: 'Pulsing spotlight tour guiding first-time students across Dashboard, Accounts, and Budgets with Firestore persistence.'
      },
      {
        title: '9 Curated Aesthetic Themes',
        desc: 'From Cyberpunk to Velvet Dusk and Clean Light, driven by dynamic CSS variables and an HTML5 crystal particle canvas.'
      }
    ],
    challengesAndLearnings: [
      {
        title: 'Maintaining Backward Compatibility',
        desc: 'Migrating from single-wallet hackathon data to a multi-account ledger required building fallback mapping for legacy transactions without breaking user records.'
      },
      {
        title: 'Real-Time Performance with Canvas Backgrounds',
        desc: 'Optimized particle animation loops on HTML5 Canvas using requestAnimationFrame and offscreen throttling to prevent CPU spikes on lower-end student laptops.'
      }
    ],
    outcomes: [
      '1st Place Winner at KrackedDev Build Day mini hackathon (origin version KampusKash).',
      'Deployed live at kampuskash.vercel.app with zero cold-start latency.',
      'Successfully stress-tested with 34+ automated unit and integration tests.'
    ],
    futureMilestones: [
      'Planned backend migration to AWS Lambda and DynamoDB for serverless event processing.',
      'Receipt optical character recognition (OCR) for automated expense logging.'
    ],
    terminalMockup: {
      command: 'kirokash --status --sync',
      outputLines: [
        'INIT: Connecting to KiroKash Cloud Engine...',
        'AUTH: Verified session [UTP Student Wallet]',
        'ACCOUNTS: [TnG E-Wallet: OK] [Bank Islam: OK] [Cash: OK]',
        'BUDGET: Food & Dining at 64% (On Track)',
        'STATUS: 1st Place Hackathon Project | Solo Evolution Active'
      ]
    }
  },
  {
    id: 'terra-guard',
    slug: 'terra-guard',
    title: 'Terra Guard',
    badge: 'HACKATHON FINALIST',
    tagline: 'Real-Time Tactical Disaster Monitoring & AI Situational Utility',
    summary: 'A mission-critical disaster monitoring command center built for the Malaysian context, integrating Gemini 1.5 Flash for proactive tactical situation reports (SITREPs).',
    period: '2026',
    role: 'Full Stack & AI Integration Developer',
    liveUrl: 'https://natures-event-zeta.vercel.app',
    repoUrl: 'https://github.com/airilakio29/Terra-Guard',
    featured: true,
    tags: ['FastAPI (Python)', 'Gemini 1.5 Flash', 'Vertex AI', 'React', 'Tailwind CSS', 'Leaflet'],
    problem: 'During monsoon floods and extreme weather in Malaysia, public data is scattered across fragmented bulletins. Responders and at-risk citizens lack a single pane of glass for real-time hazard triangulation and clear, accessible tactical advice.',
    overview: 'Developed as a high-stakes hackathon project that reached the competition finals, Terra Guard elevates traditional passive dashboards into a proactive intelligence officer. It ingests live disaster feeds and generates synthesized tactical briefings (SITREPs) via Google Gemini 1.5 Flash.',
    architectureDetails: [
      'FastAPI Backend: High-throughput asynchronous Python microservice orchestrating data ingestion and AI prompt pipelining.',
      'Automated SITREP Synthesis: Gemini 1.5 Flash processes live weather radar, rainfall metrics, and active hotspots into high-density tactical summaries.',
      'Multi-Feed Triangulation: Unified monitoring pipeline ingesting Bernama news, GDACS international alerts, and NASA FIRMS thermal anomaly data.',
      'Bilingual Arc: Complete two-way localization in Bahasa Melayu (BM) and English (EN) tailored for Malaysian emergency responders (NADMA, BOMBA, PDRM).',
      'VAI Vision Triage: Vertex AI multimodal endpoint assessing user-submitted flood and hazard imagery with automated evacuation guidance.'
    ],
    keyFeatures: [
      {
        title: 'Strategic SITREP Engine',
        desc: 'AI-generated tactical Situation Reports identifying priority disaster zones and immediate response action items.'
      },
      {
        title: 'Interactive Hazard Map Grid',
        desc: 'Live overlay of active incidents, high-temperature hotspots, and flood alerts on an interactive spatial canvas.'
      },
      {
        title: 'Full BM/BI Localization',
        desc: 'Ensures equitable accessibility for local first responders and grassroots citizens across Malaysia.'
      },
      {
        title: 'VAI Strategy Agent & Vision Triage',
        desc: 'Interactive emergency assistant providing official NADMA survival tactics and image-based damage classification.'
      },
      {
        title: 'Fixed-Viewport Command Center UX',
        desc: 'Glassmorphism 2.0 interface engineered with internal scrolling panels to eliminate viewport drift during emergency operations.'
      }
    ],
    challengesAndLearnings: [
      {
        title: 'Prompt Grounding for Emergency Reliability',
        desc: 'Engineered strict system prompts and temperature tuning on Gemini 1.5 Flash to ensure crisis recommendations adhere strictly to official civil defense guidelines without hallucinations.'
      },
      {
        title: 'Multi-Source Feed Normalization',
        desc: 'Standardized disparate coordinate formats and timestamps from Bernama, GDACS, and NASA FIRMS into a single GeoJSON stream.'
      }
    ],
    outcomes: [
      'Hackathon Finalist project recognized by evaluation panel for high social impact.',
      'Live demonstration deployed at natures-event-zeta.vercel.app.'
    ],
    futureMilestones: [
      'Push notification alerts based on device geolocation during flood warnings.',
      'Offline-first PWA caching for remote areas with degraded mobile connectivity.'
    ],
    terminalMockup: {
      command: 'terraguard --analyze-feed --region MY-SEL',
      outputLines: [
        'INGEST: NASA FIRMS + GDACS + Bernama RSS (Online)',
        'AI_ENGINE: Gemini 1.5 Flash generating SITREP...',
        'ALERT LEVEL: Moderate | River basins in Klang Valley at 78% capacity',
        'LOCALIZATION: BM/EN language layers active',
        'STATUS: Hackathon Finalist Utility Operational'
      ]
    }
  },
  {
    id: 'hotelier',
    slug: 'hotelier',
    title: 'Hotelier',
    badge: 'SYSTEM SUITE',
    tagline: 'Comprehensive Hotel Management, Room Inventory & Booking Suite',
    summary: 'A robust hotel operations and guest reservation platform engineered with PHP and MySQL, supporting end-to-end room bookings, guest billing, and live administrative management.',
    period: '2026',
    role: 'Full Stack Developer',
    repoUrl: 'https://github.com/airilakio29/Hotelier',
    featured: true,
    tags: ['PHP', 'MySQL', 'Apache', 'JavaScript', 'HTML5 / CSS3', 'Database Schema'],
    problem: 'Independent boutique hotels need an integrated platform that balances modern guest self-service booking with fine-grained administrative controls over room inventory, extra facilities, and instant invoice calculations.',
    overview: 'Hotelier was architected as an end-to-end hotel management solution. Designed with a relational MySQL schema, it provides a customer-facing booking engine alongside back-office administrative tooling for facility pricing and live reservation logs.',
    architectureDetails: [
      'Relational Database Design: Structured MySQL schema comprising hotelier.sql, hotelier_rooms.sql, hotelier_facilities.sql, and seed fixtures.',
      'Modular PHP Architecture: Clear separation of server-side data models, guest controllers, and administrative dashboards.',
      'Dynamic Price Calculation: Real-time client-side and server-validated date delta calculations factoring check-in/out dates, guest tiers, and optional amenities.',
      'Invoice Generation Pipeline: Automated billing summary aggregating base room rates, taxes, and supplementary facility charges.'
    ],
    keyFeatures: [
      {
        title: 'Guest Reservation Engine',
        desc: 'Intuitive browsing of room types with date validation ensuring check-out chronologically follows check-in.'
      },
      {
        title: 'Guest & Member Checkout',
        desc: 'Flexible checkout workflows supporting both registered accounts and accelerated guest bookings.'
      },
      {
        title: 'Supplementary Facility Booking',
        desc: 'Add-on amenities (Luxury Spa, Airport Chauffeur) dynamically linked to the master booking invoice.'
      },
      {
        title: 'Live Room Inventory Management',
        desc: 'Administrative controls to track room occupancy, update rates, and toggle availability.'
      },
      {
        title: 'Printable Digital Invoices',
        desc: 'Formatted billing statements with breakdown of charges ready for accounting and guest records.'
      }
    ],
    challengesAndLearnings: [
      {
        title: 'Data Integrity & Conflict Prevention',
        desc: 'Implemented relational database constraints and date overlap queries to prevent double-booking of rooms during peak seasons.'
      },
      {
        title: 'Clean Relational Schema Normalization',
        desc: 'Refactored room categories and optional facility catalogs into normalized tables with foreign key referential integrity.'
      }
    ],
    outcomes: [
      'Complete modular codebase with turn-key SQL seed scripts for reproducible local or cloud staging.',
      'Clean foundation for full-cycle database and web application development.'
    ],
    futureMilestones: [
      'Payment gateway sandbox integration (Stripe / FPX).',
      'REST API wrapper to expose booking endpoints to mobile clients.'
    ],
    terminalMockup: {
      command: 'php -S localhost:8000 -t public/ hotelier_db_check',
      outputLines: [
        'DATABASE: hotelier_db connected (MySQL)',
        'ROOMS_TABLE: 4 room categories indexed',
        'FACILITIES: Luxury Spa, Airport Shuttle active',
        'VALIDATION: Date conflict check passed',
        'STATUS: Reservation engine online'
      ]
    }
  }
];

export const BOOT_SEQUENCE = [
  'BIOS DATE 2026-10-05 18:34:00',
  'AIRIL-OS v2.4 (x86_64-pc-none)',
  'CPU: Intel(R) Core(TM) i7 @ 3.40GHz',
  'MEM: 16384 MB OK',
  'MOUNT: /dev/utp_it_student on /home/airil',
  'LOADING: [Languages, Cloud_AWS, Firebase, Antigravity]... OK',
  'SECURITY: Zero certifications claimed | Pure verified work',
  'SYSTEM READY: Starting interactive portfolio terminal shell...'
];
