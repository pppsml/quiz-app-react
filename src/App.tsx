import React from 'react';

import { IoListOutline, IoConstructOutline } from 'react-icons/io5'
import { Routes, Route } from 'react-router-dom';

import { Navbar } from './components';
import Constructor from './pages/Constructor';
import QuizList from './pages/QuizList';

import './scss/app.scss'

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
  return (
    <div className='page__wrapper'>
      <Navbar paths={paths} />
      <Routes>
        <Route path='/' element={<QuizList />} />
        <Route path='/constructor' element={<Constructor />} />
      </Routes>
    </div>
  );
}

export default App;
