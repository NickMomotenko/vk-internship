import { useCallback, useRef } from "react";

export const useDebounce = (callback: Function, delay: number) => {
  const timer = useRef<any>();

  const stopTimer = () => {
    clearTimeout(timer.current);
  };

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      if (args[0].error) {
        stopTimer();
        return;
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return { debouncedCallback, stopTimer };
};
