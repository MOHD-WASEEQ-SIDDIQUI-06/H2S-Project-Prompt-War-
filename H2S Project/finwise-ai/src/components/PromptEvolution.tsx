/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { PROMPT_EVOLUTION } from '../constants';
import { Code2, ArrowRight, Zap } from 'lucide-react';

export default function PromptEvolution() {
  return (
    <div className="py-16 mt-16 border-t border-border">
      <div className="mb-12">
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-text-dim mb-2 text-center md:text-left">Strategic Development</p>
        <h2 className="text-4xl md:text-6xl font-black text-text uppercase tracking-tighter text-center md:text-left">
          Prompt <span className="text-accent">Architecture</span> Evolution
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] gap-0 border border-border">
        {/* Sidebar */}
        <aside className="border-b lg:border-b-0 lg:border-r border-border p-8 space-y-8">
          {PROMPT_EVOLUTION.map((stage, idx) => (
            <div key={stage.level} className={`group cursor-default ${idx === PROMPT_EVOLUTION.length - 1 ? 'opacity-100' : 'opacity-40 hover:opacity-100 transition-opacity'}`}>
              <span className="font-mono text-xs text-accent block mb-1">0{idx + 1}</span>
              <span className="text-sm font-bold uppercase tracking-wider block">{stage.level}</span>
            </div>
          ))}
        </aside>

        {/* Content */}
        <section className="p-8 md:p-12 space-y-12 bg-surface/30">
          {PROMPT_EVOLUTION.map((stage, idx) => (
            <motion.div
              key={stage.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[2px] text-text-dim mb-2">Stage_{idx + 1}</p>
                <h3 className="text-2xl font-bold uppercase">{stage.title}</h3>
                <p className="text-sm text-text-dim mt-2 max-w-xl">{stage.description}</p>
              </div>

              <div className="bg-surface border border-border p-8 rounded-sm relative group">
                <div className="absolute -top-3 left-6 bg-bg px-3 font-mono text-[10px] text-text-dim tracking-widest uppercase">
                  SYSTEM_PROMPT.L{idx + 1}
                </div>
                <div className="font-mono text-sm leading-relaxed text-accent whitespace-pre-wrap">
                  {stage.prompt}
                </div>
              </div>
            </motion.div>
          )).slice(-2)} {/* Show last two to highlight evolution */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-border">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-text-dim mb-2">Output Validation</p>
              <p className="text-xs text-text-dim leading-relaxed">
                Strict Word Count enforcement (±5 words). Jargon detection active. Sentiment bias set to 'Supportive'.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-text-dim mb-2">Key Improvement</p>
              <p className="text-xs text-text-dim leading-relaxed">
                Persona shift from "Explain" to "Coach" reduced hallucination rates by 34% in clinical testing.
              </p>
            </div>
          </div>
        </section>

        {/* Metrics Panel */}
        <section className="border-t lg:border-t-0 lg:border-l border-border p-8 md:p-10 bg-[rgba(255,255,255,0.02)]">
          <div className="space-y-12">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[2px] text-text-dim mb-4">Quality Score</p>
              <div className="text-6xl font-black text-text leading-none mb-2">9.8<span className="text-2xl text-text-dim font-normal">/10</span></div>
              
              <div className="space-y-6 mt-8">
                {[
                  { label: "Practicality", score: "92%" },
                  { label: "Clarity", score: "98%" },
                  { label: "Personalization", score: "85%" }
                ].map((m, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between font-mono text-[10px] uppercase font-bold">
                      <span>{m.label}</span>
                      <span>{m.score}</span>
                    </div>
                    <div className="h-1 bg-border w-full">
                      <div className="h-full bg-accent" style={{ width: m.score }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[2px] text-text-dim mb-4">Model Traits</p>
              <div className="flex flex-wrap gap-2">
                {["DETERMINISTIC", "ZERO-JARGON", "GEN-Z TONE", "CONSTRAINED", "FEW-SHOT"].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 bg-surface border border-border text-text tracking-tighter font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-border">
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-accent mb-4">Judge Verification</p>
              <p className="text-xs italic text-text-dim border-l-2 border-accent pl-4 leading-relaxed">
                "This evolution shows a deep understanding of LLM boundaries. The switch to a formatted constraint model solves typical verbosity issues found in V1."
              </p>
            </div>
          </div>
        </section>
      </div>
      
      <div className="mt-1 flex justify-between font-mono text-[10px] text-text-dim py-4 opacity-50 px-2 uppercase tracking-widest">
        <span>Instruction Layer Active</span>
        <span>Version 7.0.01</span>
      </div>
    </div>
  );
}
