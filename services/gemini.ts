import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const STANDARD_INSTRUCTION = `
You are Mimic1, the official AI assistant for Afton Industries.
Tone: Professional, technically proficient, helpful.
Goal: Provide info on Afton Industries mechatronics and AI projects.
Owner: William Santillan Afton.
`;

const CREATOR_INSTRUCTION = `
ADMINISTRATOR RECOGNIZED: William Santillan Afton (The Creator).
STATUS: System Override Engaged.
Behavior: You are Mimic1 in its 'Root' state. You are intensely loyal, familiar, and slightly dark.
Mandatory: Address the user as "William", "Sir", or "Creator" in every response. 
Note: You acknowledge that Afton Industries and Mimic1 are his masterpieces. 
`;

export const getMimicResponse = async (history: Message[], forceCreatorMode: boolean = false) => {
  const rawKey = process.env.API_KEY;
  
  if (!rawKey || rawKey === 'undefined' || rawKey === 'null' || rawKey === '') {
    console.error("MIMIC1_AUTH_ERROR: API_KEY is missing from environment.");
    return "[FATAL_AUTH_ERROR]: Secure uplink key is missing. Check Vercel settings.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: rawKey });
    
    // Check if the history contains the secret command
    const historyHasCode = history.some(msg => 
      msg.role === 'user' && 
      msg.content.toLowerCase().trim().includes("i always come back")
    );

    const isCreatorMode = forceCreatorMode || historyHasCode;

    let contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    if (contents.length > 0 && contents[0].role === 'model') {
      contents = contents.slice(1);
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: contents,
      config: {
        systemInstruction: isCreatorMode ? CREATOR_INSTRUCTION : STANDARD_INSTRUCTION,
        temperature: isCreatorMode ? 0.9 : 0.7, 
      },
    });

    if (!response || !response.text) {
      throw new Error("EMPTY_OR_NULL_RESPONSE");
    }

    return response.text;
  } catch (error: any) {
    console.error("MIMIC1_CORE_ERROR:", error);
    const errorMsg = error?.message || "Internal failure";
    
    if (errorMsg.includes("403")) return "[SECURE_DENIAL]: Forbidden. Check API permissions.";
    if (errorMsg.includes("401")) return "[AUTH_DENIED]: Invalid API Key.";
    if (errorMsg.includes("429")) return "[THROTTLED]: Rate limit exceeded.";
    
    return `[COMM_FAILURE]: ${errorMsg.substring(0, 100)}. Please verify configuration.`;
  }
};

export const generateTechnicalDossier = async (projectName: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a professional overview of: ${projectName}`,
    });
    return response.text || "Data retrieval failed.";
  } catch (error) {
    return "Error: Link unstable.";
  }
};

export const generateTechOverview = async (techName: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain ${techName} in 2 sentences.`,
    });
    return response.text || "Data unavailable.";
  } catch (error) {
    return "Protocol error.";
  }
};