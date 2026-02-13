
import React from 'react';
import { Curriculum, Module } from '../types';
import { BookOpen, Target, Briefcase, ChevronRight, GraduationCap, Coins, Cpu, CheckCircle2 } from 'lucide-react';

interface CurriculumDisplayProps {
  curriculum: Curriculum;
  onReset: () => void;
}

const CurriculumDisplay: React.FC<CurriculumDisplayProps> = ({ curriculum, onReset }) => {
  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Header Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase">{curriculum.level}</span>
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">{curriculum.title}</h1>
          </div>
          <button 
            onClick={onReset}
            className="px-4 py-2 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition"
          >
            New Program
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-indigo-500" />
              Course Architecture
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">{curriculum.overview}</p>
            
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
                <Cpu className="w-4 h-4 mr-2" /> Recommended Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {curriculum.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-xl space-y-4 border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Learning Outcomes
            </h3>
            <ul className="space-y-3">
              {curriculum.learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start text-sm text-indigo-800">
                  <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 mr-2 text-indigo-500" />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Economic Optimization & Market Value */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-6">
            <Briefcase className="w-8 h-8 text-indigo-400" />
            <h2 className="text-2xl font-bold">Market Alignment</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-indigo-400 font-semibold mb-3">Key Employability Skills</h4>
              <div className="flex flex-wrap gap-2">
                {curriculum.industryAlignment.keySkills.map((skill, idx) => (
                  <span key={idx} className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-indigo-400 font-semibold mb-3">Target Roles</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {curriculum.industryAlignment.jobRoles.join(', ')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-900 text-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-6">
            <Coins className="w-8 h-8 text-emerald-400" />
            <h2 className="text-2xl font-bold">Economic Edge</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-emerald-400 font-semibold mb-2">Efficiency Strategy</h4>
              <p className="text-emerald-50 text-sm leading-relaxed">{curriculum.economicOptimization.efficiencyStrategy}</p>
            </div>
            <div className="bg-emerald-800/50 p-4 rounded-lg border border-emerald-700/50">
              <h4 className="text-emerald-400 font-semibold mb-1 uppercase text-xs tracking-widest">Market Value Index</h4>
              <p className="text-xl font-bold">{curriculum.economicOptimization.estimatedMarketValue}</p>
            </div>
            <div>
              <h4 className="text-emerald-400 font-semibold mb-2">Resource Recommendations</h4>
              <div className="grid grid-cols-1 gap-1">
                {curriculum.economicOptimization.resourceRecommendations.map((res, idx) => (
                  <div key={idx} className="flex items-center text-xs text-emerald-100">
                    <span className="mr-2 text-emerald-400">→</span> {res}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Roadmap */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold text-slate-800 flex items-center">
            <GraduationCap className="w-8 h-8 mr-3 text-indigo-600" />
            Topic Plan & Modules
          </h2>
          <span className="text-slate-500 text-sm font-medium">{curriculum.modules.length} Detailed Stages</span>
        </div>
        
        <div className="grid gap-6">
          {curriculum.modules.map((module, idx) => (
            <ModuleCard key={module.id} module={module} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ModuleCard: React.FC<{ module: Module, index: number }> = ({ module, index }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-slate-50 px-6 py-4 flex flex-wrap items-center justify-between border-b border-slate-200">
        <div className="flex items-center space-x-4">
          <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            {index + 1}
          </span>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{module.title}</h3>
            <span className="text-xs text-slate-500 font-semibold uppercase">{module.duration}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium text-slate-600">
          <span className="bg-slate-200 px-3 py-1 rounded text-xs font-bold uppercase tracking-tighter">{module.assessment.type}</span>
        </div>
      </div>
      
      <div className="p-6 grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Learning Objectives</h4>
            <ul className="space-y-1.5">
              {module.learningObjectives.map((obj, i) => (
                <li key={i} className="text-slate-600 text-sm flex items-start">
                  <span className="text-indigo-500 mr-2 font-bold">0{i+1}</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Authentic Assessment</h4>
            <p className="text-sm text-slate-700 bg-amber-50 border border-amber-100 p-3 rounded-lg leading-relaxed">
              {module.assessment.description}
            </p>
          </div>
        </div>
        
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Topic Recommendations</h4>
          <div className="grid grid-cols-1 gap-2">
            {module.topics.map((topic, i) => (
              <div key={i} className="flex items-center bg-white p-3 rounded border border-slate-200 text-sm text-slate-800 shadow-sm">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></div>
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumDisplay;
