/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Smartphone, Bell, Menu, Home, Download, Grid, User, ChevronRight,
  ArrowLeft, DownloadCloud, Plus, ToggleLeft, CheckCircle2, Trash2,
  BookOpen, Eye, Clock, Sparkles, Scale, RefreshCw, Layers
} from 'lucide-react';
import { JNTUK_DATABASE, PERSONAL_INFO } from '../data';
import { Regulation, Semester, Subject, DownloadedItem, HistoryItem } from '../types';

export default function AppSimulator() {
  // Mobile Router States
  const [activeTab, setActiveTab] = useState<'home' | 'downloads' | 'more' | 'profile'>('home');
  const [currentRoute, setCurrentRoute] = useState<string>('tabs'); // 'tabs' or inside views e.g. 'regulations-notes', 'semesters-notes', 'subjects-notes', 'units-notes', 'pdf-notes', 'calc-options', 'sgpa', 'cgpa', 'percentage', 'scientific'
  
  // Navigation variables for selections
  const [selectedReg, setSelectedReg] = useState<Regulation | null>(null);
  const [selectedSem, setSelectedSem] = useState<Semester | null>(null);
  const [selectedSub, setSelectedSub] = useState<Subject | null>(null);
  const [activePdfName, setActivePdfName] = useState<string>('');
  
  // Download Manager States
  const [downloads, setDownloads] = useState<DownloadedItem[]>([
    { id: 'ml-u3', title: 'Unit 3 Note', subject: 'Machine Learning', size: '3.83 MB', downloadedAt: 'Today' }
  ]);
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});
  
  // History States
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 'ml-u3', title: 'Unit 3 Note', subject: 'Machine Learning', openedAt: 'Just now' }
  ]);

  // Notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: '1', title: 'Welcome to Student Notes', message: 'All semester study materials are now fully unlocked and synchronized.', date: '27/5/2026' }
  ]);

  // SGPA Calc State
  const [sgpaEntries, setSgpaEntries] = useState([
    { id: '1', credits: 3.0, grade: 10 }, // 10 is O Grade
    { id: '2', credits: 3.5, grade: 9 },  // 9 is S Grade
    { id: '3', credits: 3.0, grade: 8 },  // 8 is A Grade
    { id: '4', credits: 4.0, grade: 10 }
  ]);
  const [calculatedSgpa, setCalculatedSgpa] = useState<number | null>(null);

  // CGPA Calc State
  const [cgpaEntries, setCgpaEntries] = useState([
    { id: '1', sgpa: 8.52, credits: 20 },
    { id: '2', sgpa: 9.12, credits: 21 },
    { id: '3', sgpa: 8.90, credits: 21 }
  ]);
  const [calculatedCgpa, setCalculatedCgpa] = useState<number | null>(null);

  // Percentage Calc State
  const [cgpaSliderValue, setCgpaSliderValue] = useState<number>(8.5);

  // Casio Scientific Calculator State
  const [scientificDisplay, setScientificDisplay] = useState<string>('0');
  const [scientificHistory, setScientificHistory] = useState<string>('');

  // PDF Search Note Term
  const [pdfPageCount] = useState(37);

  // General navigation helpers
  const handleBack = () => {
    if (currentRoute === 'regulations-notes') {
      setCurrentRoute('tabs');
    } else if (currentRoute === 'semesters-notes') {
      setCurrentRoute('regulations-notes');
    } else if (currentRoute === 'subjects-notes') {
      setCurrentRoute('semesters-notes');
    } else if (currentRoute === 'units-notes') {
      setCurrentRoute('subjects-notes');
    } else if (currentRoute === 'pdf-notes') {
      setCurrentRoute('units-notes');
    } else if (currentRoute === 'calc-options') {
      setCurrentRoute('tabs');
    } else if (currentRoute === 'sgpa' || currentRoute === 'cgpa' || currentRoute === 'percentage' || currentRoute === 'scientific') {
      setCurrentRoute('calc-options');
    } else {
      setCurrentRoute('tabs');
    }
  };

  // Run Notes PDF downloading logic
  const handlePdfDownload = (id: string, unitName: string, subjectName: string) => {
    if (downloads.some(item => item.id === id)) return; // already exists
    
    // Simulate interactive downloading progress
    setDownloadProgress(prev => ({ ...prev, [id]: 10 }));
    
    const intervals = [30, 60, 85, 100];
    intervals.forEach((prog, index) => {
      setTimeout(() => {
        setDownloadProgress(prev => {
          if (prog === 100) {
            // Add to downloads
            if (!downloads.some(item => item.id === id)) {
              setDownloads(d => [...d, {
                id,
                title: `${unitName} - ${subjectName}`,
                subject: subjectName,
                size: (Math.random() * 2 + 2).toFixed(2) + ' MB',
                downloadedAt: 'Today'
              }]);
            }
            const updated = { ...prev };
            delete updated[id];
            return updated;
          }
          return { ...prev, [id]: prog };
        });
      }, (index + 1) * 350);
    });
  };

  const handleOpenPdf = (id: string, unitTitle: string, subjectTitle: string) => {
    setActivePdfName(`${subjectTitle} - ${unitTitle}`);
    
    // Add to history
    if (!history.some(item => item.id === id)) {
      setHistory(prev => [{
        id,
        title: unitTitle,
        subject: subjectTitle,
        openedAt: 'Just now'
      }, ...prev]);
    }
    setCurrentRoute('pdf-notes');
  };

  // Calculus Math Calculators
  const handleCalculateSGPA = () => {
    let totalScore = 0;
    let totalCredits = 0;
    sgpaEntries.forEach(sub => {
      totalScore += (sub.credits * sub.grade);
      totalCredits += sub.credits;
    });
    const result = totalCredits > 0 ? (totalScore / totalCredits) : 0;
    setCalculatedSgpa(parseFloat(result.toFixed(2)));
  };

  const handleCalculateCGPA = () => {
    let totalWeightedSGPA = 0;
    let totalCredits = 0;
    cgpaEntries.forEach(sem => {
      totalWeightedSGPA += (sem.sgpa * sem.credits);
      totalCredits += sem.credits;
    });
    const result = totalCredits > 0 ? (totalWeightedSGPA / totalCredits) : 0;
    setCalculatedCgpa(parseFloat(result.toFixed(2)));
  };

  // Scientific Calculator button trigger
  const handleScientificKey = (val: string) => {
    if (val === 'AC') {
      setScientificDisplay('0');
      setScientificHistory('');
    } else if (val === 'DEL') {
      if (scientificDisplay.length <= 1) {
        setScientificDisplay('0');
      } else {
        setScientificDisplay(prev => prev.slice(0, -1));
      }
    } else if (val === '=') {
      try {
        let san = scientificDisplay
          .replace(/x/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/tan/g, 'Math.tan')
          .replace(/sqrt/g, 'Math.sqrt')
          .replace(/log/g, 'Math.log10')
          .replace(/ln/g, 'Math.log');
        
        // Handle brackets safely
        const evalRes = eval(san);
        setScientificHistory(scientificDisplay + ' =');
        setScientificDisplay(parseFloat(evalRes.toFixed(6)).toString());
      } catch (err) {
        setScientificDisplay('Error');
      }
    } else {
      setScientificDisplay(prev => {
        if (prev === '0' && !['.', '+', '-', 'x', '÷'].includes(val)) {
          return val;
        }
        return prev + val;
      });
    }
  };

  return (
    <section id="simulator" className="py-24 bg-neutral-900 border-t border-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
            <Smartphone className="w-3.5 h-3.5 animate-bounce" />
            <span className="uppercase font-semibold tracking-wider">Interactive Live Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-neutral-100 tracking-tight">
            Explore Student Notes Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
            Directly interact with Karthik's mobile app layout below. Open semester files, play with the SGPA/CGPA algorithms, and calculate equations using the fully operational Casio Scientific Calculator!
          </p>
        </div>

        {/* Outer Grid wrapping emulator and descriptive bullet notes */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center">
          
          {/* Key Emulator Highlights - Column Span 5 */}
          <div className="xl:col-span-5 flex flex-col space-y-6">
            <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col space-y-4">
              <h3 className="text-lg font-sans font-semibold text-neutral-100 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Emulator Capabilities</span>
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Karthik's real Android application compiles extensive Dart caching layers to accommodate complex university curriculum structure. This emulator is synchronized with real data modules, ensuring fully accessible features.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-2xs flex items-center justify-center font-bold">1</div>
                  <p className="text-xs text-neutral-300 font-medium font-sans">Curricular Tree Grid</p>
                </div>
                <p className="text-paragraph text-neutral-500 text-2xs pl-7 leading-normal">
                  Toggle Regulations and explore Semesters to choose Machine Learning syllabus books.
                </p>

                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-2xs flex items-center justify-center font-bold">2</div>
                  <p className="text-xs text-neutral-300 font-medium font-sans">Download Queue</p>
                </div>
                <p className="text-paragraph text-neutral-500 text-2xs pl-7 leading-normal">
                  Tap download triggers to instantly populate the in-memory offline Downloads registry.
                </p>

                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-2xs flex items-center justify-center font-bold">3</div>
                  <p className="text-xs text-neutral-300 font-medium font-sans">Academic Calculator Core</p>
                </div>
                <p className="text-paragraph text-neutral-500 text-2xs pl-7 leading-normal">
                  Evaluate custom credits & grades. Compute precise percentages using academic standard ratios.
                </p>

                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-2xs flex items-center justify-center font-bold">4</div>
                  <p className="text-xs text-neutral-300 font-medium font-sans animate-pulse text-emerald-400">Casio fx-991EX Simulator</p>
                </div>
                <p className="text-paragraph text-neutral-500 text-2xs pl-7 leading-normal">
                  A high-fidelity implementation supporting standard functions: <code>sin</code>, <code>cos</code>, <code>tan</code>, <code>sqrt</code>, and floating math variables.
                </p>
              </div>
            </div>

            {/* Quick Stats of the R2 Storage */}
            <div className="p-5 border border-dashed border-neutral-800 rounded-2xl flex items-center justify-between bg-neutral-950/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <BookOpen className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest leading-tight">Database Cache Status</h4>
                  <p className="text-sm font-semibold text-neutral-200 mt-1">Cloudflare R2 Bucket Online</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-teal-400/10 text-teal-300 px-2 py-0.5 border border-teal-400/20 rounded">
                162 PDFs Connected
              </span>
            </div>
          </div>

          {/* Interactive Mobile Device Frame Mockup - Column Span 7 */}
          <div className="xl:col-span-7 flex justify-center items-center">
            
            {/* Outer Smartphone Frame */}
            <div id="device-frame" className="relative w-full max-w-[370px] h-[750px] rounded-[50px] border-[12px] border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/80 overflow-hidden flex flex-col font-sans ring-4 ring-neutral-900 ring-offset-2 ring-offset-black">
              
              {/* Camera Notch Container */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-full z-40 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full border-2 border-neutral-800" />
                <div className="w-12 h-1 bg-neutral-950 rounded-full ml-3" />
              </div>

              {/* Mobile Screen Container */}
              <div className="flex-1 bg-[#FAF9F6] flex flex-col overflow-hidden text-neutral-800 font-sans select-none relative">
                
                {/* Simulated Android Status Bar */}
                <div className="h-8 pl-6 pr-6 bg-neutral-900 flex items-center justify-between text-neutral-300 font-sans text-[10px] sm:text-[11px] font-medium z-30 shrink-0 select-none">
                  <span>10:55 AM | 6.2KB/s</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono">VoLTE</span>
                    <span className="px-1 bg-emerald-500 text-neutral-950 rounded-[3px] text-[8px] font-bold">LTE</span>
                    <div className="w-5 h-2.5 border border-neutral-400 rounded-sm flex items-center p-[1px]">
                      <div className="w-[70%] h-full bg-neutral-200 rounded-[1px]" />
                    </div>
                    <span>68%</span>
                  </div>
                </div>

                {/* Inside Route Level Handler (Nested Router / Subviews) */}
                {currentRoute === 'tabs' ? (
                  /* TAB LEVEL SCENERO */
                  <div className="flex-1 flex flex-col overflow-hidden select-none">
                    
                    {/* Header bar */}
                    <div className="h-14 px-4 bg-white border-b border-neutral-100 flex items-center justify-between shrink-0 shadow-sm shadow-neutral-100/50">
                      <div className="flex items-center space-x-2.5">
                        <button className="text-neutral-500">
                          <Menu className="w-5 h-5 text-neutral-800" />
                        </button>
                        <BookOpen className="w-4 h-4 text-neutral-800" />
                        <span className="font-sans font-bold text-neutral-800 text-base tracking-tight select-none">
                          {activeTab === 'home' && 'Student Notes'}
                          {activeTab === 'downloads' && 'Downloaded Materials'}
                          {activeTab === 'more' && 'More Options'}
                          {activeTab === 'profile' && 'Profile Details'}
                        </span>
                      </div>

                      {/* Notification Bell Badge Trigger */}
                      <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-1.5 rounded-full hover:bg-neutral-100"
                      >
                        <Bell className="w-5 h-5 text-neutral-700" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                      </button>
                    </div>

                    {/* Notification Overlay List Dropdown */}
                    {showNotifications && (
                      <div className="absolute top-24 left-3 right-3 bg-white p-4 rounded-xl shadow-xl border border-neutral-100 z-50">
                        <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2">
                          <span className="text-xs font-bold text-neutral-800">Alert Notification</span>
                          <button onClick={() => setShowNotifications(false)} className="text-[10px] text-neutral-400 hover:text-neutral-800 font-bold uppercase">Close</button>
                        </div>
                        {notifications.map((n) => (
                          <div key={n.id} className="flex items-start space-x-2.5">
                            <span className="p-1.5 bg-neutral-100 rounded text-amber-500 shrink-0">🔔</span>
                            <div>
                              <h5 className="text-[11px] font-bold text-neutral-800">{n.title}</h5>
                              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">{n.message}</p>
                              <span className="text-[9px] text-neutral-400 block mt-1">{n.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab Layout Screens */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      
                      {/* SUB TAB: HOME CARD */}
                      {activeTab === 'home' && (
                        <>
                          <div className="p-4 bg-[#EDEDED] rounded-2xl flex flex-col space-y-1 relative shadow-sm">
                            <span className="text-xl">👋</span>
                            <h4 className="text-sm font-extrabold text-neutral-900">Welcome, Buddy</h4>
                            <p className="text-[11px] text-neutral-600 font-sans">Access academic books and study materials.</p>
                          </div>

                          {/* Notes widget module */}
                          <div className="p-4 bg-white border border-[#E9E9E9] rounded-2xl flex flex-col space-y-3 shadow-sm shadow-[#EDEDED]/50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">📚</span>
                                <span className="font-extrabold text-neutral-900 text-sm">Notes</span>
                              </div>
                              <span className="px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded-lg uppercase tracking-wide">
                                Step 1
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                              Choose your academic regulations syllabus to start unit-wise reference notes.
                            </p>
                            
                            <button
                              onClick={() => {
                                setSelectedReg(null);
                                setCurrentRoute('regulations-notes');
                              }}
                              className="w-full py-2.5 px-4 bg-[#FAF9F6] border border-[#EBEBEB] hover:bg-neutral-50 rounded-xl flex items-center justify-between group duration-150"
                            >
                              <div className="flex items-center space-x-3.5">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">🎓</div>
                                <div className="text-left leading-normal">
                                  <span className="text-xs font-bold text-neutral-900 block leading-tight">Select Regulation</span>
                                  <span className="text-[10px] text-neutral-400 block leading-tight">Tap to choose academic system</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </div>

                          {/* Previous Question Papers Module */}
                          <div className="p-4 bg-white border border-[#E9E9E9] rounded-2xl flex flex-col space-y-3 shadow-sm shadow-[#EDEDED]/50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">📄</span>
                                <span className="font-extrabold text-neutral-900 text-sm">Previous Papers</span>
                              </div>
                              <span className="px-2 py-0.5 bg-teal-500 text-white text-[10px] font-bold rounded-lg uppercase tracking-wide">
                                Step 1
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
                              Access old semester exam archives sorted by regulation and subject files.
                            </p>
                            
                            <button
                              onClick={() => {
                                setSelectedReg(null);
                                setCurrentRoute('regulations-notes');
                              }}
                              className="w-full py-2.5 px-4 bg-[#FAF9F6] border border-[#EBEBEB] hover:bg-neutral-50 rounded-xl flex items-center justify-between group duration-150"
                            >
                              <div className="flex items-center space-x-3.5">
                                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-500">📑</div>
                                <div className="text-left leading-normal">
                                  <span className="text-xs font-bold text-neutral-900 block leading-tight">Select Papers</span>
                                  <span className="text-[10px] text-neutral-400 block leading-tight">Pick papers & regulations</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </>
                      )}

                      {/* SUB TAB: DOWNLOADS */}
                      {activeTab === 'downloads' && (
                        <div className="space-y-3">
                          {downloads.length === 0 ? (
                            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                              <span className="text-3xl">📤</span>
                              <p className="text-xs font-bold text-neutral-800">No downloaded notes yet</p>
                              <p className="text-[10px] text-neutral-400 max-w-xs leading-normal">Check academic notes and tap download icons to populate this offline register!</p>
                            </div>
                          ) : (
                            downloads.map((item) => (
                              <div key={item.id} className="p-3.5 bg-white border border-neutral-200/80 rounded-2xl flex flex-col space-y-3.5 shadow-sm">
                                <div className="flex items-start space-x-3">
                                  <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 font-bold text-xs">
                                    PDF
                                  </div>
                                  <div className="leading-tight">
                                    <h4 className="text-xs font-bold text-neutral-900 leading-tight">{item.title}</h4>
                                    <span className="text-[9px] text-neutral-400 mt-1 block">{item.subject} • {item.size}</span>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2 pt-1 border-t border-neutral-100">
                                  <button
                                    onClick={() => handleOpenPdf(item.id, item.title, item.subject)}
                                    className="flex-1 py-1.5 px-3 bg-neutral-800 rounded-lg text-[10px] font-bold text-white flex items-center justify-center space-x-1 hover:bg-neutral-950 transition-colors cursor-pointer"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Read Offline</span>
                                  </button>
                                  <button
                                    onClick={() => setDownloads(downloads.filter(d => d.id !== item.id))}
                                    className="py-1.5 px-2 bg-red-500 rounded-lg text-[10px] font-bold text-white hover:bg-red-600 flex items-center justify-center justify-center cursor-pointer"
                                    title="Delete offline file"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {/* SUB TAB: MORE MODULE OPTIONS */}
                      {activeTab === 'more' && (
                        <div className="grid grid-cols-2 gap-3 pb-6">
                          {/* Option 1: Calculators List */}
                          <button
                            onClick={() => setCurrentRoute('calc-options')}
                            className="bg-amber-400 hover:bg-amber-500 text-white p-4 rounded-xl flex flex-col items-center justify-center aspect-square space-y-2 cursor-pointer shadow duration-155"
                          >
                            <Scale className="w-7 h-7" />
                            <span className="text-[11px] font-extrabold text-neutral-900">Calculators</span>
                          </button>

                          {/* Option 2: Casio Scientific Simulator calculator */}
                          <button
                            onClick={() => setCurrentRoute('scientific')}
                            className="bg-[#2D3339] hover:bg-[#3D444E] text-white p-4 rounded-xl flex flex-col items-center justify-center aspect-square space-y-2 cursor-pointer shadow duration-155"
                          >
                            <div className="w-7 h-7 flex items-center justify-center bg-neutral-950 text-emerald-400 text-[10px] font-mono border border-neutral-700 rounded-sm">FX</div>
                            <span className="text-[11px] font-extrabold text-white">Sci Calculator</span>
                          </button>

                          {/* Option 3: History */}
                          <button
                            onClick={() => {
                              // We can open custom history alert or list
                              setActiveTab('downloads'); // offline download acts as general storage tracker
                            }}
                            className="bg-sky-400/10 border border-sky-400/20 p-4 rounded-xl flex flex-col items-center justify-center aspect-square space-y-2 hover:bg-sky-400/20 cursor-pointer duration-155"
                          >
                            <Clock className="w-6 h-6 text-sky-400" />
                            <span className="text-[11px] font-extrabold text-[#2F3E46]">History List</span>
                          </button>

                          {/* Option 4: Settings Coming Soon */}
                          <div className="bg-neutral-100 border border-neutral-200/60 p-4 rounded-xl flex flex-col items-center justify-center aspect-square space-y-1 opacity-70">
                            <span className="text-xl">⚙️</span>
                            <span className="text-[11px] font-bold text-neutral-700 leading-none">Settings</span>
                            <span className="text-[8px] text-neutral-400 block tracking-widest uppercase">Coming Soon</span>
                          </div>

                          {/* Option 5: About Coming Soon */}
                          <div className="bg-neutral-100 border border-neutral-200/60 p-4 rounded-xl flex flex-col items-center justify-center aspect-square space-y-1 opacity-70 col-span-2">
                            <span className="text-xl">ℹ️</span>
                            <span className="text-[11px] font-bold text-neutral-700 leading-none">About Student Notes Client</span>
                            <span className="text-[8px] text-neutral-400 block tracking-widest uppercase mt-0.5">Coming Soon</span>
                          </div>
                        </div>
                      )}

                      {/* SUB TAB: PROFILE PANEL */}
                      {activeTab === 'profile' && (
                        <div className="space-y-4">
                          {/* Welcome User Banner */}
                          <div className="bg-[#EDEDED] p-4 rounded-2xl flex items-center space-x-3 shadow-sm select-none">
                            <div className="w-12 h-12 bg-neutral-300 rounded-full flex items-center justify-center font-bold font-sans text-neutral-800 text-base shadow border border-white">
                              KC
                            </div>
                            <div className="leading-tight">
                              <h4 className="text-xs font-black text-neutral-900 leading-none">{PERSONAL_INFO.displayName}</h4>
                              <span className="px-1.5 py-0.5 mt-1 text-[8px] bg-emerald-500 text-neutral-950 font-bold rounded uppercase inline-flex items-center space-x-0.5">
                                <span>Verified Profile</span>
                              </span>
                            </div>
                          </div>

                          {/* Account items */}
                          <div className="p-4 bg-white border border-[#E9E9E9] rounded-2xl flex flex-col space-y-4 shadow-sm">
                            <h4 className="text-xs font-extrabold text-neutral-900 border-b border-neutral-100 pb-2">Account Information</h4>
                            
                            <div className="leading-tight">
                              <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Email Address</span>
                              <span className="text-xs font-semibold text-neutral-800 block mt-0.5">{PERSONAL_INFO.email}</span>
                            </div>

                            <div className="leading-tight">
                              <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">Email Verification Status</span>
                              <div className="flex items-center space-x-1.5 mt-0.5">
                                <span className="text-emerald-500 font-bold text-xs select-none">✔ Verified Badge</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Bottom Nav Bar - Pixel-perfect to mobile screens */}
                    <div className="h-16 bg-white border-t border-neutral-100 grid grid-cols-4 shrink-0 select-none shadow shadow-neutral-100/50">
                      
                      <button
                        onClick={() => setActiveTab('home')}
                        className={`flex flex-col items-center justify-center space-y-1 text-2xs cursor-pointer ${
                          activeTab === 'home' ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-600'
                        }`}
                      >
                        <Home className="w-5 h-5" />
                        <span>Home</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('downloads')}
                        className={`flex flex-col items-center justify-center space-y-1 text-2xs cursor-pointer ${
                          activeTab === 'downloads' ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-600'
                        }`}
                      >
                        <Download className="w-5 h-5" />
                        <span>Downloads</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('more')}
                        className={`flex flex-col items-center justify-center space-y-1 text-2xs cursor-pointer ${
                          activeTab === 'more' ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-600'
                        }`}
                      >
                        <Grid className="w-5 h-5" />
                        <span>More</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex flex-col items-center justify-center space-y-1 text-2xs cursor-pointer ${
                          activeTab === 'profile' ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-neutral-600'
                        }`}
                      >
                        <User className="w-5 h-5" />
                        <span>Profile</span>
                      </button>

                    </div>
                  </div>
                ) : (
                  /* SCREEN LEVEL SPECIFIC DETAILED ROUTES */
                  <div className="flex-1 flex flex-col overflow-hidden select-none bg-[#FAF9F6]">
                    
                    {/* Nested header bar */}
                    <div className="h-14 px-4 bg-white border-b border-neutral-100 flex items-center justify-start shrink-0 relative shadow-sm">
                      <button
                        onClick={handleBack}
                        className="p-1 px-1.5 bg-[#FAF9F6] border border-neutral-200/60 hover:bg-neutral-100 rounded-lg text-neutral-700 flex items-center space-x-1"
                      >
                        <ArrowLeft className="w-4 h-4 text-neutral-800" />
                      </button>

                      <span className="font-sans font-bold text-xs text-neutral-800 truncate select-none pl-3 uppercase tracking-wider">
                        {currentRoute === 'regulations-notes' && 'Select Regulation'}
                        {currentRoute === 'semesters-notes' && (selectedReg?.name || 'Semesters')}
                        {currentRoute === 'subjects-notes' && (selectedSem?.name || 'Subjects')}
                        {currentRoute === 'units-notes' && (selectedSub?.name || 'Units Available')}
                        {currentRoute === 'pdf-notes' && 'Dynamic PDF Reader'}
                        {currentRoute === 'calc-options' && 'Calculator Terminal'}
                        {currentRoute === 'sgpa' && 'SGPA Solver'}
                        {currentRoute === 'cgpa' && 'CGPA Solver'}
                        {currentRoute === 'percentage' && 'Percentage Solver'}
                        {currentRoute === 'scientific' && 'Scientific Calculator'}
                      </span>
                    </div>

                    {/* Scrollable screen viewarea */}
                    <div className="flex-1 overflow-y-auto p-4">
                      
                      {/* VIEW_1: REGULATIONS CHOOSER */}
                      {currentRoute === 'regulations-notes' && (
                        <div className="space-y-3">
                          <p className="text-[10px] text-neutral-400 font-mono italic">Regulations catalog based on university student archives:</p>
                          {JNTUK_DATABASE.map((reg) => (
                            <button
                              key={reg.id}
                              onClick={() => {
                                setSelectedReg(reg);
                                setCurrentRoute('semesters-notes');
                              }}
                              className="w-full text-left p-3.5 bg-white border border-neutral-200 hover:border-indigo-400 rounded-xl flex items-center justify-between group duration-150 cursor-pointer"
                            >
                              <div>
                                <span className="text-xs font-extrabold text-neutral-900 block">{reg.name}</span>
                                <span className="text-[9px] text-neutral-400 block mt-0.5">{reg.semesters.length} Semesters available for study</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 duration-150" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* VIEW_2: SEMESTERS CHOOSER */}
                      {currentRoute === 'semesters-notes' && selectedReg && (
                        <div className="grid grid-cols-2 gap-3">
                          {selectedReg.semesters.map((sem) => (
                            <button
                              key={sem.id}
                              onClick={() => {
                                setSelectedSem(sem);
                                setCurrentRoute('subjects-notes');
                              }}
                              className="bg-white hover:bg-indigo-50/50 p-4 rounded-xl border border-neutral-200 text-center flex flex-col items-center justify-center space-y-2 cursor-pointer duration-150 shadow-sm shadow-[#EDEDED]"
                            >
                              <span className="text-xl leading-none">📖</span>
                              <span className="text-[11px] font-bold text-neutral-900 block">{sem.name}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* VIEW_3: SUBJECTS CHOOSER */}
                      {currentRoute === 'subjects-notes' && selectedSem && (
                        <div className="space-y-3">
                          <p className="text-[10px] text-neutral-400 font-mono block mb-2">{selectedSem.name} Academic Subjects:</p>
                          {selectedSem.subjects.map((sub, i) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setSelectedSub(sub);
                                setCurrentRoute('units-notes');
                              }}
                              className="w-full p-3 bg-white border border-neutral-200 hover:border-emerald-400 rounded-xl flex items-center justify-between group cursor-pointer duration-150"
                            >
                              <div className="flex items-center space-x-3.5">
                                <span className="text-xs font-mono font-bold bg-[#E9E9E9] text-neutral-800 w-6 h-6 rounded-full flex items-center justify-center text-[10px]">{i + 1}</span>
                                <span className="text-xs font-extrabold text-neutral-900">{sub.name}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* VIEW_4: UNITWISE FILE LIST DIRECTORY */}
                      {currentRoute === 'units-notes' && selectedSub && (
                        <div className="space-y-3">
                          <p className="text-[10px] text-neutral-400 font-mono block mb-2">Unit files for {selectedSub.name}:</p>
                          {selectedSub.units.map((unit, idx) => {
                            const noteId = `${selectedSub.id}-u${idx + 1}`;
                            const isDownloaded = downloads.some(d => d.id === noteId);
                            const percent = downloadProgress[noteId];
                            
                            return (
                              <div
                                key={idx}
                                className="p-3 bg-white border border-neutral-200/80 rounded-xl flex items-center justify-between shadow-sm"
                              >
                                <button
                                  onClick={() => handleOpenPdf(noteId, unit, selectedSub.name)}
                                  className="flex-1 text-left flex flex-col space-y-0.5 hover:opacity-80 leading-normal"
                                >
                                  <span className="text-xs font-extrabold text-neutral-900 block">{unit}</span>
                                  <span className="text-[9px] text-neutral-400 block font-sans">Tap to view hand-written study notes</span>
                                </button>

                                <div className="flex items-center space-x-2 shrink-0">
                                  {isDownloaded ? (
                                    <span className="text-emerald-500 font-bold text-2xs flex items-center space-x-0.5">✔ Saved</span>
                                  ) : percent !== undefined ? (
                                    <div className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center relative font-mono text-[8px] font-bold text-neutral-800">
                                      {percent}%
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => handlePdfDownload(noteId, unit, selectedSub.name)}
                                      className="p-1 px-1.5 bg-[#FAF9F6] border border-neutral-200/80 rounded-lg hover:bg-neutral-100 flex items-center text-neutral-800"
                                      title="Download note file"
                                    >
                                      <DownloadCloud className="w-4 h-4 text-neutral-500" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* VIEW_5: DYNAMIC PDF RENDERING CANVAS */}
                      {currentRoute === 'pdf-notes' && (
                        <div className="flex flex-col space-y-3.5 pb-6">
                          
                          {/* Rich mockup page mimicking handwritten unit 3 screenshot (page 11) */}
                          <div className="p-4 bg-white border border-neutral-300 rounded-xl shadow-md min-h-[350px] relative font-serif select-none overflow-hidden">
                            {/* Paper margin line representing legal writing notebook */}
                            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-red-400/50" />
                            {/* Horizontal background notebook lines */}
                            <div className="absolute inset-x-0 inset-y-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100%_1.5rem] pointer-events-none" />

                            <div className="relative pl-6 leading-relaxed select-text flex flex-col space-y-3">
                              {/* Top metadata line resembling handwritten text */}
                              <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-1.5">
                                <span className="text-2xs font-mono font-bold text-indigo-600 block">Karthik's KIET Student Notes</span>
                                <span className="text-2xs font-sans tracking-wide bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-500">Page 1 / {pdfPageCount}</span>
                              </div>

                              {/* Title block */}
                              <div className="text-center font-bold pb-2 border-b-2 border-neutral-200">
                                <h4 className="text-xs text-indigo-500 font-sans tracking-wide leading-tight mt-1">Machine Learning R-23</h4>
                                <h3 className="text-base text-neutral-900 mt-1 select-none font-sans uppercase font-black tracking-normal">Unit - 3</h3>
                              </div>

                              {/* Handwritten Mock text rendering with blue crayon pencil theme */}
                              <div className="text-[11px] text-blue-800 font-sans italic space-y-3 pl-1 leading-snug">
                                <p className="font-bold underline text-blue-900 not-italic">Syllabus :</p>
                                <p className="font-bold">Models Based on Decision Trees - (Part A)</p>
                                <p className="pl-2">1. Decision Trees for Classification</p>
                                <p className="pl-2">2. Impurity Measures</p>
                                <p className="pl-2">3. Properties of Decision Trees</p>
                                <p className="pl-2">4. Regression Based on Decision Trees</p>
                                <p className="pl-2">5. Bias - Variance Trade - off</p>
                                <p className="pl-2">6. Random Forests for classification & Regression</p>
                                <p className="pl-2">7. Overfitting, Noisy data and Pruning</p>
                                
                                <p className="font-bold pt-2 font-mono">Part - B : The Bayes classifier :-</p>
                                <p className="pl-2">8. Introduction to the Bayes classifier</p>
                                <p className="pl-2">9. Bayes Rule and Inference</p>
                              </div>

                              {/* Typed notes highlight below PDF page exactly like screenshot 11 */}
                              <div className="mt-4 pt-4 border-t border-dashed border-neutral-300 font-sans not-italic text-2xs space-y-2">
                                <h5 className="font-bold text-neutral-900 bg-amber-200 px-1 py-0.5 rounded inline-block">1) Decision Trees for Classification:</h5>
                                <p className="text-neutral-600 leading-normal">
                                  A decision tree classification is a supervised machine learning algorithm used for classifying data into categories based on a series of questions. It recursively splits datasets based on feature values.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-white border border-neutral-200 rounded-xl text-center self-center shrink-0 w-full flex items-center justify-between">
                            <span className="text-[10px] text-neutral-400 font-bold block">{activePdfName}</span>
                            <span className="text-[9px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded font-mono">Offline-Encrypted</span>
                          </div>
                        </div>
                      )}

                      {/* VIEW_6: CALCULATOR SELECT OPTIONS MENU */}
                      {currentRoute === 'calc-options' && (
                        <div className="space-y-3.5 pb-6">
                          <p className="text-[10px] text-neutral-400 font-mono block">Complete Student Utilities list:</p>
                          
                          {/* Option A: SGPA Calculator */}
                          <button
                            onClick={() => {
                              setCalculatedSgpa(null);
                              setCurrentRoute('sgpa');
                            }}
                            className="w-full p-4 bg-white border border-neutral-200 hover:border-amber-400 rounded-2xl text-left flex items-center justify-between group duration-150 cursor-pointer shadow-sm"
                          >
                            <div className="flex items-center space-x-3.5">
                              <span className="text-2xl">∑</span>
                              <div className="leading-tight">
                                <span className="text-xs font-extrabold text-neutral-900 block leading-tight">SGPA Calculator</span>
                                <span className="text-[9px] text-neutral-400 block mt-0.5">Calculate semester SGPA from subject grades</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 duration-150" />
                          </button>

                          {/* Option B: CGPA Calculator */}
                          <button
                            onClick={() => {
                              setCalculatedCgpa(null);
                              setCurrentRoute('cgpa');
                            }}
                            className="w-full p-4 bg-white border border-neutral-200 hover:border-amber-400 rounded-2xl text-left flex items-center justify-between group duration-150 cursor-pointer shadow-sm"
                          >
                            <div className="flex items-center space-x-3.5">
                              <span className="text-2xs font-mono font-bold bg-[#E9E9E9] text-neutral-800 w-8 h-8 rounded-lg flex items-center justify-center">CG</span>
                              <div className="leading-tight">
                                <span className="text-xs font-extrabold text-neutral-900 block leading-tight">CGPA Calculator</span>
                                <span className="text-[9px] text-neutral-400 block mt-0.5">Calculate cumulative GPA across multiple semesters</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 duration-150" />
                          </button>

                          {/* Option C: Percentage Calculator */}
                          <button
                            onClick={() => {
                              setCurrentRoute('percentage');
                            }}
                            className="w-full p-4 bg-white border border-neutral-200 hover:border-amber-400 rounded-2xl text-left flex items-center justify-between group duration-150 cursor-pointer shadow-sm"
                          >
                            <div className="flex items-center space-x-3.5">
                              <span className="text-2xl leading-none">%</span>
                              <div className="leading-tight">
                                <span className="text-xs font-extrabold text-neutral-900 block leading-tight">Percentage Calculator</span>
                                <span className="text-[9px] text-neutral-400 block mt-0.5">Academic standard CGPA to raw percentage converter</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 duration-150" />
                          </button>
                        </div>
                      )}

                      {/* VIEW_7: SGPA SOLVER INTERFACE */}
                      {currentRoute === 'sgpa' && (
                        <div className="flex flex-col space-y-4 pb-6 select-none">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-neutral-400 font-mono">Dynamic Grade Rows:</span>
                            <button
                              onClick={() => setSgpaEntries([...sgpaEntries, { id: Math.random().toString(), credits: 3.0, grade: 10 }])}
                              className="p-1 px-1.5 bg-neutral-900 text-white rounded-lg text-[9px] font-bold flex items-center space-x-1 hover:bg-black"
                            >
                              <Plus className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Add Row</span>
                            </button>
                          </div>

                          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                            {sgpaEntries.map((row, index) => (
                              <div key={row.id} className="p-3 bg-white border border-neutral-200/80 rounded-xl flex items-center justify-between space-x-2 shadow-2xs">
                                <span className="w-5 h-5 rounded-full bg-[#E5E5E5] text-neutral-800 font-mono text-[9px] flex items-center justify-center font-bold shrink-0">{index + 1}</span>
                                
                                {/* Credits Select Dropdown */}
                                <div className="flex-1 flex flex-col space-y-0.5 leading-none">
                                  <label className="text-[8px] text-neutral-400 uppercase font-bold">Credits</label>
                                  <select
                                    value={row.credits}
                                    onChange={(e) => {
                                      setSgpaEntries(sgpaEntries.map(entry => entry.id === row.id ? { ...entry, credits: parseFloat(e.target.value) } : entry));
                                    }}
                                    className="bg-neutral-50 text-xs border border-neutral-200 p-1.5 rounded-lg font-mono focus:outline-none focus:border-amber-400"
                                  >
                                    <option value="1.0">1.0 Créditos</option>
                                    <option value="2.0">2.0 Créditos</option>
                                    <option value="3.0">3.0 Créditos</option>
                                    <option value="3.5">3.5 Créditos</option>
                                    <option value="4.0">4.0 Créditos</option>
                                  </select>
                                </div>

                                {/* Grade Select Dropdown */}
                                <div className="flex-1 flex flex-col space-y-0.5 leading-none">
                                  <label className="text-[8px] text-neutral-400 uppercase font-bold">Grade</label>
                                  <select
                                    value={row.grade}
                                    onChange={(e) => {
                                      setSgpaEntries(sgpaEntries.map(entry => entry.id === row.id ? { ...entry, grade: parseInt(e.target.value) } : entry));
                                    }}
                                    className="bg-neutral-50 text-xs border border-neutral-200 p-1.5 rounded-lg focus:outline-none focus:border-amber-400"
                                  >
                                    <option value="10">O (10)</option>
                                    <option value="9">S (9)</option>
                                    <option value="8">A (8)</option>
                                    <option value="7">B (7)</option>
                                    <option value="6">C (6)</option>
                                    <option value="5">D (5)</option>
                                    <option value="0">F (0)</option>
                                  </select>
                                </div>

                                {/* Delete Row Button */}
                                <button
                                  onClick={() => setSgpaEntries(sgpaEntries.filter(entry => entry.id !== row.id))}
                                  className="p-1.5 text-neutral-450 hover:text-red-500 rounded shrink-0"
                                  disabled={sgpaEntries.length <= 1}
                                  title="Delete dynamic row"
                                >
                                  ❌
                                </button>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={handleCalculateSGPA}
                            className="py-3 px-4 bg-emerald-500 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 hover:bg-emerald-400 duration-150 cursor-pointer text-center font-bold"
                          >
                            <span>Calculate SGPA</span>
                          </button>

                          {calculatedSgpa !== null && (
                            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
                              <span className="text-[10px] text-neutral-400 uppercase block tracking-wider font-sans">Syllabus SGPA GPA:</span>
                              <span className="text-xl font-bold text-indigo-600 block mt-1 tracking-tight font-sans">{calculatedSgpa} / 10.0</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* VIEW_8: CGPA SOLVER INTERFACE */}
                      {currentRoute === 'cgpa' && (
                        <div className="flex flex-col space-y-4 pb-6 select-none">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-neutral-400 font-mono">Semester entries count:</span>
                            <button
                              onClick={() => setCgpaEntries([...cgpaEntries, { id: Math.random().toString(), sgpa: 8.5, credits: 21 }])}
                              className="p-1 px-1.5 bg-neutral-900 text-white rounded-lg text-[9px] font-bold flex items-center space-x-1 hover:bg-black"
                            >
                              <Plus className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Add Semester</span>
                            </button>
                          </div>

                          <div className="space-y-2 max-h-[300px] overflow-y-auto">
                            {cgpaEntries.map((row, idx) => (
                              <div key={row.id} className="p-3 bg-white border border-neutral-200/80 rounded-xl flex items-center justify-between space-x-2 shadow-2xs">
                                <span className="text-xs font-extrabold text-neutral-800 shrink-0">Sem {idx + 1}</span>
                                
                                <div className="flex-1 flex flex-col space-y-0.5 leading-none">
                                  <label className="text-[8px] text-neutral-400 uppercase font-bold">SGPA</label>
                                  <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="10"
                                    value={row.sgpa}
                                    onChange={(e) => {
                                      setCgpaEntries(cgpaEntries.map(entry => entry.id === row.id ? { ...entry, sgpa: parseFloat(e.target.value) || 0 } : entry));
                                    }}
                                    className="bg-neutral-50 text-xs text-center border border-neutral-200 p-1.5 rounded-lg font-mono focus:outline-none focus:border-amber-400 w-16"
                                  />
                                </div>

                                <div className="flex-1 flex flex-col space-y-0.5 leading-none">
                                  <label className="text-[8px] text-neutral-400 uppercase font-bold">Credits</label>
                                  <input
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={row.credits}
                                    onChange={(e) => {
                                      setCgpaEntries(cgpaEntries.map(entry => entry.id === row.id ? { ...entry, credits: parseInt(e.target.value) || 0 } : entry));
                                    }}
                                    className="bg-neutral-50 text-xs text-center border border-neutral-200 p-1.5 rounded-lg font-mono focus:outline-none focus:border-amber-400 w-14"
                                  />
                                </div>

                                <button
                                  onClick={() => setCgpaEntries(cgpaEntries.filter(entry => entry.id !== row.id))}
                                  className="text-neutral-400 hover:text-red-500 rounded text-xs px-1 shrink-0"
                                  disabled={cgpaEntries.length <= 1}
                                >
                                  ❌
                                </button>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={handleCalculateCGPA}
                            className="py-3 px-4 bg-emerald-500 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 hover:bg-emerald-400 duration-150 cursor-pointer text-center font-bold"
                          >
                            <span>Calculate CGPA</span>
                          </button>

                          {calculatedCgpa !== null && (
                            <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-center">
                              <span className="text-[10px] text-neutral-400 uppercase block tracking-wider">Overall CGPA Average:</span>
                              <span className="text-xl font-bold text-teal-600 block mt-1 tracking-tight">{calculatedCgpa} / 10.0</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* VIEW_9: PERCENTAGE CONVERTER INTERFACE */}
                      {currentRoute === 'percentage' && (
                        <div className="flex flex-col space-y-4 pb-6 select-none bg-white p-4 border border-neutral-200 rounded-2xl">
                          <span className="text-2xs font-mono font-bold text-indigo-500 uppercase tracking-widest block text-center mb-1">
                            Academic standard CGPA Ratio
                          </span>

                          <div className="text-center bg-neutral-50 p-4 border border-neutral-100 rounded-xl leading-snug">
                            <span className="text-paragraph text-neutral-400 text-2xs uppercase tracking-wide">CGPA Value Slider:</span>
                            <span className="text-3xl font-extrabold text-neutral-900 block font-mono tracking-tight mt-1">{cgpaSliderValue.toFixed(2)}</span>
                            <span className="text-[10px] text-neutral-500 block font-mono mt-1 border-t border-neutral-250/65 pt-1.5">
                              Standard Equation: (CGPA - 0.5) * 10
                            </span>
                          </div>

                          {/* Range input slider */}
                          <div className="flex flex-col space-y-1 mt-2">
                            <input
                              type="range"
                              min="4.0"
                              max="10.0"
                              step="0.05"
                              value={cgpaSliderValue}
                              onChange={(e) => setCgpaSliderValue(parseFloat(e.target.value))}
                              className="w-full accent-emerald-500 cursor-pointer"
                            />
                            <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                              <span>Min 4.0</span>
                              <span>Mid 7.0</span>
                              <span>Max 10.0</span>
                            </div>
                          </div>

                          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center leading-tight">
                            <span className="text-[10px] uppercase block tracking-wider font-semibold text-emerald-700 font-sans">Raw Percent Conversion:</span>
                            <span className="text-2xl font-black text-emerald-600 block mt-1 font-sans">{((cgpaSliderValue - 0.5) * 10).toFixed(1)}%</span>
                          </div>
                        </div>
                      )}

                      {/* VIEW_10: CASIO FX-991EX SCIENTIFIC CALCULATOR SIMULATOR */}
                      {currentRoute === 'scientific' && (
                        <div className="flex flex-col select-none rounded-2xl overflow-hidden bg-neutral-900 p-2.5 border border-neutral-800 shadow-xl max-w-[340px] mx-auto select-none mt-1">
                          
                          {/* Casio LCD Digital Screen (Screenshot 13 style) */}
                          <div className="bg-[#A4B3A2] p-3.5 rounded-lg border-2 border-neutral-700 text-neutral-900 font-mono tracking-wide text-right flex flex-col justify-between h-20 mb-3.5 overflow-hidden">
                            <span className="text-[10px] block opacity-70 leading-none truncate select-none text-neutral-800 tracking-tight">
                              {scientificHistory || 'CASIO PILOT EMULATOR'}
                            </span>
                            <span className="text-xl font-bold block truncate leading-none mt-2 tracking-normal select-text text-neutral-950 font-mono">
                              {scientificDisplay}
                            </span>
                          </div>

                          {/* Casio logo tagline */}
                          <div className="flex items-center justify-between px-2 mb-3">
                            <span className="text-[9px] text-neutral-400 font-serif tracking-widest font-bold">CASIO</span>
                            <span className="text-[7.5px] text-neutral-500 font-mono font-medium italic">fx-991EX CLASSWIZ PILOT</span>
                          </div>

                          {/* Keyboard Grid */}
                          <div className="grid grid-cols-4 gap-1.5">
                            {/* Scientific Triggers Function keys */}
                            {['log', 'ln', 'e', '!', 'sin', 'cos', 'tan', '^', '(', ')', 'sqrt', '%'].map((btn) => (
                              <button
                                key={btn}
                                onClick={() => handleScientificKey(btn === '^' ? '**' : btn)}
                                className="py-2.5 bg-neutral-800/80 rounded border border-neutral-850 hover:bg-neutral-700 hover:text-white text-[10px] font-mono text-neutral-300 font-semibold uppercase leading-none shadow-sm cursor-pointer duration-100"
                              >
                                {btn}
                              </button>
                            ))}

                            {/* Standard Core Numbers, operators, clear actions */}
                            {['7', '8', '9', 'AC', '4', '5', '6', 'DEL', '1', '2', '3', 'x', '0', '.', 'π', '÷', '00', '+', '-', '='].map((btn) => {
                              const calcAc = btn === 'AC' || btn === 'DEL';
                              const calcOp = ['+', '-', 'x', '÷', '='].includes(btn);
                              return (
                                <button
                                  key={btn}
                                  onClick={() => handleScientificKey(btn)}
                                  className={`py-3 rounded text-xs font-bold leading-none shadow-sm duration-100 cursor-pointer ${
                                    calcAc
                                      ? 'bg-red-500 hover:bg-red-600 text-white font-black'
                                      : calcOp
                                      ? 'bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black'
                                      : 'bg-neutral-700/60 hover:bg-neutral-600 border border-neutral-750 text-neutral-100 font-mono'
                                  }`}
                                >
                                  {btn}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* Simulated Home button line marker */}
                <div className="h-2 bg-neutral-900 shrink-0 select-none flex items-center justify-center p-1 font-sans">
                  <div className="w-20 h-1 bg-neutral-650 rounded-full" />
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
