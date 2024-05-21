import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    fmsHelperInterval: NodeJS.Timeout;
  }
}

const clearIntervals = () => {
  if (window.fmsHelperInterval) {
    clearInterval(window.fmsHelperInterval);
  }
};

const startScanning = () => {
  window.fmsHelperInterval = setInterval(() => {
    const appRoot = document.getElementsByTagName(
      "ts-root-app",
    ) as unknown as HTMLElement;
    if (appRoot) {
      const targetElement = document.createElement("div");
      ReactDOM.createRoot(targetElement).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      );
      document.body.appendChild(targetElement);
      clearIntervals();
    }
  }, 1000);
};

startScanning();
setTimeout(() => {
  clearIntervals();
}, 10000);
