import React from 'react';
import { useImmerReducer } from 'use-immer';
import { ContextTaskSignUp } from '../context/contextApp';
import reducerTaskSignUp from '../Reducers/reducerTaskSignUp';

const ProviderTaskSignUp = ({ children }) => {
  const initState = {
    login: '',
    password: '',
    retryPassword: '',
    errors: {},
  };

  const [stateSingUpUser, dispatch] = useImmerReducer(
    reducerTaskSignUp,
    initState
  );

  const setLoginSignUp = e => {
    dispatch({ type: 'SET_LOGIN_SIGN_UP', payload: e.target.value });
  };

  const setPasswordSignUp = e => {
    dispatch({ type: 'SET_PASSWORD_SIGN_UP', payload: e.target.value });
  };

  const handleSignUp = () => {};

  const dataContext = {
    stateSingUpUser,
    setLoginSignUp,
    setPasswordSignUp,
    handleSignUp,
    dispatch,
  };

  return (
    <ContextTaskSignUp.Provider value={dataContext}>
      {children}
    </ContextTaskSignUp.Provider>
  );
};

export default ProviderTaskSignUp;
