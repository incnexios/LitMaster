import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Paperclip, X } from 'lucide-react';
import Markdown from 'react-markdown';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Attachment {
  file: File;
  data: string; // base64
  mimeType: string;
}

export function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AI Literature Tutor. Ask me anything about your O/L English Literature syllabus, like "Explain Jagan\'s character" or "What are the themes in The Vendor of Sweets?" You can also attach images or documents!' }
  ]);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
          // Extract base64 part
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.readAsDataURL(file);
      });

      newAttachments.push({
        file,
        data,
        mimeType: file.type || 'application/octet-stream'
      });
    }

    setAttachments(prev => [...prev, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || isLoading) return;

    const userMsg = input;
    const currentAttachments = [...attachments];
    
    setInput('');
    setAttachments([]);
    
    let displayMsg = userMsg;
    if (currentAttachments.length > 0) {
      displayMsg += `\n\n[Attached ${currentAttachments.length} file(s)]`;
    }
    
    setMessages(prev => [...prev, { role: 'user', content: displayMsg }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing");
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `You are a helpful, encouraging, and expert AI tutor for Sri Lankan G.C.E O/L English Literature students.
Your goal is to help them understand texts like "The Vendor of Sweets", poems, short stories, and drama from the syllabus.
Keep your answers simple, exam-focused, and engaging. Use formatting like bullet points and bold text to make it easy to read.
If they ask for an essay, provide a well-structured model essay that would score an 'A' grade, highlighting the key points.`;

      const parts: any[] = [];
      if (currentAttachments.length > 0) {
        currentAttachments.forEach((att) => {
          parts.push({
            inlineData: {
              mimeType: att.mimeType,
              data: att.data
            }
          });
        });
      }
      parts.push({ text: userMsg || "Please analyze the attached files." });

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: { parts },
        config: {
          systemInstruction,
        },
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || '' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-8rem)] flex flex-col"
    >
      <header className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-indigo-600" />
          </div>
          AI Tutor
        </h1>
        <p className="text-slate-600 mt-2">Your personal guide to mastering O/L Literature.</p>
      </header>

      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-indigo-600'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-sm' 
                    : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-sm'
                }`}>
                  {msg.role === 'user' ? (
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="prose prose-slate prose-sm max-w-none prose-p:leading-relaxed prose-a:text-indigo-600">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                  <span className="text-slate-500 text-sm font-medium">Thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0 flex flex-col gap-3">
          {attachments.length > 0 && (
            <div className="flex gap-2 flex-wrap px-2">
              {attachments.map((att, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium border border-indigo-100">
                  <span className="truncate max-w-[150px]">{att.file.name}</span>
                  <button onClick={() => removeAttachment(idx)} className="hover:text-red-500 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-3 max-w-4xl mx-auto w-full">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept="image/*,.pdf,.txt,.docx"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-14 h-14 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors shrink-0 shadow-sm hover:shadow-md active:scale-95"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about themes, characters, or attach a file..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-[15px] font-medium text-slate-900"
            />
            <button
              onClick={handleSend}
              disabled={(!input.trim() && attachments.length === 0) || isLoading}
              className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm hover:shadow-md active:scale-95"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
