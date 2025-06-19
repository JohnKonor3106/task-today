import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ContextTaskSignUp } from '../context/contextApp';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    reset,
  } = useForm();

  const { handleSignUp, stateSingUpUser } = useContext(ContextTaskSignUp);
  const navigator = useNavigate();
  const password = watch('password', '');

  const onSubmitForm = async data => {
    try {
      await handleSignUp(data);
      reset(); // Пока оставь эту строку. Если все остальное заработает, потом попробуешь закомментировать.
      navigator('/');
    } catch (globalErr) {
      // ЭТОТ ЛОГ КРАЙНЕ ВАЖЕН: Он покажет ТОЧНО, что приходит в ошибке
      console.error('*** ОШИБКА В onSubmitForm (SignUp.js) ***:', globalErr);
      console.error('*** globalErr.code ***:', globalErr.code);
      console.error('*** globalErr.message ***:', globalErr.message);

      // Убедись, что ты проверяешь именно эти значения
      if (
        globalErr.code === 'email_exists' ||
        globalErr.message === 'Email address already exists in the system.'
      ) {
        setError('email', {
          type: 'manual',
          message: 'Этот email уже зарегистрирован',
        });
        console.log('setError для email ВЫЗВАН.');
      } else {
        console.log(
          'Ошибка НЕ email_exists, обрабатывается как глобальная или другая.'
        );
      }
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
          gap: 3,
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
          Регистрация
        </Typography>

        <form onSubmit={handleSubmit(onSubmitForm)} style={{ width: '100%' }}>
          <TextField
            label={'Email'}
            fullWidth
            margin='normal'
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Неверный формат Email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          <TextField
            label={'Пароль'}
            type='password'
            fullWidth
            margin='normal'
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: {
                value: 6,
                message: 'Пароль должен быть не менее 6 символов',
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
          />

          <TextField
            label={'Повторите пароль'}
            type='password'
            fullWidth
            margin='normal'
            {...register('confirmPassword', {
              required: 'Повтор пароля обязателен',
              validate: value => value === password || 'Пароли не совпадают',
            })}
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword ? errors.confirmPassword.message : ''
            }
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            size='large'
            sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
            disabled={isSubmitting || stateSingUpUser.isSigningUp}
          >
            {isSubmitting || stateSingUpUser.isSigningUp
              ? 'Отправка...'
              : 'Зарегистрироваться'}
          </Button>

          {stateSingUpUser.globalError && (
            <Typography color='error' sx={{ mt: 2 }}>
              {stateSingUpUser.globalError}
            </Typography>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
