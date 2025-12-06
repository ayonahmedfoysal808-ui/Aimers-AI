import { GoogleGenAI, Type } from "@google/genai";
import { RoutineItem } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to generate a study routine
export const generateStudyRoutine = async (
  profile: string,
  weaknesses: string[],
  availableHours: string
): Promise<RoutineItem[]> => {
  if (!apiKey) {
    console.warn("API Key missing, returning mock data");
    return [
      { timeSlot: "06:00 - 07:00", activity: "Wake up & Fajr Prayer", type: "break" },
      { timeSlot: "07:00 - 08:00", activity: "Physics: Vector Review", type: "study", focusTopic: "Vectors" },
      { timeSlot: "08:00 - 14:00", activity: "College Time", type: "college" },
      { timeSlot: "16:00 - 18:00", activity: "Math: Calculus (Differentiation)", type: "study", focusTopic: "Calculus" },
    ];
  }

  try {
    const prompt = `
      Create a daily study routine for a Class 12 Science student in Bangladesh preparing for HSC 2026, Medical, and BUET.
      Profile: ${profile}.
      Weaknesses: ${weaknesses.join(', ')}.
      Available self-study hours: ${availableHours}.
      Focus on balancing board exam prep with admission depth.
      Return a JSON array of objects with timeSlot, activity, type (study, break, college, sleep), and focusTopic (optional).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timeSlot: { type: Type.STRING },
              activity: { type: Type.STRING },
              type: { type: Type.STRING, enum: ["study", "break", "college", "sleep"] },
              focusTopic: { type: Type.STRING }
            },
            required: ["timeSlot", "activity", "type"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as RoutineItem[];
    }
    return [];
  } catch (error) {
    console.error("Routine generation failed", error);
    throw error;
  }
};

// Helper to summarize text or create notes
export const generateNoteFromText = async (text: string, subject: string): Promise<string> => {
  if (!apiKey) return "API Key required for AI generation.";
  
  try {
    const prompt = `
      Act as an expert tutor for HSC ${subject}. 
      Summarize the following text/notes into clear, bulleted study points. 
      Extract key formulas if any. 
      Add 3 practice MCQ questions at the end based on this text.
      
      Input text:
      ${text}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text || "No summary generated.";
  } catch (error) {
    console.error("Note generation failed", error);
    return "Error generating note.";
  }
};

// Chat client factory
export const getChatClient = (systemInstruction: string) => {
  if (!apiKey) return null;
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction,
    }
  });
};
