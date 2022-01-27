import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchQuizzes } from '../redux/actions/quizzes'
import { Button, QuizListItem } from '../components'
import { IoCloudDownloadOutline } from 'react-icons/io5'

import { IQuizzesState } from '../types'

const QuizList:React.FC = () => {
  const dispatch = useDispatch()

  const { items } = useSelector(({quizzes}:IQuizzesState) => quizzes)
  const lastQuiz = useSelector(({lastQuiz}:IQuizzesState) => lastQuiz.item)
  const hasMorePages = useSelector(({lastQuiz}:IQuizzesState) => lastQuiz.hasMore)


  const getMoreQuizzes = () => {
    if (hasMorePages) dispatch(fetchQuizzes(lastQuiz))
  }
  
  const likeQuiz = (id: string):void => {
    // todo если не авторизован => страница авторизации иначе лайкнуть
    console.log('Liked quiz with id: ', id)
  }


  useEffect(() => {
    if (!lastQuiz) {
      dispatch(fetchQuizzes())
    }
  }, [])

  return (
    <div className='main__content'>
      <h1 className='title'>Список тестов</h1>
      <ul className='quizList'>
        {
          items &&
          items.map((item:any) => (
            <QuizListItem likeQuiz={likeQuiz} quizData={item} key={item._id} />
          ))
        }
      </ul>
      {
        hasMorePages && 
        <Button onClick={getMoreQuizzes} style={{margin: '10px auto 0'}} >
          <IoCloudDownloadOutline className='icon'  />
          <span>Load more quizzes</span>
        </Button>
      }
    </div>
  )
}

export default QuizList
