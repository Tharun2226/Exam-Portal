
import { GoogleGenAI, Type } from "@google/genai";
import { EvaluationResult } from "../types";

const apiKey = process.env.API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function evaluatePracticeResponse(
  type: string,
  question: string,
  response: string
): Promise<EvaluationResult> {
  const model = "gemini-1.5-flash";
  
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      score: { type: Type.NUMBER, description: "Overall score out of 90 for PTE or 9.0 for IELTS" },
      grammar: { type: Type.NUMBER, description: "Grammar score" },
      vocabulary: { type: Type.NUMBER, description: "Vocabulary score" },
      feedback: { type: Type.STRING, description: "Brief constructive feedback" },
      breakdown: {
        type: Type.OBJECT,
        properties: {
          content: { type: Type.NUMBER },
          grammar: { type: Type.NUMBER },
          coherence: { type: Type.NUMBER },
        },
        required: ["content", "grammar", "coherence"]
      }
    },
    required: ["score", "grammar", "vocabulary", "feedback", "breakdown"],
  };

  const prompt = `Evaluate the following English proficiency test response.
  Question Type: ${type}
  Target Content: ${question}
  User Response: ${response}
  
  Provide a detailed evaluation following the schema. For PTE use 0-90 scale. For IELTS use 0-9.0 scale.
  BE STRICT AND ACCURATE.`;

  if (!ai) {
    throw new Error("Gemini API key is not configured. Please set GEMINI_API_KEY in your environment.");
  }

  try {
    const result = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    return JSON.parse(result.text) as EvaluationResult;
  } catch (error) {
    console.error("Evaluation error:", error);
    throw error;
  }
}
