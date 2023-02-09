import React, { useState, useEffect } from 'react';
import Alert from './Alert';

// const API_URL = 'http://35.192.100.124/analyze';
const API_URL = 'http://localhost:5000/analyze';

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

  const dismiss = () => {
    setShowAlert(false);
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('height');
  };

  useEffect(() => {
    const url = window.location.href;
    // phising    bool
    // domain     bool - already detected domain match or not
    // path       bool - already detected path match or not
    // query      bool - matching or not
    // fragment   bool - matching or not

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
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
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
          console.log('data', data);
          if (data.phishing) {
            link.style.color = 'red';
          }
          if (data.phishing === false) {
            link.style.color = 'green';
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    });
  }, []);

  if (showAlert) {
    // disable scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';

    return <Alert dismiss={dismiss} />;
  }

  return <></>;
}

export default App;
