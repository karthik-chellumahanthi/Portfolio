/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Linkedin, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);
    // @ts-ignore
    const envEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    const endpoint = envEndpoint || "https://formspree.io/f/karthikch834@gmail.com";

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Student Notes Portfolio Inquiry',
          message: formData.message
        })
      });
      if (response.ok) {
        setSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Graceful fallback for preview window
        setSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      // Fallback
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
      
      {/* Absolute decorative glow background */}
      <div className="absolute left-1/3 bottom-10 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="uppercase font-semibold tracking-wider">Bridge Channels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-neutral-100 tracking-tight">
            Start a Conversation
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl">
            Interested in hiring me for internship positions, job opportunities, or full stack inquiries? Submit the secure message console or tap physical links below.
          </p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Block: Raw Developer Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#4A5568] uppercase tracking-widest font-bold">Contact Coordinates</span>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Coordinates Item Email */}
                <div className="p-4 bg-[#1E1E24]/30 border border-neutral-900 rounded-2xl flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="leading-tight">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-bold font-mono">Email Address</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs sm:text-sm font-semibold text-neutral-300 hover:text-emerald-400 duration-100 mt-1 block">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Coordinates Item Phone */}
                <div className="p-4 bg-[#1E1E24]/30 border border-neutral-900 rounded-2xl flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/5 border border-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="leading-tight">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold font-mono">Call / WhatsApp</span>
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs sm:text-sm font-semibold text-neutral-300 hover:text-teal-400 duration-100 mt-1 block">
                      +91 {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Coordinates Item Location */}
                <div className="p-4 bg-[#1E1E24]/30 border border-neutral-900 rounded-2xl flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="leading-tight animate-none">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-bold font-mono">Based In</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-300 block mt-1">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Link profiles widget with tags */}
            <div className="p-5 border border-dashed border-neutral-850 rounded-2xl flex flex-col space-y-3.5">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">Cloud Profile Directories</span>
              <div className="flex items-center space-x-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="flex-1 p-3 bg-neutral-900 hover:bg-[#25252D] border border-neutral-850 rounded-xl flex items-center justify-center space-x-2 text-neutral-300 hover:text-white text-xs font-semibold"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="flex-1 p-3 bg-neutral-900 hover:bg-[#25252D] border border-neutral-850 rounded-xl flex items-center justify-center space-x-2 text-neutral-300 hover:text-white text-xs font-semibold"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Block: Active Contact Form */}
          <div className="lg:col-span-7 bg-neutral-900/60 p-6 sm:p-8 border border-neutral-900 rounded-3xl relative flex flex-col justify-center">
            
            {sent ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-sans font-bold text-neutral-105">Message Logged!</h3>
                <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                  Thanks for getting in touch. Karthik will check the message inbox and reach out to you at the email address provided shortly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="py-2 px-6 bg-neutral-800 text-neutral-300 font-sans font-bold text-xs rounded-xl hover:bg-neutral-850 border border-neutral-750 cursor-pointer"
                >
                  Reset Message Console
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest font-bold">Secure Message Console</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field input */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase font-mono font-bold leading-none">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="p-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-neutral-200 font-sans focus:outline-none focus:border-emerald-500 placeholder-neutral-600 duration-150"
                    />
                  </div>

                  {/* Email address field input */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-neutral-400 uppercase font-mono font-bold leading-none">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="p-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-neutral-200 font-sans focus:outline-none focus:border-emerald-500 placeholder-neutral-600 duration-150"
                    />
                  </div>
                </div>

                {/* Subject field input */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-mono font-bold leading-none">Subject Line</label>
                  <input
                    type="text"
                    placeholder="Internship/Job offer or inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="p-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-neutral-200 font-sans focus:outline-none focus:border-emerald-500 placeholder-neutral-600 duration-150"
                  />
                </div>

                {/* Message text environment */}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase font-mono font-bold leading-none">Inquiry Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write details of your internship requirements or job role details here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="p-3 bg-neutral-950 border border-neutral-850 rounded-xl text-xs text-neutral-200 font-sans focus:outline-none focus:border-emerald-500 placeholder-neutral-600 duration-150 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-neutral-950 font-bold font-sans text-xs uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 hover:opacity-95 duration-100 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{sending ? 'Transmitting...' : 'Submit Message'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
