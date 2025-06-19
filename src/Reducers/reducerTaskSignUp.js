// Этот код находится в Reducers/reducerTaskSignUp.js
const reducerTaskSignUp = (draft, action) => {
  switch (action.type) {
    case 'SET_SIGN_UP_PENDING':
      draft.isSigningUp = true;
      draft.registr.status = 'pending';
      draft.registr.message = 'Идет регистрация...';
      draft.globalError = null; // Очищаем глобальную ошибку при начале новой попытки
      break;
    case 'SET_SUCCESS_SIGN_UP':
      draft.registr.status = 'logged';
      draft.registr.message = action.payload || 'Регистрация успешна!';
      draft.isSigningUp = false;
      draft.globalError = null;
      break;
    case 'SET_SIGN_UP_FAILURE':
      draft.registr.status = 'unregistered';
      draft.registr.message = 'Ошибка регистрации';
      draft.isSigningUp = false;
      draft.globalError = action.payload; // Сохраняем сообщение об ошибке
      break;
    case 'CLEAR_GLOBAL_ERROR': // Новое действие для очистки глобальной ошибки
      draft.globalError = null;
      break;
    // Действие SET_ERROR_SIGN_UP и логика с errors: []
    // Если draft.errors предназначен для ошибок формы (которые обрабатывает react-hook-form),
    // то он не нужен здесь. Если для других ошибок, то нужно пересмотреть его структуру
    // чтобы он не конфликтовал с globalError.
    // Если SET_ERROR_SIGN_UP использовался для ошибок, приходящих из контекста в форму,
    // то это можно реализовать через передачу ошибок из handleSignUp обратно в useForm (см. ниже).
    default:
      break;
  }
};

export default reducerTaskSignUp;
