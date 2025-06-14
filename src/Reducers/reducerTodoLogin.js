const reducerTodoLogin = (draft, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      draft.login = action.payload;
  }
};

export default reducerTodoLogin;
