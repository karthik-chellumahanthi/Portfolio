/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, Terminal, Smartphone, Database, ShieldCheck, Box } from 'lucide-react';

interface SkillItem {
  name: string;
  category: 'mobile' | 'backend' | 'security' | 'tools';
  level: 'Advanced' | 'Intermediate';
  desc: string;
}

export default function SkillsShowcase() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mobile' | 'backend' | 'security' | 'tools'>('all');

  const skills: SkillItem[] = [
    // Mobile & Front-end category
    { name: 'Flutter', category: 'mobile', level: 'Advanced', desc: 'Cross-platform app development and asynchronous state pipelines.' },
    { name: 'Dart', category: 'mobile', level: 'Advanced', desc: 'ValueNotifiers, stream loops, and custom package compiling.' },
    { name: 'Android SDK', category: 'mobile', level: 'Advanced', desc: 'Material Design layouts, lifecycles, and intent callbacks.' },
    { name: 'Gradle', category: 'mobile', level: 'Intermediate', desc: 'Multi-flavor dependency structures and package builds.' },
    { name: 'Material Design', category: 'mobile', level: 'Advanced', desc: 'Designing responsive screens keeping accessibility first.' },

    // Languages, Backend & Databases
    { name: 'Python', category: 'backend', level: 'Advanced', desc: 'Statistical model training, Pandas cleaning, and socket servers.' },
    { name: 'SQL & Sqflite', category: 'backend', level: 'Advanced', desc: 'Relational schemas, transactions, and indexing.' },
    { name: 'Cloudflare R2', category: 'backend', level: 'Advanced', desc: 'S3-compatible secure PDF assets cloud bucket hosting.' },
    { name: 'Cloud Firestore', category: 'backend', level: 'Advanced', desc: 'NoSQL real-time document listener triggers.' },
    { name: 'Hive (NoSQL)', category: 'backend', level: 'Advanced', desc: 'High-performance offline document key-value synchronizer.' },
    { name: 'Firebase Auth', category: 'backend', level: 'Advanced', desc: 'Secure email validation and user account setups.' },

    // Security & Systems
    { name: 'AES Encryption', category: 'security', level: 'Advanced', desc: 'Securing offline document caches against hacking.' },
    { name: 'REST APIs', category: 'security', level: 'Advanced', desc: 'Configuring secure remote connections and JSON parameters.' },
    { name: 'Zero Trust Security', category: 'security', level: 'Intermediate', desc: 'Analyzing perimeter rules and directory firewalls.' },

    // General Tools
    { name: 'VS Code', category: 'tools', level: 'Advanced', desc: 'Primary code-editor environment.' },
    { name: 'Android Studio', category: 'tools', level: 'Advanced', desc: 'Native app profiling, emulator compiling, and trace tracking.' },
    { name: 'Git & GitHub', category: 'tools', level: 'Advanced', desc: 'Agile team collaboration, branching, and open-source contributions.' },
    { name: 'Google AdMob SDK', category: 'tools', level: 'Intermediate', desc: 'Mobile application monetization integration.' }
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const filterTabs = [
    { label: 'Show All', id: 'all', icon: Box },
    { label: 'Mobile & Front-end', id: 'mobile', icon: Smartphone },
    { label: 'Cloud & NoSQL Backend', id: 'backend', icon: Database },
    { label: 'Security & Systems', id: 'security', icon: ShieldCheck },
    { label: 'Workflow Tools', id: 'tools', icon: Terminal },
  ];

  return (
    <section id="skills" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase font-semibold tracking-wider">Skill Inventory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-neutral-100 tracking-tight">
            Technical Matrix
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl">
            A comprehensive overview of programming languages, frameworks, secure architectures, database indexing, and tools.
          </p>
        </div>

        {/* Tab Filters toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const works = tab.id === activeCategory;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-150 cursor-pointer ${
                  works
                    ? 'bg-emerald-500 border-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/10'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="p-5 bg-neutral-900/40 border border-neutral-900 rounded-2xl flex flex-col justify-between hover:border-neutral-800 transition-all group"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-extrabold text-neutral-100 text-sm tracking-tight group-hover:text-emerald-400 transition-colors">
                    {skill.name}
                  </h3>
                  <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded ${
                    skill.level === 'Advanced'
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25'
                      : 'bg-teal-500/10 text-teal-300 border border-teal-500/25'
                  }`}>
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-neutral-450 leading-relaxed font-sans mt-1">
                  {skill.desc}
                </p>
              </div>

              {/* Decorative bottom link */}
              <div className="mt-4 pt-3.5 border-t border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-600 font-mono">
                <span>Category:</span>
                <span className="uppercase tracking-wider font-bold">
                  {skill.category === 'mobile' && 'Front-end Mobile'}
                  {skill.category === 'backend' && 'Cloud & DB'}
                  {skill.category === 'security' && 'Security Crypt'}
                  {skill.category === 'tools' && 'Workflow CLI'}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
