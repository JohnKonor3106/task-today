export const ContextTaskLogin = React.createContext({
  login: '',
  password: '',
  errors: {},
  setLogin: () => {},
  setPassword: () => {},
  handleClickLogin: () => {},
  dispatch: () => {},
});

export const ContextTaskSignUp = React.createContext({
  login: '',
  password: '',
  retryPassword: '',
  errors: {},
  setLoginSignUp: () => {},
  setPasswordSignUp: () => {},
  handleSignUp: () => {},
  dispatch: () => {},
});
