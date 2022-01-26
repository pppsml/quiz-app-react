import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchQuizzes } from '../redux/actions/quizzes'
import { QuizListItem } from '../components'

import { IQuizzesState } from '../types'

const QuizList:React.FC = () => {
  const dispatch = useDispatch()

  const { items } = useSelector(({quizzes}:IQuizzesState) => quizzes)
  const lastQuiz = useSelector((state:any) => state.lastQuiz)

  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [])

  const getMoreQuizzes = () => {
    dispatch(fetchQuizzes(lastQuiz))
  }
  
  const likeQuiz = (id: string):void => {
    // todo если не авторизован => страница авторизации иначе лайкнуть
    console.log('Liked quiz with id: ', id)
  }

  // todo сделать отдельный объект в редаксе 
	// todo   с состоянием загрузки теста,
	// todo   и объект
	// todo     [номер страницы]: /* loaded state */ true | false

  //todo (скорее всего так и сделаю) опционально: 
  //todo можно сделать дополнительно компонент страницы чтобы он отрисовывал списки тестов, мб так легче будет делать загрузку отдельных страниц

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
      <button onClick={getMoreQuizzes}>more</button>
    </div>
  )
}

export default QuizList
