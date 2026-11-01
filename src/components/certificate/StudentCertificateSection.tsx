import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  ExternalLink,
  AlertCircle,
  Sparkles,
  Lock,
  ChevronRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { CertificateMasterRenderer } from './CertificateMasterRenderer';
import { CertificatePreviewModal } from './CertificatePreviewModal';
import { CertificateRecord, CertificateEligibility } from '../../types';

export const StudentCertificateSection: React.FC = () => {
  const { currentUser, attendanceList, submissionsList, syllabusTracks, navigateTo, addToast } = useApp();

  const [studentCertificates, setStudentCertificates] = useState<CertificateRecord[]>([]);
  const [isLoadingCerts, setIsLoadingCerts] = useState(true);
  const [selectedCertForModal, setSelectedCertForModal] = useState<CertificateRecord | null>(null);
  const [draftForModal, setDraftForModal] = useState<{
    studentName: string;
    courseName: string;
    duration?: string;
    startDate?: string;
    completionDate?: string;
    instructorName?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPreviewMode, setIsModalPreviewMode] = useState(false);

  // Student track & enrolled courses
  const studentTrack = currentUser?.track || currentUser?.interest || 'Full-Stack Web & Cloud Engineering (React, Node & AWS)';
  const studentId = currentUser?.id || 'usr-student-1';
  const studentName = currentUser?.name || 'Vinit Sharma';

  // Fetch student certificates from backend
  const fetchCertificates = async () => {
    try {
      setIsLoadingCerts(true);
      const res = await fetch(`/api/certificates?student_id=${encodeURIComponent(studentId)}`);
      if (res.ok) {
        const data = await res.json();
        setStudentCertificates(data);
      }
    } catch (err) {
      console.error('Error loading student certificates:', err);
    } finally {
      setIsLoadingCerts(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [studentId]);

  // Compute eligibility for the student's enrolled track
  const myAttendance = attendanceList.filter(
    (att) => att.studentId === studentId || att.studentEmail === currentUser?.email
  );
  const totalAttended = myAttendance.filter((a) => a.status === 'present' || a.status === 'late').length;
  const attendanceRate = myAttendance.length > 0 ? Math.round((totalAttended / myAttendance.length) * 100) : 94;
  const attendancePassed = attendanceRate >= 80;

  const myApprovedProjects = submissionsList.filter(
    (s) => (s.studentId === studentId || s.studentEmail === currentUser?.email) && s.status === 'approved'
  );
  const projectsPassed = myApprovedProjects.length >= 1; // At least 1 approved milestone project

  // Check if official certificate is already issued
  const issuedCert = studentCertificates.find(
    (c) => c.student_id === studentId && (c.course_name_snapshot.includes('Full-Stack') || c.course_name_snapshot.includes(studentTrack))
  );

  let currentStatus: CertificateEligibility['status'] = 'in_progress';
  if (issuedCert) {
    currentStatus = issuedCert.certificate_status === 'revoked' ? 'revoked' : 'issued';
  } else if (attendancePassed && projectsPassed) {
    currentStatus = 'eligible';
  } else if (attendanceRate < 40) {
    currentStatus = 'not_eligible';
  }

  // Open Preview Modal (either Draft Preview or Official Issued)
  const handleOpenPreview = (cert?: CertificateRecord) => {
    if (cert) {
      setSelectedCertForModal(cert);
      setDraftForModal(null);
      setIsModalPreviewMode(false);
    } else {
      setSelectedCertForModal(null);
      setDraftForModal({
        studentName,
        courseName: studentTrack,
        duration: '60 Days',
        startDate: currentUser?.joinedAt || '2026-02-15',
        completionDate: '2026-04-15',
        instructorName: 'Priya Sharma',
      });
      setIsModalPreviewMode(true);
    }
    setIsModalOpen(true);
  };

  // Automated self-claim trigger when student is eligible
  const handleClaimEligibleCertificate = async () => {
    if (currentStatus !== 'eligible') return;

    try {
      const res = await fetch('/api/certificates/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          student_name: studentName,
          student_email: currentUser?.email,
          course_id: 'webdev',
          course_name: studentTrack,
          instructor_id: 'usr-mentor-1',
          instructor_name: 'Priya Sharma',
          duration: '60 Days',
          start_date: currentUser?.joinedAt || '2026-02-15',
          completion_date: new Date().toISOString().split('T')[0],
          issued_by: 'Automated Academic Verification Engine',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to claim certificate.');
      }

      addToast('success', 'Certificate Awarded! 🎓', 'Your official Code Mux certificate has been generated and added to your profile.');
      fetchCertificates();
    } catch (err: any) {
      addToast('error', 'Issuance Error', err.message || 'Unable to generate certificate.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-stone-800">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-[#FF6B16] text-xs font-bold border border-orange-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>Code Mux Credentialing Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            My Certificates &amp; Credentials
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Track your course completion milestones, preview your upcoming certificate design with your actual name, and download officially verified PDF credentials.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={() => handleOpenPreview(issuedCert)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-300" />
            <span>{issuedCert ? 'View My Certificate' : 'Preview Design Template'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTo('verify-certificate')}
            className="px-4 py-2.5 rounded-xl bg-[#FF6B16] hover:bg-orange-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Public Verify Registry</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Enrolled Courses & Certificate Eligibility */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Card & Status (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Enrolled Program</span>
                <h3 className="text-lg font-bold text-stone-900 font-display">
                  {studentTrack}
                </h3>
              </div>

              {/* Status Badge */}
              {currentStatus === 'issued' && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Official Certificate Issued
                </span>
              )}
              {currentStatus === 'eligible' && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Requirements Met • Ready to Issue
                </span>
              )}
              {currentStatus === 'in_progress' && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> In Progress (Completing Milestones)
                </span>
              )}
              {currentStatus === 'revoked' && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Credential Revoked
                </span>
              )}
            </div>

            {/* Completion Criteria Progress Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Certificate Issuance Criteria:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Enrollment */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Enrolled in Cohort</span>
                    <span className="text-[11px] text-stone-500">Cohort 2026-A Verified</span>
                  </div>
                </div>

                {/* 2. Attendance */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      attendancePassed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    {attendancePassed ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      Attendance: {attendanceRate}%
                    </span>
                    <span className="text-[11px] text-stone-500">Min 80% required</span>
                  </div>
                </div>

                {/* 3. Project Submission */}
                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      projectsPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {projectsPassed ? <Check className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      Projects Evaluated
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {myApprovedProjects.length} approved deliverables
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Issued Certificate Details or Unlock Banner */}
            {issuedCert ? (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Official Certificate Active
                  </span>
                  <div className="text-xs text-stone-700">
                    Serial: <span className="font-mono font-bold text-stone-900">{issuedCert.certificate_serial_number}</span> • Issued on{' '}
                    {issuedCert.issue_date}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenPreview(issuedCert)}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-stone-300 hover:border-emerald-500 text-stone-800 text-xs font-bold cursor-pointer transition-colors"
                  >
                    View &amp; Download PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('verify-certificate')}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer transition-colors"
                    title="Verify on Public Registry"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : currentStatus === 'eligible' ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Congratulations! You have fulfilled all graduation requirements.
                  </span>
                  <p className="text-xs text-stone-600">
                    Your attendance rate and project assessments qualify you for official certification.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClaimEligibleCertificate}
                  className="px-4 py-2 rounded-xl bg-[#FF6B16] hover:bg-orange-600 text-white text-xs font-bold cursor-pointer transition-all shadow-xs shrink-0"
                >
                  Generate Official Certificate
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-stone-400" />
                  <span>Complete remaining assignments and attend live masterclasses to unlock issuance.</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenPreview()}
                  className="text-[#FF6B16] font-semibold hover:underline cursor-pointer"
                >
                  Preview Certificate →
                </button>
              </div>
            )}
          </div>

          {/* Live In-Dashboard Preview Embed */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-stone-900 font-display">
                  {issuedCert ? 'Issued Official Certificate' : 'Pre-Completion Certificate Preview'}
                </h3>
                <p className="text-[11px] text-stone-500">
                  {issuedCert
                    ? 'Official credential verified on Code Mux ledger.'
                    : 'See how your certificate will look with your name and course details upon completion.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPreview(issuedCert)}
                className="text-xs font-bold text-[#FF6B16] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Expand Fullscreen</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Render Certificate */}
            <CertificateMasterRenderer
              studentName={studentName}
              courseName={studentTrack}
              duration="60 Days"
              startDate={currentUser?.joinedAt || '2026-02-15'}
              completionDate="2026-04-15"
              instructorName="Priya Sharma"
              certificateSerialNumber={issuedCert ? issuedCert.certificate_serial_number : 'CMX-PREVIEW-DRAFT'}
              isPreview={!issuedCert}
              status={issuedCert?.certificate_status || 'active'}
              showControls={true}
            />
          </div>
        </div>

        {/* Right Column: FAQ, Anti-Fraud & Value Props */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 font-display flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FF6B16]" />
              <span>Certificate Privileges</span>
            </h3>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Global Verification:</strong> Share your unique credential ID on LinkedIn, your resume, or job applications.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>High-Resolution Vector PDF:</strong> Suitable for physical framing, corporate submissions, and foreign university credentials.
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Anti-Gimmick Guarantee:</strong> Issued strictly upon rigorous assignment evaluation and verified attendance.
                </span>
              </div>
            </div>
          </div>

          {/* Automated Notification Card */}
          <div className="bg-[#FAF8F5] rounded-3xl border border-stone-200 p-6 space-y-3">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Automated Notification</span>
            <h4 className="text-xs font-bold text-stone-900">Email Dispatch Upon Issuance</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              As soon as your certificate is generated, an official award notification is automatically dispatched to <span className="font-semibold text-stone-900">{currentUser?.email || 'your email'}</span> with your verification link.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CertificatePreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        certificate={selectedCertForModal}
        draftData={draftForModal || undefined}
        isPreview={isModalPreviewMode}
      />
    </div>
  );
};
