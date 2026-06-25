/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Smartphone, FolderGit2, Cpu, Award, Mail, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of dry navbar
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

  const navItems = [
    { label: 'Overview', id: 'hero', icon: Cpu },
    { label: 'Projects', id: 'projects', icon: FolderGit2 },
    { label: 'Student Notes App', id: 'simulator', icon: Smartphone },
    { label: 'AI Prediction Bot', id: 'chatbot', icon: MessageSquare },
    { label: 'Experience', id: 'experience', icon: Award },
    { label: 'Contact', id: 'contact', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800/60 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-md shadow-emerald-500/10">
              <div className="w-full h-full bg-neutral-950 rounded-[7px] flex items-center justify-center transition-all duration-300 group-hover:bg-transparent">
                <span className="text-emerald-400 group-hover:text-neutral-950 font-bold font-mono text-sm leading-none">
                  CK
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-neutral-100 font-sans font-semibold text-sm tracking-tight leading-none">
                {PERSONAL_INFO.displayName}
              </span>
              <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider leading-none mt-1">
                Portfolio
              </span>
            </div>
          </button>

          {/* Nav Items (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 bg-neutral-950/60 p-1 border border-neutral-800/50 rounded-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-100 rounded-full transition-all duration-200 hover:bg-neutral-800/40 cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Social CTAs */}
          <div className="flex items-center space-x-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer referrer"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer referrer"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="sm:inline-flex items-center space-x-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-90 active:scale-95 text-neutral-950 font-sans font-semibold text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
            >
              <span>Connect</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
