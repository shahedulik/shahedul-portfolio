import type {
  ArchLayer, CertificationItem, CompetencyItem, EducationItem,
  ExperienceItem, Kpi, StackRow, VentureItem,
} from '../types/portfolio';

export const PROFILE = {
  name: 'Shahedul Islam Khan',
  headline: 'BI Analyst · Solution Architect',
  title: 'Business Intelligence Analyst & Business Development Manager',
  summary:
    'Data-trained Business Intelligence Analyst & BDM adept at combining predictive analytics, market research, and sales engineering to unlock enterprise profitability. Certified Data Analyst with hands-on experience in machine learning, pipeline modeling, and multi-channel outreach optimization. Leverages technical data expertise to incubate AI solutions providers (LLMs & AI agents), execute 90+ public sector RFP submissions, and structure strategic joint ventures. Skilled at translating complex data assets into actionable business strategies and alignment across executive stakeholders.',
  email: 'shahedulik6904@gmail.com',
  phone: '+880 1979-071285',
  phoneRaw: '+8801979071285',
  location: 'Dhaka, Bangladesh',
};

export const KPIS: Kpi[] = [
  { label: 'Public-sector RFP submissions', value: 90, suffix: '+', trend: '▲ US federal & state pipelines', context: 'Procurement proposals produced at UPSKILL Consultancy NYC' },
  { label: 'Client base expansion in 60 days', value: 30, suffix: '%+', trend: '▲ HRMS / LMS book of business', context: 'Multi-channel GTM across 10+ SME verticals, US Tri-State area' },
  { label: 'Strategic Joint Ventures structured', value: 5, trend: '▲ VOSB & WOSB set-asides', context: 'JV architecture to expand contract bidding eligibility' },
  { label: 'Monthly market-share target attained', value: 120, suffix: '%', trend: '▲ +20% over plan, month over month', context: 'AU PropTech software pipeline at PREZIO Australia' },
  { label: 'Daily cold-outreach capacity', value: 500, suffix: '+', trend: '▲ Pipeline velocity engine', context: 'B2B retail prospecting at SKYTECH Solution' },
  { label: 'Ventures incubated', value: 3, trend: '▲ Founder / architect seat', context: 'Aetheria Alliance · Insight AI · Oddlogy (iDEA/BCC funded)' },
];

export const PIPELINE_INDEX = [42, 48, 55, 61, 58, 67, 74, 82, 90, 97, 104, 118];

export const ATTAINMENT = [
  { label: 'PREZIO AU — sales target vs plan', pct: 120 },
  { label: 'UPSKILL NYC — client growth vs 60-day plan', pct: 130 },
  { label: 'RFP submission cadence vs quarterly plan', pct: 112 },
  { label: 'Outreach SLA adherence (500/day engine)', pct: 96 },
];

export const COMPETENCIES: CompetencyItem[] = [
  { title: 'Business Intelligence & Machine Learning', detail: 'Predictive modeling, pipeline forecasting, Python analytics, SQL, MLflow-style experiment discipline' },
  { title: 'US Public Procurement & RFPs', detail: 'Proposal lifecycle engineering, compliance matrices, VOSB/WOSB joint-venture structuring' },
  { title: 'Discovery Sessions & Client Pitching', detail: 'Value-proposition design, C-suite workshops, data-informed negotiation' },
  { title: 'B2B Pipeline Operations', detail: 'HubSpot, Salesforce, Apollo, LinkedIn Sales Navigator — hygiene, scoring, velocity reporting' },
  { title: 'C-Suite Pitching & Negotiation', detail: 'Executive narrative building from BI dashboards to boardroom decisions' },
  { title: 'Cross-Functional & Operational Leadership', detail: 'Marketing × sales × product alignment, SaaS packaging, onboarding collateral' },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'upskill-nyc',
    role: 'Business Development Manager',
    company: 'UPSKILL CONSULTANCY NYC',
    location: 'New York, USA (Remote)',
    period: 'April 2026 – Present',
    bullets: [
      'Expanded the active HRMS and LMS client base by over 30% within 60 days via a multi-channel go-to-market strategy targeting 10+ SME verticals across the US Tri-State area.',
      'Produced 90+ procurement proposals for the US public sector and organized 5 strategic Joint Ventures (VOSB & WOSB) to enhance bidding capacity and contract eligibility.',
      'Founded and launched Insight AI Consultancy (enterprise LLMs & AI agents) and Upskill Academia 501(c)(3), creating data-driven impact frameworks to support grant funding.',
      'Secured international Memoranda of Understanding with Swisscontact and Edgent LLC to foster strategic corporate growth.',
      'Established the Real Estate Property Preservation division; owned product packaging, branding, and user-onboarding collateral for key SaaS lines.',
    ],
    tags: ['Enterprise LLMs', 'AI Agents', 'RFP Engineering', 'JV Structuring', 'GTM Strategy'],
  },
  {
    id: 'prezio-au',
    role: 'Business Development Associate',
    company: 'PREZIO AUSTRALIA',
    location: 'Australia (Remote)',
    period: 'July 2025 – April 2026',
    bullets: [
      'Expanded AU PropTech market presence, surpassing sales goals via data-driven negotiations and converting key corporate leads into lasting partnerships.',
      'Grew AU PropTech software market share, exceeding monthly targets by 20% through data-informed discovery and value-driven pitches.',
      'Led executive workshops on digital transformation, boosting cross-team collaboration and accelerating delivery cycles.',
    ],
    tags: ['PropTech', 'Data-Driven Negotiation', 'C-Suite Workshops'],
  },
  {
    id: 'lead-academy-coord',
    role: 'Marketing Co-Ordinator',
    company: 'LEAD ACADEMY',
    location: 'Dhaka, Bangladesh',
    period: 'April 2025 – July 2025',
    bullets: [
      'Designed and executed comprehensive marketing strategies aligned with company vision and objectives.',
      'Fostered partnerships with leading Bangladeshi influencers and e-commerce platforms (Alibaba, Daraz) to enhance brand visibility.',
      'Generated innovative social-media marketing concepts to deepen customer engagement.',
    ],
    tags: ['Influencer Alliances', 'E-commerce Partnerships', 'Social Strategy'],
  },
  {
    id: 'lead-academy-intern',
    role: 'Marketing Executive Intern',
    company: 'LEAD ACADEMY',
    location: 'Dhaka, Bangladesh',
    period: 'December 2024 – April 2025',
    bullets: [
      'Led and managed a high-performing marketing team, fostering a collaborative, results-driven environment.',
      'Created and implemented thorough marketing plans complementing business goals and vision.',
      'Developed alliances with top Bangladeshi influencers to increase brand awareness (Lead Talk, social media).',
    ],
    tags: ['Team Leadership', 'Marketing Plans', 'Brand Awareness'],
  },
  {
    id: 'skytech',
    role: 'Sales Executive',
    company: 'SKYTECH SOLUTION',
    location: 'Dhaka, Bangladesh',
    period: 'July 2024 – December 2024',
    bullets: [
      'Conducted persuasive discovery sessions and value propositions, maximizing profit margins and closing deals in competitive Australian markets.',
      'Executed high-volume cold outreach, calling 500+ potential retail clients daily to enrich the sales pipeline and generate qualified leads.',
    ],
    tags: ['Discovery Sessions', 'Cold Outreach at Scale', 'Margin Optimization'],
  },
  {
    id: 'servisol',
    role: 'Junior Sales Representative',
    company: 'SERVISOL ITES',
    location: 'United Kingdom market (Remote)',
    period: 'March 2024 – May 2024',
    bullets: [
      'Negotiated agreements and settled accords to improve financial returns and close deals in UK Property Maintenance.',
      'Directed, guided, and supervised a distinguished marketing team, promoting a cooperative, goal-centric organization and coordinating brand integrity across media.',
      'Built foundational competence in client generation and client relationship management.',
    ],
    tags: ['UK Property Maintenance', 'Negotiation', 'CRM Fundamentals'],
  },
];

export const VENTURES: VentureItem[] = [
  {
    name: 'AETHERIA ALLIANCE',
    role: 'Founder',
    mission: 'Intelligent infrastructure for the future of leather manufacturing — advanced automation, integrated sensing systems, and data-driven operational control.',
    highlights: [
      'MVP development on track with Go-To-Market strategy',
      'Engineered hardware + intelligent digital ecosystems',
      'Measurable efficiency, reliability, and environmental accountability',
    ],
  },
  {
    name: 'INSIGHT AI CONSULTANCY',
    role: 'Founder / Lead Architect',
    mission: 'Enterprise LLM deployments and autonomous AI agents for workflow decisioning and BI transformation.',
    highlights: [
      'Custom LLM pipeline integration for enterprise clients',
      'Business-intelligence transformation models',
      'Launched under UPSKILL Consultancy NYC umbrella',
    ],
  },
  {
    name: 'ODDLOGY',
    role: 'Marketing Consultant',
    mission: 'Study partner for university courses — crash courses and automated learning support for private-university students.',
    highlights: [
      'Startup funding by iDEA Project (Bangladesh Computer Council)',
      'EdTech outreach architecture across university cohorts',
      'Curriculum crash-course design & GTM analytics',
    ],
  },
  {
    name: 'TEAM APOSTROPHE',
    role: 'Business Analyst & Market Researcher (CMO)',
    mission: 'Business-competition startup; owns market research, business model, GTM, customer analysis, and content development across departments.',
    highlights: [
      'Interconnected department quality control for fast delivery',
      'Market research & customer analysis ownership',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'Bachelor of Science in Data Science',
    institution: 'United International University (UIU)',
    period: 'Dhaka, Bangladesh',
    notes: [
      'Member — UIU Data Science Club',
      'Member — UIU Marketing Forum',
      'Member — UIU Entrepreneurship Development Forum',
      'Member — UIU Debate Club',
    ],
  },
  {
    degree: 'Higher Secondary (Science Stream)',
    institution: 'Scholars School & College',
    period: 'Science stream',
    notes: ['Member — Scholars College Debate Association'],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  { title: 'Certified Data Analyst (CDA)', issuer: 'Center of Development of IT Professionals', year: '2026' },
  { title: 'Machine Learning Specialization', issuer: 'Andrew Ng — DeepLearning.AI', year: '2025' },
  { title: 'Marketing & Branding Bootcamp', issuer: 'Human Development Network Bangladesh', year: '2025' },
];

export const AWARDS: string[] = [
  'Top 3 Startups from Bangladesh — First Capital Startup Nation 2026',
  'FLP — North South University Startup Next, Cohort 4',
  'Semi-Finalist — SUST Omni-Start 1.0',
  'Finalist — Gazipur Debate Competition 2023',
  'Startup Funding for Oddlogy — iDEA Project, Bangladesh Computer Council (BCC)',
  'Certificate of Completion — Cyber Invasion 25',
  'Selected Founder — University Innovation Hub Program',
  'Selected Member — Internship Program for Student Entrepreneurs, Accelerating Bangladesh',
  'Certificate of Completion — Herwill AI Digital Hackathon',
];

export const MEMBERSHIPS: string[] = [
  'UIU Data Science Club', 'UIU Marketing Forum', 'UIU Entrepreneurship Development Forum',
  'UIU Debate Club', 'Scholars College Debate Association',
];

export const ARCH_LAYERS: ArchLayer[] = [
  { name: 'Ingestion & Integration', purpose: 'CRM, ERP, web telemetry and procurement feeds land on an event spine; CDC captures operational deltas.', technologies: ['Apache Kafka / Redpanda', 'Debezium CDC', 'REST / GraphQL edge'] },
  { name: 'Lakehouse & Governance', purpose: 'Unified batch + stream storage with columnar analytics, row-level security, and lineage.', technologies: ['PostgreSQL 16 + Citus', 'Apache Iceberg / S3', 'Valkey cache', 'dbt-core'] },
  { name: 'Intelligence Layer', purpose: 'Forecasting, segmentation, and LLM copilots for proposal synthesis — shipped with eval harnesses.', technologies: ['scikit-learn / XGBoost', 'PyTorch', 'Enterprise LLMs (vLLM)', 'MLflow'] },
  { name: 'Decisioning & Delivery', purpose: 'Executive BI surfaces, automated narrative generation, and SLO-monitored delivery.', technologies: ['Apache Superset / Metabase', 'OpenTelemetry', 'Prometheus · Grafana · Tempo'] },
];

export const PIPELINE_STEPS: string[] = [
  'Tender signal ingestion', 'Eligibility scoring (VOSB/WOSB)', 'LLM draft synthesis',
  'Human red-team review', 'Submission & tracking', 'Win/loss feedback loop',
];

export const STACK_MATRIX: StackRow[] = [
  { layer: 'Event spine', choice: 'Redpanda (Kafka API)', why: 'Kafka protocol without JVM/ZooKeeper ops; tiered storage keeps 30-day replay cheap' },
  { layer: 'OLTP + analytics', choice: 'PostgreSQL 16 + Citus', why: 'One engine, horizontal sharding when tenant count grows; WAL-G point-in-time recovery' },
  { layer: 'Cache', choice: 'Valkey', why: 'Community-governed Redis fork — zero license risk, sub-millisecond reads' },
  { layer: 'Compute', choice: 'TypeScript on Bun (API) + React edge SPA', why: 'One language across the stack; Bun for IO-bound API throughput' },
  { layer: 'Orchestration', choice: 'Kubernetes (EKS) + ArgoCD', why: 'Self-healing control loops + GitOps drift correction (selfHeal: true)' },
  { layer: 'Observability', choice: 'OpenTelemetry → Prometheus / Tempo / Grafana', why: 'Vendor-neutral instrumentation, three telemetry signals, SLO burn-rate alerting' },
];
