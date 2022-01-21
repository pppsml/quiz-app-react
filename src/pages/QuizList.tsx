import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { QuizListItem } from '../components'

import { IQuizzesState } from '../types'
import { fetchQuizzes } from '../redux/actions/quizzes'

function QuizList() {
  const dispatch = useDispatch()
  const quizzes = useSelector(({quizzes}:IQuizzesState) => quizzes)
  console.log(quizzes)

  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [])



  const likeQuiz = (id: string):void => {
    console.log('Liked quiz with id: ', id)
  }

  return (
    <div className='main__content'>
      <h1 className='title'>Список тестов</h1>
      <ul className='quizList'>
        {
          quizzes &&
          Object.keys(quizzes).map((id:string) => (
            <QuizListItem likeQuiz={likeQuiz} quizData={quizzes[id]} key={quizzes[id]._id} />
          ))
        }
      </ul>
    </div>
  )
}

export default QuizList
