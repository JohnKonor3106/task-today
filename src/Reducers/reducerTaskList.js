const reducerTaskList = (draft, action) => {
  switch (action.type) {
    case 'TASK_LIST_INITILIAZATHION_REQUEST': {
      draft.tasks.loading = true;
      break;
    }
    case 'TASK_LIST_INITILIAZATHION': {
      draft.tasks.loading = false;
      draft.tasks.list = action.payload; // Заменяем весь список
      break;
    }
    case 'TASK_LIST_INITILIAZATHION_FAILURE': {
      draft.tasks.loading = false;
      break;
    }
    case 'FORM_FILLING': {
      // Обновляем только то поле, которое пришло в payload
      draft.form.field = {
        ...draft.form.field,
        ...action.payload,
      };
      break;
    }
    case 'OPEN_FORM': {
      draft.form.status = 'show';
      break;
    }
    case 'CLOSED_FORM': {
      draft.form.status = 'hidden';
      break;
    }
    case 'CHANGE_CHECKED_BOX_REQUEST': {
      draft.tasks.loading = true;
      break;
    }
    case 'CHANGE_CHECKED_BOX_SUCCESS': {
      draft.tasks.loading = false;
      const taskIndex = draft.tasks.list.findIndex(
        task => task.id === action.payload.id
      );
      if (taskIndex !== -1) {
        draft.tasks.list[taskIndex] = {
          ...draft.tasks.list[taskIndex],
          checked: !draft.tasks.list[taskIndex].checked,
          active: !draft.tasks.list[taskIndex].active,
        };
      }
      break;
    }
    case 'CHANGE_CHECKED_BOX_FAILURE': {
      draft.tasks.loading = false;
      break;
    }
    case 'CLEAR_TASK_FORM': {
      draft.form.field.title = '';
      draft.form.field.description = '';
      break;
    }
    case 'ADD_TASK_REQUEST': {
      draft.tasks.loading = true;
      break;
    }
    case 'ADD_TASK_SUCCESS': {
      draft.tasks.loading = false;
      draft.tasks.list.push(action.payload);
      break;
    }
    case 'ADD_TASK_FAILURE': {
      draft.tasks.loading = false;
      break;
    }
    case 'DELETE_TASK_REQUEST': {
      draft.tasks.loading = true;
      break;
    }
    case 'DELETE_TASK_SUCCESS': {
      draft.tasks.loading = false;
      draft.tasks.list = draft.tasks.list.filter(
        task => task.id !== action.payload
      );
      break;
    }
    case 'DELETE_TASK_FAILURE': {
      draft.tasks.loading = false;
      break;
    }
    default: {
      break;
    }
  }
};

export default reducerTaskList;
