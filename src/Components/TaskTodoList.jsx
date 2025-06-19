import React, { useEffect, useContext } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Checkbox,
  Button,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getTasks } from '../Services/taskService';
import { ContextTaskList } from '../context/contextApp';

const TaskTodoList = () => {
  const {
    tasksList,
    initializationTask,
    handleInputChange,
    handleCreateTask,
    handleDeleteTask,
    handleChangeCheckBox,
    formOpen,
    formClose,
    dispatch,
  } = useContext(ContextTaskList);

  const { tasks, loading, form } = tasksList;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        initializationTask(response);
      } catch (error) {
        dispatch({ type: 'TASK_LIST_INITILIAZATHION_FAILURE' });
        console.error('Ошибка при получении задач:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      <List>
        {loading ? (
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
              onClick={formOpen} // Открытие формы
              variant='outlined'
              sx={{ display: 'block', margin: '0 auto' }}
            >
              +
            </Button>
          </>
        ) : (
          <>
            {tasks.list.map(
              ({ title, description, active, id, created_at, checked }) => (
                <ListItem key={id} sx={{ borderBottom: '1px solid #eee' }}>
                  <ListItemText
                    primary={checked ? <s>{title}</s> : title}
                    secondary={checked ? <s>{description}</s> : description}
                    sx={{ width: '300px' }}
                  />

                  <ListItemText
                    primary={active}
                    secondary={
                      active ? 'статус: активно' : 'статус: не активно'
                    }
                    sx={{ width: '300px' }}
                  />

                  <ListItemText primary={created_at} sx={{ width: '300px' }} />

                  <Checkbox
                    color='success'
                    checked={checked}
                    onChange={() => handleChangeCheckBox(id)}
                  />

                  <IconButton
                    aria-label='delete'
                    size='large'
                    onClick={() => handleDeleteTask(id)}
                    color='error'
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              )
            )}
            <Button
              onClick={formOpen} // Открытие формы
              variant='outlined'
              sx={{ display: 'block', margin: '0 auto', mt: 2 }}
            >
              +
            </Button>
          </>
        )}

        {/* Форма, выровненная по центру */}
        {form.status === 'show' && (
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
              value={form.field.title}
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
              value={form.field.description}
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
              onClick={formClose} // Закрытие формы
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
