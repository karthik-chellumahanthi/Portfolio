/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CERTIFICATIONS } from '../data';
import { Award, CheckCircle, Shield, Code, Sparkles } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase font-semibold tracking-wider">Credentials Audit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-neutral-100 tracking-tight">
            Certifications & Industry Badges
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl">
            Verified master courses and certificates proving solid knowledge in mobile SDK loops, full stack structures, and cloud architecture.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => {
            // Pick a custom icon based on certification topic
            const isAndroid = cert.name.toLowerCase().includes('android');
            const isSecurity = cert.name.toLowerCase().includes('security');
            const isPython = cert.name.toLowerCase().includes('python');

            return (
              <div
                key={index}
                className="p-5 bg-neutral-900/50 border border-neutral-900 rounded-2xl flex flex-col justify-between hover:border-neutral-800 transition-all group shadow shadow-black/10"
              >
                <div className="flex flex-col space-y-4">
                  {/* Icon Block */}
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                      isAndroid 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : isSecurity 
                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                        : isPython
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        : 'bg-teal-500/10 border-teal-500/20 text-teal-400'
                    }`}>
                      {isAndroid && <Code className="w-5 h-5" />}
                      {isSecurity && <Shield className="w-5 h-5" />}
                      {!isAndroid && !isSecurity && <Award className="w-5 h-5" />}
                    </div>

                    <span className="text-[9px] font-mono font-bold bg-neutral-950 border border-neutral-850 text-neutral-500 px-2 py-0.5 rounded flex items-center space-x-1 uppercase">
                      <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Verified Badge</span>
                    </span>
                  </div>

                  {/* Copy content */}
                  <div className="flex flex-col space-y-1.5 leading-snug">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{cert.issuer}</span>
                    <h3 className="text-sm font-extrabold text-neutral-100 tracking-tight group-hover:text-neutral-50 duration-200">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-neutral-450 leading-relaxed font-sans pt-1">
                      {cert.details}
                    </p>
                  </div>
                </div>

                {/* Footer line */}
                <div className="mt-6 pt-3.5 border-t border-neutral-800/60 text-[9px] font-mono text-neutral-600 block">
                  Status: Active Lifetime Credential
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
