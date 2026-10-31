import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FOCUS_AREAS, TechnologyFocusArea } from '../data/initialData';
import {
  Code,
  Layers,
  Terminal,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calculator,
  BookOpen,
  Languages,
  Gamepad2,
  GraduationCap,
  Briefcase,
  Search,
  RotateCcw,
  Globe,
  Award,
  ShieldCheck,
  Clock,
  Filter,
} from 'lucide-react';

export const FocusAreasView: React.FC = () => {
  const { openEarlyAccessModal } = useApp();
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [ageInputVal, setAgeInputVal] = useState<string>('');
  
  // Filter mode when age is applied: 'relatable_all' (relatable + general) or 'exact' (strictly minAge-maxAge)
  const [ageFilterMode, setAgeFilterMode] = useState<'relatable_all' | 'exact'>('relatable_all');

  // Category fallback if NO age selected
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'junior' | 'career' | 'general'>('all');

  // Audience targeting filter: 'all' (both Indian & International), 'international', 'indian'
  const [audienceFilter, setAudienceFilter] = useState<'all' | 'international' | 'indian'>('all');

  const getIcon = (id: string) => {
    switch (id) {
      case 'vedic-maths':
        return <Calculator className="w-6 h-6 text-[#FF6B16]" />;
      case 'english-junior':
        return <BookOpen className="w-6 h-6 text-amber-700" />;
      case 'hindi-junior':
        return <Languages className="w-6 h-6 text-[#FF6B16]" />;
      case 'junior-coding':
        return <Gamepad2 className="w-6 h-6 text-emerald-700" />;
      case 'robotics-junior':
        return <Cpu className="w-6 h-6 text-blue-600" />;
      case 'olympiad-math':
        return <Award className="w-6 h-6 text-amber-600" />;
      case 'ai-junior':
        return <Sparkles className="w-6 h-6 text-purple-600" />;
      case 'webdev':
        return <Code className="w-6 h-6 text-[#FF6B16]" />;
      case 'ai-engineering':
        return <Terminal className="w-6 h-6 text-purple-700" />;
      case 'data':
        return <Layers className="w-6 h-6 text-amber-700" />;
      case 'placement':
        return <Briefcase className="w-6 h-6 text-emerald-700" />;
      case 'cybersecurity':
        return <ShieldCheck className="w-6 h-6 text-rose-600" />;
      case 'digital-ethics':
        return <Globe className="w-6 h-6 text-teal-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#FF6B16]" />;
    }
  };

  const handleSelectAge = (age: number) => {
    setSelectedAge(age);
    setAgeInputVal(age.toString());
    setAgeFilterMode('relatable_all');
  };

  const handleInputChange = (val: string) => {
    setAgeInputVal(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0 && num < 100) {
      setSelectedAge(num);
      setAgeFilterMode('relatable_all');
    } else if (val.trim() === '') {
      setSelectedAge(null);
    }
  };

  const handleClearAge = () => {
    setSelectedAge(null);
    setAgeInputVal('');
  };

  // CORE REQUIREMENT:
  // If an age is applied and user views "Show All", it MUST only show tracks relatable to that age group (or general).
  // Under 18: shows junior + general tracks (NEVER adult career tracks).
  // 18+: shows career + general tracks (NEVER junior school tracks).
  const filteredAreas = FOCUS_AREAS.filter((area: TechnologyFocusArea) => {
    // 1. Audience filter check
    if (audienceFilter !== 'all') {
      if (area.targetAudience !== 'both' && area.targetAudience !== audienceFilter) {
        return false;
      }
    }

    // 2. Age-based filtering
    if (selectedAge !== null) {
      const isKid = selectedAge < 18;
      
      if (ageFilterMode === 'exact') {
        // Strict age range matching
        return selectedAge >= area.minAge && selectedAge <= area.maxAge;
      }

      // 'relatable_all': SHOW ALL tracks relatable to this age stage + general tracks
      if (isKid) {
        return area.ageGroup === 'junior' || area.ageGroup === 'general';
      } else {
        return area.ageGroup === 'career' || area.ageGroup === 'general';
      }
    }

    // 3. Fallback when no age is selected
    if (categoryFilter === 'all') return true;
    return area.ageGroup === categoryFilter;
  });

  const quickAges = [7, 10, 13, 16, 18, 21];

  const activeAgeRelatableCount = selectedAge !== null
    ? FOCUS_AREAS.filter((a) => (selectedAge < 18 ? a.ageGroup === 'junior' || a.ageGroup === 'general' : a.ageGroup === 'career' || a.ageGroup === 'general')).length
    : FOCUS_AREAS.length;

  const activeAgeExactCount = selectedAge !== null
    ? FOCUS_AREAS.filter((a) => selectedAge >= a.minAge && selectedAge <= a.maxAge).length
    : FOCUS_AREAS.length;

  return (
    <div className="w-full py-12 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/70 border border-orange-200 text-[#FF6B16] text-xs font-semibold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" /> Indian &amp; International Student Curriculums
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display">
            Global Learning Tracks &amp; Relatable Domains
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Personalized academic and technology tracks engineered for learners in India and worldwide (US, UK, UAE, Canada, Singapore). Programs are structured by cognitive development, offering live mentor-led cohorts aligned with international and Indian educational boards.
          </p>

          {/* International & Indian Audience Highlights Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              <Globe className="w-3.5 h-3.5" /> Global Curriculums: CBSE, ICSE, Cambridge IGCSE, IB &amp; US Common Core
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-medium">
              <Clock className="w-3.5 h-3.5" /> International Time Zones (IST, EST, PST, GMT, GST)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-50 text-orange-800 border border-orange-200 font-medium">
              <Award className="w-3.5 h-3.5" /> Global Certification &amp; Olympiad Readiness
            </span>
          </div>
        </div>

        {/* INTERACTIVE AGE FINDER: Ask Age First */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-orange-200 shadow-md space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B16] uppercase tracking-wider mb-1">
                <Search className="w-3.5 h-3.5" /> Personalized Domain Finder
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-display">
                Tell us the learner's age to see relatable domains
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                We will display only the curriculum tracks engineered specifically for that age group.
              </p>
            </div>

            {/* Age Input Box */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#FAF8F5] border border-stone-300 rounded-xl px-3 py-2 focus-within:border-[#FF6B16] focus-within:bg-white transition-all shadow-inner">
                <span className="text-xs font-semibold text-stone-500 mr-2 whitespace-nowrap">Learner Age:</span>
                <input
                  type="number"
                  min="5"
                  max="80"
                  value={ageInputVal}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="e.g. 10 or 21"
                  className="w-24 bg-transparent text-sm font-bold text-stone-900 focus:outline-none"
                  aria-label="Enter learner age"
                />
              </div>
              {selectedAge !== null && (
                <button
                  onClick={handleClearAge}
                  className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  title="Reset to browse full catalog"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Age</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Age Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-stone-600 mr-1">Quick Select Age:</span>
            {quickAges.map((age) => (
              <button
                key={age}
                type="button"
                onClick={() => handleSelectAge(age)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedAge === age
                    ? 'bg-[#FF6B16] text-white shadow-xs'
                    : 'bg-[#FAF8F5] hover:bg-orange-50 border border-stone-200 text-stone-700 hover:border-orange-300'
                }`}
              >
                {age} yrs
              </button>
            ))}

            {selectedAge !== null ? (
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  type="button"
                  onClick={() => setAgeFilterMode('relatable_all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    ageFilterMode === 'relatable_all'
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 bg-stone-100'
                  }`}
                >
                  Show All Relatable ({activeAgeRelatableCount})
                </button>
                <button
                  type="button"
                  onClick={() => setAgeFilterMode('exact')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    ageFilterMode === 'exact'
                      ? 'bg-[#FF6B16] text-white shadow-xs'
                      : 'text-stone-700 hover:text-stone-900 bg-stone-100'
                  }`}
                >
                  Exact Fit ({activeAgeExactCount})
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCategoryFilter('all')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ml-auto bg-stone-900 text-white shadow-xs"
              >
                Show All Tracks ({FOCUS_AREAS.length})
              </button>
            )}
          </div>

          {/* Dynamic Relatable Result Banner with Strict Age Boundary */}
          {selectedAge !== null ? (
            <div className="p-3.5 rounded-xl bg-orange-50/80 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B16] animate-pulse shrink-0" />
                <span className="text-stone-800">
                  Showing <strong>{filteredAreas.length} Relatable Programs</strong> for <strong>Age {selectedAge}</strong>:{' '}
                  <span className="font-bold text-[#FF6B16]">
                    {selectedAge < 18 ? '🌟 Junior Foundation & Enrichment Academy' : '💼 University, Tech & Career Specializations'}
                  </span>
                  {' '}+ Universal Cognitive Tracks
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] text-stone-500">
                  {ageFilterMode === 'relatable_all' ? 'All relatable tracks shown' : 'Filtered strictly to exact age'}
                </span>
                <button
                  onClick={handleClearAge}
                  className="text-stone-500 hover:text-stone-800 underline text-[11px] cursor-pointer"
                >
                  Browse Full Catalog
                </button>
              </div>
            </div>
          ) : (
            /* Category Fallback Filters if no specific age entered */
            <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-stone-100">
              <span className="text-xs text-stone-500 mr-2">Or browse by pillar:</span>
              <button
                onClick={() => setCategoryFilter('all')}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  categoryFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                All Programs ({FOCUS_AREAS.length})
              </button>
              <button
                onClick={() => setCategoryFilter('junior')}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  categoryFilter === 'junior'
                    ? 'bg-[#FF6B16] text-white'
                    : 'text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                School &amp; Foundation Academy
              </button>
              <button
                onClick={() => setCategoryFilter('career')}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  categoryFilter === 'career'
                    ? 'bg-[#FF6B16] text-white'
                    : 'text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                University &amp; Tech Careers
              </button>
              <button
                onClick={() => setCategoryFilter('general')}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  categoryFilter === 'general'
                    ? 'bg-[#FF6B16] text-white'
                    : 'text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                Universal Cognitive Tracks
              </button>
            </div>
          )}

          {/* Student Audience Selector: Target International as well as Indian */}
          <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-stone-600 font-medium">
              <Filter className="w-3.5 h-3.5 text-[#FF6B16]" /> Target Student Cohort:
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setAudienceFilter('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  audienceFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                🌍 Global &amp; Indian Students (All)
              </button>
              <button
                type="button"
                onClick={() => setAudienceFilter('international')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  audienceFilter === 'international'
                    ? 'bg-[#FF6B16] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                🌐 International &amp; NRI Diaspora
              </button>
              <button
                type="button"
                onClick={() => setAudienceFilter('indian')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  audienceFilter === 'indian'
                    ? 'bg-[#FF6B16] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                🇮🇳 Indian School &amp; National Focus
              </button>
            </div>
          </div>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAreas.map((area: TechnologyFocusArea) => {
            const isJunior = area.ageGroup === 'junior';
            const isGeneral = area.ageGroup === 'general';
            return (
              <div
                key={area.id}
                className="rounded-2xl bg-white border border-stone-200 shadow-xs p-6 sm:p-8 flex flex-col justify-between hover:border-orange-300 hover:shadow-md transition-all group"
              >
                <div className="space-y-4">
                  {/* Category and Domain Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-[#FF6B16] font-semibold">{area.category}</span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                          isJunior
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isGeneral
                            ? 'bg-teal-50 text-teal-800 border-teal-200'
                            : 'bg-orange-50 text-orange-800 border-orange-200/60'
                        }`}
                      >
                        {area.domainTag}
                      </span>
                      {area.badge && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-medium border border-stone-200">
                          {area.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-orange-100/60 border border-orange-200 flex items-center justify-center shrink-0">
                      {getIcon(area.id)}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display group-hover:text-[#FF6B16] transition-colors leading-tight">
                        {area.title}
                      </h3>
                      <div className="text-[11px] text-stone-500 font-medium mt-0.5 flex items-center gap-1.5">
                        <span className="text-[#FF6B16] font-semibold">
                          {isJunior ? 'Foundation & Enrichment Track' : isGeneral ? 'Universal Cognitive Skill' : 'Professional Engineering Specialization'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {area.description}
                  </p>

                  {/* International & Indian Curriculum Alignment */}
                  {(area.globalCurriculum || area.timeZoneFriendly) && (
                    <div className="p-3 rounded-xl bg-orange-50/50 border border-orange-200/70 space-y-1.5 text-[11px]">
                      {area.globalCurriculum && (
                        <div className="flex items-start gap-2 text-stone-700">
                          <Globe className="w-3.5 h-3.5 text-[#FF6B16] shrink-0 mt-0.5" />
                          <span><strong>Curriculum Alignment:</strong> {area.globalCurriculum}</span>
                        </div>
                      )}
                      {area.timeZoneFriendly && (
                        <div className="flex items-start gap-2 text-stone-700">
                          <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span><strong>Time-Zone Friendly:</strong> {area.timeZoneFriendly}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Core Focus Points */}
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-2 text-xs text-stone-700">
                    <div className="font-semibold text-stone-900 text-[11px] uppercase tracking-wider">
                      Planned Core Competencies:
                    </div>
                    <div className="space-y-1.5">
                      {area.topics.map((topic, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B16] shrink-0 mt-0.5" />
                          <span className="leading-snug">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs text-stone-500">
                    Cohort size: 1-on-1 or interactive micro-batches.
                  </div>
                  <button
                    onClick={() => openEarlyAccessModal(area.title)}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Notify Me When Announced <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Student Support Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2.5 text-[#FF6B16] font-bold text-sm">
            <Globe className="w-5 h-5" /> Serving Indian Students &amp; Global International Cohorts
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Whether your student is enrolled in a school in Mumbai, Delhi, London, Dubai, Singapore, New York, or Toronto, Code Mux curriculums bridge rigorous conceptual foundations with interactive live teaching. All sessions are scheduled to accommodate local time zones with bilingual or pure English instruction.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-700">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200">
              <div className="font-bold text-stone-900 mb-0.5">🇮🇳 Indian Students</div>
              <div>CBSE/ICSE school exam acceleration, Olympiad mastery, college placement prep.</div>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200">
              <div className="font-bold text-stone-900 mb-0.5">🌐 NRI Diaspora</div>
              <div>Vedic Math, Hindi/Sanskrit heritage fluency, coding logic at flexible PST/EST/GMT hours.</div>
            </div>
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-stone-200">
              <div className="font-bold text-stone-900 mb-0.5">🌍 International Students</div>
              <div>US Common Core, Cambridge IGCSE, Model UN debate &amp; global AI/engineering tracks.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
