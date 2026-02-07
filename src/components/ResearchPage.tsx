import { useState } from 'react';
import { ResearchPanel } from './ResearchPanel';
import { HexagonButton } from './HexagonButton';
import { LogOut } from 'lucide-react';

interface ResearchPageProps {
  userId: string;
  onLogout: () => void;
}

export function ResearchPage({ userId, onLogout }: ResearchPageProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-white mb-2">{userId} Testing a DataBricks Connection</h1>
            <p className="text-slate-400">Testing workspace</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex gap-8 items-start">
          {/* Hexagon Button */}
          <div className="flex-shrink-0">
            <HexagonButton 
              isActive={isPanelOpen}
              onClick={() => setIsPanelOpen(!isPanelOpen)}
            />
          </div>

          {/* Research Panel */}
          {isPanelOpen && (
            <div className="flex-1 animate-in slide-in-from-left duration-300">
              <ResearchPanel />
            </div>
          )}

          {/* Instructions when panel is closed */}
          {!isPanelOpen && (
            <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-white mb-4">Getting Started</h2>
              <p className="text-slate-300 mb-4">
                Click the <span className="text-orange-400">Research</span> hexagon to access:
              </p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Load files from Databricks workspace</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Synthesize research using Databricks AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Save results to local files</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Generate new files with custom prompts</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Connection Status */}
        <div className="mt-8 flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-slate-400">Databricks Connection: Ready</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">Workspace: workspace-example</span>
        </div>
      </div>
    </div>
  );
}
