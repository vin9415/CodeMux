export type UserRole = 'student' | 'mentor' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  interest?: string;
  track?: string;
  batch?: string;
  status?: 'active' | 'inactive';
  avatar?: string;
  joinedAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  interest: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'responded';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetRole: 'all' | 'student' | 'mentor';
  date: string;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  details: string;
}

export interface ClassSchedule {
  id: string;
  track: string;
  batch: string;
  topic: string;
  description: string;
  mentorId: string;
  mentorName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM - 12:00 PM"
  roomLink: string;
  pptTitle?: string;
  pptUrl?: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  recordingUrl?: string;
}

export interface AttendanceRecord {
  id: string;
  classId: string;
  classTopic: string;
  classDate: string;
  studentId: string;
  studentName: string;
  studentEmail?: string;
  track: string;
  batch: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedAt: string;
  markedBy: string;
  remarks?: string;
}

export interface MentorAttendance {
  id: string;
  classId: string;
  classTopic: string;
  mentorId: string;
  mentorName: string;
  date: string;
  scheduledTime: string;
  status: 'conducted' | 'scheduled' | 'leave';
  durationMinutes: number;
  checkedInAt?: string;
  notes?: string;
}

export interface ProjectItem {
  id: string;
  track: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  deadline: string;
  deliverables: string[];
  starterCodeUrl?: string;
  evaluationCriteria: string[];
}

export interface StudentProjectSubmission {
  id: string;
  projectId: string;
  projectTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  track: string;
  githubUrl: string;
  liveDemoUrl?: string;
  notes?: string;
  submittedAt: string;
  status: 'pending_review' | 'approved' | 'needs_changes';
  grade?: string;
  feedback?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface SyllabusModule {
  id: string;
  weekNumber: number;
  title: string;
  summary: string;
  topics: string[];
  handsOnLab: string;
}

export interface SyllabusTrack {
  id: string;
  trackName: string;
  badge: string;
  description: string;
  durationWeeks: number;
  modules: SyllabusModule[];
}

export interface PresentationDeck {
  id: string;
  track: string;
  title: string;
  topic: string;
  slidesCount: number;
  fileType: 'PPTX' | 'PDF Deck' | 'Google Slides';
  downloadOrViewUrl: string;
  uploadedBy: string;
  uploadedAt: string;
  description: string;
}

export type CertificateStatus = 'active' | 'revoked';

export interface CertificateRecord {
  id: string;
  certificate_serial_number: string;
  student_id: string;
  course_id: string;
  instructor_id: string;
  student_name_snapshot: string;
  course_name_snapshot: string;
  instructor_name_snapshot: string;
  course_duration_snapshot: string;
  enrollment_date: string;
  completion_date: string;
  issue_date: string;
  certificate_status: CertificateStatus;
  certificate_pdf_url: string;
  template_version: string;
  issued_by: string;
  revoked_reason?: string;
  revoked_at?: string;
  revoked_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CertificateEligibility {
  courseId: string;
  courseName: string;
  duration: string;
  instructorName: string;
  attendanceRate: number;
  attendancePassed: boolean;
  projectsSubmitted: number;
  projectsRequired: number;
  projectsPassed: boolean;
  modulesCompleted: number;
  totalModules: number;
  status: 'not_eligible' | 'in_progress' | 'eligible' | 'issued' | 'revoked';
  certificate?: CertificateRecord;
}

export interface CertificateAuditLog {
  id: string;
  certificate_serial_number: string;
  action: 'ISSUED' | 'REVOKED' | 'REISSUED' | 'VERIFIED';
  performed_by: string;
  timestamp: string;
  details: string;
  reason?: string;
}

export interface CertificateEmailLog {
  id: string;
  certificate_serial_number: string;
  recipient_email: string;
  recipient_name: string;
  subject: string;
  sent_at: string;
  status: 'sent' | 'delivered';
}
