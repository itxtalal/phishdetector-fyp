import React from 'react';

function App() {
  const [extensionEnabled, setExtensionEnabled] = React.useState(false);
  const [whitelist, setWhitelist] = React.useState<string[]>([]);
  const [blacklist, setBlacklist] = React.useState<string[]>([]);
  const [url, setUrl] = React.useState('');

  React.useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = tabs[0].url;

      if (!currentUrl) return;
      if (currentUrl === url) return;

      setUrl(() => currentUrl);
    });

    chrome.storage.sync.get('extensionEnabled', ({ extensionEnabled }) => {
      setExtensionEnabled(() => extensionEnabled);
    });

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.extensionEnabled) {
        setExtensionEnabled(() => changes.extensionEnabled.newValue);
      }
    });

    chrome.storage.sync.get('whitelist', ({ whitelist }) => {
      setWhitelist(() => whitelist);
    });

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.whitelist) {
        setWhitelist(() => changes.whitelist.newValue);
      }
    });

    chrome.storage.sync.get('blacklist', ({ blacklist }) => {
      setBlacklist(() => blacklist);
    });

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.blacklist) {
        setBlacklist(() => changes.blacklist.newValue);
      }
    });

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.url) {
        setUrl(() => changes.url.newValue);
      }
    });

    // run a function after 100 ms to get the current url
    // const timeout = setTimeout(() => {
    //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //     const currentUrl = tabs[0].url;

    //     if (!currentUrl) return;
    //     if (currentUrl === url) return;

    //     setUrl(() => currentUrl);
    //   });
    // }, 5000);

    return () => {
      chrome.storage.onChanged.removeListener(() => {});
      // clearTimeout(timeout);
    };
  }, []);

  const toggleExtension = () => {
    // toggle the value of extensionEnabled
    chrome.storage.sync.set({ extensionEnabled: !extensionEnabled });
    setExtensionEnabled(() => !extensionEnabled);
  };

  const isUrlWhitelisted = () => {
    if (!whitelist) return false;
    return whitelist?.includes(url);
  };

  const addToWhiteList = () => {
    // add current url to whitelist and store it in chrome storage

    // check if url is already in whitelist
    if (isUrlWhitelisted()) return;

    // check if whitelist is empty
    if (!whitelist) {
      chrome.storage.sync.set({ whitelist: [url] });
      setWhitelist(() => [url]);
      return;
    }

    const newWhitelist = [...whitelist, url];
    chrome.storage.sync.set({ whitelist: newWhitelist });
    setWhitelist(() => newWhitelist);

    // remove from blacklist
    if (isURLblacklisted()) {
      removeFromBlackList();
    }
  };

  const removeFromWhiteList = () => {
    // remove current url from whitelist and store it in chrome storage
    // check if url is already in whitelist
    if (!isUrlWhitelisted()) return;

    const newWhitelist = whitelist?.filter((item) => item !== url);
    chrome.storage.sync.set({ whitelist: newWhitelist });
    setWhitelist(() => newWhitelist);
  };

  const isURLblacklisted = () => {
    if (!blacklist) return false;
    return blacklist?.includes(url);
  };

  const addToBlackList = () => {
    // add current url to blacklist and store it in chrome storage

    // check if url is already in blacklist
    if (isURLblacklisted()) return;

    // check if blacklist is empty
    if (!blacklist) {
      chrome.storage.sync.set({ blacklist: [url] });
      setBlacklist(() => [url]);
      return;
    }

    const newBlacklist = [...blacklist, url];
    chrome.storage.sync.set({ blacklist: newBlacklist });
    setBlacklist(() => newBlacklist);

    // remove from whitelist
    if (isUrlWhitelisted()) {
      removeFromWhiteList();
    }
  };

  const removeFromBlackList = () => {
    // remove current url from blacklist and store it in chrome storage
    // check if url is already in blacklist
    if (!isURLblacklisted()) return;

    const newBlacklist = blacklist?.filter((item) => item !== url);
    chrome.storage.sync.set({ blacklist: newBlacklist });
    setBlacklist(() => newBlacklist);
  };

  return (
    <div className="popup">
      <h3>PhishDetector</h3>

      <hr />
      <div className="settings">
        <p>
          Extension Status:{' '}
          <span className={extensionEnabled ? 'enabled' : 'disabled'}>
            {extensionEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </p>

        <button
          className={extensionEnabled ? 'disabled' : 'enabled'}
          onClick={toggleExtension}
        >
          {extensionEnabled ? 'Disable' : 'Enable'}
        </button>
      </div>

      <hr />

      {isUrlWhitelisted() && (
        <div className="whitelist">
          <p>{url}</p>
          <p>This URL is Whitelisted</p>
          <p>* If URL is not correct, please refresh the page</p>
          <button
            onClick={isUrlWhitelisted() ? removeFromWhiteList : addToWhiteList}
          >
            {isUrlWhitelisted() ? 'Remove from Whitelist' : 'Add to Whitelist'}
          </button>
        </div>
      )}

      {!isUrlWhitelisted() && (
        <div className="blacklist">
          <p>{url}</p>
          <p>* If URL is not correct, please refresh the page</p>
          <p>Want to blacklist this URL?</p>
          <button
            onClick={isURLblacklisted() ? removeFromBlackList : addToBlackList}
          >
            {isURLblacklisted() ? 'Remove from Blacklist' : 'Add to Blacklist'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
