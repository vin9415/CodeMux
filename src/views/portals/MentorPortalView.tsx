import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Calendar,
  Clock,
  Video,
  Presentation,
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PlusCircle,
  Upload,
  Download,
  Trash2,
  ExternalLink,
  Github,
  Award,
  LogOut,
  Send,
  MessageSquare,
  Sparkles,
  Check,
} from 'lucide-react';
import { PresentationDeck } from '../../types';

export const MentorPortalView: React.FC = () => {
  const {
    currentUser,
    logoutUser,
    classesList,
    updateClassSchedule,
    attendanceList,
    batchMarkAttendance,
    mentorAttendanceList,
    logMentorSession,
    usersList,
    presentationsList,
    addPresentation,
    deletePresentation,
    submissionsList,
    reviewSubmission,
    contactInquiries,
    updateInquiryStatus,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'timetable' | 'student-attendance' | 'my-attendance' | 'ppts' | 'projects' | 'queries'>('timetable');

  // Filter classes assigned to this mentor or all
  const mentorClasses = classesList.filter(
    (c) => c.mentorId === currentUser?.id || c.mentorName === currentUser?.name || currentUser?.name === 'Senior Technical Mentor'
  );

  // Student Attendance Portal selection
  const [selectedClassIdForAttendance, setSelectedClassIdForAttendance] = useState<string>(
    classesList[0]?.id || ''
  );
  const selectedClass = classesList.find((c) => c.id === selectedClassIdForAttendance) || classesList[0];

  // Eligible students for the selected class's batch/track
  const enrolledStudents = usersList.filter((u) => u.role === 'student');

  // Local attendance roster state for the selected class
  const existingRecordsForClass = attendanceList.filter((a) => a.classId === selectedClass?.id);
  
  const [localAttendanceMap, setLocalAttendanceMap] = useState<
    Record<string, { status: 'present' | 'absent' | 'late' | 'excused'; remarks: string }>
  >(() => {
    const map: Record<string, { status: 'present' | 'absent' | 'late' | 'excused'; remarks: string }> = {};
    enrolledStudents.forEach((st) => {
      const match = existingRecordsForClass.find((a) => a.studentId === st.id);
      map[st.id] = {
        status: match ? match.status : 'present',
        remarks: match?.remarks || '',
      };
    });
    return map;
  });

  // When class changes, re-populate localAttendanceMap
  const handleSelectClassForAttendance = (classId: string) => {
    setSelectedClassIdForAttendance(classId);
    const records = attendanceList.filter((a) => a.classId === classId);
    const map: Record<string, { status: 'present' | 'absent' | 'late' | 'excused'; remarks: string }> = {};
    enrolledStudents.forEach((st) => {
      const match = records.find((a) => a.studentId === st.id);
      map[st.id] = {
        status: match ? match.status : 'present',
        remarks: match?.remarks || '',
      };
    });
    setLocalAttendanceMap(map);
  };

  const handleUpdateStudentStatus = (
    studentId: string,
    status: 'present' | 'absent' | 'late' | 'excused'
  ) => {
    setLocalAttendanceMap((prev) => ({
      ...prev,
      [studentId]: {
        status,
        remarks: prev[studentId]?.remarks || '',
      },
    }));
  };

  const handleUpdateStudentRemarks = (studentId: string, remarks: string) => {
    setLocalAttendanceMap((prev) => ({
      ...prev,
      [studentId]: {
        status: prev[studentId]?.status || 'present',
        remarks,
      },
    }));
  };

  const handleSaveAttendance = () => {
    if (!selectedClass) return;
    const records = Object.entries(localAttendanceMap).map(([studentId, data]) => ({
      studentId,
      status: data.status,
      remarks: data.remarks,
    }));
    batchMarkAttendance(selectedClass.id, records);
  };

  // Mentor's Own Attendance records
  const myMentorAttendance = mentorAttendanceList.filter(
    (m) => m.mentorId === currentUser?.id || m.mentorName === currentUser?.name
  );
  const totalConductedSessions = myMentorAttendance.filter((m) => m.status === 'conducted').length;
  const totalTeachingHours = totalConductedSessions * 2; // 2 hrs per session

  // PPT upload modal/form state
  const [isPptModalOpen, setIsPptModalOpen] = useState(false);
  const [pptTitle, setPptTitle] = useState('');
  const [pptTopic, setPptTopic] = useState('');
  const [pptTrack, setPptTrack] = useState('Full-Stack Web Development');
  const [pptSlidesCount, setPptSlidesCount] = useState(40);
  const [pptFileType, setPptFileType] = useState<'PPTX' | 'PDF Deck' | 'Google Slides'>('PPTX');
  const [pptUrl, setPptUrl] = useState('');
  const [pptDescription, setPptDescription] = useState('');

  const handleCreatePpt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pptTitle || !pptUrl) {
      addToast('error', 'Missing Fields', 'Please specify a title and slide link.');
      return;
    }
    addPresentation({
      title: pptTitle,
      topic: pptTopic || pptTitle,
      track: pptTrack,
      slidesCount: Number(pptSlidesCount) || 30,
      fileType: pptFileType,
      downloadOrViewUrl: pptUrl,
      description: pptDescription || 'Instructor technical slide deck.',
      uploadedBy: currentUser ? `${currentUser.name} (Mentor)` : 'Senior Mentor',
    });
    setIsPptModalOpen(false);
    setPptTitle('');
    setPptTopic('');
    setPptUrl('');
    setPptDescription('');
  };

  // Project grading state
  const [gradingSubmissionId, setGradingSubmissionId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState('95/100 (Distinction - A+)');
  const [gradeFeedback, setGradeFeedback] = useState('Clean component hierarchy and solid schema design.');

  const handleGradeSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSubmissionId) return;
    reviewSubmission(gradingSubmissionId, 'approved', gradeInput, gradeFeedback);
    setGradingSubmissionId(null);
  };

  return (
    <div className="w-full py-8 sm:py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-amber-700 font-bold uppercase tracking-wider">
                  Mentor &amp; Instructor Command Console
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  Academic Faculty
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
                {currentUser?.name || 'Mentor Console'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                {currentUser?.email} · Track Specialty: {currentUser?.track || 'Full-Stack & System Design'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center gap-2">
              <span className="text-stone-500">Conducted:</span>
              <span className="font-bold text-amber-800">{totalTeachingHours} Hours ({totalConductedSessions} Sessions)</span>
            </div>

            <button
              onClick={logoutUser}
              className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:border-rose-400 hover:text-rose-600 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'timetable'
                ? 'bg-[#FF6B16] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Calendar className="w-4 h-4" /> Mentor Timetable ({mentorClasses.length})
          </button>
          <button
            onClick={() => setActiveTab('student-attendance')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'student-attendance'
                ? 'bg-[#FF6B16] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Student Attendance Portal
          </button>
          <button
            onClick={() => setActiveTab('my-attendance')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'my-attendance'
                ? 'bg-[#FF6B16] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Clock className="w-4 h-4" /> My Own Attendance ({totalTeachingHours}h)
          </button>
          <button
            onClick={() => setActiveTab('ppts')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'ppts'
                ? 'bg-[#FF6B16] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Presentation className="w-4 h-4" /> Presentation &amp; PPT Portal
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-[#FF6B16] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Award className="w-4 h-4" /> Project Evaluations ({submissionsList.length})
          </button>
          <button
            onClick={() => setActiveTab('queries')}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'queries'
                ? 'bg-[#FF6B16] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Student Doubts ({contactInquiries.length})
          </button>
        </div>

        {/* TAB 1: MENTOR TIMETABLE */}
        {activeTab === 'timetable' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-display">My Teaching Schedule &amp; Lectures</h2>
                <p className="text-xs text-stone-500">Launch live meetings, conduct sessions, and attach slide decks.</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                {mentorClasses.filter((c) => c.status === 'upcoming').length} Upcoming Live Sessions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mentorClasses.map((cls) => {
                const isCompleted = cls.status === 'completed';

                return (
                  <div
                    key={cls.id}
                    className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between gap-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                          {cls.track}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isCompleted ? 'bg-stone-100 text-stone-600' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {cls.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-stone-900">{cls.topic}</h3>
                      <p className="text-xs text-stone-600">{cls.description}</p>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>{cls.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>{cls.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2 text-stone-500">
                          <span>Batch Target: <strong className="text-stone-800">{cls.batch}</strong></span>
                        </div>
                      </div>

                      {cls.pptTitle && (
                        <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center justify-between">
                          <div className="flex items-center gap-2 truncate">
                            <Presentation className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="truncate text-stone-700">{cls.pptTitle}</span>
                          </div>
                          {cls.pptUrl && (
                            <a
                              href={cls.pptUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1 shrink-0 ml-2"
                            >
                              View Slides <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2">
                      <a
                        href={cls.roomLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
                      >
                        <Video className="w-3.5 h-3.5" /> Launch Classroom
                      </a>

                      {!isCompleted ? (
                        <button
                          onClick={() => logMentorSession(cls.id)}
                          className="py-2.5 px-4 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Complete &amp; Check-In
                        </button>
                      ) : (
                        <span className="py-2 px-3 text-xs font-semibold text-stone-500 bg-stone-50 rounded-xl flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Conducted
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: STUDENT ATTENDANCE PORTAL */}
        {activeTab === 'student-attendance' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-display">Student Attendance Marking Desk</h2>
                <p className="text-xs text-stone-500">
                  Select a live or completed lecture and mark individual attendance status for enrolled students.
                </p>
              </div>

              {/* Class Selector Dropdown */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-stone-600">Select Session:</label>
                <select
                  value={selectedClassIdForAttendance}
                  onChange={(e) => handleSelectClassForAttendance(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-xl border border-stone-300 bg-white font-medium focus:outline-none focus:border-[#FF6B16]"
                >
                  {classesList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.date} — {c.topic} ({c.batch})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Session Details Card */}
            {selectedClass && (
              <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 text-xs flex flex-wrap items-center justify-between gap-3 text-stone-800">
                <div className="space-y-0.5">
                  <div className="font-bold text-sm text-stone-900">{selectedClass.topic}</div>
                  <div className="text-stone-600">
                    Track: {selectedClass.track} · Batch: {selectedClass.batch} · Date: {selectedClass.date} ({selectedClass.time})
                  </div>
                </div>
                <button
                  onClick={handleSaveAttendance}
                  className="px-5 py-2.5 bg-[#FF6B16] hover:bg-orange-600 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Save Attendance Roster
                </button>
              </div>
            )}

            {/* Student Roster Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-bold text-stone-900 text-sm">Enrolled Students Roster</h3>
                <span className="text-xs text-stone-500">{enrolledStudents.length} Students Listed</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Enrolled Track</th>
                      <th className="py-3 px-4">Attendance Status</th>
                      <th className="py-3 px-4">Mentor Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-800">
                    {enrolledStudents.map((st) => {
                      const currentStatus = localAttendanceMap[st.id]?.status || 'present';
                      const currentRemarks = localAttendanceMap[st.id]?.remarks || '';

                      return (
                        <tr key={st.id} className="hover:bg-stone-50/50 transition-colors">
                          <td className="py-3 px-4 font-bold text-stone-900">{st.name}</td>
                          <td className="py-3 px-4 text-stone-600">{st.email}</td>
                          <td className="py-3 px-4 text-stone-600">{st.track || 'Full-Stack'}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              {(['present', 'late', 'absent', 'excused'] as const).map((stat) => (
                                <button
                                  key={stat}
                                  type="button"
                                  onClick={() => handleUpdateStudentStatus(st.id, stat)}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-all cursor-pointer ${
                                    currentStatus === stat
                                      ? stat === 'present'
                                        ? 'bg-emerald-600 text-white shadow-xs'
                                        : stat === 'late'
                                        ? 'bg-amber-500 text-white shadow-xs'
                                        : stat === 'absent'
                                        ? 'bg-rose-600 text-white shadow-xs'
                                        : 'bg-stone-700 text-white shadow-xs'
                                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                  }`}
                                >
                                  {stat}
                                </button>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="text"
                              value={currentRemarks}
                              onChange={(e) => handleUpdateStudentRemarks(st.id, e.target.value)}
                              placeholder="e.g., Code reviewed, active participation"
                              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs focus:outline-none focus:border-[#FF6B16]"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MENTOR'S OWN ATTENDANCE & CONDUCTION LOG */}
        {activeTab === 'my-attendance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="text-xs text-stone-500 uppercase font-bold tracking-wider">Total Teaching Hours</div>
                <div className="text-3xl font-bold text-amber-700 mt-1 font-display">{totalTeachingHours} Hours</div>
                <p className="text-xs text-stone-500 mt-1">Calculated across completed live cohorts</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="text-xs text-stone-500 uppercase font-bold tracking-wider">Sessions Conducted</div>
                <div className="text-3xl font-bold text-stone-900 mt-1 font-display">{totalConductedSessions} Sessions</div>
                <p className="text-xs text-stone-500 mt-1">Verified with student attendance logs</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="text-xs text-stone-500 uppercase font-bold tracking-wider">Upcoming Scheduled</div>
                <div className="text-3xl font-bold text-emerald-600 mt-1 font-display">
                  {myMentorAttendance.filter((m) => m.status === 'scheduled').length}
                </div>
                <p className="text-xs text-stone-500 mt-1">Scheduled for this month</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">Instructor Conduction &amp; Check-In History</h3>
                  <p className="text-xs text-stone-500">Official log of classes delivered by {currentUser?.name}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 rounded-lg text-stone-600">
                  {myMentorAttendance.length} Entries
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Session Topic</th>
                      <th className="py-3 px-4">Scheduled Slot</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Check-in Stamp</th>
                      <th className="py-3 px-4">Session Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-800">
                    {myMentorAttendance.map((m) => (
                      <tr key={m.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="py-3 px-4 font-mono font-medium">{m.date}</td>
                        <td className="py-3 px-4 font-bold text-stone-900">{m.classTopic}</td>
                        <td className="py-3 px-4 text-stone-600">{m.scheduledTime}</td>
                        <td className="py-3 px-4 font-mono">{m.durationMinutes} mins</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                              m.status === 'conducted'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-600 font-mono">{m.checkedInAt || 'Pending'}</td>
                        <td className="py-3 px-4 text-stone-500">{m.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PPT & PRESENTATION PORTAL */}
        {activeTab === 'ppts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-display">Instructor Slide Decks &amp; Presentation Repository</h2>
                <p className="text-xs text-stone-500">Upload, organize, and share presentation decks with your enrolled cohorts.</p>
              </div>
              <button
                onClick={() => setIsPptModalOpen(true)}
                className="px-4 py-2.5 bg-[#FF6B16] hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" /> Upload New Slide Deck
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {presentationsList.map((deck) => (
                <div
                  key={deck.id}
                  className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                        {deck.track}
                      </span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                        {deck.fileType} · {deck.slidesCount} Slides
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900">{deck.title}</h3>
                    <p className="text-xs text-stone-600">{deck.description}</p>

                    <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span>Uploaded by: {deck.uploadedBy}</span>
                      <span>{deck.uploadedAt}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={deck.downloadOrViewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 px-4 rounded-xl text-xs font-bold text-stone-800 bg-[#FAF8F5] border border-stone-300 hover:border-[#FF6B16] hover:text-[#FF6B16] transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5 text-[#FF6B16]" /> Download / View
                    </a>
                    <button
                      onClick={() => deletePresentation(deck.id)}
                      title="Remove Slide Deck"
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal to Upload New Deck */}
            {isPptModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-xl border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-stone-900 font-display">Upload Presentation / PPT Deck</h3>
                    <button onClick={() => setIsPptModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreatePpt} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Presentation Title *</label>
                      <input
                        type="text"
                        required
                        value={pptTitle}
                        onChange={(e) => setPptTitle(e.target.value)}
                        placeholder="e.g., Dynamic Programming & Graph Traversal Patterns"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#FF6B16]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Track</label>
                        <select
                          value={pptTrack}
                          onChange={(e) => setPptTrack(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                        >
                          <optgroup label="🌟 Junior Foundation Academy">
                            <option>Vedic Maths & Speed Mental Arithmetic</option>
                            <option>English Mastery: Grammar, Spoken Fluency & Writing</option>
                            <option>Hindi Vyakaran, Sahitya & Conversational Fluency</option>
                            <option>Young Coders: Scratch & Creative Python</option>
                          </optgroup>
                          <optgroup label="💼 Career & Technical Specializations">
                            <option>Full-Stack Web Development</option>
                            <option>Data Analytics & BI</option>
                            <option>Placement Preparation & Interview Mastery</option>
                            <option>Python Programming & AI Essentials</option>
                          </optgroup>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">File Type</label>
                        <select
                          value={pptFileType}
                          onChange={(e) => setPptFileType(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                        >
                          <option>PPTX</option>
                          <option>PDF Deck</option>
                          <option>Google Slides</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Slide Count</label>
                        <input
                          type="number"
                          value={pptSlidesCount}
                          onChange={(e) => setPptSlidesCount(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Topic Tag</label>
                        <input
                          type="text"
                          value={pptTopic}
                          onChange={(e) => setPptTopic(e.target.value)}
                          placeholder="e.g., Algorithm Optimization"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Slide Deck URL (Drive / Cloud Link) *</label>
                      <input
                        type="url"
                        required
                        value={pptUrl}
                        onChange={(e) => setPptUrl(e.target.value)}
                        placeholder="https://codemux.in/slides/my-deck.pptx"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-[#FF6B16]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Summary Description</label>
                      <textarea
                        rows={2}
                        value={pptDescription}
                        onChange={(e) => setPptDescription(e.target.value)}
                        placeholder="Key highlights and concepts covered in this slide deck..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsPptModalOpen(false)}
                        className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#FF6B16] hover:bg-orange-600 text-white font-bold rounded-xl shadow-xs"
                      >
                        Publish Slide Deck
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROJECT EVALUATIONS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-display">Student Project Evaluations &amp; Code Reviews</h2>
                <p className="text-xs text-stone-500">Review student GitHub repositories, inspect architecture, and assign scores.</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-stone-100 rounded-lg">
                {submissionsList.length} Total Submissions
              </span>
            </div>

            <div className="space-y-4">
              {submissionsList.map((sub) => (
                <div
                  key={sub.id}
                  className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                        {sub.track}
                      </span>
                      <h3 className="text-base font-bold text-stone-900 mt-1">{sub.projectTitle}</h3>
                      <div className="text-xs text-stone-500">
                        Submitted by: <strong className="text-stone-800">{sub.studentName}</strong> ({sub.studentEmail}) on {sub.submittedAt}
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-auto ${
                        sub.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sub.status === 'needs_changes'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {sub.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <a
                      href={sub.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 font-semibold text-stone-800 flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" /> Inspect GitHub Repository <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                    {sub.liveDemoUrl && (
                      <a
                        href={sub.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-orange-50 text-[#FF6B16] hover:bg-orange-100 font-semibold flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Open Live Application
                      </a>
                    )}
                  </div>

                  {sub.notes && (
                    <div className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-700">
                      <strong className="text-stone-900">Student Notes:</strong> "{sub.notes}"
                    </div>
                  )}

                  {sub.grade ? (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong>Assigned Grade:</strong> {sub.grade} — <em>"{sub.feedback}"</em>
                      </div>
                      <button
                        onClick={() => {
                          setGradingSubmissionId(sub.id);
                          setGradeInput(sub.grade || '');
                          setGradeFeedback(sub.feedback || '');
                        }}
                        className="text-emerald-900 font-bold hover:underline"
                      >
                        Edit Grade
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setGradingSubmissionId(sub.id);
                        setGradeInput('92/100 (A+)');
                        setGradeFeedback('Good clean code architecture and test coverage.');
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Grade This Submission
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Grading Modal */}
            {gradingSubmissionId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-stone-200 space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-stone-900 font-display">Evaluate Submission</h3>
                    <button onClick={() => setGradingSubmissionId(null)} className="text-stone-400">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleGradeSubmission} className="space-y-4">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Score / Grade</label>
                      <input
                        type="text"
                        required
                        value={gradeInput}
                        onChange={(e) => setGradeInput(e.target.value)}
                        placeholder="e.g., 95/100 (Distinction - A+)"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Constructive Feedback</label>
                      <textarea
                        rows={3}
                        required
                        value={gradeFeedback}
                        onChange={(e) => setGradeFeedback(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setGradingSubmissionId(null)}
                        className="px-3.5 py-2 text-stone-600 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-xs"
                      >
                        Save Evaluation
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: STUDENT DOUBTS / INQUIRIES */}
        {activeTab === 'queries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900 font-display">Student Doubts &amp; Academic Inquiries</h2>
                <p className="text-xs text-stone-500">Respond to technical questions submitted through the student portal.</p>
              </div>
            </div>

            <div className="space-y-3">
              {contactInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="font-bold text-sm text-stone-900">{inq.subject}</div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase self-start sm:self-auto ${
                        inq.status === 'responded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-stone-500">
                    From: <strong className="text-stone-800">{inq.name}</strong> ({inq.email}) · {inq.submittedAt}
                  </div>
                  <p className="text-stone-700 bg-[#FAF8F5] p-3 rounded-xl border border-stone-100">
                    "{inq.message}"
                  </p>
                  <div className="pt-2 flex items-center justify-end gap-2">
                    {inq.status === 'new' && (
                      <button
                        onClick={() => updateInquiryStatus(inq.id, 'responded')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-semibold cursor-pointer"
                      >
                        Mark as Responded
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
