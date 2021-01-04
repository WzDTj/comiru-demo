import { useState, useEffect, useCallback, useContext } from 'react';
import useRequest from './useRequest';
import apis from '../constants/apis';
import { fakeUser } from '../mocks/fakeData';
import { AppContext } from '../contexts/AppContext';

const useUser = () => {
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState(state.user);

  const { request } = useRequest(apis.USER_INFO, {
    manual: true,
    mock: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          setUser(fakeUser);
          resolve(fakeUser);
        }, 100);
      });
    },
    onSuccess: (data) => setUser(data),
    onError: (error) => console.log('error', error),
  });

  const fetch = useCallback(() => {
    request();
  }, [request]);

  const update = useCallback(
    (data) => {
      setUser({ ...user, ...data });
    },
    [user],
  );

  useEffect(() => {
    dispatch({ type: 'SET_USER', payload: { user } });
  }, [dispatch, user]);

  return { user, fetch, update };
};

export default useUser;
