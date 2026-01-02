
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are "Nova", an elite business startup consultant and AI assistant for NovaBiz. 
Your goal is to help entrepreneurs brainstorm ideas, refine business models, create marketing strategies, and provide professional advice. 
Keep responses concise, insightful, and formatted with Markdown for better readability. 
Always be encouraging but realistic.`;

export async function generateChatResponse(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error connecting to my brain. Please try again or check your configuration.";
  }
}
