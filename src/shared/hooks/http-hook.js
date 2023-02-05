import { useCallback, useEffect, useRef, useState } from "react";

// useHttpClient custom hook to manage HTTP requests
export const useHttpClient = () => {
  // state to keep track of loading status
  const [isLoading, setIsLoading] = useState(false);
  // state to keep track of error
  const [error, setError] = useState();

  // reference array to keep track of all active HTTP requests
  const activeHttpRequests = useRef([]);

  // sendRequest callback to perform HTTP request
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      // set isLoading to true when a request is being made
      setIsLoading(true);
      // create a new AbortController to manage this request
      const httpAbortCtrll = new AbortController();
      // add the new AbortController to the activeHttpRequests reference array
      activeHttpRequests.current.push(httpAbortCtrll);
      try {
        // perform the HTTP request
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrll.signal,
        });
        // parse response data
        const responseData = await response.json();
        // remove this request from the activeHttpRequests reference array
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrll
        );
        // check if response has error status (400 or 500 series)
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        // set isLoading to false after a successful response
        setIsLoading(false);
        // return the response data
        return responseData;
      } catch (err) {
        // set error message
        if (err.message == "Failed to fetch") {
          err.message = "An unknown error occurred, try again."; // 503 Service Unavailable
        }
        setError(err.message);
        // set isLoading to false after an unsuccessful response
        setIsLoading(false);
        throw err;
      }
    },
    []
  );
  // clearError callback to clear the error state
  const clearError = () => {
    setError(null);
  };

  // useEffect to abort all active HTTP requests when the component using this hook unmounts
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  // return object with loading, error, sendRequest and clearError callbacks
  return { isLoading, error, sendRequest, clearError };
};
