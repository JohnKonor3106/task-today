const reducerTaskSignUp = (draft, action) => {
  switch (action.type) {
    case 'SET_LOGIN_SIGN_UP':
      draft.login = action.payload;
      break;
    case 'SET_PASSWORD_SIGN_UP':
      draft.password = action.payload;
      break;
    case 'SET_RETRY_PASSWORD':
      draft.retryPassword = action.payload;
      break;
    case 'SET_ERROR_SIGN_UP':
      const { typeErr, value } = action.payload;
      draft.errors[typeErr] = value;
      break;
    case 'CLEAR_ERRORS':
      draft.errors = {};
      break;
    default:
      return draft;
  }
};

export default reducerTaskSignUp;
