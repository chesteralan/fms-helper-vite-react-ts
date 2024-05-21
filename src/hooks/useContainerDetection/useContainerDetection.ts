import { useEffect } from "react";

export const useContainerDetection = (
  className: string,
  callback: () => void,
) => {
  useEffect(() => {
    console.log(`running detection on: ${className}`);
    const timeout: NodeJS.Timeout = setInterval(() => {
      const container = document.getElementsByClassName(className);
      if (container.length !== 0) {
        console.log(`${className} is detected`);
        callback();
        clearInterval(timeout);
      }
    }, 100);
  }, [className, callback]);
};
