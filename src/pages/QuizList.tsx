import React from 'react'
import { useSelector } from 'react-redux'

import { QuizListItem } from '../components'

import { IQuizzesState } from '../types'

const QuizList:React.FC = () => {
  const { items } = useSelector(({quizzes}:IQuizzesState) => quizzes)
  
  const likeQuiz = (id: string):void => {
    // todo если не авторизован => страница авторизации
    console.log('Liked quiz with id: ', id)
  }

  return (
    <div className='main__content'>
      <h1 className='title'>Список тестов</h1>
      <ul className='quizList'>
        {
          items &&
          Object.keys(items).map((id:string) => (
            <QuizListItem likeQuiz={likeQuiz} quizData={items[id]} key={items[id]._id} />
          ))
        }
      </ul>
    </div>
  )
}

export default QuizList
