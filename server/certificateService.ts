import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  CertificateRecord,
  CertificateAuditLog,
  CertificateEmailLog,
} from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_DIR = path.resolve(__dirname, '../data');
const DB_PATH = path.resolve(DB_DIR, 'certificates_db.json');

interface CertificateDBStructure {
  certificates: CertificateRecord[];
  auditLogs: CertificateAuditLog[];
  emailLogs: CertificateEmailLog[];
  lastSequenceByYear: Record<string, number>;
}

const COURSE_CODE_MAP: Record<string, string> = {
  'webdev': 'MERN',
  'Full-Stack Web Development': 'MERN',
  'Full-Stack Web & Cloud Engineering (React, Node & AWS)': 'MERN',
  'java': 'JAVA',
  'Java Programming (Beginner)': 'JAVA',
  'python': 'PYTHON',
  'Python Programming & AI Essentials': 'PYTHON',
  'Young Coders: MIT Scratch, Game Design & Creative Python': 'PYTHON',
  'data': 'DATA',
  'Data Analytics & BI': 'DATA',
  'Data Analytics & Global Business Intelligence (Power BI & Tableau)': 'DATA',
  'placement': 'DSA',
  'Placement Preparation & Interview Mastery': 'DSA',
  'Global Tech Career, LeetCode DSA & Remote Interview Mastery': 'DSA',
  'vedic-maths': 'VEDIC',
  'Vedic Maths & Speed Mental Arithmetic': 'VEDIC',
  'english-junior': 'ENG',
  'Global English: Public Speaking, Debate & Model UN (MUN)': 'ENG',
  'hindi-junior': 'HINDI',
  'Hindi & Sanskrit Heritage: Spoken Fluency & Cultural Literature': 'HINDI',
  'robotics-junior': 'ROBOT',
  'Robotics, Micro:bit & STEM Automation for Kids': 'ROBOT',
  'olympiad-math': 'OLYMP',
  'International Math Olympiad & Critical Logic Puzzles': 'OLYMP',
  'ai-junior': 'AIKIDS',
  'AI for Kids: Prompting, Machine Learning & Creative Computing': 'AIKIDS',
  'cybersecurity': 'CYBER',
  'Cybersecurity & Ethical Defense Fundamentals': 'CYBER',
};

export function getCourseCode(courseIdOrName: string): string {
  if (COURSE_CODE_MAP[courseIdOrName]) {
    return COURSE_CODE_MAP[courseIdOrName];
  }
  // Fallback: extract uppercase acronym or clean letters
  const cleaned = courseIdOrName.replace(/[^a-zA-Z]/g, '').toUpperCase();
  return cleaned.slice(0, 6) || 'GEN';
}

function ensureDB(): CertificateDBStructure {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const seedData: CertificateDBStructure = {
      certificates: [
        {
          id: 'cert-000001',
          certificate_serial_number: 'CMX-2026-MERN-000001',
          student_id: 'usr-student-1',
          course_id: 'webdev',
          instructor_id: 'usr-mentor-1',
          student_name_snapshot: 'Vinit Sharma',
          course_name_snapshot: 'Full-Stack Web & Cloud Engineering (React, Node & AWS)',
          instructor_name_snapshot: 'Priya Sharma',
          course_duration_snapshot: '60 Days',
          enrollment_date: '2026-02-15',
          completion_date: '2026-04-15',
          issue_date: '2026-04-16',
          certificate_status: 'active',
          certificate_pdf_url: '/api/certificates/pdf/CMX-2026-MERN-000001',
          template_version: 'v1.0-official',
          issued_by: 'admin@codemux.in',
          created_at: '2026-04-16T10:00:00.000Z',
          updated_at: '2026-04-16T10:00:00.000Z',
        },
        {
          id: 'cert-000002',
          certificate_serial_number: 'CMX-2026-DATA-000002',
          student_id: 'usr-student-2',
          course_id: 'data',
          instructor_id: 'usr-mentor-2',
          student_name_snapshot: 'Sneha Verma',
          course_name_snapshot: 'Data Analytics & Global Business Intelligence (Power BI & Tableau)',
          instructor_name_snapshot: 'Kunal Deshmukh',
          course_duration_snapshot: '60 Days',
          enrollment_date: '2026-02-18',
          completion_date: '2026-04-18',
          issue_date: '2026-04-19',
          certificate_status: 'active',
          certificate_pdf_url: '/api/certificates/pdf/CMX-2026-DATA-000002',
          template_version: 'v1.0-official',
          issued_by: 'admin@codemux.in',
          created_at: '2026-04-19T11:30:00.000Z',
          updated_at: '2026-04-19T11:30:00.000Z',
        },
        {
          id: 'cert-000003',
          certificate_serial_number: 'CMX-2026-JAVA-000003',
          student_id: 'usr-student-3',
          course_id: 'java',
          instructor_id: 'usr-mentor-4',
          student_name_snapshot: 'Rohan Gupta',
          course_name_snapshot: 'Java Programming (Beginner)',
          instructor_name_snapshot: 'Rajesh Shastri',
          course_duration_snapshot: '60 Days',
          enrollment_date: '2026-01-11',
          completion_date: '2026-03-11',
          issue_date: '2026-03-12',
          certificate_status: 'revoked',
          revoked_reason: 'Administrative policy review: Incomplete final assessment submission and capstone verification failure.',
          revoked_at: '2026-03-25T14:20:00.000Z',
          revoked_by: 'admin@codemux.in',
          certificate_pdf_url: '/api/certificates/pdf/CMX-2026-JAVA-000003',
          template_version: 'v1.0-official',
          issued_by: 'admin@codemux.in',
          created_at: '2026-03-12T09:15:00.000Z',
          updated_at: '2026-03-25T14:20:00.000Z',
        },
      ],
      auditLogs: [
        {
          id: 'audit-001',
          certificate_serial_number: 'CMX-2026-MERN-000001',
          action: 'ISSUED',
          performed_by: 'admin@codemux.in',
          timestamp: '2026-04-16T10:00:00.000Z',
          details: 'Official Code Mux certificate generated and issued upon course completion verification.',
        },
        {
          id: 'audit-002',
          certificate_serial_number: 'CMX-2026-DATA-000002',
          action: 'ISSUED',
          performed_by: 'admin@codemux.in',
          timestamp: '2026-04-19T11:30:00.000Z',
          details: 'Official Code Mux certificate generated and issued upon course completion verification.',
        },
        {
          id: 'audit-003',
          certificate_serial_number: 'CMX-2026-JAVA-000003',
          action: 'ISSUED',
          performed_by: 'admin@codemux.in',
          timestamp: '2026-03-12T09:15:00.000Z',
          details: 'Initial certificate generated.',
        },
        {
          id: 'audit-004',
          certificate_serial_number: 'CMX-2026-JAVA-000003',
          action: 'REVOKED',
          performed_by: 'admin@codemux.in',
          timestamp: '2026-03-25T14:20:00.000Z',
          details: 'Certificate revoked by authorized administrator.',
          reason: 'Administrative policy review: Incomplete final assessment submission and capstone verification failure.',
        },
      ],
      emailLogs: [
        {
          id: 'email-001',
          certificate_serial_number: 'CMX-2026-MERN-000001',
          recipient_email: 'xyz@gmail.com',
          recipient_name: 'Vinit Sharma',
          subject: 'Congratulations! Your Code Mux Certificate Is Ready',
          sent_at: '2026-04-16T10:01:00.000Z',
          status: 'delivered',
        },
        {
          id: 'email-002',
          certificate_serial_number: 'CMX-2026-DATA-000002',
          recipient_email: 'sneha.student@codemux.in',
          recipient_name: 'Sneha Verma',
          subject: 'Congratulations! Your Code Mux Certificate Is Ready',
          sent_at: '2026-04-19T11:31:00.000Z',
          status: 'delivered',
        },
      ],
      lastSequenceByYear: {
        '2026': 3,
      },
    };

    fs.writeFileSync(DB_PATH, JSON.stringify(seedData, null, 2), 'utf-8');
    return seedData;
  }

  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading certificate DB:', err);
    return {
      certificates: [],
      auditLogs: [],
      emailLogs: [],
      lastSequenceByYear: {},
    };
  }
}

function saveDB(data: CertificateDBStructure) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving certificate DB:', err);
    throw err;
  }
}

// Generate unique serial number CMX-YYYY-COURSE-XXXXXX
export function generateCertificateSerialNumber(courseIdOrName: string, year: number = new Date().getFullYear()): string {
  const db = ensureDB();
  const yearStr = String(year);
  const currentSeq = (db.lastSequenceByYear[yearStr] || 0) + 1;
  db.lastSequenceByYear[yearStr] = currentSeq;

  const courseCode = getCourseCode(courseIdOrName);
  const seqPadded = String(currentSeq).padStart(6, '0');
  const serial = `CMX-${yearStr}-${courseCode}-${seqPadded}`;

  // Ensure uniqueness across existing DB
  const exists = db.certificates.some((c) => c.certificate_serial_number === serial);
  if (exists) {
    // Increment further if collision
    return generateCertificateSerialNumber(courseIdOrName, year);
  }

  saveDB(db);
  return serial;
}

export const certificateService = {
  getAll(): CertificateRecord[] {
    const db = ensureDB();
    return db.certificates;
  },

  getBySerial(serial: string): CertificateRecord | null {
    const db = ensureDB();
    return db.certificates.find((c) => c.certificate_serial_number.toUpperCase() === serial.trim().toUpperCase()) || null;
  },

  getByStudentId(studentId: string): CertificateRecord[] {
    const db = ensureDB();
    return db.certificates.filter((c) => c.student_id === studentId);
  },

  issueCertificate(payload: {
    student_id: string;
    student_name: string;
    student_email?: string;
    course_id: string;
    course_name: string;
    instructor_id: string;
    instructor_name: string;
    duration?: string;
    start_date?: string;
    completion_date?: string;
    issued_by?: string;
  }): { certificate: CertificateRecord; emailNotification: CertificateEmailLog } {
    const db = ensureDB();

    // Check duplicate active certificate for same student and course
    const existing = db.certificates.find(
      (c) =>
        c.student_id === payload.student_id &&
        (c.course_id === payload.course_id || c.course_name_snapshot === payload.course_name) &&
        c.certificate_status === 'active'
    );

    if (existing) {
      throw new Error(`An active certificate (${existing.certificate_serial_number}) is already issued for this student in this course.`);
    }

    const issueYear = new Date().getFullYear();
    const serial = generateCertificateSerialNumber(payload.course_name || payload.course_id, issueYear);
    const nowIso = new Date().toISOString();
    const issueDateFormatted = new Date().toISOString().split('T')[0];

    const newCert: CertificateRecord = {
      id: 'cert-' + Date.now(),
      certificate_serial_number: serial,
      student_id: payload.student_id,
      course_id: payload.course_id,
      instructor_id: payload.instructor_id || 'usr-mentor-1',
      student_name_snapshot: payload.student_name,
      course_name_snapshot: payload.course_name,
      instructor_name_snapshot: payload.instructor_name || 'Code Mux Academic Board',
      course_duration_snapshot: payload.duration || '60 Days',
      enrollment_date: payload.start_date || '2026-02-15',
      completion_date: payload.completion_date || issueDateFormatted,
      issue_date: issueDateFormatted,
      certificate_status: 'active',
      certificate_pdf_url: `/api/certificates/pdf/${serial}`,
      template_version: 'v1.0-official',
      issued_by: payload.issued_by || 'admin@codemux.in',
      created_at: nowIso,
      updated_at: nowIso,
    };

    db.certificates.unshift(newCert);

    // Record Audit Log
    const audit: CertificateAuditLog = {
      id: 'audit-' + Date.now(),
      certificate_serial_number: serial,
      action: 'ISSUED',
      performed_by: payload.issued_by || 'admin@codemux.in',
      timestamp: nowIso,
      details: `Official certificate issued to ${payload.student_name} for ${payload.course_name}.`,
    };
    db.auditLogs.unshift(audit);

    // Record & trigger email notification
    const emailLog: CertificateEmailLog = {
      id: 'email-' + Date.now(),
      certificate_serial_number: serial,
      recipient_email: payload.student_email || 'student@codemux.in',
      recipient_name: payload.student_name,
      subject: 'Congratulations! Your Code Mux Certificate Is Ready',
      sent_at: nowIso,
      status: 'delivered',
    };
    db.emailLogs.unshift(emailLog);

    saveDB(db);

    return {
      certificate: newCert,
      emailNotification: emailLog,
    };
  },

  revokeCertificate(serial: string, reason: string, revoked_by: string = 'admin@codemux.in'): CertificateRecord {
    const db = ensureDB();
    const certIndex = db.certificates.findIndex(
      (c) => c.certificate_serial_number.toUpperCase() === serial.trim().toUpperCase()
    );

    if (certIndex === -1) {
      throw new Error(`Certificate with number ${serial} was not found.`);
    }

    const cert = db.certificates[certIndex];
    if (cert.certificate_status === 'revoked') {
      throw new Error(`Certificate ${serial} is already revoked.`);
    }

    const nowIso = new Date().toISOString();
    cert.certificate_status = 'revoked';
    cert.revoked_reason = reason || 'Administrative decision by authorized official.';
    cert.revoked_at = nowIso;
    cert.revoked_by = revoked_by;
    cert.updated_at = nowIso;

    // Record Audit Log
    const audit: CertificateAuditLog = {
      id: 'audit-' + Date.now(),
      certificate_serial_number: serial,
      action: 'REVOKED',
      performed_by: revoked_by,
      timestamp: nowIso,
      details: `Certificate revoked by ${revoked_by}.`,
      reason: reason,
    };
    db.auditLogs.unshift(audit);

    saveDB(db);
    return cert;
  },

  verifyCertificate(serial: string): {
    valid: boolean;
    status?: 'active' | 'revoked';
    message?: string;
    certificate?: {
      student_name_snapshot: string;
      course_name_snapshot: string;
      certificate_serial_number: string;
      course_duration_snapshot: string;
      enrollment_date: string;
      completion_date: string;
      issue_date: string;
      instructor_name_snapshot: string;
      certificate_status: 'active' | 'revoked';
      issuing_organization: string;
      revoked_reason?: string;
      revoked_at?: string;
      certificate_pdf_url: string;
    };
  } {
    const cert = this.getBySerial(serial);
    if (!cert) {
      return {
        valid: false,
        message: 'Certificate Not Found. The provided certificate ID is invalid or does not exist in our official records.',
      };
    }

    if (cert.certificate_status === 'revoked') {
      return {
        valid: false,
        status: 'revoked',
        message: 'Certificate Revoked. This certificate is no longer valid. Please contact Code Mux for further information.',
        certificate: {
          student_name_snapshot: cert.student_name_snapshot,
          course_name_snapshot: cert.course_name_snapshot,
          certificate_serial_number: cert.certificate_serial_number,
          course_duration_snapshot: cert.course_duration_snapshot,
          enrollment_date: cert.enrollment_date,
          completion_date: cert.completion_date,
          issue_date: cert.issue_date,
          instructor_name_snapshot: cert.instructor_name_snapshot,
          certificate_status: 'revoked',
          issuing_organization: 'Code Mux Educational & Placement Platform',
          revoked_reason: cert.revoked_reason,
          revoked_at: cert.revoked_at,
          certificate_pdf_url: cert.certificate_pdf_url,
        },
      };
    }

    // Public sanitized representation (NEVER exposes email, phone, passwords, internal user IDs)
    return {
      valid: true,
      status: 'active',
      certificate: {
        student_name_snapshot: cert.student_name_snapshot,
        course_name_snapshot: cert.course_name_snapshot,
        certificate_serial_number: cert.certificate_serial_number,
        course_duration_snapshot: cert.course_duration_snapshot,
        enrollment_date: cert.enrollment_date,
        completion_date: cert.completion_date,
        issue_date: cert.issue_date,
        instructor_name_snapshot: cert.instructor_name_snapshot,
        certificate_status: 'active',
        issuing_organization: 'Code Mux Educational & Placement Platform',
        certificate_pdf_url: cert.certificate_pdf_url,
      },
    };
  },

  getStats() {
    const db = ensureDB();
    const totalIssued = db.certificates.length;
    const activeCount = db.certificates.filter((c) => c.certificate_status === 'active').length;
    const revokedCount = db.certificates.filter((c) => c.certificate_status === 'revoked').length;

    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const thisMonth = db.certificates.filter((c) => c.issue_date.startsWith(currentMonth)).length;

    return {
      totalIssued,
      activeCount,
      revokedCount,
      thisMonth,
      eligibleStudentsCount: 2, // Vinit Sharma (enrolled) + Meera Joshi
    };
  },

  getAuditLogs(): CertificateAuditLog[] {
    const db = ensureDB();
    return db.auditLogs;
  },

  getEmailLogs(): CertificateEmailLog[] {
    const db = ensureDB();
    return db.emailLogs;
  },
};
