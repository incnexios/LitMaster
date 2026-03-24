import { motion } from 'framer-motion';
import { BookText, Upload, FileText } from 'lucide-react';
import { useState, useRef } from 'react';

export function Textbook() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
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
            <BookText className="w-6 h-6 text-indigo-600" />
          </div>
          Textbook
        </h1>
        <p className="text-slate-600 mt-2">Upload and read your O/L English Literature textbook PDF here.</p>
      </header>

      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {!pdfUrl ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-10 h-10 text-indigo-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Textbook Loaded</h2>
            <p className="text-slate-500 max-w-md mb-8">
              Upload your O/L English Literature textbook PDF to read it alongside your lessons.
            </p>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Upload className="w-5 h-5" />
              Upload PDF
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col relative">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setPdfUrl(null)}
                className="bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
              >
                Close PDF
              </button>
            </div>
            <iframe
              src={pdfUrl}
              className="w-full h-full border-none"
              title="Textbook PDF"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
