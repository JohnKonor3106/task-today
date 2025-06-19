import React from 'react';
import Login from './Pages/Login';
import Home from './Pages/Home';
import UserPage from './Pages/UserPage';
import Bar from './Components/Bar';
import SignUp from './Pages/SignUp';
import TaskTodoList from './Components/TaskTodoList';
import { BrowserRouter, Routes, Route } from 'react-router';
import ProviderTaskLogin from './Providers/ProviderTaskLogin';
import ProviderTaskList from './Providers/ProviderTaskList';
import ProviderTaskSignUp from './Providers/ProviderTaskSignUp';

function App() {
  return (
    <BrowserRouter>
      <ProviderTaskSignUp>
        <ProviderTaskLogin>
          <ProviderTaskList>
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
              <Route path='/UserPage' element={<UserPage />}></Route>
            </Routes>
          </ProviderTaskList>
        </ProviderTaskLogin>
      </ProviderTaskSignUp>
    </BrowserRouter>
  );
}

export default App;
