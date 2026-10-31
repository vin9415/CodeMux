export interface TechnologyFocusArea {
  id: string;
  title: string;
  category: string;
  ageGroup: 'junior' | 'career' | 'general';
  minAge: number;
  maxAge: number;
  domainTag: string;
  badge?: string;
  description: string;
  topics: string[];
  targetAudience: 'both' | 'international' | 'indian';
  globalCurriculum?: string;
  timeZoneFriendly?: string;
}

export const FOCUS_AREAS: TechnologyFocusArea[] = [
  // ================= JUNIOR FOUNDATION & ENRICHMENT TRACKS (AGES 5-17) =================
  {
    id: 'vedic-maths',
    title: 'Vedic Maths & Speed Mental Arithmetic',
    category: 'Mathematics & Mental Speed',
    ageGroup: 'junior',
    minAge: 5,
    maxAge: 17,
    domainTag: 'Speed Mental Sutras',
    badge: 'Popular Across US, UK, UAE & India',
    description:
      'Ancient Indian Vedic mathematics techniques and rapid mental calculation sutras designed to boost arithmetic speed by 10x, eliminate math anxiety, and excel in competitive school tests and Olympiads worldwide.',
    topics: [
      'Mental Multiplication Sutras (Urdhva Tiryagbhyam & Ekadhikena)',
      'Lightning Addition, Subtraction & Base Complements',
      'Instant Square Roots & Cube Roots Without Calculator',
      'Fraction Simplification & Speed Percentage Tricks',
      'Math Kangaroo & School Olympiad Calculation Strategies',
    ],
    targetAudience: 'both',
    globalCurriculum: 'Aligned with CBSE, ICSE, US Common Core & Singapore Math',
    timeZoneFriendly: 'Dedicated batches for IST, EST, PST, GMT & GST slots',
  },
  {
    id: 'english-junior',
    title: 'Global English: Public Speaking, Debate & Model UN (MUN)',
    category: 'Language & Communication',
    ageGroup: 'junior',
    minAge: 5,
    maxAge: 17,
    domainTag: 'Spoken Fluency & Rhetoric',
    badge: 'International Communication',
    description:
      'Comprehensive English mastery tailored for international schooling and competitions: phonics, impeccable grammar, accent clarity, persuasive debate rhetoric, public speaking, and Model United Nations (MUN) preparation.',
    topics: [
      'Phonics, Accent Neutralization & Active Vocabulary Expansion',
      'Applied Grammar Mastery & Eloquent Sentence Construction',
      'Speech Delivery, Stage Presence & Confident Public Speaking',
      'Persuasive Debate Tactics & Model UN (MUN) Resolutions',
      'Analytical Reading Comprehension & International Essay Writing',
    ],
    targetAudience: 'both',
    globalCurriculum: 'Cambridge English, Oxford Assessment & IB Primary/MYP Aligned',
    timeZoneFriendly: 'Global weekend and evening time slots',
  },
  {
    id: 'hindi-junior',
    title: 'Hindi & Sanskrit Heritage: Spoken Fluency & Cultural Literature',
    category: 'Language & Literature',
    ageGroup: 'junior',
    minAge: 5,
    maxAge: 17,
    domainTag: 'Devnagari & Heritage Fluency',
    badge: 'NRI Diaspora & Heritage Choice',
    description:
      'Custom-crafted for Indian students and overseas diaspora families seeking deep cultural linguistic roots: Devnagari script writing, pure school vyakaran (grammar), clear conversational Hindi, and Sanskrit shloka chanting.',
    topics: [
      'Devnagari Script Reading, Writing & Matra Clarity',
      'School Vyakaran (Sangnya, Sarvanam, Kriya, Sandhi, Samas & Muhavare)',
      'Conversational Hindi for Daily Family & Social Fluency',
      'Sanskrit Shlokas, Meaning & Expressive Recitation',
      'Creative Hindi Writing (Kahani, Nibandh & Patra Lekhan)',
    ],
    targetAudience: 'both',
    globalCurriculum: 'Global Heritage Language Framework & CBSE/ICSE Standards',
    timeZoneFriendly: 'US/Canada EST/PST & UK/Europe GMT convenient slots',
  },
  {
    id: 'junior-coding',
    title: 'Young Coders: MIT Scratch, Game Design & Creative Python',
    category: 'Creative STEM & Coding',
    ageGroup: 'junior',
    minAge: 6,
    maxAge: 17,
    domainTag: 'Creative Coding & Logic',
    badge: 'Global STEM Benchmark',
    description:
      'Engaging, interactive introduction to software engineering. Young learners build 2D arcade games, animated stories, and interactive puzzles using MIT Scratch before advancing into real-world visual Python programming.',
    topics: [
      'Visual Block Logic, Sequencing & Conditionals (MIT Scratch 3.0)',
      'Designing Interactive 2D Arcade Games & Animated Stories',
      'Python for Kids: Turtle Graphics, Loops, Lists & Functions',
      'Algorithmic Problem-Solving & Computational Thinking',
      'Building Shareable Web Minigames & Mini Applications',
    ],
    targetAudience: 'both',
    globalCurriculum: 'CSTA (Computer Science Teachers Association) & ISTE Standards',
    timeZoneFriendly: 'Interactive 1:1 and micro-group pods 24/7',
  },
  {
    id: 'robotics-junior',
    title: 'Robotics, Micro:bit & STEM Automation for Kids',
    category: 'Robotics & Hardware STEM',
    ageGroup: 'junior',
    minAge: 8,
    maxAge: 17,
    domainTag: 'Robotics & Sensor Computing',
    badge: 'Hands-on Hardware & Simulation',
    description:
      'Discover electronics and hardware logic without barriers. Students use Tinkercad and virtual micro:bit simulators alongside real-world microcontroller kits to build smart sensor circuits and robotic automation projects.',
    topics: [
      'Electronic Circuits, LED Controls & Sensor Interfacing',
      'BBC micro:bit & Arduino Simulation on Tinkercad',
      'Block & Python Programming for Hardware Sensors',
      'Smart Home Automation & Obstacle-Avoiding Robot Logic',
      'Global Science Fair Project Conceptualization & Prototyping',
    ],
    targetAudience: 'both',
    globalCurriculum: 'NGSS (Next Generation Science Standards) & STEM Global Framework',
    timeZoneFriendly: 'Worldwide cohort timings with hardware simulator support',
  },
  {
    id: 'olympiad-math',
    title: 'International Math Olympiad & Critical Logic Puzzles',
    category: 'Mathematics & Mental Speed',
    ageGroup: 'junior',
    minAge: 7,
    maxAge: 17,
    domainTag: 'Olympiad & Non-Routine Math',
    badge: 'Competitive Edge',
    description:
      'Targeted training for high-achieving math students aiming for top percentiles in international competitions including Math Kangaroo, AMC 8/10, SASMO, and Southeast Asian Math Olympiads.',
    topics: [
      'Number Theory & Modular Arithmetic Patterns',
      'Combinatorics, Permutations & Venn Probability',
      'Advanced Non-Routine Geometry & Spatial Deduction',
      'Algebraic Word Problems & Contest Fast-Check Methods',
      'Timed Mock Contest Drills & Diagnostic Error Analysis',
    ],
    targetAudience: 'both',
    globalCurriculum: 'AMC 8, Math Kangaroo, SASMO & International Olympiad Prep',
    timeZoneFriendly: 'Weekend intensive masterclasses across all timezones',
  },
  {
    id: 'ai-junior',
    title: 'AI for Kids: Prompting, Machine Learning & Creative Computing',
    category: 'Creative STEM & Coding',
    ageGroup: 'junior',
    minAge: 9,
    maxAge: 17,
    domainTag: 'Kids Artificial Intelligence',
    badge: 'Next-Gen Future Skills',
    description:
      'Demystify artificial intelligence early. Young learners train computer vision and speech recognition models, master safe prompt engineering, create generative digital art, and build interactive intelligent bots.',
    topics: [
      'How AI Models Learn: Training Data, Supervised Learning & Vision',
      'Teachable Machine: Training Custom Image & Audio Classifiers',
      'Prompt Engineering & Ethical, Safe AI Usage',
      'Building Interactive Chatbots with Rule-based & Generative AI',
      'AI Ethics, Deepfake Literacy & Future Tech Careers Overview',
    ],
    targetAudience: 'both',
    globalCurriculum: 'AI4K12 Guidelines & Global Digital Citizenship Standards',
    timeZoneFriendly: 'Global cohort scheduling with 1:1 mentor assistance',
  },

  // ================= UNIVERSITY, GRADUATE & TECH CAREER TRACKS (AGES 18+) =================
  {
    id: 'webdev',
    title: 'Full-Stack Web & Cloud Engineering (React, Node & AWS)',
    category: 'Software Engineering',
    ageGroup: 'career',
    minAge: 18,
    maxAge: 99,
    domainTag: 'Full-Stack Production Track',
    badge: 'High Global Remote Demand',
    description:
      'End-to-end production engineering for global tech roles. Master modern React, Next.js, Node.js, Express, PostgreSQL/MongoDB, Docker containers, and AWS cloud deployment with production-grade architecture.',
    topics: [
      'Modern TypeScript, React 19 & Next.js App Router',
      'Scalable Backend APIs (Express, NestJS, REST & GraphQL)',
      'Relational & NoSQL Databases (PostgreSQL, Redis & MongoDB)',
      'Docker Containerization, CI/CD Pipelines & AWS Deployment',
      'Authentication (JWT, OAuth), WebSockets & System Resilience',
    ],
    targetAudience: 'both',
    globalCurriculum: 'Global Industry Engineering Bar (US/EU/APAC/India Tech Hubs)',
    timeZoneFriendly: 'Flexible live lectures with 24/7 code review portal',
  },
  {
    id: 'ai-engineering',
    title: 'Applied Generative AI, LLMs & Autonomous Agents',
    category: 'Programming & AI',
    ageGroup: 'career',
    minAge: 18,
    maxAge: 99,
    domainTag: 'Frontier GenAI & LLMs',
    badge: 'Frontier Tech Track',
    description:
      'Build real-world production AI applications. Learn Retrieval-Augmented Generation (RAG), vector embeddings, LangChain, LlamaIndex, multi-agent frameworks, and multimodal API integration.',
    topics: [
      'LLM APIs, Structured JSON Outputs & System Prompts',
      'Vector Databases (Chroma, Pinecone) & Enterprise RAG Pipelines',
      'LangChain, LangGraph & Autonomous Multi-Agent Workflows',
      'Fine-Tuning, Quantization & Open-Source LLMs (Llama, Mistral)',
      'Evaluation, Guardrails & Production AI Deployment at Scale',
    ],
    targetAudience: 'both',
    globalCurriculum: 'Frontier Silicon Valley & Global AI Engineering Practices',
    timeZoneFriendly: 'Accommodating working professionals across US, Europe & India',
  },
  {
    id: 'data',
    title: 'Data Analytics & Global Business Intelligence (Power BI & Tableau)',
    category: 'Data & Analytics',
    ageGroup: 'career',
    minAge: 18,
    maxAge: 99,
    domainTag: 'Business Analytics & BI',
    badge: 'Enterprise In-Demand',
    description:
      'Transform corporate enterprise data into strategic decisions. Master advanced multi-table SQL querying, Python analytical modeling (Pandas/NumPy), executive dashboards in Tableau/Power BI, and executive storytelling.',
    topics: [
      'Advanced SQL (Window Functions, CTEs, Recursive Queries, Tuning)',
      'Python Data Wrangling & Statistical Exploratory Analysis',
      'Executive Dashboards in Microsoft Power BI & Tableau',
      'Business KPI Modeling (CAC, LTV, Retention, ARR, Churn)',
      'Automated Reporting Pipelines & Executive Presentation',
    ],
    targetAudience: 'both',
    globalCurriculum: 'Global Management Consulting & Enterprise BI Standards',
    timeZoneFriendly: 'Weekend cohorts & asynchronous mentor office hours',
  },
  {
    id: 'placement',
    title: 'Global Tech Career, LeetCode DSA & Remote Interview Mastery',
    category: 'Career Development',
    ageGroup: 'career',
    minAge: 18,
    maxAge: 99,
    domainTag: 'FAANG & Global Remote Prep',
    badge: 'Career Acceleration',
    description:
      'Land engineering roles at top MNCs, unicorn startups, and high-paying global remote companies. Rigorous algorithmic patterns, large-scale System Design, mock interviews, and ATS-optimized global resumes.',
    topics: [
      '150 High-Frequency LeetCode Patterns (Trees, Graphs, DP, Intervals)',
      'High-Level & Low-Level System Design for Distributed Scale',
      'Behavioral Interviews & Leadership Principles (STAR Method)',
      'ATS-Optimized Engineering Resume & Global LinkedIn Positioning',
      '1-on-1 Mock Interviews with Senior Industry Mentors',
    ],
    targetAudience: 'both',
    globalCurriculum: 'FAANG, Top Tier Product Firms & Global Remote Hiring Bars',
    timeZoneFriendly: 'Personalized 1-on-1 mock interview time slots worldwide',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Ethical Defense Fundamentals',
    category: 'Software Engineering',
    ageGroup: 'career',
    minAge: 18,
    maxAge: 99,
    domainTag: 'Security & Ethical Hacking',
    badge: 'Critical Infrastructure Track',
    description:
      'Protect applications and networks from modern threats. Covers penetration testing fundamentals, OWASP Top 10 web vulnerabilities, cryptography, network packet forensics, and cloud security defense.',
    topics: [
      'Network Security Protocols, Wireshark & Packet Inspection',
      'OWASP Top 10 Web Exploits & Secure Coding Defense',
      'Vulnerability Scanning, Burp Suite & Ethical Penetration Basics',
      'Cryptography Fundamentals (Symmetric, Asymmetric & Hashing)',
      'Cloud Security Posture & Compliance Frameworks (SOC2, ISO 27001)',
    ],
    targetAudience: 'both',
    globalCurriculum: 'CompTIA Security+, CEH & OWASP Industry Standards',
    timeZoneFriendly: 'Global hands-on virtual lab environments',
  },

  // ================= GENERAL / UNIVERSAL COGNITIVE TRACKS (ALL AGES) =================
  {
    id: 'digital-ethics',
    title: 'Digital Fluency, Cyber Safety & Critical Logic',
    category: 'General & Universal',
    ageGroup: 'general',
    minAge: 8,
    maxAge: 99,
    domainTag: 'Universal Digital Skills',
    badge: 'Universal Lifelong Skill',
    description:
      'Essential digital intelligence for the modern world: online privacy protection, evaluating news vs misinformation, safe password and identity hygiene, and ethical technology habits for learners of any age.',
    topics: [
      'Digital Footprint Awareness & Online Privacy Shielding',
      'Media Literacy: Spotting Deepfakes, Scams & Misinformation',
      'Password Security, 2FA & Account Protection Habits',
      'Healthy Screen Time, Ergonomics & Digital Focus Management',
      'Critical Thinking & Logic Formulation in the AI Age',
    ],
    targetAudience: 'both',
    globalCurriculum: 'UNESCO Digital Literacy & Global Digital Citizenship Standards',
    timeZoneFriendly: 'Open access global self-paced modules + weekly live discussions',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What is Code Mux?',
    answer:
      'Code Mux is an Indian education platform delivering personalized dual-track learning: the Junior Foundation Academy for school students in Vedic Maths, English, Hindi, and Young Coding, alongside Career & Technical Specializations for college students and graduates.',
  },
  {
    question: 'Who is Code Mux for?',
    answer:
      'Code Mux serves two dedicated cohorts: 1) School learners looking to build mastery in Vedic Maths, English communication, Hindi vyakaran, and creative coding, and 2) College students, engineering graduates, and job seekers aiming for practical tech skills and placement readiness.',
  },
  {
    question: 'What domains does Code Mux teach for school students?',
    answer:
      'For school students, we offer structured tracks in Vedic Maths & Speed Mental Arithmetic, English Grammar & Spoken Fluency, Hindi Vyakaran, Sahitya & Conversational Fluency, and Young Coders (MIT Scratch & Python for Kids).',
  },
  {
    question: 'What domains does Code Mux cover for college students and graduates?',
    answer:
      'For college students and graduates, our primary focus areas include Full-Stack Web Development, Data Analytics & BI, Python Programming & AI Fundamentals, and Placement Preparation.',
  },
  {
    question: 'Are curriculums and batch dates decided yet?',
    answer:
      'Our curriculums and batch schedules are currently in preparation. You can register your interest through our Early Access / Waitlist form to receive official announcements once finalized.',
  },
  {
    question: 'What is the course fee structure?',
    answer:
      'Course fees have not been finalized yet. Code Mux is committed to keeping programs accessible and affordable for Indian families and students. Exact pricing will be announced alongside the launch of batch schedules.',
  },
  {
    question: 'Does Code Mux provide placement assistance for career tracks?',
    answer:
      'Yes, for career programs Code Mux plans to support learners through resume formulation, DSA problem-solving sessions, technical mock interviews, and career guidance.',
  },
  {
    question: 'Are jobs guaranteed by Code Mux?',
    answer:
      'No. We adhere to complete honesty: Code Mux does not claim or promise job guarantees. Placement outcomes depend on individual student dedication, skills, and independent employer hiring criteria.',
  },
  {
    question: 'How will programs be delivered across foundational and career tracks?',
    answer:
      'Programs will be conducted online, featuring interactive live mentor-led sessions, engaging hands-on interactive activities, recorded materials, and practical assignment feedback.',
  },
  {
    question: 'How can I stay updated or register my child / self?',
    answer:
      'You can join our early notification list on this site or email us at contact@codemux.in. We will notify you as soon as official dates and details are released.',
  },
];
