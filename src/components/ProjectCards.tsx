/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PROJECTS } from '../data';
import { CheckCircle2, Code2, Link2, ArrowRight, Sparkles } from 'lucide-react';

export default function ProjectCards() {
  const [activeProj, setActiveProj] = useState(PROJECTS[0].id);

  const selectedProj = PROJECTS.find((p) => p.id === activeProj) || PROJECTS[0];

  const triggerScroll = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      const navbarOffset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="projects" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase font-semibold tracking-wider">Project Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-neutral-100 tracking-tight">
            Spotlight Case Studies
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl">
            Clean, production-ready systems designed and launched. Click across cards to audit technical outcomes, security perimeters, and technology architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Projects Selector Left List */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            {PROJECTS.map((proj) => {
              const works = proj.id === activeProj;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProj(proj.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    works
                      ? 'bg-neutral-900 border-emerald-500/30 shadow-md shadow-emerald-500/5'
                      : 'bg-neutral-950/40 border-neutral-900 hover:border-neutral-800'
                  }`}
                >
                  {/* Active highlight pill */}
                  {works && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-400" />
                  )}

                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest leading-none">
                      {proj.subtitle}
                    </span>
                    <h3 className={`font-sans font-semibold text-base transition-colors ${
                      works ? 'text-neutral-100' : 'text-neutral-400 group-hover:text-neutral-200'
                    }`}>
                      {proj.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.tags.slice(0, 3).map((tg, i) => (
                        <span key={i} className="px-2 py-0.5 text-[9px] font-mono bg-neutral-950 border border-neutral-900 rounded text-neutral-500">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Project Details Panel Right Card */}
          <div className="lg:col-span-8 bg-neutral-900/60 border border-neutral-900 rounded-3xl p-6 sm:p-8 relative">
            <div className="absolute inset-0 bg-neutral-900/10 rounded-3xl backdrop-blur-[2px] pointer-events-none" />
            <div className="relative">
              {/* Header Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/60 pb-6 mb-6">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    {selectedProj.subtitle}
                  </span>
                  <h3 className="text-2xl font-sans font-bold text-neutral-100 tracking-tight mt-1">
                    {selectedProj.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-3">
                  <a
                    href={selectedProj.githubUrl}
                    target="_blank"
                    rel="noreferrer referrer"
                    className="flex items-center space-x-1 py-1.5 px-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 hover:text-neutral-100 transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>View GitHub</span>
                  </a>
                  {['student_notes', 'price_prediction'].includes(selectedProj.id) && (
                    <button
                      onClick={() => triggerScroll(selectedProj.id === 'student_notes' ? 'simulator' : 'chatbot')}
                      className="flex items-center space-x-1 py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-semibold select-none cursor-pointer duration-200"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span>Launch Simulator</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Core description block */}
              <div className="space-y-4 mb-8">
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {selectedProj.longDescription}
                </p>
              </div>

              {/* Technologies Architecture Checklist */}
              <div className="mb-8">
                <h4 className="text-xs font-mono text-neutral-400 font-semibold uppercase tracking-widest mb-3.5">
                  Tech Architecture Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProj.techStack.map((stack, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-xs font-mono bg-neutral-950 border border-neutral-800/80 rounded-xl text-neutral-300 flex items-center space-x-1.5"
                    >
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      <span>{stack}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Technical Outcomes */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono text-neutral-400 font-semibold uppercase tracking-widest">
                  Engineering Achievements & Outcomes
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {selectedProj.outcomes.map((bullet, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-2.5 p-3 rounded-xl bg-neutral-950/40 border border-neutral-950 hover:border-neutral-800/30 transition-all group"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors leading-normal font-sans">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Simulator Navigation Promo */}
              {['student_notes', 'price_prediction'].includes(selectedProj.id) && (
                <div className="mt-8 pt-6 border-t border-neutral-800/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500">
                    {selectedProj.id === 'student_notes'
                      ? '⚡ Explore direct calculator logic and note pages below'
                      : '🤖 Type pricing questions below to test ML inference'
                    }
                  </span>
                  <button
                    onClick={() => triggerScroll(selectedProj.id === 'student_notes' ? 'simulator' : 'chatbot')}
                    className="flex items-center space-x-1 text-xs text-emerald-400 font-bold hover:text-emerald-300 cursor-pointer"
                  >
                    <span>Go to Live App</span>
                    <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
