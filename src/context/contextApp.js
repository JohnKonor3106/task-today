import React from 'react';

export const ContextTaskLogin = React.createContext({
  data: null,
  isLoading: false,
  globalError: null,
  handleSubmitLogin: () => {},
  handleClickLogin: () => {},
  dispatch: () => {},
});

export const ContextTaskSignUp = React.createContext({
  registr: {
    status: 'unregistered',
    message: null,
  },
  isSigningUp: false,
  globalError: null,
  errors: {},
  handleSignUp: () => {},
  dispatch: () => {},
});
export const ContextTaskList = React.createContext({
  tasksList: {
    tasks: {
      list: [],
      loading: false,
    },
    form: {
      field: {
        title: '',
        description: '',
      },
      status: 'hidden',
    },
    error: {},
  },
  handleInputChange: () => {},
  handleCreateTask: () => {},
  handleDeleteTask: () => {},
  initializationTask: () => {},
  formOpen: () => {},
  formClose: () => {},
  dispatch: () => {},
});
