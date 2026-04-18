/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck, GraduationCap } from 'lucide-react';
import ProfileForm from './components/ProfileForm';
import ChatInterface from './components/ChatInterface';
import PromptEvolution from './components/PromptEvolution';
import { UserProfile } from './types';
import { INITIAL_USER_PROFILE } from './constants';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('finwise_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('finwise_profile', JSON.stringify(profile));
  }, [profile]);

  const handleSaveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const handleResetProfile = () => {
    setProfile(INITIAL_USER_PROFILE);
  };

  return (
    <div className="min-h-screen bg-bg text-text font-sans selection:bg-accent/30 tracking-tight">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <header className="px-6 md:px-16 py-10 md:py-16 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="font-mono text-sm text-accent border border-accent px-3 py-1 mb-4 inline-block tracking-wider">
              FINWISE_SYSTEM_V.7.0
            </span>
            <h1 className="text-[64px] md:text-[84px] leading-[0.85] font-[800] tracking-[-3px] uppercase">
              FinWise AI
            </h1>
          </div>
          
          <div className="max-w-md w-full md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-text-dim mb-2 text-left md:text-right">Strategic Overview</p>
            <p className="text-sm md:text-base text-text leading-relaxed">
              Evolution from generic instructions to production-ready multi-layered constraint architecture.
            </p>
          </div>
        </header>

        <main className="px-6 md:px-16 py-12">
          <AnimatePresence mode="wait">
            {!profile.isSet ? (
              <motion.section
                key="setup"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-12"
              >
                <div className="max-w-4xl w-full flex flex-col md:flex-row gap-16 items-center">
                  <div className="flex-1">
                    <p className="font-mono text-[11px] uppercase tracking-[2px] text-accent mb-4">Initial Configuration</p>
                    <h2 className="text-4xl md:text-6xl font-black text-text mb-6 uppercase tracking-tighter">
                      Level Up Your <span className="text-accent underline decoration-2 underline-offset-8">Money Game</span>
                    </h2>
                    <p className="text-xl text-text-dim font-medium leading-relaxed mb-8">
                      Personalized financial advice for your age, your income, and your goals. No jargon, just results.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { icon: ShieldCheck, title: "Private", desc: "Local storage only." },
                        { icon: Sparkles, title: "Smart", desc: "Advanced engineering." }
                      ].map((feat, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 border border-border bg-surface/50 rounded-lg">
                          <feat.icon className="w-5 h-5 text-accent mt-1" />
                          <div>
                            <h4 className="font-bold text-sm uppercase tracking-wide">{feat.title}</h4>
                            <p className="text-xs text-text-dim">{feat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full max-w-md">
                    <ProfileForm onSave={handleSaveProfile} />
                  </div>
                </div>
              </motion.section>
            ) : (
              <motion.section
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-[700px] max-w-5xl mx-auto"
              >
                <ChatInterface profile={profile} resetProfile={handleResetProfile} />
              </motion.section>
            )}
          </AnimatePresence>

          <PromptEvolution />
        </main>

        <footer className="px-6 md:px-16 py-8 border-t border-border font-mono text-[11px] text-text-dim flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-8">
            <span>SYSTEM STATUS: <span className="text-accent">OPERATIONAL</span></span>
            <span>DEPLOY: 2026.04.18</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-accent transition-colors">HACKATHON_DOCS</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
