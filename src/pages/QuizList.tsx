import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchQuizzes, resetQuizzes, setSortIndex } from '../redux/actions/quizzes'
import { Button, QuizListItem, Select } from '../components'
import { IoCloudDownloadOutline, IoReloadSharp } from 'react-icons/io5'

import { IQuizzesState, ISortType } from '../types'

const sortItems:ISortType[] = [
  { name: 'createdDESC', type: 'createdAt', order: 'desc', path: 'createdAt', text: 'Сначала новые',},
  { name: 'createdASC', type: 'createdAt', order: 'asc', path: 'createdAt', text: 'Сначала старые',},
  { name: 'playedCountDESC', type: 'playedCount', order: 'desc', path: 'statistics/played', text: 'Пройдено больше всего раз',},
  { name: 'playedCountASC', type: 'playedCount', order: 'asc', path: 'statistics/played', text: 'Пройдено меньше всего раз',},
  { name: 'likesCountDESC', type: 'likesCount', order: 'desc', path: 'statistics/likes', text: 'Больше всего отметок "Нравится"',},
]

const QuizList:React.FC = () => {
  const dispatch = useDispatch()

  const [ isMounted, setIsMounted ]:[boolean, Function]= useState(false)

  const { items } = useSelector(({quizzes}:IQuizzesState) => quizzes)
  const [ lastQuiz, hasMorePages ]:[any | null, boolean] = useSelector(({lastQuiz}:IQuizzesState) => [lastQuiz.item, lastQuiz.hasMore])
  const quizzesIsLoading:boolean = useSelector(({quizzesIsLoading}:IQuizzesState) => quizzesIsLoading)
  const sortIndex:number = useSelector(({sortIndex}:IQuizzesState) => sortIndex)

  const getMoreQuizzes = () => {
    if (hasMorePages) dispatch(fetchQuizzes(
      sortItems[sortIndex - 1].path, 
      sortItems[sortIndex - 1].order, 
      lastQuiz
      ))
  }

  useEffect(() => {
    if (!isMounted && !lastQuiz) {
      dispatch(fetchQuizzes(      
        sortItems[sortIndex - 1].path, 
        sortItems[sortIndex - 1].order))
      setIsMounted(true)
    }
    if (isMounted) {
      refreshQuizData()
    }
  }, [ sortIndex ])

  const refreshQuizData = ():void => {
    dispatch(resetQuizzes)
    dispatch(fetchQuizzes(
      sortItems[sortIndex - 1].path, 
      sortItems[sortIndex - 1].order,
    ))
  }


  const sortTypeSelectHandler = (event:React.ChangeEvent<HTMLSelectElement>):void => {
    dispatch(setSortIndex(+event.target.value))
  }

  return (
    <div className='main__content'>
      <div className='quizListPage__title--container'>
        <h1 className='text title'>Список тестов</h1>
        <Select
          value={sortIndex}
          onChange={sortTypeSelectHandler}
          options={
            sortItems.map(({text}, index) => ({text, value: `${index + 1}`}))
          }
        />
        <Button onClick={refreshQuizData}>
          <IoReloadSharp className='icon' />
          <span>Обновить список</span>
        </Button>
      </div>
      <ul className='quizList'>
        {
          items &&
          items.map((item:any) => (
            <QuizListItem quizData={item} key={item._id} />
          ))
        }
      </ul>
      {
        hasMorePages
        && <div className='df jcc'>
          <Button onClick={getMoreQuizzes} disabled={quizzesIsLoading}>
            <IoCloudDownloadOutline className='icon' />
            <span>Загрузить еще тесты</span>
          </Button>
        </div>
      }
    </div>
  )
}

export default QuizList
