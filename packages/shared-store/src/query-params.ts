import { useCallback, useEffect, useState } from "react";

export type QueryParamValue = string | null;

export function getQueryParam(key: string): QueryParamValue {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

export function setQueryParam(key: string, value: string | null): void {
  const url = new URL(window.location.href);
  if (value === null) {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }
  window.history.pushState({}, "", url.toString());
}

export function removeQueryParam(key: string): void {
  setQueryParam(key, null);
}

export function useQueryParam(
  key: string
): [QueryParamValue, (value: string | null) => void] {
  const [value, setValue] = useState<QueryParamValue>(() =>
    getQueryParam(key)
  );

  useEffect(() => {
    const handlePopState = () => {
      setValue(getQueryParam(key));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [key]);

  const updateValue = useCallback(
    (newValue: string | null) => {
      setQueryParam(key, newValue);
      setValue(newValue);
    },
    [key]
  );

  return [value, updateValue];
}
