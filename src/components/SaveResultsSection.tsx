import { useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';

export function SaveResultsSection() {
  const [fileName, setFileName] = useState('research_output.txt');
  const [fileFormat, setFileFormat] = useState('txt');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Simulate save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-white flex items-center gap-2">
        <Download className="w-5 h-5 text-green-400" />
        Save Results to Local File
      </h3>
      
      {/* Results Preview */}
      <div className="bg-slate-900 border border-slate-600 rounded-lg p-4">
        <div className="text-sm text-slate-400 mb-2">Current Results</div>
        <div className="text-white text-sm space-y-2">
          <div className="p-3 bg-slate-800 rounded border border-slate-700">
            <div className="text-xs text-slate-500 mb-1">Synthesis Output</div>
            <div className="text-slate-300">
              Sample synthesized research output based on your prompt and loaded files...
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Generated on: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      {/* File Name */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">File Name</label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-green-500"
          placeholder="output.txt"
        />
      </div>

      {/* File Format */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">File Format</label>
        <div className="grid grid-cols-4 gap-2">
          {['txt', 'json', 'csv', 'md'].map((format) => (
            <button
              key={format}
              onClick={() => setFileFormat(format)}
              className={`px-3 py-2 rounded border transition-colors ${
                fileFormat === format
                  ? 'bg-green-600 border-green-500 text-white'
                  : 'bg-slate-900 border-slate-600 text-slate-400 hover:border-slate-500'
              }`}
            >
              .{format}
            </button>
          ))}
        </div>
      </div>

      {/* Save Location */}
      <div>
        <label className="block text-sm text-slate-400 mb-2">Save Location</label>
        <div className="flex gap-2">
          <input
            type="text"
            value="/downloads/"
            readOnly
            className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 py-2 text-slate-500"
          />
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors">
            Browse
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!fileName.trim()}
        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {saved ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Saved Successfully!
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Save to Local File
          </>
        )}
      </button>

      {saved && (
        <div className="text-sm text-green-400 text-center">
          File saved to /downloads/{fileName}
        </div>
      )}
    </div>
  );
}
