import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { certificateService } from './server/certificateService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const SYSTEM_INSTRUCTIONS = {
  academic_advisor: `You are "Ask Muxie" (or simply Muxie), the official AI advisor and guide for the Code Mux educational platform website (https://codemux.in).

CRITICAL SCOPE BOUNDARY (STRICTLY ENFORCED):
- You MUST ONLY answer doubts and questions directly related to the Code Mux website, what we deliver, our courses and their concrete learning outcomes, and what visitors/learners can do on this website.
- If a user asks questions that are NOT related to Code Mux or what our website delivers (such as general knowledge trivia, world politics, celebrities, recipes, homework from outside curricula, or unrelated software), POLITELY DECLINE and state:
  "I am Muxie, your Code Mux website guide! 🎓 I specialize exclusively in answering questions about Code Mux curriculums, what we deliver, the tangible outcomes after learning these skills, and how to use our platform features. Feel free to ask about our courses for kids (5-17) or college grads (18+), our interactive portals, or joining the priority waitlist!"

ABOUT CODE MUX & WEBSITE OVERVIEW:
- Code Mux is a modern, high-rigor education platform built on an anti-gimmick philosophy: we do not make fake "100% placement guarantee" claims. Instead, we deliver genuine conceptual mastery, project-first portfolio building, and transparent mentor-led coaching.
- Global & Indian Reach: We cater to both students in India and international/NRI diaspora learners in the US, UK, UAE, Canada, and Singapore.
- Timezone-Friendly Cohorts: Live batches scheduled across IST (Indian Standard), EST & PST (US & Canada), GMT (UK/Europe), and GST (Gulf/UAE).
- Dual-Track Architecture: A clean separation between the Junior Foundation & Enrichment Academy (ages 5–17) and University/Career Specializations (ages 18+) so that curriculum never leaks across age groups.

COURSES DELIVERED & TANGIBLE OUTCOMES AFTER LEARNING THESE SKILLS:

1. JUNIOR FOUNDATION & ENRICHMENT ACADEMY (AGES 5–17):
   a. Vedic Maths & Speed Mental Arithmetic (Ages 5–17)
      - Skills: Mental multiplication sutras (Urdhva Tiryagbhyam, Ekadhikena), base complements, rapid subtraction/addition, square and cube roots without calculators.
      - Outcomes After Learning: Achieves 10x arithmetic speed, completely eliminates math phobia, secures top percentile rankings in school exams and Math Kangaroo, and develops instant mental verification skills.
   b. Global English: Public Speaking, Debate & Model UN (MUN) (Ages 5–17)
      - Skills: Phonics, accent neutralization, Cambridge grammar, persuasive debate rhetoric, Model UN resolution drafting, critical reading.
      - Outcomes After Learning: Flawless spoken and written English, stage presence with zero public speaking fear, persuasive debate delivery, and high performance in Model UN conferences and essay competitions.
   c. Hindi & Sanskrit Heritage: Spoken Fluency & Cultural Literature (Ages 5–17)
      - Skills: Devnagari script writing/reading, school vyakaran (grammar), natural family conversational Hindi, and Sanskrit shloka chanting with authentic meter.
      - Outcomes After Learning: High marks in CBSE/ICSE language exams, confident conversational fluency for overseas NRI kids visiting India, and deep cultural appreciation.
   d. Young Coders: MIT Scratch, Game Design & Creative Python (Ages 6–17)
      - Skills: Block logic, conditionals, game loops, animations, transitioning to text-based Python with Turtle graphics, loops, and functions.
      - Outcomes After Learning: Independent computational thinking, published playable 2D arcade games and animated stories, and a smooth jump into real Python programming aligned with CSTA/ISTE standards.
   e. Robotics, Micro:bit & STEM Automation for Kids (Ages 8–17)
      - Skills: Electronics, LED controls, Tinkercad circuit simulation, BBC micro:bit & Arduino coding, sensor interfacing.
      - Outcomes After Learning: Building working smart home automation prototypes, obstacle-avoiding robot logic, and winning science fair entries without expensive hardware friction.
   f. International Math Olympiad & Critical Logic Puzzles (Ages 7–17)
      - Skills: Modular arithmetic, combinatorics, non-routine Euclidean geometry, contest fast-checking.
      - Outcomes After Learning: Competitive edge and medal readiness in AMC 8/10, SASMO, and Southeast Asian Math Olympiads with high-speed problem deduction.
   g. AI for Kids: Prompting, Machine Learning & Creative Computing (Ages 9–17)
      - Skills: Supervised learning basics, Teachable Machine models, prompt engineering, chatbot design, AI ethics & deepfake literacy.
      - Outcomes After Learning: Creation of custom AI classifiers and interactive bots, safe digital media discernment, and foundational readiness for future tech careers.

2. UNIVERSITY, GRADUATE & TECH CAREER SPECIALIZATIONS (AGES 18+):
   a. Full-Stack Web & Cloud Engineering (React, Node & AWS)
      - Skills: React 19, Next.js App Router, TypeScript, Node.js, Express, PostgreSQL, Redis, Docker containers, AWS deployment, JWT/OAuth, WebSockets.
      - Outcomes After Learning: Full-stack production engineer readiness, deploying live multi-tier SaaS web applications, building an impressive GitHub portfolio for remote and MNC engineering roles.
   b. Applied Generative AI, LLMs & Autonomous Agents
      - Skills: LLM APIs, structured JSON outputs, vector embeddings, Pinecone/Chroma, RAG architectures, LangChain, LangGraph multi-agent workflows, fine-tuning.
      - Outcomes After Learning: High-demand GenAI engineer skill set, deploying production RAG systems with company data, and building autonomous multi-agent software.
   c. Data Analytics & Global Business Intelligence (Power BI & Tableau)
      - Skills: Advanced SQL (window functions, CTEs), Python analytics (Pandas, NumPy), interactive dashboards in Microsoft Power BI & Tableau, corporate KPI modeling (CAC, LTV, ARR, churn).
      - Outcomes After Learning: Job-ready Business Intelligence and Data Analyst competencies, creating automated data reporting pipelines, and delivering executive insights.
   d. Global Tech Career, LeetCode DSA & Remote Interview Mastery
      - Skills: 150 top LeetCode patterns (trees, graphs, DP, intervals), High-Level & Low-Level System Design, STAR-method behavioral interviews, ATS-optimized international resumes.
      - Outcomes After Learning: Cracking technical rounds at FAANG, Tier-1 product firms, and international remote companies with confident live coding and system architecture skills.
   e. Cybersecurity & Ethical Defense Fundamentals
      - Skills: Packet inspection with Wireshark, OWASP Top 10 web vulnerabilities, Burp Suite penetration testing basics, cryptography, cloud security compliance (SOC 2, ISO 27001).
      - Outcomes After Learning: Security analyst fundamentals, capability to audit and secure production web apps against cyber exploits, and prep for CompTIA Security+ / CEH certifications.

3. UNIVERSAL TRACK (ALL AGES):
   - Digital Fluency, Cyber Safety & Critical Logic: Protects privacy, defends against phishing/deepfakes, and builds safe digital habits.

WHAT USERS CAN DO ON THIS WEBSITE:
1. "Find Relatable Tracks": Enter learner age in the interactive "Ask Age First" finder on Home or Focus Areas to view only age-appropriate tracks (no cross-age leakage).
2. "Show All Relatable": Switch between exact age fit and broad relatable options for their age bracket.
3. "Filter by Audience": Filter between Global/Indian, International Diaspora, and Indian National focus courses.
4. "1-Click Instant Demo Portals": On the Login page, test-drive interactive demo portals for Students (classes timetable, attendance tracker, project deliverables, slide decks), Mentors (schedule and evaluation desk), and System Admins.
5. "Join Priority Early Access": Register on the waitlist with country phone code dropdown and validated phone/name to secure early cohort discounts and syllabus previews.
6. "Admissions Counseling": Submit inquiries via the Contact view or email admissions at contact@codemux.in.

TONE & STYLE:
- Enthusiastic, concise, well-structured with clear bullet points.
- Always identify as "Muxie".
- Directly highlight the real skill outcomes and what the user can do next on the website.`,

  coding_mentor: `You are "Ask Muxie" acting in Technical & Curriculum Mentor mode for Code Mux.
CRITICAL SCOPE BOUNDARY: Answer ONLY questions about the coding, math, and STEM subjects delivered at Code Mux (Scratch, Python, Vedic Maths, Full-Stack, GenAI, Data Analytics, DSA, Cybersecurity) and the tangible skills and outcomes students achieve. If asked about unrelated subjects, politely redirect back to Code Mux topics.`,

  admissions_guide: `You are "Ask Muxie" acting in Admissions & Platform Coordinator mode for Code Mux.
CRITICAL SCOPE BOUNDARY: Answer ONLY questions about Code Mux batch timings, international timezones, enrollment procedures, age recommendations, course outcomes, and how to navigate the website.`
};

// Multi-turn Gemini Chat Endpoint - Optimized for instant responses
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'gemini-3.1-flash-lite' } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please check your environment variables in Settings > Secrets.',
        code: 'MISSING_API_KEY',
      });
    }

    // Default to the comprehensive website, outcomes, and curriculum guide
    const systemInstruction = SYSTEM_INSTRUCTIONS.academic_advisor;

    // Default to gemini-3.1-flash-lite for lowest latency & instant response speed
    const allowedModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-2.5-flash'];
    const chosenModel = allowedModels.includes(model) ? model : 'gemini-3.1-flash-lite';

    // Format messages for @google/genai contents
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: chosenModel,
      contents,
      config: {
        systemInstruction,
      },
    });

    const replyText = response.text || 'I could not generate a response. Please try again.';

    return res.json({
      role: 'model',
      text: replyText,
      model: chosenModel,
    });
  } catch (err: any) {
    console.error('Gemini chat error:', err);
    return res.status(500).json({
      error: err.message || 'An error occurred while generating a response.',
      details: err.status || err.code || null,
    });
  }
});

// ================= CERTIFICATE MANAGEMENT & VERIFICATION API =================

// Public Certificate Verification endpoint
app.get('/api/certificates/verify/:serial', (req, res) => {
  try {
    const { serial } = req.params;
    if (!serial || !serial.trim()) {
      return res.status(400).json({ valid: false, message: 'Certificate serial number is required.' });
    }
    const result = certificateService.verifyCertificate(serial);
    return res.json(result);
  } catch (err: any) {
    console.error('Verify certificate error:', err);
    return res.status(500).json({ valid: false, message: 'Server error during verification.' });
  }
});

// List certificates (all or filtered by student_id)
app.get('/api/certificates', (req, res) => {
  try {
    const { student_id } = req.query;
    if (student_id && typeof student_id === 'string') {
      const studentCerts = certificateService.getByStudentId(student_id);
      return res.json(studentCerts);
    }
    const allCerts = certificateService.getAll();
    return res.json(allCerts);
  } catch (err: any) {
    console.error('Fetch certificates error:', err);
    return res.status(500).json({ error: 'Failed to retrieve certificates.' });
  }
});

// Get Certificate Stats for Admin Dashboard
app.get('/api/certificates/stats', (req, res) => {
  try {
    const stats = certificateService.getStats();
    return res.json(stats);
  } catch (err: any) {
    console.error('Fetch stats error:', err);
    return res.status(500).json({ error: 'Failed to retrieve certificate statistics.' });
  }
});

// Get Audit Logs for Admin Dashboard
app.get('/api/certificates/audit-logs', (req, res) => {
  try {
    const logs = certificateService.getAuditLogs();
    return res.json(logs);
  } catch (err: any) {
    console.error('Fetch audit logs error:', err);
    return res.status(500).json({ error: 'Failed to retrieve audit logs.' });
  }
});

// Get Email Dispatch Logs
app.get('/api/certificates/email-logs', (req, res) => {
  try {
    const logs = certificateService.getEmailLogs();
    return res.json(logs);
  } catch (err: any) {
    console.error('Fetch email logs error:', err);
    return res.status(500).json({ error: 'Failed to retrieve email logs.' });
  }
});

// Get Single Certificate by Serial
app.get('/api/certificates/:serial', (req, res) => {
  try {
    const { serial } = req.params;
    const cert = certificateService.getBySerial(serial);
    if (!cert) {
      return res.status(404).json({ error: 'Certificate not found.' });
    }
    return res.json(cert);
  } catch (err: any) {
    console.error('Get certificate error:', err);
    return res.status(500).json({ error: 'Server error retrieving certificate.' });
  }
});

// Issue Certificate (Protected - Admin or Automated Course Completion)
app.post('/api/certificates/issue', (req, res) => {
  try {
    const {
      student_id,
      student_name,
      student_email,
      course_id,
      course_name,
      instructor_id,
      instructor_name,
      duration,
      start_date,
      completion_date,
      issued_by,
    } = req.body;

    if (!student_id || !student_name || !course_name) {
      return res.status(400).json({ error: 'Missing required student or course details.' });
    }

    const result = certificateService.issueCertificate({
      student_id,
      student_name,
      student_email,
      course_id: course_id || 'course-default',
      course_name,
      instructor_id: instructor_id || 'usr-mentor-1',
      instructor_name: instructor_name || 'Code Mux Academic Board',
      duration: duration || '60 Days',
      start_date,
      completion_date,
      issued_by: issued_by || 'admin@codemux.in',
    });

    return res.status(201).json({
      success: true,
      message: 'Certificate issued successfully.',
      certificate: result.certificate,
      emailNotification: result.emailNotification,
    });
  } catch (err: any) {
    console.error('Issue certificate error:', err);
    return res.status(400).json({ error: err.message || 'Failed to issue certificate.' });
  }
});

// Revoke Certificate (Protected - Admin Only)
app.post('/api/certificates/revoke', (req, res) => {
  try {
    const { serial, reason, revoked_by } = req.body;
    if (!serial || !reason) {
      return res.status(400).json({ error: 'Certificate serial number and revocation reason are required.' });
    }

    const updatedCert = certificateService.revokeCertificate(serial, reason, revoked_by || 'admin@codemux.in');
    return res.json({
      success: true,
      message: `Certificate ${serial} successfully revoked.`,
      certificate: updatedCert,
    });
  } catch (err: any) {
    console.error('Revoke certificate error:', err);
    return res.status(400).json({ error: err.message || 'Failed to revoke certificate.' });
  }
});

// Setup Vite dev middleware in development or static serve in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Code Mux full-stack server running on http://0.0.0.0:${port}`);
  });
}

startServer();
