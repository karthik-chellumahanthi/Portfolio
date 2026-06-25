/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EXPERIENCES, EDUCATION } from '../data';
import { Calendar, MapPin, Sparkles, GraduationCap, Briefcase, CheckCircle2 } from 'lucide-react';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 bg-neutral-950 border-t border-neutral-900 overflow-hidden relative">
      
      {/* Design Background Blur Element */}
      <div className="absolute right-1/4 top-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase font-semibold tracking-wider">Career Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-neutral-105 tracking-tight text-white">
            Experience & Education
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl">
            A chronological timeline detailing professional android developer internships and ongoing technical bachelor's degree at KIET.
          </p>
        </div>

        {/* Timeline structural grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          
          {/* Connecting middle line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-neutral-800 -translate-x-1/2" />

          {/* LEFT PANEL: PROFESSIONAL EXPERIENCE COGNIZANT */}
          <div className="space-y-8 flex flex-col items-start lg:pr-8">
            <div className="flex items-center space-x-3 mb-4 w-full">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-sans font-extrabold text-[#F8F9FA] tracking-tight">Professional Experience</h3>
            </div>

            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="w-full p-6 bg-neutral-900/40 border border-neutral-900 rounded-2xl relative hover:border-neutral-800 transition-all group shadow shadow-black/25"
              >
                {/* Timeline node hook for desktop left side */}
                <div className="hidden lg:block absolute right-[-45px] top-8 w-4.5 h-4.5 bg-neutral-950 border-2 border-emerald-400 rounded-full z-10 translate-x-1/2 group-hover:scale-125 transition-transform" />

                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/60 pb-3">
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider block">
                        {exp.isInternship ? 'Android Intern' : 'Developer Role'}
                      </span>
                      <h4 className="text-base font-sans font-extrabold text-neutral-100 tracking-tight mt-0.5">
                        {exp.role}
                      </h4>
                    </div>

                    <div className="flex flex-col items-start sm:items-end text-neutral-500 font-mono text-[10px] leading-tight space-y-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-neutral-600" />
                        <span>{exp.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-neutral-600" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 font-sans font-semibold leading-relaxed">
                    {exp.organization}
                  </p>

                  <ul className="space-y-3 pt-2">
                    {exp.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400/85 mt-0.5 shrink-0" />
                        <span className="text-xs text-neutral-400 group-hover:text-neutral-300 leading-normal font-sans">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT PANEL: ACADEMIC EDUCATION */}
          <div className="space-y-8 flex flex-col items-start lg:pl-8">
            <div className="flex items-center space-x-3 mb-4 w-full">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-sans font-extrabold text-[#F8F9FA] tracking-tight">Education Track</h3>
            </div>

            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="w-full p-6 bg-neutral-900/40 border border-neutral-900 rounded-2xl relative hover:border-neutral-800 transition-all group shadow shadow-black/25"
              >
                {/* Timeline node hook for desktop right side */}
                <div className="hidden lg:block absolute left-[-45px] top-8 w-4.5 h-4.5 bg-neutral-950 border-2 border-teal-400 rounded-full z-10 -translate-x-1/2 group-hover:scale-125 transition-transform" />

                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/60 pb-3">
                    <div>
                      <span className="text-xs font-mono text-teal-400 font-semibold uppercase tracking-wider block">
                        Graduating class of 2027
                      </span>
                      <h4 className="text-base font-sans font-extrabold text-neutral-100 tracking-tight mt-0.5">
                        B.Tech Degree in AI & DS
                      </h4>
                    </div>

                    <div className="flex flex-col items-start sm:items-end text-neutral-500 font-mono text-[10px] leading-tight space-y-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-neutral-600" />
                        <span>{edu.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-neutral-600" />
                        <span>{edu.location}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-neutral-400 font-semibold leading-relaxed">
                    {edu.institution}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-2 font-bold">
                      Relevant Curricular Coursework
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course, courseIdx) => (
                        <span
                          key={courseIdx}
                          className="px-2.5 py-1.5 text-[10px] font-mono bg-[#1E1E24]/40 border border-neutral-850 rounded-lg text-neutral-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
