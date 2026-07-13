/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PERSONAL_INFO, METRICS } from '../data';
import { Sparkles, ArrowDownRight, FolderGit2, Smartphone, Terminal } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center bg-neutral-950"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Factual copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase font-mono">
                Open for Internships & Jobs
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-neutral-50 flex flex-col">
              <span>Hi, I'm</span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent font-extrabold pb-2">
                {PERSONAL_INFO.fullName}
              </span>
            </h1>

            {/* Tagline / Positioning */}
            <p className="text-lg sm:text-xl text-neutral-300 font-sans font-medium">
              {PERSONAL_INFO.tagline}
            </p>

            {/* Summary */}
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl">
              An ambitious Mobile (Flutter / Android SDK) & AI/ML engineer focused on building secure architectures and modern cloud-integrated apps. Actively launching real-world platforms, encrypting critical student notes pipelines, and building predictive machine learning models.
            </p>

            {/* Quick stats tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 text-xs font-mono bg-neutral-900 border border-neutral-800 rounded text-neutral-400">
                #FlutterExpert
              </span>
              <span className="px-2.5 py-1 text-xs font-mono bg-neutral-900 border border-neutral-800 rounded text-neutral-400">
                #Android_SDK
              </span>
              <span className="px-2.5 py-1 text-xs font-mono bg-neutral-900 border border-neutral-800 rounded text-neutral-400">
                #Firebase_Architect
              </span>
              <span className="px-2.5 py-1 text-xs font-mono bg-neutral-900 border border-neutral-800 rounded text-neutral-400">
                #NoSQL_Encryption
              </span>
            </div>

            {/* CTA Container */}
            <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection('simulator')}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-[1.02] active:scale-[0.98] text-neutral-950 font-sans font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-500/15 transition-all w-full sm:w-auto cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Launch App Emulator</span>
              </button>

              <button
                onClick={() => scrollToSection('projects')}
                className="flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-100 font-sans font-semibold text-sm px-6 py-3.5 rounded-xl border border-neutral-800 transition-all w-full sm:w-auto cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>View Projects</span>
              </button>
            </div>
          </div>

          {/* Interactive portrait widget */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer Glow Ornaments */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-full opacity-10 blur-2xl animate-pulse" />
              <div className="absolute inset-0 border border-dashed border-emerald-500/30 rounded-full animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-4 border border-teal-400/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

              {/* Glowing Nodes representing components */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-neutral-950 border border-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              </div>

              {/* Profile Image Frame */}
              <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-emerald-500/50 bg-[#0d0d10] flex items-center justify-center shadow-2xl shadow-black/80 group">
                <img 
                  src="/profile.jpg" 
                  alt="Karthik Ch" 
                  className="w-full h-full object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Mini tech overlay badges */}
              <div className="absolute -bottom-2 right-4 bg-neutral-900 border border-neutral-800 px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shadow-xl">
                <Terminal className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[10px] font-mono text-neutral-300 font-semibold uppercase tracking-wider">
                  B.Tech CSE '27
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quantified Stats Grid */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-neutral-950 border border-neutral-900 rounded-2xl relative">
          <div className="absolute inset-0 bg-neutral-900/10 rounded-2xl opacity-50 backdrop-blur-[2px] pointer-events-none" />
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="relative p-4 flex flex-col justify-between border-r last:border-r-0 border-neutral-900/80 last:pr-0"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-neutral-100 tracking-tight">
                  {metric.value}
                </span>
                <ArrowDownRight className="w-4 h-4 text-emerald-400/80" />
              </div>
              <div className="mt-2 flex flex-col">
                <span className="text-xs font-sans font-semibold text-neutral-400">
                  {metric.label}
                </span>
                <span className="text-[10px] font-mono text-neutral-600 mt-0.5">
                  {metric.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
