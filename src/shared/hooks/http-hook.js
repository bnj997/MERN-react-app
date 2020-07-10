import { useState, useCallback, useRef, useEffect } from 'react';



export function useHttpClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //Reference here is piece of data which will not be re initalise when function runs again
  //store data across re render cycles
  const activeRequests = useRef([])

  //Use "useCallback" to avoid infinite loops
  //"useCallback" ensures this function never gets recreated when component that uses this hook re renders
  const sendRequest = useCallback(async (
    url,
    method = 'GET', 
    body = null, 
    headers = {}
  ) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    activeRequests.current.push(httpAbortCtrl);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      return responseData;
    } catch(err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  function clearError() {
    setError(null);
  }

  useEffect(() => {
    return () => {
      activeRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, [])


  return { isLoading, error, sendRequest, clearError };
}