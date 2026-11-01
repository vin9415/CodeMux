import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Search,
  Filter,
  PlusCircle,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Download,
  RotateCcw,
  History,
  Mail,
  User,
  Calendar,
  BookOpen,
  FileText,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { CertificateMasterRenderer } from './CertificateMasterRenderer';
import { CertificatePreviewModal } from './CertificatePreviewModal';
import { CertificateRecord, CertificateAuditLog, CertificateEmailLog } from '../../types';

export const AdminCertificateSection: React.FC = () => {
  const { usersList, addToast } = useApp();

  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [stats, setStats] = useState({
    totalIssued: 0,
    activeCount: 0,
    revokedCount: 0,
    thisMonth: 0,
    eligibleStudentsCount: 2,
  });
  const [auditLogs, setAuditLogs] = useState<CertificateAuditLog[]>([]);
  const [emailLogs, setEmailLogs] = useState<CertificateEmailLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'revoked'>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');

  // Modals
  const [isManualIssueOpen, setIsManualIssueOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [selectedCertForRevoke, setSelectedCertForRevoke] = useState<CertificateRecord | null>(null);
  const [revokeReason, setRevokeReason] = useState('');
  const [isConfirmingRevoke, setIsConfirmingRevoke] = useState(false);

  // Preview Modal
  const [selectedCertForPreview, setSelectedCertForPreview] = useState<CertificateRecord | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Active sub-tab: 'records' | 'eligible' | 'audit' | 'email'
  const [activeSubTab, setActiveSubTab] = useState<'records' | 'eligible' | 'audit' | 'email'>('records');

  // Manual Issuance Form State
  const studentUsers = usersList.filter((u) => u.role === 'student');
  const mentorUsers = usersList.filter((u) => u.role === 'mentor');

  const [formStudentId, setFormStudentId] = useState(studentUsers[0]?.id || '');
  const [formCourseName, setFormCourseName] = useState('Full-Stack Web & Cloud Engineering (React, Node & AWS)');
  const [formInstructorId, setFormInstructorId] = useState(mentorUsers[0]?.id || '');
  const [formDuration, setFormDuration] = useState('60 Days');
  const [formStartDate, setFormStartDate] = useState('2026-02-15');
  const [formCompletionDate, setFormCompletionDate] = useState('2026-04-15');
  const [isSubmittingIssue, setIsSubmittingIssue] = useState(false);

  // Fetch all data from backend
  const refreshData = async () => {
    try {
      setIsLoading(true);
      const [certsRes, statsRes, auditRes, emailRes] = await Promise.all([
        fetch('/api/certificates'),
        fetch('/api/certificates/stats'),
        fetch('/api/certificates/audit-logs'),
        fetch('/api/certificates/email-logs'),
      ]);

      if (certsRes.ok) setCertificates(await certsRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
      if (auditRes.ok) setAuditLogs(await auditRes.json());
      if (emailRes.ok) setEmailLogs(await emailRes.json());
    } catch (err) {
      console.error('Failed to load certificates data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Filtered Certificates
  const filteredCertificates = certificates.filter((c) => {
    const matchesSearch =
      !searchQuery ||
      c.student_name_snapshot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.certificate_serial_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.course_name_snapshot.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || c.certificate_status === statusFilter;
    const matchesCourse = courseFilter === 'all' || c.course_name_snapshot.includes(courseFilter);

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Unique course list for dropdown
  const uniqueCourses = Array.from(new Set(certificates.map((c) => c.course_name_snapshot)));

  // Handle Manual Issuance
  const handleManualIssueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedStudent = studentUsers.find((s) => s.id === formStudentId);
    const selectedMentor = mentorUsers.find((m) => m.id === formInstructorId);

    if (!selectedStudent) {
      addToast('error', 'Validation Error', 'Please select a valid student.');
      return;
    }

    try {
      setIsSubmittingIssue(true);
      const res = await fetch('/api/certificates/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: selectedStudent.id,
          student_name: selectedStudent.name,
          student_email: selectedStudent.email,
          course_id: 'manual-course',
          course_name: formCourseName,
          instructor_id: selectedMentor?.id || 'usr-mentor-1',
          instructor_name: selectedMentor?.name || 'Priya Sharma',
          duration: formDuration,
          start_date: formStartDate,
          completion_date: formCompletionDate,
          issued_by: 'Administrator Console (Manual)',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to issue certificate.');
      }

      addToast('success', 'Certificate Issued! 🎓', `Successfully issued ${data.certificate.certificate_serial_number} for ${selectedStudent.name}.`);
      setIsManualIssueOpen(false);
      refreshData();
    } catch (err: any) {
      addToast('error', 'Issuance Failed', err.message || 'Could not issue certificate.');
    } finally {
      setIsSubmittingIssue(false);
    }
  };

  // Handle Revocation
  const handleOpenRevokeModal = (cert: CertificateRecord) => {
    setSelectedCertForRevoke(cert);
    setRevokeReason('');
    setIsConfirmingRevoke(false);
    setIsRevokeModalOpen(true);
  };

  const handleConfirmRevoke = async () => {
    if (!selectedCertForRevoke || !revokeReason.trim()) {
      addToast('error', 'Reason Required', 'Please provide an official audit reason for revoking this certificate.');
      return;
    }

    try {
      const res = await fetch('/api/certificates/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serial: selectedCertForRevoke.certificate_serial_number,
          reason: revokeReason.trim(),
          revoked_by: 'admin@codemux.in',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to revoke certificate.');
      }

      addToast('info', 'Certificate Revoked', `Credential ${selectedCertForRevoke.certificate_serial_number} is now marked as revoked.`);
      setIsRevokeModalOpen(false);
      setSelectedCertForRevoke(null);
      refreshData();
    } catch (err: any) {
      addToast('error', 'Revocation Error', err.message || 'Could not revoke certificate.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Total Issued</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 font-display">
            {stats.totalIssued}
          </div>
          <span className="text-[10px] text-stone-400 mt-0.5 block">Permanent ledger records</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">Active Verified</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1 font-display">
            {stats.activeCount}
          </div>
          <span className="text-[10px] text-stone-400 mt-0.5 block">Passes public checks</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">Issued This Month</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#FF6B16] mt-1 font-display">
            {stats.thisMonth}
          </div>
          <span className="text-[10px] text-stone-400 mt-0.5 block">Current cohort graduates</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block">Revoked</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1 font-display">
            {stats.revokedCount}
          </div>
          <span className="text-[10px] text-stone-400 mt-0.5 block">Security &amp; policy invalidations</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">Students Eligible</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1 font-display">
            {stats.eligibleStudentsCount}
          </div>
          <span className="text-[10px] text-stone-400 mt-0.5 block">Pending 100% criteria review</span>
        </div>
      </div>

      {/* Action Header & Subtabs */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-xl bg-stone-100 p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveSubTab('records')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeSubTab === 'records' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Issued Certificates ({certificates.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('eligible')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeSubTab === 'eligible' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Eligible Students
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('audit')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeSubTab === 'audit' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Audit Trail ({auditLogs.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('email')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeSubTab === 'email' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Email Logs ({emailLogs.length})
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsManualIssueOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#FF6B16] hover:bg-orange-600 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manually Issue Certificate</span>
          </button>
        </div>

        {/* Search & Filter Toolbar (Active for records tab) */}
        {activeSubTab === 'records' && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student, serial ID, or course..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-[#FF6B16]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                aria-label="Filter certificates by status"
                className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs font-medium text-stone-700"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only</option>
                <option value="revoked">Revoked Only</option>
              </select>

              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                aria-label="Filter certificates by course"
                className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs font-medium text-stone-700 max-w-[200px] truncate"
              >
                <option value="all">All Courses</option>
                {uniqueCourses.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {(searchQuery || statusFilter !== 'all' || courseFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setCourseFilter('all');
                  }}
                  className="px-2.5 py-1.5 text-xs text-rose-600 hover:underline cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* TAB 1: Issued Certificates Table */}
      {activeSubTab === 'records' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Certificate Serial</th>
                  <th className="py-3.5 px-4">Student Name</th>
                  <th className="py-3.5 px-4">Course Track</th>
                  <th className="py-3.5 px-4">Instructor</th>
                  <th className="py-3.5 px-4">Issue Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredCertificates.map((cert) => {
                  const isRevoked = cert.certificate_status === 'revoked';
                  return (
                    <tr key={cert.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                        {cert.certificate_serial_number}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-stone-900">
                        {cert.student_name_snapshot}
                      </td>
                      <td className="py-3.5 px-4 text-stone-700 max-w-xs truncate">
                        {cert.course_name_snapshot}
                      </td>
                      <td className="py-3.5 px-4 text-stone-600">
                        {cert.instructor_name_snapshot}
                      </td>
                      <td className="py-3.5 px-4 text-stone-500">
                        {cert.issue_date}
                      </td>
                      <td className="py-3.5 px-4">
                        {isRevoked ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-300">
                            <XCircle className="w-3 h-3" /> Revoked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3" /> Active
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCertForPreview(cert);
                              setIsPreviewModalOpen(true);
                            }}
                            className="p-1.5 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors cursor-pointer"
                            title="Inspect Certificate Preview & PDF"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {!isRevoked && (
                            <button
                              type="button"
                              onClick={() => handleOpenRevokeModal(cert)}
                              className="p-1.5 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                              title="Revoke Certificate"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredCertificates.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-stone-400">
                      No certificate records match your search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Eligible Students Section */}
      {activeSubTab === 'eligible' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-display">
                Students Approaching or Meeting Completion Criteria
              </h3>
              <p className="text-xs text-stone-500">
                Verify milestone deliverables and issue verified certificates in 1-click.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student 1: Vinit Sharma */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold text-stone-900 text-sm block">Vinit Sharma</span>
                  <span className="text-xs text-stone-500">Full-Stack Web &amp; Cloud Engineering</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  94% Attendance • 2 Projects Passed
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                <span className="text-stone-500 font-mono text-[11px]">Serial: CMX-2026-MERN-000001</span>
                <span className="text-emerald-700 font-bold">Issued &amp; Active</span>
              </div>
            </div>

            {/* Student 2: Meera Joshi */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold text-stone-900 text-sm block">Meera Joshi</span>
                  <span className="text-xs text-stone-500">Placement Preparation &amp; Interview Mastery</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                  88% Attendance • Criteria Met
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                <span className="text-stone-500">Ready for credential award</span>
                <button
                  type="button"
                  onClick={() => {
                    setFormStudentId('usr-student-4');
                    setFormCourseName('Placement Preparation & Interview Mastery');
                    setFormInstructorId('usr-mentor-3');
                    setIsManualIssueOpen(true);
                  }}
                  className="px-3 py-1 rounded-lg bg-[#FF6B16] text-white font-bold cursor-pointer hover:bg-orange-600"
                >
                  Issue Certificate →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Audit Trail */}
      {activeSubTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-sm font-bold text-stone-900 font-display flex items-center gap-2">
              <History className="w-4 h-4 text-[#FF6B16]" />
              <span>Immutable Certificate Audit Log</span>
            </h3>
            <p className="text-xs text-stone-500">
              Every certificate issuance, revocation, and verification event is permanently recorded with administrative attribution.
            </p>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        log.action === 'ISSUED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {log.action}
                    </span>
                    <span className="font-mono font-bold text-stone-900">{log.certificate_serial_number}</span>
                  </div>
                  <span className="text-[11px] text-stone-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-stone-700">{log.details}</p>
                {log.reason && (
                  <p className="text-rose-700 italic text-[11px]">Audit Reason: {log.reason}</p>
                )}
                <span className="text-[10px] text-stone-400 block">Actor: {log.performed_by}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Email Logs */}
      {activeSubTab === 'email' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-sm font-bold text-stone-900 font-display flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#FF6B16]" />
              <span>Certificate Award Email Dispatch Logs</span>
            </h3>
            <p className="text-xs text-stone-500">
              Automated notifications dispatched to students with their verification links upon certificate creation.
            </p>
          </div>

          <div className="space-y-3">
            {emailLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{log.recipient_name}</span>
                    <span className="text-stone-500">({log.recipient_email})</span>
                  </div>
                  <p className="text-stone-600 mt-0.5">Subject: {log.subject}</p>
                  <span className="text-stone-400 font-mono text-[11px]">
                    Linked Serial: {log.certificate_serial_number}
                  </span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {log.status.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-1">
                    {new Date(log.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: Manual Certificate Issuance */}
      {isManualIssueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF6B16] flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 font-display">
                  Manual Certificate Issuance
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsManualIssueOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualIssueSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Select Student
                </label>
                <select
                  value={formStudentId}
                  onChange={(e) => setFormStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#FF6B16]"
                  required
                >
                  {studentUsers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.email}) - {s.track || s.interest}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Course Track Title
                </label>
                <input
                  type="text"
                  value={formCourseName}
                  onChange={(e) => setFormCourseName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#FF6B16]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Assigned Instructor
                  </label>
                  <select
                    value={formInstructorId}
                    onChange={(e) => setFormInstructorId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#FF6B16]"
                  >
                    {mentorUsers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="e.g. 60 Days"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#FF6B16]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#FF6B16]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Completion Date
                  </label>
                  <input
                    type="date"
                    value={formCompletionDate}
                    onChange={(e) => setFormCompletionDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F5] border border-stone-300 font-medium text-stone-900 focus:outline-none focus:border-[#FF6B16]"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 space-y-1">
                <span className="font-bold block">Authorization &amp; Audit Note:</span>
                <p>
                  A unique serial number in format <strong>CMX-YYYY-COURSE-XXXXXX</strong> will be allocated automatically on the backend and recorded in the audit trail.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsManualIssueOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingIssue}
                  className="px-5 py-2 rounded-xl bg-[#FF6B16] hover:bg-orange-600 text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingIssue ? 'Issuing...' : 'Generate & Issue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Revocation Confirmation Modal */}
      {isRevokeModalOpen && selectedCertForRevoke && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-rose-200 p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-stone-900 font-display">
                Revoke Certificate Credential
              </h3>
              <p className="text-xs text-stone-500">
                You are about to invalidate certificate{' '}
                <span className="font-mono font-bold text-rose-600">
                  {selectedCertForRevoke.certificate_serial_number}
                </span>{' '}
                issued to {selectedCertForRevoke.student_name_snapshot}.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block font-bold text-stone-700 uppercase tracking-wider">
                Official Revocation Reason (Required for Audit Log)
              </label>
              <textarea
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="e.g. Administrative policy audit: Incomplete assessment submission or code plagiarism confirmed."
                rows={3}
                className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-stone-300 text-xs text-stone-900 focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-800">
              <strong>Effect:</strong> The public verification endpoint will immediately return <em>"Certificate Revoked"</em>. The record is permanently preserved for audit compliance and cannot be falsified.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsRevokeModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold cursor-pointer text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRevoke}
                disabled={!revokeReason.trim()}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-bold cursor-pointer text-xs"
              >
                Confirm Revocation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Preview Modal */}
      {selectedCertForPreview && (
        <CertificatePreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => {
            setIsPreviewModalOpen(false);
            setSelectedCertForPreview(null);
          }}
          certificate={selectedCertForPreview}
          isPreview={false}
        />
      )}
    </div>
  );
};
