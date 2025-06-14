import { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { getTasks, addTask, deleteTask } from '../Services/taskService';

const TaskTodoList = () => {
  const [tasks, setTasks] = useState({
    list: [],
    loading: false,
  });

  const [taskInput, setTaskInput] = useState({
    title: '',
    description: '',
  });

  const [isFormOpen, setIsFormOpen] = useState(false); // Управление видимостью формы

  const handleInputChange = e => {
    const { name, value } = e.target;
    setTaskInput(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateTask = async () => {
    setTasks(prev => ({ ...prev, loading: true }));
    try {
      const data = await addTask({
        title: taskInput.title,
        description: taskInput.description,
        active: true,
      });
      setTasks(prev => ({
        ...prev,
        list: [...prev.list, ...data],
        loading: false,
      }));
      setTaskInput({ title: '', description: '' }); // Сброс формы
      setIsFormOpen(false); // Закрытие формы
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
      setTasks(prev => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteTask = async id => {
    setTasks(prev => ({ ...prev, loading: true }));
    try {
      await deleteTask(id);
      setTasks(prev => ({
        ...prev,
        list: prev.list.filter(task => task.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
      setTasks(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setTasks(prev => ({ ...prev, loading: true }));
      try {
        const response = await getTasks();
        console.log('Fetched tasks:', response); // Для отладки
        setTasks(prev => ({
          ...prev,
          list: response || [],
          loading: false,
        }));
      } catch (error) {
        console.error('Ошибка при получении задач:', error);
        setTasks(prev => ({ ...prev, loading: false }));
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <List>
        {tasks.loading ? (
          <Typography
            variant='body1'
            sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}
          >
            Загрузка...
          </Typography>
        ) : tasks.list.length === 0 ? (
          <>
            <Typography
              variant='body1'
              sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}
            >
              Задач нет.
            </Typography>
            <Button
              onClick={() => setIsFormOpen(true)} // Открытие формы
              variant='outlined'
              sx={{ display: 'block', margin: '0 auto' }}
            >
              +
            </Button>
          </>
        ) : (
          <>
            {tasks.list.map(({ title, description, active, id }) => (
              <ListItem key={id} sx={{ borderBottom: '1px solid #eee' }}>
                <ListItemText primary={title} secondary={description || ''} />
                <ListItemText
                  primary={active}
                  secondary={active ? 'статус: активно' : 'статус: не активно'}
                />
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => handleDeleteTask(id)} // Передача id напрямую
                  sx={{ ml: 2 }}
                >
                  Удалить
                </Button>
              </ListItem>
            ))}
            <Button
              onClick={() => setIsFormOpen(true)} // Открытие формы
              variant='outlined'
              sx={{ display: 'block', margin: '0 auto', mt: 2 }}
            >
              +
            </Button>
          </>
        )}

        {/* Форма, выровненная по центру */}
        {isFormOpen && (
          <Paper
            elevation={6}
            sx={{
              padding: { xs: 3, sm: 5 },
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              width: { xs: '100%', sm: '400px' },
              maxWidth: '450px',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}
          >
            <Typography
              variant='h5'
              component='h1'
              gutterBottom
              sx={{ marginBottom: 2, color: 'primary.main' }}
            >
              Новая задача
            </Typography>
            <TextField
              label='title'
              variant='outlined'
              fullWidth
              name='title'
              value={taskInput.title}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.light',
                },
              }}
            />
            <TextField
              label='description'
              variant='outlined'
              fullWidth
              name='description'
              value={taskInput.description}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.light',
                },
              }}
            />
            <Button
              variant='contained'
              color='primary'
              fullWidth
              size='large'
              sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
              onClick={handleCreateTask}
            >
              Добавить задачу
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => setIsFormOpen(false)} // Закрытие формы
              sx={{ mt: 1 }}
            >
              Отмена
            </Button>
          </Paper>
        )}
      </List>
    </>
  );
};

export default TaskTodoList;
