import { useCallback, useEffect, useRef, useState } from "react";
import { canUseEventListeners } from "exenv";

export default function useMatchMedia(query) {
  const hasMounted = useHasMounted();

  const matcher = useCallback(() => window.matchMedia(query), [query]);
  const [queryList, setQueryList] = useState(matcher);

  const matches = useMatches(queryList);

  useEffect(() => {
    if (!hasMounted) return;

    const nextQueryList = matcher();

    setQueryList(nextQueryList);
  }, [hasMounted, matcher]);

  return matches;
}

function useHasMounted() {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;

    function reset() {
      ref.current = false;
    }

    return reset();
  }, []);

  return ref.current;
}

function useMatches(queryList) {
  const [matches, setMatches] = useState(queryList.matches);

  useEffect(() => {
    const updateMatches = () => {
      setMatches(queryList.matches);
    };

    if (canUseEventListeners) queryList.addListener(updateMatches);
    updateMatches();

    return () => {
      if (canUseEventListeners) queryList.removeListener(updateMatches);
    };
  }, [queryList]);

  return matches;
}
