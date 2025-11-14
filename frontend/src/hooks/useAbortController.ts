import { useEffect, useRef } from 'react';

export const useAbortController = (): AbortSignal => {
  const controllerRef = useRef<AbortController | null>(null);

  if (!controllerRef.current) {
    controllerRef.current = new AbortController();
  }

  useEffect(() => {
    const controller = controllerRef.current;

    return () => {
      controller?.abort();
    };
  }, []);

  return controllerRef.current.signal;
};

