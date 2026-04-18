/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  age: string;
  income: string;
  goal: string;
  isSet: boolean;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface PromptStage {
  title: string;
  description: string;
  prompt: string;
  level: 'Starter' | 'Better' | 'Personalized' | 'Controlled' | 'Advanced' | 'Pro' | 'Production';
}
