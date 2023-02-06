import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/app';

import './index.scss';

const container = document.createElement('popup');
// document.body.appendChild(container);

document.body.insertBefore(container, document.body.firstChild);

const root = createRoot(container);
root.render(<App />);

console.log('Content Script 👋');
