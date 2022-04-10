import React from 'react';

import { IoListOutline, IoConstructOutline } from 'react-icons/io5'

import { signUpWithEP } from './firebase';

import { Routes, Route } from 'react-router-dom';

import { Navbar } from './components';
import { QuizList, Constructor, QuizPage, Login } from './pages';

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

  (window as any).createUser = signUpWithEP

  return (
    <div className='page__wrapper'>
      <Navbar paths={paths} />

      <div className='main__content'>
        <Routes>
          <Route path='/' element={<QuizList />} />
          <Route path='/constructor' element={<Constructor />} />
          <Route path='/quiz' element={<QuizPage />} >
            <Route path='/quiz/:id' element={<QuizPage />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
