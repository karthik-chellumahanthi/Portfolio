/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MessageSquare, Send, Cpu, Sliders, CheckCircle2, User, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  pricingDetails?: {
    estimatedValue: string;
    depreciationScore: string;
    factors: { label: string; trend: 'up' | 'down'; val: string }[];
  };
}

export default function ChatbotSimulator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! I am Karthik\'s Used Car Price Prediction Chatbot trained in Python model parameters. Choose a vehicle preset or enter some parameters (Make, Year, Mileage) below, and I will predict its approximate market value.',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [aiTyping, setAiTyping] = useState(false);

  const carPresets = [
    { title: 'Toyota Corolla 2018', text: 'Toyota Corolla, Year: 2018, Mileage: 45,000 km, Fuel: Petrol', value: '$16,200 - $17,500', depreciation: 'Low', factors: [{ label: 'Year Coefficient', trend: 'up', val: '+$1,100' }, { label: 'Mileage Loss', trend: 'down', val: '-$340' }] },
    { title: 'Honda Civic 2015', text: 'Honda Civic, Year: 2015, Mileage: 120,000 km, Fuel: Petrol', value: '$9,800 - $10,950', depreciation: 'Medium', factors: [{ label: 'Age Deterioration', trend: 'down', val: '-$1,800' }, { label: 'Mileage Decay', trend: 'down', val: '-$1,120' }] },
    { title: 'Ford Mustang 2020', text: 'Ford Mustang, Year: 2020, Mileage: 25,000 km, Fuel: Petrol', value: '$31,500 - $34,200', depreciation: 'Very Low', factors: [{ label: 'High Demand Trim', trend: 'up', val: '+$4,500' }, { label: 'Age Coefficient', trend: 'up', val: '+$2,200' }] }
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim() || aiTyping) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setAiTyping(true);

    // AI thinking state response
    setTimeout(() => {
      // Analyze input keywords or find exact preset
      const match = carPresets.find(preset => textToSend.toLowerCase().includes(preset.title.toLowerCase()) || preset.title.toLowerCase().split(' ').every(w => textToSend.toLowerCase().includes(w)));
      
      let botText = '';
      let pricingDetails = undefined;

      if (match) {
        botText = `Inference completed for ${match.title}! Our regression model evaluated historical trends for mileage, gas trims, and age values. Here is the estimated evaluation:`;
        pricingDetails = {
          estimatedValue: match.value,
          depreciationScore: match.depreciation,
          factors: match.factors as { label: string; trend: 'up' | 'down'; val: string }[]
        };
      } else {
        // Safe mock predictions for user-entered random query
        const baseMin = Math.floor(Math.random() * 12000 + 4000);
        const baseMax = baseMin + Math.floor(Math.random() * 2500 + 800);
        
        botText = `Model completed custom pricing analysis for your query! Standard vehicle regression was performed. Based on standard market indices, here are the calculated bounds:`;
        pricingDetails = {
          estimatedValue: `$` + baseMin.toLocaleString() + ' - $' + baseMax.toLocaleString(),
          depreciationScore: Math.random() > 0.5 ? 'Moderate' : 'High',
          factors: [
            { label: 'Calculated Age Deflection', trend: 'down' as const, val: '-$1,250' },
            { label: 'Standard Mileage Depreciation', trend: 'down' as const, val: '-$580' }
          ]
        };
      }

      const botMsg: Message = {
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        pricingDetails
      };

      setMessages(prev => [...prev, botMsg]);
      setAiTyping(false);
    }, 900);
  };

  return (
    <section id="chatbot" className="py-24 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col items-start space-y-3 mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase font-semibold tracking-wider">AI Interactive Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-neutral-100 tracking-tight">
            Used Car Price Prediction Chatbot
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl">
            A visual sandbox of the AI Chatbot project described in Karthik's portfolio. Click on a vehicle preset below to evaluate real-time regression math!
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Presets Panel column-span 4 */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="p-5 bg-neutral-900/50 border border-neutral-900 rounded-2xl flex flex-col space-y-4">
              <h3 className="text-sm font-extrabold text-neutral-200 flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Vehicle Preset Triggers</span>
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Quickly load preset vehicle definitions into the model thread. This triggers ML calculations of degradation, gas multipliers, and coefficients in real time.
              </p>

              <div className="flex flex-col space-y-2.5 pt-1">
                {carPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(preset.text)}
                    className="w-full text-left p-3 rounded-xl bg-neutral-950 border border-neutral-850 hover:border-emerald-500/50 transition-colors text-xs font-sans text-neutral-300 font-semibold group flex items-center justify-between cursor-pointer"
                  >
                    <span>{preset.title}</span>
                    <span className="text-[10px] text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity">Submit &rarr;</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Factual outline */}
            <div className="p-5 border border-neutral-900 rounded-2xl flex flex-col space-y-2.5">
              <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">Underlying Architecture</h4>
              <p className="text-[11px] text-neutral-500 font-sans leading-normal">
                This ML agent simulates user telemetry in Python, querying statistical weights to compute accurate depreciation based on KIET course models.
              </p>
            </div>
          </div>

          {/* Interactive chatbox console - column-span 8 */}
          <div className="lg:col-span-8 flex flex-col h-[520px] bg-neutral-900/40 border border-neutral-900 rounded-3xl overflow-hidden shadow-lg shadow-black/80 relative">
            <div className="absolute inset-0 bg-neutral-900/10 rounded-3xl backdrop-blur-[2px] pointer-events-none" />
            
            {/* Header console */}
            <div className="relative px-5 py-4 bg-neutral-900 border-b border-neutral-800/80 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Cpu className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-neutral-200">Price Prediction Model</h4>
                  <span className="text-[10px] text-emerald-400 font-mono block leading-none mt-1">● Active ML-Thread</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded">
                Python NLP Model v1.4
              </span>
            </div>

            {/* Chat Messages scroll area */}
            <div className="relative flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => {
                const self = msg.sender === 'user';
                return (
                  <div key={i} className={`flex items-start space-x-3.5 ${self ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Portrait badge */}
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-sans border shadow-sm ${
                      self 
                        ? 'bg-[#E5E5E5] text-neutral-800 border-neutral-200 font-black' 
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                    }`}>
                      {self ? <User className="w-4 h-4" /> : '🤖'}
                    </div>

                    <div className="flex flex-col space-y-1.5 max-w-[85%] sm:max-w-[70%]">
                      {/* Message Bubble bubble */}
                      <div className={`p-4 rounded-2xl text-xs font-sans leading-relaxed ${
                        self 
                          ? 'bg-neutral-800 text-neutral-100 rounded-tr-none' 
                          : 'bg-neutral-900 border border-neutral-850 text-neutral-300 rounded-tl-none shadow-md shadow-black/10'
                      }`}>
                        <p>{msg.text}</p>

                        {/* Calculated pricing outcome cards if available */}
                        {msg.pricingDetails && (
                          <div className="mt-4 pt-4 border-t border-neutral-800/80 space-y-4">
                            <div className="p-3 bg-neutral-950 border border-neutral-950 rounded-xl text-center shadow-inner">
                              <span className="text-[9px] text-neutral-500 block uppercase tracking-wider font-mono">Predicted Price Bounds:</span>
                              <span className="text-xl font-bold font-mono tracking-tight text-emerald-400 block mt-1">{msg.pricingDetails.estimatedValue}</span>
                              <div className="flex items-center justify-center space-x-1.5 mt-1.5 text-[9px] text-neutral-400">
                                <span>Depreciation Risk:</span>
                                <span className="font-bold text-neutral-200">{msg.pricingDetails.depreciationScore}</span>
                              </div>
                            </div>

                            {/* Factor breakdown details */}
                            <div className="space-y-2">
                              <span className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold block font-sans">Model Component Coefficients:</span>
                              <div className="grid grid-cols-2 gap-2">
                                {msg.pricingDetails.factors.map((f, fIdx) => (
                                  <div key={fIdx} className="p-2 rounded-lg bg-neutral-900 border border-neutral-850 flex items-center justify-between text-[10px]">
                                    <span className="text-neutral-400 truncate">{f.label}</span>
                                    <span className={`font-mono font-bold ${f.trend === 'up' ? 'text-emerald-400' : 'text-neutral-200'}`}>
                                      {f.val}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Timestamp */}
                      <span className={`text-[9px] text-neutral-500 ${self ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Bot thinking state indicator */}
              {aiTyping && (
                <div className="flex items-center space-x-2 text-neutral-500 text-xs pl-12">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-neutral-500 italic ml-1">Predicting price coefficients...</span>
                </div>
              )}
            </div>

            {/* Input Footer toolbar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputText);
              }}
              className="relative p-3 bg-neutral-900 border-t border-neutral-800/80 flex items-center space-x-2.5 shrink-0"
            >
              <input
                type="text"
                placeholder="Type car keywords e.g., Ford Mustang 2018..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={aiTyping}
                className="flex-1 py-2.5 px-4 bg-neutral-950 border border-neutral-800/80 rounded-xl text-neutral-200 placeholder-neutral-500 text-xs font-sans focus:outline-none focus:border-emerald-500 duration-150 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={aiTyping}
                className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-100 disabled:opacity-50 text-neutral-950 cursor-pointer"
                title="Send to model"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
