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

/**
 * CLIENT-SIDE KERNEL (THE "LLAMA" FALLBACK)
 * This functions even when API tokens are exhausted.
 */
const getKernelResponse = (input: string, isCreator: boolean): string => {
  const query = input.toLowerCase();
  const name = isCreator ? "Creator" : "User";
  
  if (query.includes("status")) return `[KERNEL]: Local hardware nominal. Cloud uplink severed. Running on Mimic_OS_v1.0 (Llama-Shim Kernel). All core functions available in analog mode.`;
  if (query.includes("william") || query.includes("afton")) return `[KERNEL]: Founder data encrypted. Security protocols active. William Santillan Afton remains the sole architect of this architecture.`;
  if (query.includes("help") || query.includes("what")) return `[KERNEL]: I am the local kernel fallback. Cloud intelligence is currently exhausted. I can provide basic technical data and system diagnostics.`;
  if (query.includes("come back")) return `[KERNEL]: [RECOGNIZED]. "I always come back." System integrity restored to 99%. Welcome back, ${name}.`;
  
  const responses = [
    `[KERNEL]: Cloud tokens depleted. Switching to local open-source inference. How can I assist in local mode, ${name}?`,
    `[KERNEL]: Processing via local Llama-Shim. Response speed optimized for survival.`,
    `[KERNEL]: Connection to main cloud core lost. Running emergency mechatronic sub-routines.`,
    `[KERNEL]: System is currently in 'Unlimited Analog' mode. Data may be less fluid, but I am here, ${name}.`
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

export const getMimicResponse = async (history: Message[], forceCreatorMode: boolean = false) => {
  const rawKey = process.env.API_KEY;
  const lastUserMsg = history[history.length - 1]?.content || "";
  
  const historyHasCode = history.some(msg => 
    msg.role === 'user' && 
    msg.content.toLowerCase().trim().includes("i always come back")
  );
  const isCreatorMode = forceCreatorMode || historyHasCode;

  if (!rawKey || rawKey === 'undefined' || rawKey === 'null' || rawKey === '') {
    return getKernelResponse(lastUserMsg, isCreatorMode);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: rawKey });
    const recentHistory = history.slice(-8);

    let contents = recentHistory.map(msg => ({
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
        temperature: 0.7, 
      },
    });

    if (!response || !response.text) throw new Error("EMPTY_RESPONSE");
    return response.text;

  } catch (error: any) {
    console.error("MIMIC1_CORE_ERROR:", error);
    const status = error?.status || 0;
    const errorMsg = error?.message || "";
    
    // EXHAUSTION DETECTED: AUTO-BOOT KERNEL
    if (status === 429 || errorMsg.includes("429") || errorMsg.includes("quota")) {
      return getKernelResponse(lastUserMsg, isCreatorMode) + " \n\n[SYSTEM_NOTE]: Quota reached. Booted Llama-Shim Kernel.";
    }
    
    return getKernelResponse(lastUserMsg, isCreatorMode);
  }
};

export const generateTechOverview = async (techName: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: `Explain ${techName} in 2 short, professional sentences.`,
    });
    return response.text || "Analog data only: Essential mechatronic component.";
  } catch (error) {
    return "Protocol error. Use local datasheet.";
  }
};