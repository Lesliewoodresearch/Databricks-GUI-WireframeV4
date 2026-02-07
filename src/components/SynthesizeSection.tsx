import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export function SynthesizeSection() {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');

  const handleSynthesize = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setResult('Sample synthesized research output based on your prompt and loaded files...');
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-white flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-400" />
        Synthesize Research with Databricks AI
      </h3>
      
      {/* Source Files Info */}
      <div className="bg-slate-900 border border-slate-600 rounded-lg p-3">
        <div className="text-sm text-slate-400 mb-2">Source Files</div>
        <div className="text-white text-sm space-y-1">
          <div>• dataset_2024.csv</div>
          <div>• analysis_results.json</div>
          <div className="text-slate-500 text-xs mt-2">
            Load files from the "Load Files" section to add sources
          </div>
        </div>
      </div>

      {/* Prompt Input */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">
          Synthesis Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-500 resize-none"
          rows={4}
          placeholder="Enter your prompt for AI synthesis... e.g., 'Summarize the key findings from the research data and identify trends'"
        />
      </div>

      {/* AI Model Selection */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">AI Model</label>
        <select className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-500">
          <option>Databricks DBRX</option>
          <option>Llama 2</option>
          <option>GPT-4 (via Databricks)</option>
        </select>
      </div>

      {/* Synthesize Button */}
      <button
        onClick={handleSynthesize}
        disabled={!prompt.trim() || isProcessing}
        className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Synthesize with AI
          </>
        )}
      </button>

      {/* Results */}
      {result && (
        <div className="bg-slate-900 border border-purple-500/30 rounded-lg p-4">
          <div className="text-sm text-purple-400 mb-2">AI Synthesis Result</div>
          <div className="text-white text-sm">{result}</div>
        </div>
      )}
    </div>
  );
}
