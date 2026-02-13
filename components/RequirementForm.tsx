
import React, { useState } from 'react';
import { GenerationParams } from '../types';

interface RequirementFormProps {
  onGenerate: (params: GenerationParams) => void;
  isGenerating: boolean;
}

const RequirementForm: React.FC<RequirementFormProps> = ({ onGenerate, isGenerating }) => {
  const [formData, setFormData] = useState<GenerationParams>({
    subject: '',
    level: 'Undergraduate',
    duration: '12 Weeks',
    industryFocus: '',
    additionalGoals: '',
    optimizationPreference: 'Academic Rigor'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Course Subject</label>
          <input
            required
            type="text"
            placeholder="e.g. Generative AI Engineering"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Academic Level</label>
          <select
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
          >
            <option>High School</option>
            <option>Undergraduate</option>
            <option>Graduate / Master</option>
            <option>Professional Certificate</option>
            <option>Corporate Training</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Program Duration</label>
          <input
            required
            type="text"
            placeholder="e.g. 12 Weeks, 6 Months"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Strategic Focus</label>
          <select
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            value={formData.optimizationPreference}
            onChange={(e) => setFormData({ ...formData, optimizationPreference: e.target.value as any })}
          >
            <option>Academic Rigor</option>
            <option>Speed to Market</option>
            <option>Cost-Effective</option>
            <option>High-Tech Focus</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Industry Alignment Target</label>
        <input
          required
          type="text"
          placeholder="e.g. Modern Data Stack, Fintech AI"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          value={formData.industryFocus}
          onChange={(e) => setFormData({ ...formData, industryFocus: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Additional Goals (Pedagogy/Tech Preference)</label>
        <textarea
          rows={3}
          placeholder="Mention specific tech like Python, FastAPI, or unique pedagogical requirements..."
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          value={formData.additionalGoals}
          onChange={(e) => setFormData({ ...formData, additionalGoals: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={isGenerating}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Optimizing Curriculum...</span>
          </>
        ) : (
          <span>Generate Industry-Aligned Curriculum</span>
        )}
      </button>
    </form>
  );
};

export default RequirementForm;
