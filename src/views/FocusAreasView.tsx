import React from 'react';
import { useApp } from '../context/AppContext';
import { FOCUS_AREAS } from '../data/initialData';
import { Code, Layers, Terminal, Cpu, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const FocusAreasView: React.FC = () => {
  const { openEarlyAccessModal } = useApp();

  const getIcon = (id: string) => {
    switch (id) {
      case 'webdev':
        return <Code className="w-6 h-6 text-[#FF6B16]" />;
      case 'data':
        return <Layers className="w-6 h-6 text-amber-700" />;
      case 'python-ai':
        return <Terminal className="w-6 h-6 text-[#FF6B16]" />;
      default:
        return <Cpu className="w-6 h-6 text-amber-700" />;
    }
  };

  return (
    <div className="w-full py-12 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
            Programs in Development
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display">
            Core Technology Focus Areas
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Code Mux is developing project-centered technology training tracks designed for collegiate learners and fresh graduates. Curriculums and batch schedules will be announced soon.
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FOCUS_AREAS.map((area) => (
            <div
              key={area.id}
              className="rounded-2xl bg-white border border-stone-200 shadow-xs p-6 sm:p-8 flex flex-col justify-between hover:border-orange-300 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#FF6B16] font-semibold">{area.category}</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 text-[11px] font-medium border border-orange-200/60">
                    <Sparkles className="w-3 h-3 text-[#FF6B16]" /> In Development
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-orange-100/60 border border-orange-200 flex items-center justify-center shrink-0">
                    {getIcon(area.id)}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display group-hover:text-[#FF6B16] transition-colors">
                    {area.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {area.description}
                </p>

                {/* Core Focus Points */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-2 text-xs text-stone-700">
                  <div className="font-semibold text-stone-900 text-[11px] uppercase tracking-wider">
                    Planned Core Competencies:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {area.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B16] shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-stone-500">
                  Syllabus release &amp; batch dates coming soon.
                </div>
                <button
                  onClick={() => openEarlyAccessModal(area.title)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Notify Me When Announced <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Transparency Box */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-600 space-y-2 leading-relaxed shadow-xs text-center max-w-3xl mx-auto">
          <strong className="text-stone-900 font-semibold">Affordable, Honest Tech Education:</strong> Code Mux is committed to building rigorous, practical curriculums without exaggerated placement guarantees or hidden fees. We will publish finalized schedules and transparent fees directly to registered waitlist learners.
        </div>
      </div>
    </div>
  );
};
