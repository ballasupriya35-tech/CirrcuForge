
import { GoogleGenAI, Type } from "@google/genai";
import { Curriculum, GenerationParams } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const CURRICULUM_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Formal title of the course or program" },
    level: { type: Type.STRING, description: "Academic level (e.g., Undergraduate, Professional Cert)" },
    overview: { type: Type.STRING, description: "A high-level summary of the program" },
    targetAudience: { type: Type.STRING, description: "Who this course is designed for" },
    learningOutcomes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Broad outcomes students will achieve by the end"
    },
    modules: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          duration: { type: Type.STRING, description: "Timeframe for this module (e.g., Week 1-2)" },
          description: { type: Type.STRING },
          learningObjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
          topics: { type: Type.ARRAY, items: { type: Type.STRING } },
          assessment: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["type", "description"]
          }
        },
        required: ["id", "title", "duration", "description", "learningObjectives", "topics", "assessment"]
      }
    },
    industryAlignment: {
      type: Type.OBJECT,
      properties: {
        keySkills: { type: Type.ARRAY, items: { type: Type.STRING } },
        jobRoles: { type: Type.ARRAY, items: { type: Type.STRING } },
        marketRelevance: { type: Type.STRING }
      },
      required: ["keySkills", "jobRoles", "marketRelevance"]
    },
    economicOptimization: {
      type: Type.OBJECT,
      properties: {
        efficiencyStrategy: { type: Type.STRING, description: "How this curriculum maximizes learning ROI" },
        estimatedMarketValue: { type: Type.STRING, description: "Value proposition for students/employers" },
        resourceRecommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Low-cost or high-impact resource suggestions" }
      },
      required: ["efficiencyStrategy", "estimatedMarketValue", "resourceRecommendations"]
    },
    technologies: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Recommended tech stack (e.g. Python, FastAPI, Hugging Face, GenAI)"
    }
  },
  required: ["title", "level", "overview", "targetAudience", "learningOutcomes", "modules", "industryAlignment", "economicOptimization", "technologies"]
};

export async function generateCurriculum(params: GenerationParams): Promise<Curriculum> {
  const prompt = `Design a comprehensive, industry-aligned curriculum.
    Subject: ${params.subject}
    Level: ${params.level}
    Duration: ${params.duration}
    Industry Focus: ${params.industryFocus}
    Optimization Preference: ${params.optimizationPreference}
    Specific Goals: ${params.additionalGoals || "None"}
    
    SPECIAL REQUIREMENTS:
    1. Include a robust tech stack (prioritize tools like Python, FastAPI, IBM AI, Hugging Face where relevant).
    2. Map out specific "Economic Optimization" strategies to ensure high ROI for learners.
    3. Ensure topic plans are granular and assessments are authentic to the industry focus.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: CURRICULUM_SCHEMA,
      temperature: 0.75,
      topP: 0.95,
      thinkingConfig: { thinkingBudget: 16000 }
    }
  });

  const jsonStr = response.text.trim();
  return JSON.parse(jsonStr) as Curriculum;
}
