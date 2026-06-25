/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUp, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-12 bg-neutral-950 border-t border-neutral-900/60 text-neutral-500 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand/Credits */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
            <span className="text-xs font-bold text-neutral-350 tracking-wide font-sans block">
              © 2026 {PERSONAL_INFO.fullName}. All rights reserved under APACHE-2.0.
            </span>
            <span className="text-[10px] text-neutral-600 block mt-0.5">
              Hand-built with React, TypeScript, and Tailwind CSS.
            </span>
          </div>

          {/* Quick navigational back to top trigger */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-[10px] text-neutral-600 font-mono select-none">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>CK_CONSOLE_READY</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 transition-all cursor-pointer flex items-center justify-center shadow"
              title="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4 animate-pulse" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
