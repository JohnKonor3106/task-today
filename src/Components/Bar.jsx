import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { ContextTodoLogin } from '../Providers/ProviderTaskLogin';
import { useContext } from 'react';

const Bar = () => {
  const theme = useTheme();
  const { handleClickLogin } = useContext(ContextTodoLogin);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{
          backgroundColor: theme.palette.primary.dark,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          background: 'linear-gradient(to right, #42bbe0 0%, #2575fc 100%)',
        }}
      >
        <Toolbar>
          <IconButton
            size='large' // Увеличиваем размер иконки
            edge='start'
            color='inherit' // Цвет иконки унаследуется от цвета AppBar'а
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h5' // Делаем заголовок чуть крупнее
            component='div'
            sx={{ flexGrow: 1, fontWeight: 'bold' }} // Делаем текст жирным
          >
            Task Today
          </Typography>
          <Button
            color='inherit' // Цвет текста кнопки унаследуется
            variant='outlined' // Делаем кнопку контурной
            onClick={handleClickLogin}
            sx={{
              borderColor: 'white', // Белая рамка для контраста
              color: 'white', // Белый текст
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Легкая подсветка при наведении
                borderColor: 'white',
              },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Bar;
