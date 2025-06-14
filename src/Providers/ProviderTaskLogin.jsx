import React from 'react';
import reducerTodoLogin from '../Reducers/reducerTodoLogin';
import { useImmerReducer } from 'use-immer';
import { useNavigate } from 'react-router';

export const ContextTodoLogin = React.createContext({
  login: null,
  password: null,
  errors: {},
  setLogin: () => {},
  setPassword: () => {},
  handleClickLogin: () => {},
  dispatch: () => {},
});

const ProviderTaskLogin = ({ children }) => {
  const navigate = useNavigate();

  const initStateLogin = {
    login: '',
    password: '',
    errors: {},
  };

  const [state, dispatch] = useImmerReducer(reducerTodoLogin, initStateLogin);

  const setLogin = value => {
    dispatch({ type: 'SET_LOGIN', payload: value });
  };

  const setPassword = value => {
    dispatch({ type: 'SET_PASSWORD', payload: value });
  };

  const handleClickLogin = () => {
    navigate('/Login');
    console.log('click!');
  };

  const contextValue = {
    ...state,
    setLogin,
    setPassword,
    handleClickLogin: handleClickLogin,
    dispatch,
  };

  return (
    <ContextTodoLogin.Provider value={contextValue}>
      {children}
    </ContextTodoLogin.Provider>
  );
};

export default ProviderTaskLogin;
