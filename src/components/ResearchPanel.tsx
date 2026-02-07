import { useState } from 'react';
import { FileUp, Brain, Save, FileText } from 'lucide-react';
import { LoadFilesSection } from './LoadFilesSection';
import { SynthesizeSection } from './SynthesizeSection';
import { SaveResultsSection } from './SaveResultsSection';
import { CreateFileSection } from './CreateFileSection';

type ActiveSection = 'load' | 'synthesize' | 'save' | 'create' | null;

export function ResearchPanel() {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  const sections = [
    {
      id: 'load' as const,
      icon: FileUp,
      title: 'Load Files',
      description: 'Load files from Databricks workspace',
      color: 'blue'
    },
    {
      id: 'synthesize' as const,
      icon: Brain,
      title: 'Synthesize Research',
      description: 'Use Databricks AI to synthesize research',
      color: 'purple'
    },
    {
      id: 'save' as const,
      icon: Save,
      title: 'Save Results',
      description: 'Save results to local file',
      color: 'green'
    },
    {
      id: 'create' as const,
      icon: FileText,
      title: 'Create File',
      description: 'Generate file with custom prompt',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: {
        bg: isActive ? 'bg-blue-500/20' : 'bg-blue-500/10',
        border: isActive ? 'border-blue-400' : 'border-blue-500/30',
        icon: 'text-blue-400',
        hover: 'hover:bg-blue-500/20 hover:border-blue-400'
      },
      purple: {
        bg: isActive ? 'bg-purple-500/20' : 'bg-purple-500/10',
        border: isActive ? 'border-purple-400' : 'border-purple-500/30',
        icon: 'text-purple-400',
        hover: 'hover:bg-purple-500/20 hover:border-purple-400'
      },
      green: {
        bg: isActive ? 'bg-green-500/20' : 'bg-green-500/10',
        border: isActive ? 'border-green-400' : 'border-green-500/30',
        icon: 'text-green-400',
        hover: 'hover:bg-green-500/20 hover:border-green-400'
      },
      orange: {
        bg: isActive ? 'bg-orange-500/20' : 'bg-orange-500/10',
        border: isActive ? 'border-orange-400' : 'border-orange-500/30',
        icon: 'text-orange-400',
        hover: 'hover:bg-orange-500/20 hover:border-orange-400'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h2 className="text-white mb-6">Research Tools</h2>
      
      {/* Action Cards Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          const colors = getColorClasses(section.color, isActive);
          
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className={`p-4 border rounded-lg transition-all text-left ${colors.bg} ${colors.border} ${colors.hover}`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.icon}`} />
                <div>
                  <div className="text-white mb-1">{section.title}</div>
                  <div className="text-sm text-slate-400">{section.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Section Content */}
      {activeSection && (
        <div className="border-t border-slate-700 pt-6 animate-in fade-in duration-200">
          {activeSection === 'load' && <LoadFilesSection />}
          {activeSection === 'synthesize' && <SynthesizeSection />}
          {activeSection === 'save' && <SaveResultsSection />}
          {activeSection === 'create' && <CreateFileSection />}
        </div>
      )}
    </div>
  );
}
