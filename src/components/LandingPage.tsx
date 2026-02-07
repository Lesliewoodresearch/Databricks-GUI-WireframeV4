import { Database, Sparkles, Shield, Zap } from 'lucide-react';
import { useRef } from 'react';

interface LandingPageProps {
  onLoginClick: () => void;
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Mock upload to Databricks catalog
    const fileNames = Array.from(files).map(f => f.name).join(', ');
    alert(`Uploading ${files.length} file(s) to Databricks catalog:\n${fileNames}\n\nNote: This is a demo. In production, files would be uploaded to your Databricks workspace.`);
    
    // Reset input
    event.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-orange-500" />
            <span className="text-white text-xl">Databricks Research Hub</span>
          </div>
          <button
            onClick={onLoginClick}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            Enter Research Hub
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-white mb-6">
            Unlock the Power of <span className="text-orange-400">AI-Driven Research</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto mb-8">
            Connect to Databricks, synthesize research with AI, and manage your data workflows 
            all in one powerful interface
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <button
            onClick={handleUploadFiles}
            className="p-6 border border-slate-300 bg-white rounded-lg backdrop-blur-sm hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer text-left"
          >
            <div className="mb-4">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-slate-900 mb-2">Load Files</h3>
            <p className="text-slate-600 text-sm">Upload local files to your Databricks catalog</p>
          </button>
          <FeatureCard
            icon={<Sparkles className="w-8 h-8 text-purple-400" />}
            title="AI Synthesis"
            description="Use Databricks AI to synthesize and analyze your research data"
            color="purple"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-green-400" />}
            title="Save Results"
            description="Export your synthesized results to local files securely"
            color="green"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8 text-orange-400" />}
            title="Create Files"
            description="Generate new content and files with custom AI prompts"
            color="orange"
          />
        </div>

        {/* Hexagon Visual */}
        <div className="mt-20 flex justify-center">
          <div className="relative">
            <svg width="200" height="220" viewBox="0 0 200 220" className="opacity-20">
              <polygon
                points="100,10 180,60 180,160 100,210 20,160 20,60"
                fill="none"
                stroke="#fb923c"
                strokeWidth="2"
              />
              <polygon
                points="100,30 165,65 165,155 100,190 35,155 35,65"
                fill="none"
                stroke="#fb923c"
                strokeWidth="1"
                opacity="0.5"
              />
              <text
                x="100"
                y="115"
                textAnchor="middle"
                fill="#fb923c"
                className="text-2xl"
                style={{ fontWeight: 600 }}
              >
                Research
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const colorClasses = {
    blue: 'border-blue-500/30 bg-blue-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
    green: 'border-green-500/30 bg-green-500/5',
    orange: 'border-orange-500/30 bg-orange-500/5',
  };

  return (
    <div className={`p-6 border rounded-lg ${colorClasses[color]} backdrop-blur-sm`}>
      <div className="mb-4">{icon}</div>
      <h3 className="text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}