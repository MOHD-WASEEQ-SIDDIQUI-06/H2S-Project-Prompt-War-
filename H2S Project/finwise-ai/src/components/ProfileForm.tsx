/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { TrendingUp, DollarSign, Target, User } from 'lucide-react';

interface Props {
  onSave: (profile: UserProfile) => void;
  initialData?: UserProfile;
}

export default function ProfileForm({ onSave, initialData }: Props) {
  const [age, setAge] = useState(initialData?.age || '');
  const [income, setIncome] = useState(initialData?.income || '');
  const [goal, setGoal] = useState(initialData?.goal || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age && income && goal) {
      onSave({ age, income, goal, isSet: true });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-surface p-8 border border-border rounded-lg shadow-2xl relative"
    >
      <div className="absolute -top-3 left-6 bg-bg px-4 font-mono text-[10px] text-text-dim tracking-widest uppercase">
        USER_PROFILE_INIT
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 mt-4">
        <div className="space-y-3">
          <label className="block font-mono text-[11px] uppercase tracking-[2px] text-text-dim">
            // Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="00"
            className="w-full px-0 py-2 bg-transparent border-b border-border text-2xl font-bold text-accent placeholder:text-border outline-none transition-all focus:border-accent"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="block font-mono text-[11px] uppercase tracking-[2px] text-text-dim">
            // Monthly Income
          </label>
          <select
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full px-0 py-2 bg-transparent border-b border-border text-xl font-bold text-accent outline-none appearance-none cursor-pointer focus:border-accent capitalize"
            required
          >
            <option value="" className="bg-surface text-text">Select range</option>
            <option value="Student/No Income" className="bg-surface text-text">Student / No Income</option>
            <option value="Under $1,000" className="bg-surface text-text">Under $1,000</option>
            <option value="$1,000 - $3,000" className="bg-surface text-text">$1,000 - $3,000</option>
            <option value="$3,000 - $5,000" className="bg-surface text-text">$3,000 - $5,000</option>
            <option value="$5,000+" className="bg-surface text-text">$5,000+</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="block font-mono text-[11px] uppercase tracking-[2px] text-text-dim">
            // Financial Goal
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="E.G. SURPLUS SAVINGS FOR VEHICLE ACQUISITION"
            className="w-full px-0 py-2 bg-transparent border-b border-border text-lg font-medium text-text placeholder:text-border outline-none transition-all focus:border-accent min-h-[80px] resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 mt-8 bg-transparent border border-accent text-accent font-mono font-bold uppercase tracking-widest hover:bg-accent hover:text-bg transition-all active:scale-95"
        >
          Initialize Coach
        </button>
      </form>
    </motion.div>
  );
}
