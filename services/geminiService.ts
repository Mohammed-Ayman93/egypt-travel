import { GoogleGenAI } from "@google/genai";

// FIX: Aligned with coding guidelines by initializing the AI client directly
// with the environment variable and removing manual API key checks. It is
// assumed that `process.env.API_KEY` is always available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateTripIdeas = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert travel agent for trips inside Egypt. Based on the user's request, suggest 3 distinct trip ideas. For each idea, provide a catchy title, a brief 2-sentence description, suggested destinations, and recommended activities. Format the output as clean markdown. User request: "${prompt}"`,
      config: {
        temperature: 0.7,
        topP: 1,
        topK: 1,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating trip ideas:", error);
    return "Sorry, I couldn't generate trip ideas at the moment. Please try again later.";
  }
};
