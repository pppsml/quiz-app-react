import React from 'react'

import { QuizListItem } from '../components'

import { quizzes } from '../'

function QuizList() {
  const idQuizzes = Object.keys(quizzes)

  return (
    <div className='main__content'>
      <h1 className='title'>Список тестов</h1>
      <ul className='quizList'>
        {
          idQuizzes.map((obj:string) => (
            <QuizListItem quizData={quizzes[obj]} key={quizzes[obj]._id} />
          ))
        }
      </ul>
    </div>
  )
}

export default QuizList
