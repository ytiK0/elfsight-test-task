import { useCallback, useEffect, useState } from 'react';

export function useQueryParams() {
  const getParams = useCallback(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  const [query, setQuery] = useState(() => {
    const params = getParams();

    return Object.fromEntries(params.entries());
  });

  const setParam = useCallback((key, value) => {
    const url = new URL(window.location);

    if (value === null || value === undefined) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }

    window.history.replaceState({}, '', url);

    setQuery(Object.fromEntries(url.searchParams.entries()));
  }, []);

  const removeParam = useCallback((key) => {
    const url = new URL(window.location);

    url.searchParams.delete(key);
    window.history.replaceState({}, '', url);

    setQuery(Object.fromEntries(url.searchParams.entries()));
  }, []);

  const getParam = useCallback(
    (key) => {
      const params = getParams();

      return params.get(key);
    },
    [getParams]
  );

  useEffect(() => {
    const onPopState = () => {
      const params = getParams();
      setQuery(Object.fromEntries(params.entries()));
    };

    window.addEventListener('popstate', onPopState);

    return () => window.removeEventListener('popstate', onPopState);
  }, [getParams]);

  return {
    query,
    getParam,
    setParam,
    removeParam
  };
}
