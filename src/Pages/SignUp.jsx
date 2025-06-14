import { Box, TextField, Button, Paper, Typography } from '@mui/material';

const SignUp = () => {
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
        <TextField label={'first name'} fullWidth />
        <TextField label={'last name'} fullWidth />
        <TextField label={'email'} fullWidth />
        <TextField label={'password'} type='password' fullWidth />{' '}
        <TextField label={'retry password'} type='password' fullWidth />{' '}
        <Button
          variant='contained'
          color='primary'
          fullWidth
          size='large'
          sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
        >
          Зарегистрироваться
        </Button>
      </Paper>
    </Box>
  );
};

export default SignUp;
