import { useRef, useState, useEffect, useCallback } from "react";

export default (value) => {
  const isMounted = useRef();
  const [state, setState] = useState(value);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  const setMountedState = useCallback((newState) => {
    if (isMounted.current) {
      setState(newState);
    }
  }, []);
  return [state, setMountedState];
};
