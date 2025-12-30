
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
const loader = document.getElementById('loader');

const hideLoader = () => {
  if (loader) {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 600);
  }
};

if (!rootElement) {
  hideLoader();
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Use requestIdleCallback or a short timeout to ensure React has started mounting before hiding loader
  if (window.requestIdleCallback) {
    requestIdleCallback(() => hideLoader());
  } else {
    setTimeout(hideLoader, 500);
  }
} catch (error) {
  console.error("Critical rendering error:", error);
  hideLoader();
  rootElement.innerHTML = `
    <div style="padding: 40px; text-align: center; color: #ef4444; font-family: sans-serif; height: 100vh; display: flex; flex-direction: column; justify-content: center;">
      <h1 style="font-weight: 900; margin-bottom: 10px;">Application Error</h1>
      <p style="color: #64748b;">Failed to initialize the React application. Please check the console for details.</p>
      <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Retry Loading</button>
    </div>
  `;
}
