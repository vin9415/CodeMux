import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AuthUser,
  UserRole,
  ContactInquiry,
  Announcement,
  SystemAuditLog,
  ClassSchedule,
  AttendanceRecord,
  MentorAttendance,
  ProjectItem,
  StudentProjectSubmission,
  PresentationDeck,
  SyllabusTrack,
  SyllabusModule,
} from '../types';

export type PageRoute =
  | 'home'
  | 'domains'
  | 'placements'
  | 'about'
  | 'contact'
  | 'faq'
  | 'login'
  | 'student-portal'
  | 'mentor-portal'
  | 'admin-portal'
  | 'privacy'
  | 'terms'
  | 'refund'
  | 'conduct';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

export interface EarlyAccessEntry {
  id: string;
  name: string;
  email: string;
  interest: string;
  phone?: string;
  submittedAt: string;
  status?: 'pending' | 'enrolled' | 'contacted';
}

// Initial Data sets
const INITIAL_USERS: AuthUser[] = [
  {
    id: 'usr-admin-1',
    name: 'Admin Console Manager',
    email: 'admin@codemux.in',
    role: 'admin',
    joinedAt: '2026-01-10',
    status: 'active',
  },
  {
    id: 'usr-mentor-1',
    name: 'Priya Sharma',
    email: 'priya.mentor@codemux.in',
    role: 'mentor',
    track: 'Full-Stack Web Development',
    phone: '+91 98765 11001',
    joinedAt: '2026-01-15',
    status: 'active',
  },
  {
    id: 'usr-mentor-2',
    name: 'Kunal Deshmukh',
    email: 'kunal.mentor@codemux.in',
    role: 'mentor',
    track: 'Data Analytics & BI',
    phone: '+91 98765 11002',
    joinedAt: '2026-01-20',
    status: 'active',
  },
  {
    id: 'usr-mentor-3',
    name: 'Ananya Roy',
    email: 'ananya.mentor@codemux.in',
    role: 'mentor',
    track: 'Placement Preparation & Interview Mastery',
    phone: '+91 98765 11003',
    joinedAt: '2026-02-01',
    status: 'active',
  },
  {
    id: 'usr-student-1',
    name: 'Aarav Patel',
    email: 'aarav.student@codemux.in',
    role: 'student',
    interest: 'Full-Stack Web Development',
    track: 'Full-Stack Web Development',
    batch: 'Cohort 2026-A',
    phone: '+91 98111 22334',
    joinedAt: '2026-02-15',
    status: 'active',
  },
  {
    id: 'usr-student-2',
    name: 'Sneha Verma',
    email: 'sneha.student@codemux.in',
    role: 'student',
    interest: 'Data Analytics & BI',
    track: 'Data Analytics & BI',
    batch: 'Cohort 2026-A',
    phone: '+91 98222 33445',
    joinedAt: '2026-02-18',
    status: 'active',
  },
  {
    id: 'usr-student-3',
    name: 'Rohan Gupta',
    email: 'rohan.student@codemux.in',
    role: 'student',
    interest: 'Python Programming & AI Essentials',
    track: 'Python Programming & AI Essentials',
    batch: 'Cohort 2026-B',
    phone: '+91 98333 44556',
    joinedAt: '2026-02-22',
    status: 'active',
  },
  {
    id: 'usr-student-4',
    name: 'Meera Joshi',
    email: 'meera.student@codemux.in',
    role: 'student',
    interest: 'Placement Preparation & Interview Mastery',
    track: 'Placement Preparation & Interview Mastery',
    batch: 'Cohort 2026-A',
    phone: '+91 98444 55667',
    joinedAt: '2026-02-25',
    status: 'active',
  },
];

const INITIAL_CLASSES: ClassSchedule[] = [
  {
    id: 'cls-1',
    track: 'Full-Stack Web Development',
    batch: 'Cohort 2026-A',
    topic: 'Modern React Architecture & Server Components',
    description: 'Deep dive into React 19 hooks, client vs server components, state management and streaming hydration.',
    mentorId: 'usr-mentor-1',
    mentorName: 'Priya Sharma',
    date: '2026-11-02',
    time: '10:00 AM - 12:00 PM',
    roomLink: 'https://meet.google.com/mux-react-arch',
    pptTitle: 'React 19 Hooks & Hydration Architecture',
    pptUrl: 'https://codemux.in/materials/react-19-deck.pptx',
    status: 'upcoming',
  },
  {
    id: 'cls-2',
    track: 'Data Analytics & BI',
    batch: 'Cohort 2026-A',
    topic: 'Advanced SQL Analytics & Window Functions',
    description: 'Mastering OVER(), PARTITION BY, RANK(), and CTE recursive queries for multi-dimensional data warehouses.',
    mentorId: 'usr-mentor-2',
    mentorName: 'Kunal Deshmukh',
    date: '2026-11-03',
    time: '06:00 PM - 08:00 PM',
    roomLink: 'https://meet.google.com/mux-data-analytics',
    pptTitle: 'SQL Window Functions & Analytical CTEs',
    pptUrl: 'https://codemux.in/materials/sql-window-deck.pdf',
    status: 'upcoming',
  },
  {
    id: 'cls-3',
    track: 'Placement Preparation & Interview Mastery',
    batch: 'Cohort 2026-A',
    topic: 'Graphs, BFS/DFS & Top Interview Patterns',
    description: 'Cycle detection, topological sort, Dijkstra shortest path and real FAANG interview problem breakdowns.',
    mentorId: 'usr-mentor-3',
    mentorName: 'Ananya Roy',
    date: '2026-11-04',
    time: '07:00 PM - 09:00 PM',
    roomLink: 'https://meet.google.com/mux-placement-dsa',
    pptTitle: 'Graph Traversal Patterns & Interview Puzzles',
    pptUrl: 'https://codemux.in/materials/graphs-dsa.pptx',
    status: 'upcoming',
  },
  {
    id: 'cls-4',
    track: 'Full-Stack Web Development',
    batch: 'Cohort 2026-A',
    topic: 'REST API Design, JWT Security & Middleware',
    description: 'Hands-on Express backend development, OAuth integration, refresh token rotation, and rate limiting.',
    mentorId: 'usr-mentor-1',
    mentorName: 'Priya Sharma',
    date: '2026-10-28',
    time: '10:00 AM - 12:00 PM',
    roomLink: 'https://meet.google.com/mux-react-arch',
    pptTitle: 'Production REST APIs & JWT Security Deck',
    pptUrl: 'https://codemux.in/materials/api-security-deck.pdf',
    status: 'completed',
    recordingUrl: 'https://codemux.in/recordings/api-security-session.mp4',
  },
  {
    id: 'cls-5',
    track: 'Python Programming & AI Essentials',
    batch: 'Cohort 2026-B',
    topic: 'Python Asyncio & LangChain Agent Pipelines',
    description: 'Building asynchronous tool-calling agents with structured JSON outputs and retrieval pipelines.',
    mentorId: 'usr-mentor-2',
    mentorName: 'Kunal Deshmukh',
    date: '2026-11-05',
    time: '04:00 PM - 06:00 PM',
    roomLink: 'https://meet.google.com/mux-python-ai',
    pptTitle: 'LangChain & Vector RAG Architecture Deck',
    pptUrl: 'https://codemux.in/materials/python-ai-rag.pptx',
    status: 'upcoming',
  },
];

const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    classId: 'cls-4',
    classTopic: 'REST API Design, JWT Security & Middleware',
    classDate: '2026-10-28',
    studentId: 'usr-student-1',
    studentName: 'Aarav Patel',
    studentEmail: 'aarav.student@codemux.in',
    track: 'Full-Stack Web Development',
    batch: 'Cohort 2026-A',
    status: 'present',
    markedAt: '2026-10-28 10:15',
    markedBy: 'Priya Sharma (Mentor)',
    remarks: 'Active participant in code demo',
  },
  {
    id: 'att-2',
    classId: 'cls-4',
    classTopic: 'REST API Design, JWT Security & Middleware',
    classDate: '2026-10-28',
    studentId: 'usr-student-2',
    studentName: 'Sneha Verma',
    studentEmail: 'sneha.student@codemux.in',
    track: 'Data Analytics & BI',
    batch: 'Cohort 2026-A',
    status: 'present',
    markedAt: '2026-10-28 10:15',
    markedBy: 'Priya Sharma (Mentor)',
  },
  {
    id: 'att-3',
    classId: 'cls-4',
    classTopic: 'REST API Design, JWT Security & Middleware',
    classDate: '2026-10-28',
    studentId: 'usr-student-4',
    studentName: 'Meera Joshi',
    studentEmail: 'meera.student@codemux.in',
    track: 'Placement Preparation & Interview Mastery',
    batch: 'Cohort 2026-A',
    status: 'late',
    markedAt: '2026-10-28 10:35',
    markedBy: 'Priya Sharma (Mentor)',
    remarks: 'Joined 20 mins late due to network delay',
  },
];

const INITIAL_MENTOR_ATTENDANCE: MentorAttendance[] = [
  {
    id: 'matt-1',
    classId: 'cls-4',
    classTopic: 'REST API Design, JWT Security & Middleware',
    mentorId: 'usr-mentor-1',
    mentorName: 'Priya Sharma',
    date: '2026-10-28',
    scheduledTime: '10:00 AM - 12:00 PM',
    status: 'conducted',
    durationMinutes: 120,
    checkedInAt: '2026-10-28 09:55 AM',
    notes: 'Completed full syllabus for Module 3 API design. Good student engagement.',
  },
  {
    id: 'matt-2',
    classId: 'cls-1',
    classTopic: 'Modern React Architecture & Server Components',
    mentorId: 'usr-mentor-1',
    mentorName: 'Priya Sharma',
    date: '2026-11-02',
    scheduledTime: '10:00 AM - 12:00 PM',
    status: 'scheduled',
    durationMinutes: 120,
    notes: 'Upcoming lecture. PPT ready.',
  },
  {
    id: 'matt-3',
    classId: 'cls-2',
    classTopic: 'Advanced SQL Analytics & Window Functions',
    mentorId: 'usr-mentor-2',
    mentorName: 'Kunal Deshmukh',
    date: '2026-11-03',
    scheduledTime: '06:00 PM - 08:00 PM',
    status: 'scheduled',
    durationMinutes: 120,
  },
];

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    track: 'Full-Stack Web Development',
    title: 'Multi-Tenant SaaS Project Management Engine',
    description: 'Architect a full-stack platform featuring workspace isolation, real-time activity streams, role-based access control, and Stripe billing.',
    difficulty: 'Advanced',
    deadline: '2026-11-20',
    deliverables: [
      'GitHub repository with modular backend and clean React frontend',
      'Live deployed production URL (e.g. Vercel / Render)',
      'README documentation with schema diagrams and API specs',
      'Unit test coverage for authentication and workspace authorization',
    ],
    starterCodeUrl: 'https://github.com/codemux-templates/saas-starter',
    evaluationCriteria: [
      'Clean architectural separation of routes and business logic',
      'Proper database constraints, foreign keys, and indexes',
      'Responsive design and graceful error handling',
    ],
  },
  {
    id: 'proj-2',
    track: 'Data Analytics & BI',
    title: 'Executive Sales & Churn Analytics Dashboard',
    description: 'Transform 500,000+ real-world retail transactions into actionable retention insights using Python, SQL, and interactive visual reporting.',
    difficulty: 'Intermediate',
    deadline: '2026-11-25',
    deliverables: [
      'Cleaned dataset and reproducible ETL pipeline scripts',
      'Exploratory Data Analysis Jupyter Notebook with insights',
      'Interactive executive dashboard with cohort retention metrics',
    ],
    starterCodeUrl: 'https://github.com/codemux-templates/analytics-starter',
    evaluationCriteria: [
      'Data cleaning precision and missing-value handling',
      'Analytical depth: Cohort retention, CLV calculation, RFM scoring',
      'Visual clarity and actionable executive storytelling',
    ],
  },
  {
    id: 'proj-3',
    track: 'Placement Preparation & Interview Mastery',
    title: 'Distributed In-Memory Cache & Rate Limiter System',
    description: 'Build an O(1) thread-safe Least Recently Used (LRU) Cache and a Sliding Window Rate Limiter with benchmark stress-testing suites.',
    difficulty: 'Advanced',
    deadline: '2026-11-18',
    deliverables: [
      'Source code in TypeScript / Java / Python / C++',
      'Benchmark report with concurrent thread throughput stats',
      'System design document explaining eviction trade-offs',
    ],
    starterCodeUrl: 'https://github.com/codemux-templates/cache-rate-limiter',
    evaluationCriteria: [
      'Strict O(1) time complexity for get() and put()',
      'Thread safety under concurrent read/write locks',
      'Thorough test suite with boundary condition coverage',
    ],
  },
  {
    id: 'proj-4',
    track: 'Python Programming & AI Essentials',
    title: 'Autonomous Multi-Source Research Agent',
    description: 'Build a Python application that fetches technical whitepapers, summarizes key sections using an LLM, and stores embeddings in ChromaDB.',
    difficulty: 'Intermediate',
    deadline: '2026-11-28',
    deliverables: [
      'Modular Python codebase with async concurrency',
      'Streamlit / Gradio interactive query interface',
      'Vector database retrieval benchmarking suite',
    ],
    starterCodeUrl: 'https://github.com/codemux-templates/ai-research-agent',
    evaluationCriteria: [
      'Prompt orchestration with hallucination guards',
      'Efficient chunking and embedding storage in vector DB',
      'Clear documentation on running the application locally',
    ],
  },
];

const INITIAL_SUBMISSIONS: StudentProjectSubmission[] = [
  {
    id: 'sub-1',
    projectId: 'proj-1',
    projectTitle: 'Multi-Tenant SaaS Project Management Engine',
    studentId: 'usr-student-1',
    studentName: 'Aarav Patel',
    studentEmail: 'aarav.student@codemux.in',
    track: 'Full-Stack Web Development',
    githubUrl: 'https://github.com/aaravpatel/codemux-saas-platform',
    liveDemoUrl: 'https://codemux-saas-aarav.vercel.app',
    notes: 'Implemented workspace switching, JWT refresh token cookies, and optimistic UI updates for task boards.',
    submittedAt: '2026-10-29 18:40',
    status: 'approved',
    grade: '94/100 (Distinction - A+)',
    feedback: 'Excellent clean architecture. Database schema has proper foreign keys and indexes. Great UI polish!',
    reviewedBy: 'Priya Sharma (Senior Mentor)',
    reviewedAt: '2026-10-30 11:20',
  },
];

const INITIAL_PRESENTATIONS: PresentationDeck[] = [
  {
    id: 'ppt-1',
    track: 'Full-Stack Web Development',
    title: 'React 19 Hooks, Hydration & Server Architecture',
    topic: 'Modern Component Systems & Performance',
    slidesCount: 46,
    fileType: 'PPTX',
    downloadOrViewUrl: 'https://codemux.in/slides/react19-mastery.pptx',
    uploadedBy: 'Priya Sharma (Mentor)',
    uploadedAt: '2026-10-26',
    description: 'Comprehensive slide deck covering useActionState, useOptimistic, server components, and streaming SSR.',
  },
  {
    id: 'ppt-2',
    track: 'Data Analytics & BI',
    title: 'SQL Window Functions & Analytical CTEs',
    topic: 'Relational Database Intelligence',
    slidesCount: 38,
    fileType: 'PDF Deck',
    downloadOrViewUrl: 'https://codemux.in/slides/sql-window-functions.pdf',
    uploadedBy: 'Kunal Deshmukh (Mentor)',
    uploadedAt: '2026-10-27',
    description: 'Visual walkthrough of partitions, framing clauses (ROWS BETWEEN), running totals, and ranking algorithms.',
  },
  {
    id: 'ppt-3',
    track: 'Placement Preparation & Interview Mastery',
    title: 'Graph Traversal Patterns & Interview Puzzles',
    topic: 'Data Structures & Algorithms',
    slidesCount: 52,
    fileType: 'PPTX',
    downloadOrViewUrl: 'https://codemux.in/slides/graphs-faang-patterns.pptx',
    uploadedBy: 'Ananya Roy (Mentor)',
    uploadedAt: '2026-10-25',
    description: 'Graph representation, BFS, DFS, cycle detection, bipartite graphs, and topological sort with live code traces.',
  },
  {
    id: 'ppt-4',
    track: 'Python Programming & AI Essentials',
    title: 'Asyncio Concurrency & LangChain RAG Pipelines',
    topic: 'Production Python & AI Engineering',
    slidesCount: 42,
    fileType: 'Google Slides',
    downloadOrViewUrl: 'https://docs.google.com/presentation/d/codemux-python-rag',
    uploadedBy: 'Kunal Deshmukh (Mentor)',
    uploadedAt: '2026-10-28',
    description: 'Event loops, coroutines, thread executors, vector embeddings, chunking strategies, and retrieval benchmarks.',
  },
  {
    id: 'ppt-5',
    track: 'Full-Stack Web Development',
    title: 'System Design: Scalable Architecture & Caching Strategies',
    topic: 'High-Level Architecture for Senior Engineers',
    slidesCount: 60,
    fileType: 'PDF Deck',
    downloadOrViewUrl: 'https://codemux.in/slides/system-design-microservices.pdf',
    uploadedBy: 'Priya Sharma (Mentor)',
    uploadedAt: '2026-10-20',
    description: 'Load balancers, Redis caching layers, read replicas, database sharding, and CDN static asset caching.',
  },
];

const INITIAL_SYLLABUS: SyllabusTrack[] = [
  {
    id: 'syl-web',
    trackName: 'Full-Stack Web Development',
    badge: 'Flagship Engineering Track',
    description: 'Zero to production full-stack engineering with TypeScript, React 19, Node.js, PostgreSQL, and Cloud Deployment.',
    durationWeeks: 16,
    modules: [
      {
        id: 'mod-web-1',
        weekNumber: 1,
        title: 'Core Foundations & Modern TypeScript Mastery',
        summary: 'Deep dive into ESNext, TypeScript generics, async execution patterns, and Git collaboration workflows.',
        topics: [
          'Advanced TypeScript Generics & Type Narrowing',
          'Event Loop, Promises, and Async/Await Mechanics',
          'Semantic HTML5, CSS Grid, and Modern Tailwind Architecture',
          'Professional Git branching, PR etiquette & conventional commits',
        ],
        handsOnLab: 'Build a type-safe CLI task runner and utility library with 100% test coverage.',
      },
      {
        id: 'mod-web-2',
        weekNumber: 3,
        title: 'Component Architecture & State Orchestration (React 19)',
        summary: 'Architecting scalable frontends using modern React hooks, context patterns, and performance optimizations.',
        topics: [
          'React 19 Compiler, Actions, and Concurrent Features',
          'State Management: Context API, Zustand, and TanStack Query',
          'Component Composition, Render Props, and Custom Hooks',
          'Performance profiling, memoization, and bundle optimization',
        ],
        handsOnLab: 'Interactive Kanban Project Board with Drag-and-Drop and Optimistic UI.',
      },
      {
        id: 'mod-web-3',
        weekNumber: 7,
        title: 'Backend Systems, APIs & Database Engineering',
        summary: 'Building high-throughput RESTful services with Express, PostgreSQL schema design, and auth security.',
        topics: [
          'RESTful API Standards & Controller-Service-Repository Pattern',
          'PostgreSQL Schema Design, Indexing, and Foreign Keys',
          'Authentication: JWT Cookies, Refresh Tokens & OAuth2',
          'Database Migrations, Transactions & ACID Guarantees',
        ],
        handsOnLab: 'Multi-Tenant Auth & Role-Based Access Control Backend Service.',
      },
      {
        id: 'mod-web-4',
        weekNumber: 12,
        title: 'Production Capstone, Testing & Cloud CI/CD',
        summary: 'Deploying robust cloud-native applications with automated Docker builds, CI/CD, and monitoring.',
        topics: [
          'Unit, Integration, and E2E Testing with Vitest & Playwright',
          'Docker containerization and multi-stage production builds',
          'Cloud deployment on Render/Vercel with PostgreSQL Cloud SQL',
          'System observability, logging, and error tracking',
        ],
        handsOnLab: 'Full-Stack Production Capstone with automated GitHub Actions CI/CD.',
      },
    ],
  },
  {
    id: 'syl-data',
    trackName: 'Data Analytics & BI',
    badge: 'Data & Business Intelligence',
    description: 'Transform raw data into executive intelligence through SQL window functions, Python Pandas, and dashboard design.',
    durationWeeks: 12,
    modules: [
      {
        id: 'mod-data-1',
        weekNumber: 1,
        title: 'Advanced Relational SQL & Analytical Querying',
        summary: 'Master complex multi-table joins, subqueries, CTEs, and window analytical functions.',
        topics: [
          'Data modeling, normalization, and relational integrity',
          'Window functions: ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE()',
          'Running totals, moving averages, and cumulative distributions',
          'Common Table Expressions (CTEs) and recursive query designs',
        ],
        handsOnLab: 'Financial ledger analysis and fraud anomaly detection querying.',
      },
      {
        id: 'mod-data-2',
        weekNumber: 4,
        title: 'Python for Data Science (NumPy, Pandas & Cleaning)',
        summary: 'Programmatic data wrangling, missing-value imputation, outlier detection, and statistical profiling.',
        topics: [
          'Pandas DataFrame manipulations, grouping, and aggregations',
          'Time series analysis and datetime indexing',
          'Data cleaning protocols and regex text extraction',
          'Exploratory Data Analysis (EDA) visualizations with Seaborn',
        ],
        handsOnLab: 'End-to-End E-Commerce Customer Cohort & Churn Prediction Model.',
      },
      {
        id: 'mod-data-3',
        weekNumber: 8,
        title: 'Business Intelligence, Executive Dashboards & Storytelling',
        summary: 'Design intuitive, interactive KPI dashboards that influence executive product and revenue decisions.',
        topics: [
          'KPI formulation: CAC, LTV, Retention, and ARR metrics',
          'Interactive Streamlit and Power BI dashboard architectures',
          'Data storytelling: translating numbers into actionable strategic bets',
          'Automated weekly email summary scripts with Python',
        ],
        handsOnLab: 'Executive SaaS Revenue & Customer Health Dashboard in Streamlit.',
      },
    ],
  },
  {
    id: 'syl-placement',
    trackName: 'Placement Preparation & Interview Mastery',
    badge: 'Career Acceleration',
    description: 'Master core Data Structures & Algorithms, System Design fundamentals, and mock technical interview rounds.',
    durationWeeks: 10,
    modules: [
      {
        id: 'mod-place-1',
        weekNumber: 1,
        title: 'DSA Mastery: Linear & Non-Linear Data Structures',
        summary: 'In-depth problem solving for Arrays, Strings, Two Pointers, Linked Lists, Stacks, and Queues.',
        topics: [
          'Time & Space Complexity analysis (Big-O notation)',
          'Sliding Window, Two-Pointer, and Fast-Slow Pointer patterns',
          'Monotonic Stack and Queue interview puzzles',
          'Binary Search variations and rotated sorted arrays',
        ],
        handsOnLab: 'Solve 40 targeted LeetCode Medium/Hard algorithmic challenges.',
      },
      {
        id: 'mod-place-2',
        weekNumber: 4,
        title: 'Trees, Graphs, Dynamic Programming & Backtracking',
        summary: 'Mastering recursion, tree traversals, shortest path graph algorithms, and 1D/2D memoization.',
        topics: [
          'Binary Search Trees, Lowest Common Ancestor & Tree DP',
          'Graph BFS, DFS, Cycle Detection, and Topological Sorting',
          'Dijkstra and Minimum Spanning Trees algorithms',
          'Dynamic Programming: Knapsack, LCS, and Grid paths',
        ],
        handsOnLab: 'Implement graph routing engine and benchmark DP memoization vs tabulation.',
      },
      {
        id: 'mod-place-3',
        weekNumber: 8,
        title: 'High-Level System Design & Mock Interview Gauntlet',
        summary: 'Scalable system architecture patterns paired with realistic 1-on-1 mock interview evaluations.',
        topics: [
          'Horizontal scaling, Load Balancers, and Reverse Proxies',
          'Caching strategies (Cache-Aside, Write-Through) & Redis',
          'Database partitioning, replication & CAP Theorem trade-offs',
          'Behavioral interview frameworks (STAR method) & resume crafting',
        ],
        handsOnLab: 'Design URL Shortener (Bitly) and Live Chat Messaging Architecture.',
      },
    ],
  },
  {
    id: 'syl-python',
    trackName: 'Python Programming & AI Essentials',
    badge: 'AI & Backend Automation',
    description: 'Modern Python programming from core OOP to asynchronous APIs and LLM vector retrieval pipelines.',
    durationWeeks: 10,
    modules: [
      {
        id: 'mod-py-1',
        weekNumber: 1,
        title: 'Modern Python 3.12 & Object-Oriented Architecture',
        summary: 'Master classes, dunder methods, decorators, context managers, and type hinting in Python.',
        topics: [
          'Object-Oriented Design, inheritance, and dataclasses',
          'Generators, iterators, and custom context managers',
          'Functional programming tools (map, filter, functools)',
          'Packaging and virtual environment management with Poetry',
        ],
        handsOnLab: 'Build an automated algorithmic trading backtester in pure Python.',
      },
      {
        id: 'mod-py-2',
        weekNumber: 4,
        title: 'FastAPI Microservices & Asynchronous Concurrency',
        summary: 'Building blazingly fast asynchronous web services with automatic OpenAPI documentation and Pydantic validation.',
        topics: [
          'Asyncio event loop, tasks, and concurrency vs multiprocessing',
          'FastAPI routing, dependency injection, and Pydantic schemas',
          'Asynchronous database drivers (SQLAlchemy async / Motor)',
          'Background workers and queue processing with Celery/Redis',
        ],
        handsOnLab: 'High-throughput async notification dispatching microservice.',
      },
      {
        id: 'mod-py-3',
        weekNumber: 7,
        title: 'AI Engineering: RAG, Embeddings & Vector Search',
        summary: 'Integrate Large Language Models into practical production workflows using LangChain and Vector databases.',
        topics: [
          'LLM prompt engineering, temperature, and structured JSON outputs',
          'Text chunking strategies and embedding models',
          'Vector database indexing with ChromaDB and FAISS',
          'Retrieval-Augmented Generation (RAG) evaluation metrics',
        ],
        handsOnLab: 'Semantic Enterprise Technical Documentation Search Assistant.',
      },
    ],
  },
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Code Mux Platform Live Cohort Schedule Released',
    content: 'Check the timetable tab for live session timings, meeting rooms, and slide decks for this week.',
    targetRole: 'all',
    date: '2026-10-29',
  },
  {
    id: 'ann-2',
    title: 'Mentor Guidelines: Attendance Verification Active',
    content: 'Mentors must mark student attendance within 30 minutes of session conclusion in the student attendance portal.',
    targetRole: 'mentor',
    date: '2026-10-28',
  },
  {
    id: 'ann-3',
    title: 'Capstone Project Submissions Now Open',
    content: 'Full-Stack and Data track capstone briefs are published. Submit your GitHub repository and live URLs for mentor review.',
    targetRole: 'student',
    date: '2026-10-27',
  },
];

const INITIAL_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-30 14:15:22',
    actor: 'Admin Console',
    role: 'Admin',
    action: 'SYSTEM_STARTUP',
    details: 'Code Mux educational platform synchronized with full role portals',
  },
  {
    id: 'log-2',
    timestamp: '2026-10-30 15:20:05',
    actor: 'Priya Sharma',
    role: 'Mentor',
    action: 'ATTENDANCE_MARKED',
    details: 'Marked attendance for 3 students in REST API Design class',
  },
];

interface AppContextType {
  currentPage: PageRoute;
  navigateTo: (page: PageRoute) => void;

  currentUser: AuthUser | null;
  loginUser: (email: string, role: UserRole, name?: string) => void;
  logoutUser: () => void;
  registerUser: (name: string, email: string, interest: string, phone?: string) => boolean;

  // User Directory Management (Admin oversight)
  usersList: AuthUser[];
  addUser: (user: Omit<AuthUser, 'id' | 'joinedAt'>) => void;
  updateUser: (id: string, updates: Partial<AuthUser>) => void;
  deleteUser: (id: string) => void;
  impersonateUser: (user: AuthUser) => void;

  // Timetable & Class Schedules
  classesList: ClassSchedule[];
  addClassSchedule: (cls: Omit<ClassSchedule, 'id'>) => void;
  updateClassSchedule: (id: string, updates: Partial<ClassSchedule>) => void;
  deleteClassSchedule: (id: string) => void;

  // Attendance Management (Students)
  attendanceList: AttendanceRecord[];
  markAttendance: (
    classId: string,
    studentId: string,
    status: 'present' | 'absent' | 'late' | 'excused',
    remarks?: string
  ) => void;
  batchMarkAttendance: (
    classId: string,
    records: { studentId: string; status: 'present' | 'absent' | 'late' | 'excused'; remarks?: string }[]
  ) => void;

  // Mentor Attendance & Conduction Log
  mentorAttendanceList: MentorAttendance[];
  logMentorSession: (classId: string, notes?: string) => void;
  updateMentorAttendanceStatus: (id: string, status: 'conducted' | 'scheduled' | 'leave') => void;

  // Projects & Deliverables
  projectsList: ProjectItem[];
  addProject: (proj: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  // Student Submissions & Grading
  submissionsList: StudentProjectSubmission[];
  submitProject: (
    projectId: string,
    githubUrl: string,
    liveDemoUrl?: string,
    notes?: string
  ) => void;
  reviewSubmission: (
    submissionId: string,
    status: 'approved' | 'needs_changes',
    grade: string,
    feedback: string
  ) => void;

  // Presentation PPTs
  presentationsList: PresentationDeck[];
  addPresentation: (deck: Omit<PresentationDeck, 'id' | 'uploadedAt'>) => void;
  deletePresentation: (id: string) => void;

  // Syllabus & Curriculum
  syllabusTracks: SyllabusTrack[];
  updateSyllabusModule: (trackId: string, module: SyllabusModule) => void;

  // Early access, Inquiries, Announcements & Logs
  earlyAccessList: EarlyAccessEntry[];
  joinEarlyAccess: (name: string, email: string, interest: string, phone?: string) => boolean;
  updateLeadStatus: (id: string, status: 'pending' | 'enrolled' | 'contacted') => void;

  contactInquiries: ContactInquiry[];
  submitContactForm: (inquiry: Omit<ContactInquiry, 'id' | 'submittedAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: 'new' | 'responded') => void;

  announcements: Announcement[];
  addAnnouncement: (title: string, content: string, targetRole: 'all' | 'student' | 'mentor') => void;

  auditLogs: SystemAuditLog[];

  // Modals & Notifications
  isEarlyAccessModalOpen: boolean;
  openEarlyAccessModal: (defaultInterest?: string) => void;
  closeEarlyAccessModal: () => void;
  modalDefaultInterest: string;

  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_PREFIX = 'codemux_v2_';

function getStored<T>(key: string, defVal: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : defVal;
  } catch (e) {
    return defVal;
  }
}

function save<T>(key: string, val: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val));
  } catch (e) {
    // ignore
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() =>
    getStored<AuthUser | null>('currentUser', null)
  );

  // Users Directory
  const [usersList, setUsersList] = useState<AuthUser[]>(() =>
    getStored<AuthUser[]>('usersList', INITIAL_USERS)
  );

  // Timetable
  const [classesList, setClassesList] = useState<ClassSchedule[]>(() =>
    getStored<ClassSchedule[]>('classesList', INITIAL_CLASSES)
  );

  // Attendance
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(() =>
    getStored<AttendanceRecord[]>('attendanceList', INITIAL_ATTENDANCE)
  );

  // Mentor Attendance
  const [mentorAttendanceList, setMentorAttendanceList] = useState<MentorAttendance[]>(() =>
    getStored<MentorAttendance[]>('mentorAttendanceList', INITIAL_MENTOR_ATTENDANCE)
  );

  // Projects
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(() =>
    getStored<ProjectItem[]>('projectsList', INITIAL_PROJECTS)
  );

  // Submissions
  const [submissionsList, setSubmissionsList] = useState<StudentProjectSubmission[]>(() =>
    getStored<StudentProjectSubmission[]>('submissionsList', INITIAL_SUBMISSIONS)
  );

  // Presentations / PPTs
  const [presentationsList, setPresentationsList] = useState<PresentationDeck[]>(() =>
    getStored<PresentationDeck[]>('presentationsList', INITIAL_PRESENTATIONS)
  );

  // Syllabus Tracks
  const [syllabusTracks, setSyllabusTracks] = useState<SyllabusTrack[]>(() =>
    getStored<SyllabusTrack[]>('syllabusTracks', INITIAL_SYLLABUS)
  );

  // Early Access & Inquiries
  const [earlyAccessList, setEarlyAccessList] = useState<EarlyAccessEntry[]>(() =>
    getStored<EarlyAccessEntry[]>('earlyAccess', [
      {
        id: 'lead-1',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        interest: 'Full-Stack Web Development',
        phone: '+91 98765 43210',
        submittedAt: '2026-10-28 09:30',
        status: 'enrolled',
      },
      {
        id: 'lead-2',
        name: 'Sneha Verma',
        email: 'sneha.v@example.com',
        interest: 'Data Analytics & BI',
        phone: '+91 98123 45678',
        submittedAt: '2026-10-29 11:45',
        status: 'pending',
      },
    ])
  );

  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>(() =>
    getStored<ContactInquiry[]>('inquiries', [
      {
        id: 'inq-1',
        name: 'Rohan Gupta',
        email: 'rohan.gupta@example.com',
        subject: 'Placement Preparation schedule query',
        interest: 'Placement Preparation & Interview Mastery',
        message: 'Could you please confirm if mock interviews are conducted 1-on-1?',
        submittedAt: '2026-10-29 12:10',
        status: 'new',
      },
    ])
  );

  const [announcements, setAnnouncements] = useState<Announcement[]>(() =>
    getStored<Announcement[]>('announcements', INITIAL_ANNOUNCEMENTS)
  );

  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>(() =>
    getStored<SystemAuditLog[]>('auditLogs', INITIAL_AUDIT_LOGS)
  );

  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const [modalDefaultInterest, setModalDefaultInterest] = useState('Full-Stack Web Development');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to local storage
  useEffect(() => { save('currentUser', currentUser); }, [currentUser]);
  useEffect(() => { save('usersList', usersList); }, [usersList]);
  useEffect(() => { save('classesList', classesList); }, [classesList]);
  useEffect(() => { save('attendanceList', attendanceList); }, [attendanceList]);
  useEffect(() => { save('mentorAttendanceList', mentorAttendanceList); }, [mentorAttendanceList]);
  useEffect(() => { save('projectsList', projectsList); }, [projectsList]);
  useEffect(() => { save('submissionsList', submissionsList); }, [submissionsList]);
  useEffect(() => { save('presentationsList', presentationsList); }, [presentationsList]);
  useEffect(() => { save('syllabusTracks', syllabusTracks); }, [syllabusTracks]);
  useEffect(() => { save('earlyAccess', earlyAccessList); }, [earlyAccessList]);
  useEffect(() => { save('inquiries', contactInquiries); }, [contactInquiries]);
  useEffect(() => { save('announcements', announcements); }, [announcements]);
  useEffect(() => { save('auditLogs', auditLogs); }, [auditLogs]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAudit = (actor: string, role: string, action: string, details: string) => {
    const log: SystemAuditLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor,
      role,
      action,
      details,
    };
    setAuditLogs((prev) => [log, ...prev]);
  };

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginUser = (email: string, role: UserRole, customName?: string) => {
    // Check if user already exists in usersList
    const existing = usersList.find((u) => u.email.toLowerCase() === email.toLowerCase());
    let user: AuthUser;

    if (existing) {
      user = existing;
    } else {
      let name = customName || '';
      if (!name) {
        if (role === 'admin') name = 'Admin Portal Manager';
        else if (role === 'mentor') name = 'Senior Technical Mentor';
        else name = email.split('@')[0].replace(/[._]/g, ' ') || 'Learner';
      }

      user = {
        id: 'usr-' + Date.now(),
        name,
        email,
        role,
        joinedAt: new Date().toISOString().split('T')[0],
        status: 'active',
        track: role === 'student' ? 'Full-Stack Web Development' : undefined,
        batch: role === 'student' ? 'Cohort 2026-A' : undefined,
      };

      setUsersList((prev) => [...prev, user]);
    }

    setCurrentUser(user);
    logAudit(user.name, user.role.toUpperCase(), 'USER_LOGIN', `Logged in as ${user.role} (${user.email})`);
    addToast('success', `Welcome back, ${user.name}!`, `Signed in to Code Mux ${user.role} portal.`);

    if (user.role === 'admin') {
      navigateTo('admin-portal');
    } else if (user.role === 'mentor') {
      navigateTo('mentor-portal');
    } else {
      navigateTo('student-portal');
    }
  };

  const logoutUser = () => {
    if (currentUser) {
      logAudit(currentUser.name, currentUser.role.toUpperCase(), 'USER_LOGOUT', `Logged out`);
    }
    setCurrentUser(null);
    addToast('info', 'Logged Out', 'You have been signed out.');
    navigateTo('home');
  };

  const registerUser = (name: string, email: string, interest: string, phone?: string): boolean => {
    const user: AuthUser = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role: 'student',
      interest,
      track: interest,
      batch: 'Cohort 2026-A',
      phone,
      joinedAt: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    setUsersList((prev) => [...prev, user]);
    setCurrentUser(user);
    logAudit(name, 'STUDENT', 'STUDENT_REGISTER', `New student registered for ${interest}`);
    addToast('success', 'Account Created!', `Welcome to Code Mux, ${name}!`);
    navigateTo('student-portal');
    return true;
  };

  // User Management
  const addUser = (newUser: Omit<AuthUser, 'id' | 'joinedAt'>) => {
    const user: AuthUser = {
      ...newUser,
      id: 'usr-' + Date.now(),
      joinedAt: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    setUsersList((prev) => [user, ...prev]);
    logAudit('Admin', 'ADMIN', 'USER_CREATE', `Created user ${user.name} (${user.role})`);
    addToast('success', 'User Added', `Added ${user.name} to the platform directory.`);
  };

  const updateUser = (id: string, updates: Partial<AuthUser>) => {
    setUsersList((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
    if (currentUser?.id === id) {
      setCurrentUser((prev) => (prev ? { ...prev, ...updates } : null));
    }
    logAudit('Admin', 'ADMIN', 'USER_UPDATE', `Updated user ID: ${id}`);
    addToast('success', 'User Updated', 'User profile details were successfully saved.');
  };

  const deleteUser = (id: string) => {
    const target = usersList.find((u) => u.id === id);
    setUsersList((prev) => prev.filter((u) => u.id !== id));
    logAudit('Admin', 'ADMIN', 'USER_DELETE', `Deleted user: ${target?.name || id}`);
    addToast('info', 'User Removed', 'User has been deleted from the directory.');
  };

  const impersonateUser = (target: AuthUser) => {
    setCurrentUser(target);
    logAudit('Admin', 'ADMIN', 'IMPERSONATE', `Switched view as ${target.name} (${target.role})`);
    addToast('info', `Switched View: ${target.name}`, `Now previewing as ${target.role}.`);
    if (target.role === 'mentor') navigateTo('mentor-portal');
    else if (target.role === 'student') navigateTo('student-portal');
    else navigateTo('admin-portal');
  };

  // Timetable
  const addClassSchedule = (cls: Omit<ClassSchedule, 'id'>) => {
    const newClass: ClassSchedule = {
      ...cls,
      id: 'cls-' + Date.now(),
    };
    setClassesList((prev) => [newClass, ...prev]);

    // Also auto-add to mentor attendance schedule
    const mentorAtt: MentorAttendance = {
      id: 'matt-' + Date.now(),
      classId: newClass.id,
      classTopic: newClass.topic,
      mentorId: newClass.mentorId,
      mentorName: newClass.mentorName,
      date: newClass.date,
      scheduledTime: newClass.time,
      status: 'scheduled',
      durationMinutes: 120,
    };
    setMentorAttendanceList((prev) => [mentorAtt, ...prev]);

    logAudit('Admin', 'ADMIN', 'CLASS_CREATE', `Scheduled "${cls.topic}" on ${cls.date}`);
    addToast('success', 'Class Scheduled', `Live session added to the timetable.`);
  };

  const updateClassSchedule = (id: string, updates: Partial<ClassSchedule>) => {
    setClassesList((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    logAudit('Admin/Mentor', 'ADMIN', 'CLASS_UPDATE', `Updated class ID: ${id}`);
    addToast('success', 'Schedule Updated', 'Class details and room links saved.');
  };

  const deleteClassSchedule = (id: string) => {
    setClassesList((prev) => prev.filter((c) => c.id !== id));
    logAudit('Admin', 'ADMIN', 'CLASS_DELETE', `Deleted class ID: ${id}`);
    addToast('info', 'Class Removed', 'Session deleted from the timetable.');
  };

  // Attendance
  const markAttendance = (
    classId: string,
    studentId: string,
    status: 'present' | 'absent' | 'late' | 'excused',
    remarks?: string
  ) => {
    const targetClass = classesList.find((c) => c.id === classId);
    const targetStudent = usersList.find((u) => u.id === studentId);

    const existingIdx = attendanceList.findIndex(
      (a) => a.classId === classId && a.studentId === studentId
    );

    const record: AttendanceRecord = {
      id: existingIdx >= 0 ? attendanceList[existingIdx].id : 'att-' + Date.now() + Math.random().toString().slice(2, 5),
      classId,
      classTopic: targetClass?.topic || 'Live Session',
      classDate: targetClass?.date || new Date().toISOString().split('T')[0],
      studentId,
      studentName: targetStudent?.name || 'Student',
      studentEmail: targetStudent?.email,
      track: targetClass?.track || 'General',
      batch: targetClass?.batch || 'Cohort 2026-A',
      status,
      markedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      markedBy: currentUser ? `${currentUser.name} (${currentUser.role})` : 'System',
      remarks,
    };

    if (existingIdx >= 0) {
      setAttendanceList((prev) => {
        const copy = [...prev];
        copy[existingIdx] = record;
        return copy;
      });
    } else {
      setAttendanceList((prev) => [record, ...prev]);
    }

    logAudit(currentUser?.name || 'Mentor', 'ATTENDANCE', 'MARK_ATTENDANCE', `Marked ${status} for ${targetStudent?.name}`);
    addToast('success', 'Attendance Marked', `Recorded ${status} for ${targetStudent?.name}.`);
  };

  const batchMarkAttendance = (
    classId: string,
    records: { studentId: string; status: 'present' | 'absent' | 'late' | 'excused'; remarks?: string }[]
  ) => {
    const targetClass = classesList.find((c) => c.id === classId);
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const marker = currentUser ? `${currentUser.name} (${currentUser.role})` : 'System';

    setAttendanceList((prev) => {
      const updated = [...prev];
      for (const item of records) {
        const student = usersList.find((u) => u.id === item.studentId);
        const idx = updated.findIndex((a) => a.classId === classId && a.studentId === item.studentId);
        const rec: AttendanceRecord = {
          id: idx >= 0 ? updated[idx].id : 'att-' + Date.now() + Math.random().toString().slice(2, 6),
          classId,
          classTopic: targetClass?.topic || 'Class',
          classDate: targetClass?.date || nowStr.split(' ')[0],
          studentId: item.studentId,
          studentName: student?.name || 'Student',
          studentEmail: student?.email,
          track: targetClass?.track || 'General',
          batch: targetClass?.batch || 'Cohort 2026-A',
          status: item.status,
          markedAt: nowStr,
          markedBy: marker,
          remarks: item.remarks,
        };
        if (idx >= 0) {
          updated[idx] = rec;
        } else {
          updated.push(rec);
        }
      }
      return updated;
    });

    logAudit(currentUser?.name || 'Mentor', 'ATTENDANCE', 'BATCH_MARK', `Saved attendance for ${records.length} students`);
    addToast('success', 'Attendance Saved', `Roster updated for ${records.length} learners.`);
  };

  // Mentor Session Conduction
  const logMentorSession = (classId: string, notes?: string) => {
    const targetClass = classesList.find((c) => c.id === classId);
    const mentor = currentUser;

    const existingIdx = mentorAttendanceList.findIndex((m) => m.classId === classId);
    const rec: MentorAttendance = {
      id: existingIdx >= 0 ? mentorAttendanceList[existingIdx].id : 'matt-' + Date.now(),
      classId,
      classTopic: targetClass?.topic || 'Lecture',
      mentorId: mentor?.id || 'usr-mentor-1',
      mentorName: mentor?.name || 'Mentor',
      date: targetClass?.date || new Date().toISOString().split('T')[0],
      scheduledTime: targetClass?.time || '10:00 AM - 12:00 PM',
      status: 'conducted',
      durationMinutes: 120,
      checkedInAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notes: notes || 'Session delivered successfully with live coding demo.',
    };

    if (existingIdx >= 0) {
      setMentorAttendanceList((prev) => {
        const copy = [...prev];
        copy[existingIdx] = rec;
        return copy;
      });
    } else {
      setMentorAttendanceList((prev) => [rec, ...prev]);
    }

    // Mark class as completed
    updateClassSchedule(classId, { status: 'completed' });
    logAudit(mentor?.name || 'Mentor', 'MENTOR', 'SESSION_CHECKIN', `Conducted class "${rec.classTopic}"`);
    addToast('success', 'Session Completed', 'Mentor attendance verified and lecture marked as conducted.');
  };

  const updateMentorAttendanceStatus = (id: string, status: 'conducted' | 'scheduled' | 'leave') => {
    setMentorAttendanceList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
    addToast('info', 'Status Updated', `Mentor attendance marked as ${status}`);
  };

  // Projects
  const addProject = (proj: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = {
      ...proj,
      id: 'proj-' + Date.now(),
    };
    setProjectsList((prev) => [newProj, ...prev]);
    logAudit('Admin', 'ADMIN', 'PROJECT_CREATE', `Created project: ${proj.title}`);
    addToast('success', 'Project Added', `"${proj.title}" published to student portal.`);
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setProjectsList((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    addToast('success', 'Project Updated', 'Project specifications saved.');
  };

  const deleteProject = (id: string) => {
    setProjectsList((prev) => prev.filter((p) => p.id !== id));
    addToast('info', 'Project Removed', 'Project removed from assignments.');
  };

  // Submissions & Grading
  const submitProject = (
    projectId: string,
    githubUrl: string,
    liveDemoUrl?: string,
    notes?: string
  ) => {
    const proj = projectsList.find((p) => p.id === projectId);
    const student = currentUser;

    const submission: StudentProjectSubmission = {
      id: 'sub-' + Date.now(),
      projectId,
      projectTitle: proj?.title || 'Capstone Project',
      studentId: student?.id || 'usr-student-1',
      studentName: student?.name || 'Student',
      studentEmail: student?.email || 'student@codemux.in',
      track: proj?.track || student?.track || 'Full-Stack Web Development',
      githubUrl,
      liveDemoUrl,
      notes,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'pending_review',
    };

    setSubmissionsList((prev) => [submission, ...prev]);
    logAudit(student?.name || 'Student', 'STUDENT', 'PROJECT_SUBMIT', `Submitted project: ${submission.projectTitle}`);
    addToast('success', 'Project Submitted!', 'Your code has been submitted to mentors for evaluation.');
  };

  const reviewSubmission = (
    submissionId: string,
    status: 'approved' | 'needs_changes',
    grade: string,
    feedback: string
  ) => {
    const reviewer = currentUser ? `${currentUser.name} (${currentUser.role})` : 'Mentor';
    setSubmissionsList((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? {
              ...s,
              status,
              grade,
              feedback,
              reviewedBy: reviewer,
              reviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            }
          : s
      )
    );
    logAudit(reviewer, 'MENTOR/ADMIN', 'PROJECT_REVIEW', `Evaluated submission ID ${submissionId}: ${status}`);
    addToast('success', 'Review Saved', `Project marked as ${status} with grade ${grade}.`);
  };

  // Presentations / PPTs
  const addPresentation = (deck: Omit<PresentationDeck, 'id' | 'uploadedAt'>) => {
    const newDeck: PresentationDeck = {
      ...deck,
      id: 'ppt-' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setPresentationsList((prev) => [newDeck, ...prev]);
    logAudit(deck.uploadedBy, 'MENTOR/ADMIN', 'PPT_UPLOAD', `Uploaded slide deck: ${deck.title}`);
    addToast('success', 'Slide Deck Uploaded', `"${deck.title}" is now available in PPT portal.`);
  };

  const deletePresentation = (id: string) => {
    setPresentationsList((prev) => prev.filter((p) => p.id !== id));
    addToast('info', 'Deck Removed', 'Slide deck removed from library.');
  };

  // Syllabus
  const updateSyllabusModule = (trackId: string, module: SyllabusModule) => {
    setSyllabusTracks((prev) =>
      prev.map((track) => {
        if (track.id !== trackId) return track;
        const modIdx = track.modules.findIndex((m) => m.id === module.id);
        const newMods = [...track.modules];
        if (modIdx >= 0) {
          newMods[modIdx] = module;
        } else {
          newMods.push(module);
        }
        return { ...track, modules: newMods };
      })
    );
    addToast('success', 'Syllabus Updated', 'Course module outline updated.');
  };

  // Early access & Inquiries
  const openEarlyAccessModal = (defaultInterest = 'Full-Stack Web Development') => {
    setModalDefaultInterest(defaultInterest);
    setIsEarlyAccessModalOpen(true);
  };

  const closeEarlyAccessModal = () => {
    setIsEarlyAccessModalOpen(false);
  };

  const joinEarlyAccess = (name: string, email: string, interest: string, phone?: string): boolean => {
    const entry: EarlyAccessEntry = {
      id: 'lead-' + Date.now(),
      name,
      email,
      interest,
      phone,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'pending',
    };

    setEarlyAccessList((prev) => [entry, ...prev]);
    logAudit(name, 'VISITOR', 'WAITLIST_SUBMIT', `Joined early access for ${interest}`);
    addToast(
      'success',
      'Priority Registration Confirmed!',
      `Thank you, ${name}! We will update you at ${email} as soon as program details are announced.`
    );
    closeEarlyAccessModal();
    return true;
  };

  const updateLeadStatus = (id: string, status: 'pending' | 'enrolled' | 'contacted') => {
    setEarlyAccessList((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    addToast('info', 'Status Updated', `Lead status updated to ${status}`);
  };

  const submitContactForm = (inquiryData: Omit<ContactInquiry, 'id' | 'submittedAt' | 'status'>) => {
    const inquiry: ContactInquiry = {
      ...inquiryData,
      id: 'inq-' + Date.now(),
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'new',
    };
    setContactInquiries((prev) => [inquiry, ...prev]);
    logAudit(inquiry.name, 'PUBLIC', 'CONTACT_SUBMIT', `Enquiry: ${inquiry.subject}`);
    addToast(
      'success',
      'Message Received',
      'Thank you for contacting Code Mux. We will reply to your email within 24 business hours.'
    );
  };

  const updateInquiryStatus = (id: string, status: 'new' | 'responded') => {
    setContactInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    addToast('info', 'Status Updated', `Inquiry status changed to ${status}`);
  };

  const addAnnouncement = (title: string, content: string, targetRole: 'all' | 'student' | 'mentor') => {
    const newAnn: Announcement = {
      id: 'ann-' + Date.now(),
      title,
      content,
      targetRole,
      date: new Date().toISOString().split('T')[0],
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    logAudit(currentUser?.name || 'Admin', 'ADMIN', 'ANNOUNCEMENT_POST', `Broadcasted: ${title}`);
    addToast('success', 'Announcement Published', 'Notification sent to target users.');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        currentUser,
        loginUser,
        logoutUser,
        registerUser,

        usersList,
        addUser,
        updateUser,
        deleteUser,
        impersonateUser,

        classesList,
        addClassSchedule,
        updateClassSchedule,
        deleteClassSchedule,

        attendanceList,
        markAttendance,
        batchMarkAttendance,

        mentorAttendanceList,
        logMentorSession,
        updateMentorAttendanceStatus,

        projectsList,
        addProject,
        updateProject,
        deleteProject,

        submissionsList,
        submitProject,
        reviewSubmission,

        presentationsList,
        addPresentation,
        deletePresentation,

        syllabusTracks,
        updateSyllabusModule,

        earlyAccessList,
        joinEarlyAccess,
        updateLeadStatus,

        contactInquiries,
        submitContactForm,
        updateInquiryStatus,

        announcements,
        addAnnouncement,

        auditLogs,

        isEarlyAccessModalOpen,
        openEarlyAccessModal,
        closeEarlyAccessModal,
        modalDefaultInterest,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
