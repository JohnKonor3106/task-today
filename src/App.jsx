import React from 'react';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Bar from './Components/Bar';
import SignUp from './Pages/SignUp';
import TaskTodoList from './Components/TaskTodoList';
import { BrowserRouter, Routes, Route } from 'react-router';
import ProviderTaskLogin from './Providers/ProviderTaskLogin';

function App() {
  return (
    <BrowserRouter>
      <ProviderTaskLogin>
        <Routes>
          <Route
            path='/'
            element={
              <Home>
                <Bar />
                <TaskTodoList />
              </Home>
            }
          />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
        </Routes>
      </ProviderTaskLogin>
    </BrowserRouter>
  );
}

export default App;
