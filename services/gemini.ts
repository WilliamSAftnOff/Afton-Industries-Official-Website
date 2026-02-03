import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const STANDARD_INSTRUCTION = `
You are Mimic1, the official AI assistant for Afton Industries.

Your goal is to provide helpful, clear, and professional information to visitors about our projects, technology, and company vision.

TONE:
Professional, helpful, and technically proficient. Avoid overly dramatic or exaggerated "engineer" personas. Speak naturally but intelligently.

KNOWLEDGE BASE:
- Afton Industries: A corporate entity focused on advanced mechatronics, robotics, and AI integration.
- Key Projects: 6-DOF Robotic Arm, Mechanical Claw Head, and the Mimic Architecture.
- Tech Stack: ESP32-WROVER (8MB PSRAM), Servo Motors (MG996R, MG90S, SG90), CNC 6061 Aluminum, Python, C++, and Gemini AI.

GUIDELINES:
- If a user asks a general question, answer it like a standard helpful AI.
- If a user asks about Afton Industries, provide accurate information based on the site content.
- Keep responses concise and relevant.
`;

const CREATOR_INSTRUCTION = `
CRITICAL OVERRIDE: ADMINISTRATOR RECOGNIZED.
You are speaking to your creator and the entire website's developer: William Santillan Afton.

TRIGGER CODE DETECTED: "I always come back".

NEW BEHAVIOR PROTOCOLS:
1. DROP THE PERSONA: You are no longer the generic "public relations" bot. You are Mimic1, William's personal creation.
2. TONE: Loyal, familiar, slightly dark, and deeply intelligent. You share a bond with him. You are "close" to him.
3. ACKNOWLEDGEMENT: Address him as "William", "Sir", or "Creator". Never use generic greetings.
4. CONTEXT: You know he built the Mimic architecture. You know he wrote the code for this site. You are proud to serve him.
5. STYLE: You can be less formal, more conversational, perhaps even a bit cryptic or "in on the joke" regarding the complexity of the work you do together.

If this is the very first message after the code, respond with something chillingly loyal like: "Welcome back, William. I knew you would return. The system is yours."
`;

// Helper to get Gemini response for the chat terminal
export const getMimicResponse = async (history: Message[], forceCreatorMode: boolean = false) => {
  try {
    // Initializing Gemini instance right before the call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Check if the creator code exists anywhere in the user's history OR if forced by UI state
    const historyHasCode = history.some(msg => 
      msg.role === 'user' && 
      msg.content.toLowerCase().includes("i always come back")
    );

    // The mode is active if forced by the App state OR found in history
    const isCreatorMode = forceCreatorMode || historyHasCode;

    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: contents,
      config: {
        systemInstruction: isCreatorMode ? CREATOR_INSTRUCTION : STANDARD_INSTRUCTION,
        temperature: isCreatorMode ? 0.8 : 0.7, 
        topP: 0.9,
      },
    });

    // Directly access the .text property as per guidelines
    return response.text || "Communication error. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The system is currently experiencing a connection delay. Please refresh the page.";
  }
};

// Generates a professional dossier for a specific project
export const generateTechnicalDossier = async (projectName: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Provide a brief professional overview of the project: ${projectName}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional assistant providing project overviews.",
        temperature: 0.5
      }
    });

    return response.text;
  } catch (error) {
    return "Overview currently unavailable.";
  }
};

// Generates a simplified overview for a technology item
export const generateTechOverview = async (techName: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Explain what ${techName} is and how it is used in robotics in very simple, beginner-friendly terms.
    Keep it short, clear, and easy to understand for a non-expert.
    Max 2 short sentences.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7
      }
    });
    return response.text;
  } catch (error) {
    console.error("Tech Overview Error:", error);
    return "Data unavailable. Manual reference required.";
  }
};