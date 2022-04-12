import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';

import { IoListOutline, IoConstructOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import { Navbar } from './components';
import { auth } from './firebase/firebase-auth';
import RequireAuth from './hoc/RequireAuth';
import { QuizList, Constructor, QuizPage, Login, Error404, Profile } from './pages';
import { setUser } from './redux/actions/user';

import './scss/app.scss';

export interface IPath {
  path: string,
  title: string,
  icon: React.ReactElement,
}

const paths: IPath[] = [
  {
      path: '/',
      title: 'Список тестов',
      icon: <IoListOutline />,
  },
  {
      path: '/constructor',
      title: 'Создать тест',
      icon: <IoConstructOutline />,
  },
]

const App: React.FC = () => {
  const dispatch = useDispatch()

  onAuthStateChanged(auth, (currentUser) => {
    dispatch(setUser(currentUser))
  })

  return (
    <div className='page__wrapper'>
      <Navbar paths={paths} />

      <div className='main__content'>
        <Routes>
          <Route path='/' element={<QuizList />} />

          <Route path='/constructor' element={
            <RequireAuth>
              <Constructor />
            </RequireAuth>
          } />

          <Route path='/quiz' element={<QuizPage />} >
            <Route path='/quiz/:id' element={<QuizPage />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/*' element={<Error404 />} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
