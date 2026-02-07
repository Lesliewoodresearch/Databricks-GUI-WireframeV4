// Load from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem('databricks_config');
  if (saved) {
    const config = JSON.parse(saved);
    setWorkspaceUrl(config.workspaceUrl);
    setDatabricksToken(config.databricksToken);
  }
}, []);

// Save when credentials change
const saveConfig = () => {
  localStorage.setItem('databricks_config', JSON.stringify({
    workspaceUrl,
    databricksToken
  }));
};
