import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Upload, FileText, X, CheckSquare, Image as ImageIcon, PlayCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { GoogleGenAI } from '@google/genai';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

interface Attachment {
  name: string;
  data: string; // base64
  mimeType: string;
}

const GENERATION_TYPES = [
  { id: 'interactive', label: 'Playable Interactive Course', description: 'Generates a full module with lessons and quizzes that you can play in the Learn tab.' },
  { id: 'micro-lessons', label: 'Duolingo-style Micro Lessons', description: 'Bite-sized, easy to digest points.' },
  { id: 'short-notes', label: 'Short Notes', description: 'Concise summary of key concepts.' },
  { id: 'quotes', label: 'Important Quotes', description: 'Key quotes with brief explanations.' },
  { id: 'flashcards', label: 'Flashcards', description: 'Q&A format for quick memorization.' },
  { id: 'questions', label: 'Practice Questions', description: 'Exam-style questions to test knowledge.' },
  { id: 'comprehensive', label: 'Comprehensive Lesson', description: 'Detailed, classroom-style lesson.' },
];

export function Generator() {
  const { addCustomModule, generatorState, setGeneratorState, setActiveLearnTab } = useStore();
  const { textInput = '', attachments = [], selectedTypes = ['interactive'], result = null, generatedModule = null } = generatorState || {};
  
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      const data = await new Promise<string>((resolve) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.readAsDataURL(file);
      });

      newAttachments.push({
        name: file.name,
        data,
        mimeType: file.type || 'application/octet-stream'
      });
    }

    setGeneratorState({ attachments: [...attachments, ...newAttachments] });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (index: number) => {
    setGeneratorState({ attachments: attachments.filter((_, i) => i !== index) });
  };

  const toggleType = (id: string) => {
    setGeneratorState({
      selectedTypes: selectedTypes.includes(id) 
        ? selectedTypes.filter(t => t !== id) 
        : [...selectedTypes, id]
    });
  };

  const handleGenerate = async () => {
    if ((!textInput.trim() && attachments.length === 0) || selectedTypes.length === 0) return;
    
    setIsGenerating(true);
    setGeneratorState({ result: null, generatedModule: null });

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing");
      }
      const ai = new GoogleGenAI({ apiKey });

      const typesToGenerate = GENERATION_TYPES.filter(t => selectedTypes.includes(t.id)).map(t => t.label).join(', ');

      let systemInstruction = `You are an expert educational content creator and teacher.
Your task is to analyze the provided text, document, or image and generate high-quality study materials based on the user's request.
The user has requested the following types of materials: ${typesToGenerate}.

Please format the output clearly using Markdown. Use headings (##) for each requested material type.
Make the content engaging, accurate, and easy to understand.

If generating "Duolingo-style Micro Lessons", create very short, punchy, 1-line or 2-line facts that are easy to memorize.
If generating "Flashcards", use a Q&A format (e.g., **Q:** ... **A:** ...).
If generating "Comprehensive Lesson", provide a detailed, classroom-style explanation with introduction, body paragraphs, and conclusion.`;

      if (selectedTypes.includes('interactive')) {
        systemInstruction += `\n\nIMPORTANT: You must also generate a Playable Interactive Course. Output this course strictly as a JSON object wrapped in a \`\`\`json ... \`\`\` block. The JSON must match this TypeScript interface exactly:
{
  id: string; // unique lowercase id, e.g., "custom-course-1"
  title: string; // Title of the course
  author: string; // Author or "AI Generated"
  themes: string[]; // Array of themes
  lessons: {
    id: string; // unique lesson id
    title: string;
    content: string; // The main lesson text
    quotes?: { text: string; explanation: string }[]; // Optional quotes
  }[];
  quizzes: {
    id: string; // unique quiz id
    question: string;
    options: string[]; // exactly 4 options
    correct: number; // index of correct option (0-3)
  }[];
}`;
      }

      const parts: any[] = [];
      if (attachments.length > 0) {
        attachments.forEach((att) => {
          parts.push({
            inlineData: {
              mimeType: att.mimeType,
              data: att.data
            }
          });
        });
      }
      
      if (textInput.trim()) {
        parts.push({ text: `Source material/instructions:\n${textInput}` });
      } else {
        parts.push({ text: "Please generate the requested study materials based on the attached files." });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: { parts },
        config: {
          systemInstruction,
        },
      });

      const responseText = response.text || '';
      
      // Extract JSON if interactive course was requested
      if (selectedTypes.includes('interactive')) {
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
          try {
            const parsedModule = JSON.parse(jsonMatch[1]);
            // Ensure IDs are unique to avoid collisions
            parsedModule.id = `custom-${Date.now()}`;
            setGeneratorState({
              generatedModule: parsedModule,
              result: responseText.replace(/```json\s*[\s\S]*?\s*```/, '').trim()
            });
          } catch (e) {
            console.error("Failed to parse interactive module JSON", e);
            setGeneratorState({ result: responseText });
          }
        } else {
          setGeneratorState({ result: responseText });
        }
      } else {
        setGeneratorState({ result: responseText });
      }
      
    } catch (error: any) {
      console.error('Generation error:', error);
      const errorMsg = error.message === "API key is missing" 
        ? "Please add your Gemini API Key to Vercel Environment Variables (VITE_GEMINI_API_KEY) and redeploy."
        : 'Sorry, an error occurred while generating the materials. Please try again.';
      setGeneratorState({ result: errorMsg });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCourse = () => {
    if (generatedModule) {
      addCustomModule(generatedModule);
      setActiveLearnTab('custom');
      navigate('/learn');
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
            <Sparkles className="w-6 h-6 text-indigo-600" />
          </div>
          Study Material Generator
        </h1>
        <p className="text-slate-600 mt-2">Upload a file or paste text to automatically generate lessons, flashcards, notes, and more.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* File Upload */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-500" />
              Source Material
            </h2>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:bg-slate-50 hover:border-indigo-400 transition-colors"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept="image/*,.pdf,.txt,.docx"
              />
              <div className="flex justify-center mb-3">
                <div className="bg-indigo-50 p-3 rounded-full text-indigo-600">
                  <Upload className="w-6 h-6" />
                </div>
              </div>
              <p className="text-slate-700 font-medium">Click to upload files</p>
              <p className="text-slate-400 text-sm mt-1">PDF, Images, TXT, DOCX</p>
            </div>

            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {attachments.map((att, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 overflow-hidden">
                      {att.mimeType.startsWith('image/') ? (
                        <ImageIcon className="w-5 h-5 text-indigo-500 shrink-0" />
                      ) : (
                        <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
                      )}
                      <span className="text-sm font-medium text-slate-700 truncate">{att.name}</span>
                    </div>
                    <button onClick={() => removeAttachment(idx)} className="text-slate-400 hover:text-red-500 p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Or paste text / instructions:</label>
              <textarea
                value={textInput}
                onChange={(e) => setGeneratorState({ textInput: e.target.value })}
                placeholder="Paste your notes, syllabus, or specific instructions here..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none h-32"
              />
            </div>
          </div>

          {/* Output Types */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-500" />
              What to Generate
            </h2>
            <div className="space-y-3">
              {GENERATION_TYPES.map((type) => {
                const isSelected = selectedTypes.includes(type.id);
                return (
                  <div 
                    key={type.id}
                    onClick={() => toggleType(type.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      isSelected ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <CheckSquare className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                        {type.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{type.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleGenerate}
              disabled={(!textInput.trim() && attachments.length === 0) || selectedTypes.length === 0 || isGenerating}
              className="w-full mt-6 bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Materials
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm min-h-[600px] flex flex-col overflow-hidden h-full">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Generated Content</h2>
              <div className="flex gap-2">
                {generatedModule && (
                  <button 
                    onClick={handleSaveCourse}
                    className="flex items-center gap-2 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 rounded-lg transition-colors shadow-sm"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Save & Play Course
                  </button>
                )}
                {result && (
                  <button 
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Copy All
                  </button>
                )}
              </div>
            </div>
            <div className="p-8 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-slate-400 space-y-6 py-20"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full"></div>
                      <Loader2 className="w-16 h-16 animate-spin text-indigo-600 relative z-10" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-700 text-lg">Analyzing your materials...</p>
                      <p className="text-sm mt-1">This might take a few moments depending on the file size.</p>
                    </div>
                  </motion.div>
                ) : result ? (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-slate max-w-none prose-headings:text-indigo-900 prose-h2:border-b prose-h2:pb-2 prose-h2:mt-8 first:prose-h2:mt-0 prose-a:text-indigo-600 prose-p:leading-relaxed prose-li:marker:text-indigo-400"
                  >
                    <Markdown>{result}</Markdown>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-slate-400 text-center max-w-sm mx-auto space-y-4 py-20"
                  >
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                      <Sparkles className="w-12 h-12 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">Ready to Generate</h3>
                    <p className="font-medium text-sm">Upload a file or paste some text, select what you want to create, and click generate!</p>
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
