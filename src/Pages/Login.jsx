import { Box, TextField, Button, Typography, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ContextTaskLogin } from '../context/contextApp';

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();

  const { stateSignIn, handleSubmitLogin, dispatch } =
    useContext(ContextTaskLogin);

  const onSumbitForm = async data => {
    dispatch({ type: 'CLEAR_GLOBAL_ERROR' });

    try {
      await handleSubmitLogin(data.email, data.password);
      reset();
    } catch (err) {
      if (
        err.message === 'Invalid login credentials' ||
        err.message === 'Email not confirmed'
      ) {
        setError('email', {
          type: 'manual',
          message: 'Неверный email или пароль',
        });
        setError('password', {
          type: 'manual',
          message: 'Неверный email или пароль',
        });
      }
      console.error('Ошибка входа в компоненте Login:', err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right bottom, #89f7fe, #66a6ff)',
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 3, sm: 5 },
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3, // Этот gap относится к прямым потомкам Paper: Typography и form
          width: { xs: '100%', sm: '400px' },
          maxWidth: '450px',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant='h5'
          component='h1'
          gutterBottom
          sx={{ marginBottom: 2, color: 'primary.main' }}
        >
          Вход
        </Typography>
        <form onSubmit={handleSubmit(onSumbitForm)} style={{ width: '100%' }}>
          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            type='email'
            margin='normal' // <-- ДОБАВЛЕНО ЗДЕСЬ
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.light',
              },
            }}
            {...register('email', {
              required: 'Email не указан',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Неверный формат Email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          <TextField
            label='Пароль'
            variant='outlined'
            fullWidth
            type='password'
            margin='normal' // <-- ДОБАВЛЕНО ЗДЕСЬ
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.light',
              },
            }}
            {...register('password', {
              required: 'Пароль не указан',
              minLength: {
                value: 6,
                message: 'Пароль должен быть не менее 6 символов',
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />
          <Link
            href='#'
            underline='none'
            component={'button'}
            onClick={() => navigate('/SignUp')}
            sx={{ mt: 1, mb: 2 }} // <-- Небольшие отступы для ссылки
          >
            Зарегистрироваться
          </Link>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            fullWidth
            size='large'
            sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
            disabled={isSubmitting || stateSignIn.isLoading}
          >
            {isSubmitting || stateSignIn.isLoading
              ? 'Идёт авторизация...'
              : 'Войти'}
          </Button>

          {stateSignIn.globalError && (
            <Typography color='error' sx={{ mt: 2 }}>
              {stateSignIn.globalError}
            </Typography>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
