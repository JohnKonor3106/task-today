import React from 'react';
import { useImmerReducer } from 'use-immer';
import { ContextTaskSignUp } from '../context/contextApp';
import reducerTaskSignUp from '../Reducers/reducerTaskSignUp';
import { registrUser } from '../Services/taskService';

const ProviderTaskSignUp = ({ children }) => {
  const initState = {
    registr: {
      status: 'unregistered', // Статус регистрации: 'unregistered', 'pending', 'logged'
      message: null, // Добавим сообщение для статуса, например, успех/ошибка сервера
    },
    isSigningUp: false, // Добавим состояние для отслеживания асинхронной операции
    globalError: null, // Для хранения глобальной ошибки от сервера
  };

  const [stateSingUpUser, dispatch] = useImmerReducer(
    reducerTaskSignUp,
    initState
  );

  const handleSignUp = async data => {
    dispatch({ type: 'SET_SIGN_UP_PENDING' }); // Устанавливаем статус "в процессе"
    dispatch({ type: 'CLEAR_GLOBAL_ERROR' }); // Очищаем предыдущие глобальные ошибки

    try {
      const { email, password } = data;
      // Предполагаем, что registrUser теперь выбрасывает ошибку при неудаче
      await registrUser(email, password);
      dispatch({
        type: 'SET_SUCCESS_SIGN_UP',
        payload: 'Регистрация прошла успешно!',
      });
      alert('Регистрация прошла успешно!'); // Можно заменить на более элегантное уведомление
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      // Передаем сообщение об ошибке в payload
      dispatch({
        type: 'SET_SIGN_UP_FAILURE',
        payload: err || 'Произошла непредвиденная ошибка регистрации.',
      });
      alert('Ошибка регистрации: ' + (err || 'Неизвестная ошибка')); // Или показываем в UI
      throw err;
    }
  };

  const dataContext = {
    handleSignUp,
    dispatch,
    stateSingUpUser, // Теперь передаем все состояние для доступа к isSigningUp и globalError
  };

  return (
    <ContextTaskSignUp.Provider value={dataContext}>
      {children}
    </ContextTaskSignUp.Provider>
  );
};

export default ProviderTaskSignUp;
