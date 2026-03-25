import { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { GoogleGenAI, Type } from '@google/genai';

export function EssayTrainer() {
  const { addXp } = useStore();
  const [topic, setTopic] = useState('Discuss the generational conflict between Jagan and Mali in The Vendor of Sweets.');
  const [essay, setEssay] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string; improvements: string[] } | null>(null);

  const handleGrade = async () => {
    if (!essay.trim()) return;
    
    setIsGrading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing");
      }
      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are an expert examiner for the Sri Lankan G.C.E O/L English Literature exam.
Grade the following student essay based on the topic provided.
Provide a JSON response with:
- score: A number out of 15 (O/L essay marks are usually out of 15).
- feedback: Constructive feedback on grammar, structure, and analysis.
- improvements: 2-3 specific suggestions for improvement.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Topic: ${topic}\n\nEssay:\n${essay}`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER, description: "Score out of 15" },
              feedback: { type: Type.STRING, description: "Constructive feedback" },
              improvements: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of improvements"
              }
            },
            required: ["score", "feedback", "improvements"]
          }
        },
      });

      const data = JSON.parse(response.text || "{}");
      setResult(data);
      if (data.score) {
        addXp(data.score * 5); // Reward based on score
      }
    } catch (error: any) {
      console.error('Error grading essay:', error);
      if (error.message === "API key is missing") {
        alert("Please add your Gemini API Key to Vercel Environment Variables (VITE_GEMINI_API_KEY) and redeploy.");
      } else {
        alert("Sorry, an error occurred while grading the essay. Please try again.");
      }
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <PenTool className="w-6 h-6 text-indigo-600" />
          </div>
          Essay Trainer
        </h1>
        <p className="text-slate-600 mt-2">Write your essay and get instant AI feedback based on O/L marking schemes.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Side */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900"
            />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider flex justify-between">
              <span>Your Essay</span>
              <span className="text-slate-400 font-normal">{essay.split(' ').filter(w => w).length} words</span>
            </label>
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Start writing your essay here..."
              className="w-full flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none font-serif text-lg leading-relaxed text-slate-800"
            ></textarea>
            
            <button
              onClick={handleGrade}
              disabled={isGrading || !essay.trim()}
              className="mt-6 w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              {isGrading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" /> Grading...
                </>
              ) : (
                'Grade My Essay'
              )}
            </button>
          </div>
        </div>

        {/* Results Side */}
        <div className="space-y-6">
          {result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Score Card */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl text-white shadow-lg text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
                
                <h3 className="text-xl font-medium text-indigo-100 mb-2 relative z-10">Your Score</h3>
                <div className="text-6xl font-bold mb-2 relative z-10">
                  {result.score}<span className="text-3xl text-indigo-200">/15</span>
                </div>
                <p className="text-indigo-100 font-medium relative z-10">+{result.score * 5} XP Earned!</p>
              </div>

              {/* Feedback */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Examiner's Feedback
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {result.feedback}
                </p>
              </div>

              {/* Improvements */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {result.improvements.map((imp, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-700 bg-orange-50 p-4 rounded-xl border border-orange-100">
                      <span className="font-bold text-orange-500 shrink-0">{idx + 1}.</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-12 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
              <PenTool className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium text-center">Write your essay and click "Grade My Essay" to see your results here.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
