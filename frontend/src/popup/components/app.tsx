import React from 'react';

function App() {
  const [extensionEnabled, setExtensionEnabled] = React.useState(false);

  React.useEffect(() => {
    chrome.storage.sync.get('extensionEnabled', ({ extensionEnabled }) => {
      // Set the value of extensionEnabled in state
      setExtensionEnabled(() => extensionEnabled);
    });
  }, []);

  const toggleExtension = () => {
    // toggle the value of extensionEnabled
    chrome.storage.sync.set({ extensionEnabled: !extensionEnabled });
    setExtensionEnabled(() => !extensionEnabled);
  };

  return (
    <div id="app-root">
      <h3>PhishDetector</h3>

      <p>Enabled: {extensionEnabled ? 'True' : 'False'}</p>

      <button onClick={toggleExtension}>
        {extensionEnabled ? 'Disable' : 'Enable'}
      </button>
    </div>
  );
}

export default App;
