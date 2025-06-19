import { useImmerReducer } from 'use-immer';
import reducerTaskList from '../Reducers/reducerTaskList';
import { addTask, deleteTask, updateTask } from '../Services/taskService';
import { ContextTaskList } from '../context/contextApp';

const ProviderTaskList = ({ children }) => {
  const initState = {
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
  };

  const [tasksList, dispatch] = useImmerReducer(reducerTaskList, initState);

  const handleInputChange = e => {
    const { name, value } = e.target;
    dispatch({
      type: 'FORM_FILLING',
      payload: { [name]: value },
    });
  };

  const formOpen = () => {
    dispatch({ type: 'OPEN_FORM', payload: 'show' });
  };

  const formClose = () => {
    dispatch({ type: 'CLOSED_FORM', payload: 'hidden' });
    dispatch({ type: 'CLEAR_TASK_FORM' });
  };

  const handleCreateTask = async () => {
    try {
      dispatch({ type: 'ADD_TASK_REQUEST' });

      const data = await addTask({
        title: tasksList.form.field.title,
        description: tasksList.form.field.description,
        created_at: new Date().toISOString(),
        active: true,
      });
      console.log('Received from addTask:', data);
      dispatch({ type: 'ADD_TASK_SUCCESS', payload: data[0] });

      formClose();
    } catch (e) {
      dispatch({ type: 'ADD_TASK_FAILURE' });
      console.error(e);
    }
  };

  const handleDeleteTask = async id => {
    try {
      dispatch({ type: 'DELETE_TASK_REQUEST' });
      await deleteTask(id);
      dispatch({ type: 'DELETE_TASK_SUCCESS', payload: id });
    } catch (e) {
      dispatch({ type: 'DELETE_TASK_FAILURE' });
    }
  };

  const handleChangeCheckBox = async id => {
    try {
      const findTask = tasksList.tasks.list.find(task => task.id === id);
      if (findTask) {
        const updateChecked = findTask.checked ? false : true;
        dispatch({ type: 'CHANGE_CHECKED_BOX_REQUEST' });
        const data = await updateTask({ id, updateChecked });
        dispatch({ type: 'CHANGE_CHECKED_BOX_SUCCESS', payload: data[0] });
      }
    } catch (e) {
      dispatch({ type: 'CHANGE_CHECKED_BOX_FAILURE' });
      console.error(e);
    }
  };

  const initializationTask = async data => {
    dispatch({ type: 'TASK_LIST_INITILIAZATHION_REQUEST' });
    dispatch({ type: 'TASK_LIST_INITILIAZATHION', payload: data || [] });
  };

  const contextValue = {
    tasksList,
    handleInputChange,
    handleCreateTask,
    handleDeleteTask,
    handleChangeCheckBox,
    initializationTask,
    formOpen,
    formClose,
    dispatch,
  };

  return (
    <ContextTaskList.Provider value={contextValue}>
      {children}
    </ContextTaskList.Provider>
  );
};

export default ProviderTaskList;
