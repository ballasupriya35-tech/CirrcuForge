
export interface Module {
  id: string;
  title: string;
  duration: string;
  description: string;
  learningObjectives: string[];
  topics: string[];
  assessment: {
    type: string;
    description: string;
  };
}

export interface IndustryAlignment {
  keySkills: string[];
  jobRoles: string[];
  marketRelevance: string;
}

export interface Curriculum {
  title: string;
  level: string;
  overview: string;
  targetAudience: string;
  learningOutcomes: string[];
  modules: Module[];
  industryAlignment: IndustryAlignment;
  economicOptimization: {
    efficiencyStrategy: string;
    estimatedMarketValue: string;
    resourceRecommendations: string[];
  };
  technologies: string[];
}

export interface GenerationParams {
  subject: string;
  level: string;
  duration: string;
  industryFocus: string;
  additionalGoals?: string;
  optimizationPreference: 'Speed to Market' | 'Academic Rigor' | 'Cost-Effective' | 'High-Tech Focus';
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  VIEWING = 'VIEWING',
  ERROR = 'ERROR'
}
