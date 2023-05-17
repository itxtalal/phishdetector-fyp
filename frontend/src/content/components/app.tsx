import React, { useState, useEffect } from 'react';
import Alert from './Alert';

const API_URL = 'https://api.phishdetector.live/analyze';
// const API_URL = 'http://localhost:5000/analyze';

// get all the links extracted from webpage
const getLinks = () => {
  const links = document.getElementsByTagName('a');
  const linksArray = Array.from(links);
  return linksArray;
};

// remove links with same origin
const filterLinks = (links: HTMLAnchorElement[]) => {
  const seenOrigins = new Set();

  for (const link of links) {
    const linkOrigin = link?.origin;
    if (!seenOrigins.has(linkOrigin)) {
      seenOrigins.add(linkOrigin);
    }
  }
  return seenOrigins;
};

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [warn, setWarn] = useState('');
  const [popupText, setPopupText] = useState('');
  const [extensionEnabled, setExtensionEnabled] = useState(false);
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [blacklist, setBlacklist] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.whitelist) {
        setWhitelist(() => changes.whitelist.newValue);
      }
    });

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.blacklist) {
        setBlacklist(() => changes.blacklist.newValue);
      }
    });

    chrome.storage.sync.get('whitelist', ({ whitelist }) => {
      setWhitelist(() => whitelist);
    });
    const timeout = setTimeout(() => {
      chrome.storage.sync.get('blacklist', ({ blacklist }) => {
        setBlacklist(() => blacklist);
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    chrome.storage.sync.get('extensionEnabled', ({ extensionEnabled }) => {
      // Set the value of extensionEnabled in state
      setExtensionEnabled(() => extensionEnabled);
    });

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.extensionEnabled) {
        setExtensionEnabled(() => changes.extensionEnabled.newValue);
      }
    });
  }, []);

  const dismiss = () => {
    setShowAlert(false);
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('height');
  };

  const addToWhiteList = () => {
    // add current url to whitelist and store it in chrome storage
    const url = window.location.href;

    // check if whitelist is empty
    if (!whitelist) {
      chrome.storage.sync.set({ whitelist: [url] });
      setWhitelist(() => [url]);
      dismiss();

      return;
    }

    // check if url is already in whitelist
    if (whitelist?.includes(url)) return;

    const newWhitelist = [...whitelist, url];

    chrome.storage.sync.set({ whitelist: newWhitelist });
    setWhitelist(() => newWhitelist);

    // remove from blacklist
    if (blacklist?.includes(url)) {
      const newBlacklist = blacklist?.filter((item) => item !== url);
      chrome.storage.sync.set({ blacklist: newBlacklist });
      setBlacklist(() => newBlacklist);
    }

    dismiss();
  };

  useEffect(() => {
    chrome.storage.sync.set({ url: window.location.href });
  }, []);

  const isUrlWhitelisted = () => {
    const url = window.location.href;
    if (!whitelist) return false;
    return whitelist?.includes(url);
  };

  const isUrlBlacklisted = () => {
    const url = window.location.href;
    if (!blacklist) return false;
    return blacklist?.includes(url);
  };

  useEffect(() => {
    if (!extensionEnabled) return;
    const url = window.location.href;
    if (isUrlWhitelisted()) return;

    // - The URL you visited is a phishing site (if domain, path, and query match)
    // - The URL you visited was detected as phishing in another visit (if domain and path match)
    // - The site you visited contains a phishing page (if only domain matches)

    // user have a whitelist array to not check some urls

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.phishing === true) {
          setShowAlert(true);
          if (
            data.domain === true &&
            data.path === true &&
            data.query === true
          ) {
            setWarn('The URL you visited is a phishing site');
            return;
          }

          if (data.domain === true && data.path === true) {
            setWarn(
              'The URL you visited was detected as phishing in another visit'
            );
            return;
          }

          if (data.domain === true) {
            setWarn('The site you visited contains a phishing page');
            return;
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [extensionEnabled]);

  useEffect(() => {
    if (!extensionEnabled) return;

    if (isUrlWhitelisted()) return;

    const links = getLinks();
    console.log('links', links);

    const filteredLinks = filterLinks(links);
    console.log('filteredLinks', filteredLinks);

    // for each link, send a request to backend to check if it is phishing or not
    links.forEach((link) => {
      const url = link.href;
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.phishing) {
            link.classList.add('phishing');
            link.style.color = 'red';
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    });
  }, [extensionEnabled]);

  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('height');

  if (isUrlWhitelisted()) return <></>;

  if (showAlert && extensionEnabled) {
    // disable scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';

    return (
      <Alert dismiss={dismiss} addToWhiteList={addToWhiteList} warn={warn} />
    );
  }

  if (isUrlBlacklisted() && extensionEnabled) {
    // disable scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';

    return (
      <Alert
        dismiss={dismiss}
        addToWhiteList={addToWhiteList}
        warn={
          'This URL is blacklisted by you. You can remove it from the extension popup.'
        }
      />
    );
  }

  return <></>;
}

export default App;
