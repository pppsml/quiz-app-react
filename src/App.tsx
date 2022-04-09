import React from 'react';

import { IoListOutline, IoConstructOutline } from 'react-icons/io5'

import { Routes, Route } from 'react-router-dom';

import { createTestData, deleteDocs, getQuizFromId } from './firebase';

import { Navbar } from './components';
import { QuizList, Constructor, QuizPage } from './pages';

import './scss/app.scss';
import { useSelector } from 'react-redux';

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
  const items = useSelector(({quizzes}:any) => quizzes.items)


  const deleteDocs1 = () => {
    deleteDocs(items.map((item:any) => item._id))
  }



  (window as any).getQuizFromId = getQuizFromId;
  (window as any).createTestData = createTestData;
  (window as any).deleteDocs = deleteDocs1;

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
