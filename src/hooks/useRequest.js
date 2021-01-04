import { useState, useCallback, useEffect, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      const { data } = action.payload;
      return {
        ...state,
        data,
        error: null,
        loading: false,
      };
    case 'FETCH_FAILURE':
      const { error } = action.payload;
      return {
        ...state,
        data: null,
        error,
        loading: false,
      };
    default:
      throw new Error();
  }
};

/**
 * requestOptions:
 * manual
 * params
 * mock
 * onSuccess
 * onError
 **/
const useRequest = (requestUrl, requestOptions) => {
  const [url] = useState(requestUrl);
  const [options] = useState(requestOptions);

  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    loading: false,
  });

  const requestTask = useCallback(
    async (params) => {
      dispatch({ type: 'FETCH_INIT' });

      const { mock, method, onSuccess, onError } = options;
      const requestInit = {
        body: params === null ? null : JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
        method: method ?? 'GET',
        mode: 'cors',
      };

      const task = () => {
        return new Promise((resolve, reject) =>
          resolve(mock ? mock() : fetch(url, requestInit).then((response) => response.json())),
        );
      };

      task()
        .then((data) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: { data } });
          onSuccess(data);
        })
        .catch((error) => {
          dispatch({ type: 'FETCH_FAILURE', payload: { error } });
          onError(error);
        });
    },
    [url, options],
  );

  // auto fetch
  useEffect(() => {
    const { manual, params } = options;
    if (!manual) requestTask(params);
  }, [requestTask, options]);

  const request = useCallback((params = null) => requestTask(params ?? options.params), [options, requestTask]);

  return { ...state, request };
};

export default useRequest;
