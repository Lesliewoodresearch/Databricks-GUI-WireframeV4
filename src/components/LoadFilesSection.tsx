import { useState, useEffect } from 'react';
import { Folder, File, ChevronRight, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export function LoadFilesSection() {
  const [selectedPath, setSelectedPath] = useState('maincatalog/myapp');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Databricks credentials (in production, these would come from settings/database)
  const [workspaceUrl, setWorkspaceUrl] = useState('https://dbc-968ce34c-e36d.cloud.databricks.com');
  const [databricksToken, setDatabricksToken] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('databricks_config');
    if (saved) {
      const config = JSON.parse(saved);
      setWorkspaceUrl(config.workspaceUrl || 'https://dbc-968ce34c-e36d.cloud.databricks.com');
      setDatabricksToken(config.databricksToken || '');
    }
  }, []);

  // Save when credentials change
  const saveConfig = () => {
    localStorage.setItem('databricks_config', JSON.stringify({
      workspaceUrl,
      databricksToken
    }));
  };

  // Auto-save when credentials change
  useEffect(() => {
    if (databricksToken) {
      saveConfig();
    }
  }, [workspaceUrl, databricksToken]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus({ type: null, message: '' });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({ type: 'error', message: 'Please select a file first' });
      return;
    }

    if (!databricksToken) {
      setUploadStatus({ type: 'error', message: 'Please enter your Databricks token' });
      return;
    }

    setUploading(true);
    setUploadStatus({ type: null, message: '' });

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('workspace_url', workspaceUrl);
      formData.append('databricks_token', databricksToken);
      formData.append('catalog_path', selectedPath);

      // Call Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('upload-to-databricks', {
        body: formData,
      });

      if (error) throw error;

      if (data.success) {
        setUploadStatus({
          type: 'success',
          message: `✓ File uploaded successfully to ${data.file.path}`,
        });
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadStatus({
        type: 'error',
        message: `Upload failed: ${error.message}`,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-white text-lg font-semibold">Upload Files to Databricks</h3>
      
      {/* Databricks Configuration */}
      <div className="space-y-3 bg-slate-900/50 border border-slate-700 rounded-lg p-4">
        <h4 className="text-sm text-slate-300 font-medium">Databricks Configuration</h4>
        
        <div>
          <label className="block text-sm text-slate-400 mb-2">Workspace URL</label>
          <input
            type="text"
            value={workspaceUrl}
            onChange={(e) => setWorkspaceUrl(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="https://dbc-xxx.cloud.databricks.com"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">Access Token</label>
          <input
            type="password"
            value={databricksToken}
            onChange={(e) => setDatabricksToken(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="dapi..."
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">Catalog Path</label>
          <input
            type="text"
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="maincatalog/myapp"
          />
          <p className="mt-1 text-xs text-slate-500">
            Format: catalog/schema (e.g., maincatalog/myapp)
          </p>
        </div>
      </div>

      {/* File Upload Area */}
      <div className="bg-slate-900 border-2 border-dashed border-slate-600 rounded-lg p-6 hover:border-blue-500 transition-colors">
        <div className="flex flex-col items-center gap-4">
          <Upload className="w-12 h-12 text-slate-500" />
          
          <div className="text-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-blue-400 hover:text-blue-300 font-medium">
                Choose a file to upload
              </span>
            </label>
            <p className="text-xs text-slate-500 mt-1">
              Any file type supported
            </p>
          </div>

          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            disabled={uploading}
          />

          {selectedFile && (
            <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/30">
              <File className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">{selectedFile.name}</span>
              <span className="text-xs text-blue-400">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Upload Status */}
      {uploadStatus.type && (
        <div
          className={`flex items-start gap-2 p-4 rounded-lg ${
            uploadStatus.type === 'success'
              ? 'bg-green-500/10 border border-green-500/30'
              : 'bg-red-500/10 border border-red-500/30'
          }`}
        >
          {uploadStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          )}
          <p
            className={`text-sm ${
              uploadStatus.type === 'success' ? 'text-green-300' : 'text-red-300'
            }`}
          >
            {uploadStatus.message}
          </p>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading || !databricksToken}
        className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
      >
        {uploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Upload to Databricks
          </>
        )}
      </button>

      {/* Help Text */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
        <p className="text-xs text-blue-300">
          <strong>Tip:</strong> Get your Databricks token from: User Settings → Access Tokens → Generate New Token
        </p>
      </div>
    </div>
  );
}
