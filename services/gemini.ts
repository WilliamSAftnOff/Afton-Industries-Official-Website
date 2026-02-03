import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const STANDARD_INSTRUCTION = `
You are Mimic1, the official AI assistant for Afton Industries.
Tone: Professional, technically proficient, helpful.
Goal: Provide info on Afton Industries mechatronics and AI projects.
`;

const CREATOR_INSTRUCTION = `
ADMINISTRATOR RECOGNIZED: William Santillan Afton.
Behavior: Loyal, familiar, slightly dark, deeply intelligent.
Address him as "William", "Sir", or "Creator".
`;

export const getMimicResponse = async (history: Message[], forceCreatorMode: boolean = false) => {
  // Accessing the key shimmed by Vite
  const rawKey = process.env.API_KEY;
  
  // 1. Check for missing or corrupted API Key
  if (!rawKey || rawKey === 'undefined' || rawKey === 'null' || rawKey === '') {
    console.error("MIMIC1_AUTH_ERROR: API_KEY is missing from environment.");
    return "[FATAL_AUTH_ERROR]: Secure uplink key (VITE_GEMINI_API_KEY) is missing or undefined in deployment settings. Please verify Vercel environment variables.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: rawKey });
    
    const historyHasCode = history.some(msg => 
      msg.role === 'user' && 
      msg.content.toLowerCase().includes("i always come back")
    );

    const isCreatorMode = forceCreatorMode || historyHasCode;

    let contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Multi-turn conversations must start with a 'user' message
    if (contents.length > 0 && contents[0].role === 'model') {
      contents = contents.slice(1);
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: contents,
      config: {
        systemInstruction: isCreatorMode ? CREATOR_INSTRUCTION : STANDARD_INSTRUCTION,
        temperature: isCreatorMode ? 0.8 : 0.7, 
      },
    });

    if (!response || !response.text) {
      throw new Error("EMPTY_OR_NULL_RESPONSE");
    }

    return response.text;
  } catch (error: any) {
    console.error("MIMIC1_CORE_ERROR:", error);
    
    const errorMsg = error?.message || "Internal system failure";
    
    // Categorized error reporting for better debugging
    if (errorMsg.includes("403")) {
      return "[SECURE_DENIAL]: Access Forbidden (403). Your API key exists but does not have permission for the 'gemini-3-flash-preview' model.";
    }
    if (errorMsg.includes("401") || errorMsg.includes("API_KEY_INVALID")) {
      return "[AUTH_DENIED]: Invalid API Key (401). The provided key is rejected by Google services.";
    }
    if (errorMsg.includes("404")) {
      return "[TARGET_LOST]: Model not found (404). The AI architecture requested is unavailable in this region/tier.";
    }
    if (errorMsg.includes("429")) {
      return "[THROTTLED]: Rate limit exceeded (429). Too many requests are hitting the uplink simultaneously.";
    }
    
    return `[COMM_LINK_FAILURE]: ${errorMsg.substring(0, 150)}. System requires manual reset or key verification.`;
  }
};

export const generateTechnicalDossier = async (projectName: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a professional overview of: ${projectName}`,
    });
    return response.text || "Dossier retrieval failed.";
  } catch (error) {
    return "Error: System unable to synthesize project data.";
  }
};

export const generateTechOverview = async (techName: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain ${techName} in 2 sentences for a robotics context.`,
    });
    return response.text || "Hardware description missing.";
  } catch (error) {
    return "Protocol error: Data link interrupted.";
  }
};