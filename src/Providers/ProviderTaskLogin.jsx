import React from 'react';
import reducerTodoLogin from '../Reducers/reducerTodoLogin';
import { useImmerReducer } from 'use-immer';
import { useNavigate } from 'react-router';
import { ContextTaskLogin } from '../context/contextApp';
import { signInWithEmail } from '../Services/taskService';

const ProviderTaskLogin = ({ children }) => {
  const navigate = useNavigate();

  const initStateLogin = {
    data: null,
    isLoading: false,
    globalError: null,
  };

  const [stateSignIn, dispatch] = useImmerReducer(
    reducerTodoLogin,
    initStateLogin
  );

  const handleSubmitLogin = async (email, password) => {
    dispatch({ type: 'SET_SIGN_IN_PENDING' });

    try {
      const response = await signInWithEmail(email, password);
      dispatch({ type: 'SET_SUCCESS_SIGN_IN', payload: response });
      navigate('/userPage');
    } catch (err) {
      console.error('Ошибка входа:', err);
      dispatch({ type: 'SET_SIGN_IN_FAILURE', payload: err });
      throw err;
    }
  };

  const handleClickLogin = () => {
    navigate('/Login');
  };

  const contextValue = {
    stateSignIn,
    handleClickLogin,
    handleSubmitLogin,
    dispatch,
  };

  return (
    <ContextTaskLogin.Provider value={contextValue}>
      {children}
    </ContextTaskLogin.Provider>
  );
};

export default ProviderTaskLogin;
