/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "../types";
import { PROMPT_EVOLUTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askFinWise(question: string, profile: UserProfile) {
  const productionPrompt = PROMPT_EVOLUTION.find(p => p.level === 'Production')!;
  
  const systemInstruction = productionPrompt.prompt
    .replace('{age}', profile.age)
    .replace('{income}', profile.income)
    .replace('{goal}', profile.goal);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get financial advice. Please check your connection or API key.");
  }
}
