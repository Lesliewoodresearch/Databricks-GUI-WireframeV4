import { useState } from 'react';
import { FileText, Wand2 } from 'lucide-react';

export function CreateFileSection() {
  const [prompt, setPrompt] = useState('');
  const [fileName, setFileName] = useState('generated_file.txt');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setGeneratedContent(`# Generated Content\n\nBased on prompt: "${prompt}"\n\nThis is the AI-generated file content...`);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-white flex items-center gap-2">
        <FileText className="w-5 h-5 text-orange-400" />
        Create File with Custom Prompt
      </h3>
      
      {/* Prompt Input */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">
          Generation Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500 resize-none"
          rows={4}
          placeholder="Describe what you want to generate... e.g., 'Create a summary report of Q4 performance metrics with recommendations'"
        />
      </div>

      {/* Template Selection */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">Template (Optional)</label>
        <select className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500">
          <option value="">None - Free form</option>
          <option value="report">Research Report</option>
          <option value="summary">Executive Summary</option>
          <option value="analysis">Data Analysis</option>
          <option value="documentation">Documentation</option>
        </select>
      </div>

      {/* File Name */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">Output File Name</label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
          placeholder="generated_file.txt"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Wand2 className="w-4 h-4 animate-pulse" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            Generate File
          </>
        )}
      </button>

      {/* Generated Content Preview */}
      {generatedContent && (
        <div className="bg-slate-900 border border-orange-500/30 rounded-lg overflow-hidden">
          <div className="p-3 bg-orange-500/10 border-b border-orange-500/30">
            <div className="text-sm text-orange-400">Generated Content Preview</div>
          </div>
          <div className="p-4">
            <pre className="text-white text-sm whitespace-pre-wrap font-mono">
              {generatedContent}
            </pre>
          </div>
          <div className="p-3 bg-slate-800/50 border-t border-slate-700 flex gap-2">
            <button className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors">
              Save File
            </button>
            <button className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors">
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
