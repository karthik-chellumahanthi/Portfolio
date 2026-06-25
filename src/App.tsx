/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCards from './components/ProjectCards';
import AppSimulator from './components/AppSimulator';
import ChatbotSimulator from './components/ChatbotSimulator';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsShowcase from './components/SkillsShowcase';
import Certifications from './components/Certifications';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 selection:bg-emerald-500/30 selection:text-emerald-300">
      <Header />
      <main>
        <Hero />
        <ProjectCards />
        <AppSimulator />
        <ChatbotSimulator />
        <ExperienceTimeline />
        <SkillsShowcase />
        <Certifications />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

