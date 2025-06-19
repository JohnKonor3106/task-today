const reducerTodoLogin = (draft, action) => {
  switch (action.type) {
    case 'SET_SIGN_IN_PENDING':
      draft.isLoading = true;
      draft.globalError = null;
      draft.data = null;
      break;
    case 'SET_SUCCESS_SIGN_IN':
      draft.isLoading = false;
      draft.data = action.payload;
      draft.globalError = null;
      break;
    case 'SET_SIGN_IN_FAILURE':
      draft.isLoading = false;
      draft.globalError = action.payload.message || 'Произошла ошибка входа.';
      draft.data = null;
      break;
    case 'CLEAR_GLOBAL_ERROR':
      draft.globalError = null;
      break;
    default:
      break;
  }
};

export default reducerTodoLogin;
