import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://36fc2b5dfe114702040e64bfec8951fd@o4511088980852736.ingest.de.sentry.io/4511089037410384",
 
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,  
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment:"development",
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
