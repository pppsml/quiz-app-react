import React, { useEffect } from 'react';

import { IoListOutline, IoConstructOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { fetchQuizzes } from './redux/actions/quizzes'

import { Navbar } from './components';
import { QuizList, Constructor, QuizPage } from './pages';

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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [])


  return (
    <div className='page__wrapper'>
      <Navbar paths={paths} />
      <Routes>
        <Route path='/' element={<QuizList />} />
        <Route path='/constructor' element={<Constructor />} />
        <Route path='/quiz' element={<QuizPage />} >
          <Route path='/quiz/:id' element={<QuizPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
