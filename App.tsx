
import React, { useState } from 'react';
import { AppState, Curriculum, GenerationParams } from './types';
import { generateCurriculum } from './services/geminiService';
import RequirementForm from './components/RequirementForm';
import CurriculumDisplay from './components/CurriculumDisplay';
import { BrainCircuit, BookCheck, ShieldCheck, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (params: GenerationParams) => {
    setState(AppState.GENERATING);
    setError(null);
    try {
      const result = await generateCurriculum(params);
      setCurriculum(result);
      setState(AppState.VIEWING);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to architect the curriculum. Please try again.');
      setState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setState(AppState.IDLE);
    setCurriculum(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">CurricuForge <span className="text-indigo-600">AI</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-indigo-600">Features</a>
              <a href="#" className="hover:text-indigo-600">Pedagogy</a>
              <a href="#" className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-100 transition">For Educators</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero / Main Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {state === AppState.IDLE && (
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  Forge <span className="text-indigo-600">Industry-Ready</span> Programs in Seconds.
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                  CurricuForge leverages a generative AI powered curriculum design system to automate complex pedagogical architecture, ensuring every module and topic aligns with market demands.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Pedagogical Guardrails</h3>
                    <p className="text-sm text-slate-500">Structured learning paths following industry-standard taxonomy.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Instant Iteration</h3>
                    <p className="text-sm text-slate-500">Forging and refining academic programs in real-time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <RequirementForm onGenerate={handleGenerate} isGenerating={false} />
            </div>
          </div>
        )}

        {state === AppState.GENERATING && (
          <div className="flex flex-col items-center justify-center py-24 space-y-8 max-w-2xl mx-auto text-center">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-indigo-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-800">Forging Your Curriculum</h2>
              <p className="text-slate-500 text-lg">Our system is currently synthesizing technical stacks, mapping learning outcomes, and optimizing economic ROI...</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {['Market Analysis', 'Module Crafting', 'Tech Stack Mapping'].map((step, i) => (
                <div key={i} className="bg-white border border-slate-200 px-4 py-3 rounded-lg flex items-center justify-center space-x-2 text-sm text-slate-600 shadow-sm animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                  <BookCheck className="w-4 h-4 text-indigo-500" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {state === AppState.VIEWING && curriculum && (
          <CurriculumDisplay curriculum={curriculum} onReset={handleReset} />
        )}

        {state === AppState.ERROR && (
          <div className="max-w-xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold text-red-800">Forging Failed</h2>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={handleReset}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Back to Forge
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>© 2024 CurricuForge AI. The generative AI powered curriculum design system.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600">API Documentation</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
