export interface TechnologyFocusArea {
  id: string;
  title: string;
  category: string;
  description: string;
  topics: string[];
}

export const FOCUS_AREAS: TechnologyFocusArea[] = [
  {
    id: 'webdev',
    title: 'Full-Stack Web Development',
    category: 'Software Engineering',
    description:
      'Practical training in modern frontend and backend development—covering JavaScript, React, Node.js, and databases through hands-on project creation.',
    topics: ['HTML5 & Responsive CSS', 'JavaScript & React', 'Node.js & Express APIs', 'Database Fundamentals', 'Git & Deployment'],
  },
  {
    id: 'data',
    title: 'Data Analytics & Business Intelligence',
    category: 'Data & Analytics',
    description:
      'Transforming raw business data into actionable dashboards using SQL queries, spreadsheet analysis, Python data libraries, and Power BI visualization.',
    topics: ['SQL Queries & Joins', 'Spreadsheet Analytics', 'Python Pandas Wrangling', 'Power BI Dashboards', 'Data Storytelling'],
  },
  {
    id: 'python-ai',
    title: 'Python Programming & AI Fundamentals',
    category: 'Programming & AI',
    description:
      'Core programming logic, clean object-oriented code, API data processing, and foundational machine learning concepts.',
    topics: ['Python Logic & OOP', 'API Data Processing', 'NumPy & Data Structures', 'Introductory Machine Learning', 'Code Hygiene'],
  },
  {
    id: 'placement',
    title: 'Placement Preparation & Career Readiness',
    category: 'Career Development',
    description:
      'Structured technical interview preparation focusing on problem-solving patterns, computer science concepts, ATS-optimized resumes, and mock interviews.',
    topics: ['DSA Problem Solving', 'Core CS (OS, DBMS, Networks)', 'Technical Mock Interviews', 'Engineering Resumes', 'Interview Communication'],
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What is Code Mux?',
    answer:
      'Code Mux is an Indian technology education and career readiness platform. We are building practical, mentor-guided training programs focused on hands-on project creation and career preparation.',
  },
  {
    question: 'Who is Code Mux for?',
    answer:
      'Code Mux is designed for college students, fresh engineering/BCA/MCA/B.Sc graduates, aspiring developers, and job seekers looking to build practical technical competencies.',
  },
  {
    question: 'What domains will Code Mux cover?',
    answer:
      'Our primary focus areas include Full-Stack Web Development, Data Analytics, Python & AI Fundamentals, and Placement Preparation.',
  },
  {
    question: 'Are curriculums and batch dates decided yet?',
    answer:
      'Our curriculums and batch schedules are currently in preparation. You can register your interest through our Early Access / Waitlist form to receive official announcements once finalized.',
  },
  {
    question: 'What is the course fee structure?',
    answer:
      'Course fees have not been finalized yet. Code Mux is committed to keeping programs accessible and affordable for Indian students. Exact pricing will be announced alongside the launch of batch schedules.',
  },
  {
    question: 'Does Code Mux provide placement assistance?',
    answer:
      'Yes, Code Mux plans to support learners through resume formulation, DSA problem-solving sessions, technical mock interviews, and career guidance.',
  },
  {
    question: 'Are jobs guaranteed by Code Mux?',
    answer:
      'No. We adhere to complete honesty: Code Mux does not claim or promise job guarantees. Placement outcomes depend on individual student dedication, skills, and independent employer hiring criteria.',
  },
  {
    question: 'How will programs be delivered?',
    answer:
      'Programs will be conducted online, featuring interactive live mentor-led sessions, recorded materials, and practical assignment feedback.',
  },
  {
    question: 'How can I stay updated?',
    answer:
      'You can join our early notification list on this site or email us at contact@codemux.in. We will notify you as soon as official dates and details are released.',
  },
];
