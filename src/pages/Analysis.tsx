import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Wand2, Loader2, BookOpen, ChevronDown } from 'lucide-react';
import Markdown from 'react-markdown';
import { syllabus } from '../data/syllabus';
import { GoogleGenAI } from '@google/genai';

export function Analysis() {
  const [selectedWork, setSelectedWork] = useState<string>('');
  const [analysisType, setAnalysisType] = useState<string>('theme');
  const [customPrompt, setCustomPrompt] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const allWorks = [
    { id: syllabus.novel.id, title: syllabus.novel.title, type: 'Novel' },
    ...syllabus.poetry.map(w => ({ id: w.id, title: w.title, type: 'Poetry' })),
    ...syllabus.shortStories.map(w => ({ id: w.id, title: w.title, type: 'Short Story' })),
    ...syllabus.drama.map(w => ({ id: w.id, title: w.title, type: 'Drama' }))
  ];

  const handleGenerate = async () => {
    if (!selectedWork) return;
    
    setIsLoading(true);
    setAnalysis(null);

    const work = allWorks.find(w => w.id === selectedWork);
    
    let prompt = '';
    if (analysisType === 'custom') {
      prompt = `Write a detailed literary analysis of "${work?.title}" focusing on: ${customPrompt}. Provide specific examples and quotes if possible. Format using markdown.`;
    } else if (analysisType === 'theme') {
      prompt = `Write a comprehensive thematic analysis of "${work?.title}". Discuss the major themes, how they are developed, and their significance. Format using markdown.`;
    } else if (analysisType === 'character') {
      prompt = `Write a detailed character analysis for the main characters in "${work?.title}". Discuss their motivations, development, and roles in the story. Format using markdown.`;
    } else if (analysisType === 'structure') {
      prompt = `Analyze the structure, form, and literary devices used in "${work?.title}". How do these elements contribute to the overall meaning? Format using markdown.`;
    }

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing");
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `You are a helpful, encouraging, and expert AI tutor for Sri Lankan G.C.E O/L English Literature students.
Your goal is to help them understand texts like "The Vendor of Sweets", poems, short stories, and drama from the syllabus.
Keep your answers simple, exam-focused, and engaging. Use formatting like bullet points and bold text to make it easy to read.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          systemInstruction,
        },
      });
      
      setAnalysis(response.text || '');
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysis('Sorry, an error occurred while generating the analysis. Please try again.');
    } finally {
      setIsLoading(false);
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
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>
          Literary Analysis
        </h1>
        <p className="text-slate-600 mt-2">Generate unique, in-depth analyses for any work in your syllabus.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Select Work
            </h2>
            <div className="relative">
              <select
                value={selectedWork}
                onChange={(e) => setSelectedWork(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 font-medium"
              >
                <option value="">Choose a literary work...</option>
                {allWorks.map(work => (
                  <option key={work.id} value={work.id}>
                    {work.title} ({work.type})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-indigo-500" />
              Analysis Type
            </h2>
            <div className="space-y-3">
              {['theme', 'character', 'structure', 'custom'].map((type) => (
                <label key={type} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="radio"
                    name="analysisType"
                    value={type}
                    checked={analysisType === type}
                    onChange={(e) => setAnalysisType(e.target.value)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="font-medium text-slate-700 capitalize">
                    {type === 'custom' ? 'Custom Prompt' : `${type} Analysis`}
                  </span>
                </label>
              ))}
            </div>

            {analysisType === 'custom' && (
              <div className="mt-4">
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="E.g., Analyze the use of imagery in the first stanza..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none h-24"
                />
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!selectedWork || isLoading || (analysisType === 'custom' && !customPrompt)}
              className="w-full mt-8 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Analysis
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm min-h-[600px] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">Generated Analysis</h2>
            </div>
            <div className="p-8 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4"
                  >
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
                    <p className="font-medium">Analyzing text and generating insights...</p>
                  </motion.div>
                ) : analysis ? (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-slate max-w-none prose-headings:text-indigo-900 prose-a:text-indigo-600 prose-p:leading-relaxed"
                  >
                    <Markdown>{analysis}</Markdown>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-slate-400 text-center max-w-sm mx-auto space-y-4"
                  >
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                      <FileText className="w-10 h-10 text-slate-300" />
                    </div>
                    <p className="font-medium">Select a literary work and analysis type to generate a comprehensive study guide.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
