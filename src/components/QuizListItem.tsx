import React from 'react'

import { IoListOutline, IoPlayOutline, IoHeartOutline, IoPlay } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import { getText } from './functions'
import { IQuizData } from '../types'
import { Button } from './'

interface ListItemProps {
  quizData: IQuizData,
  likeQuiz: (id: string) => void,
}

const QuizListItem: React.FC<ListItemProps> = ({quizData, likeQuiz}) => {
  const {createdAt, info, statistics, _id} = quizData

  // TODO createdAt

  const playedText = getText(statistics.played, ['раз', 'раза', 'раз'])
  const numQuestionsText = getText(statistics.numQuestions, ['вопрос', 'вопроса', 'вопросов'])

  const onLikeQuiz = () => {
    likeQuiz(_id)
  }

  return (
    <li className='quizListItem'>
      <p className='quizListItem__title'>{info.name}</p>
      <div className='quizListItem-info'>
        <p className='quizListItem-info__item'> <IoListOutline className='icon' /> {statistics.numQuestions} {numQuestionsText}</p>
        <p className='quizListItem-info__item'> <IoPlayOutline className='icon' /> {statistics.played} {playedText} пройдено</p>
        <p className='quizListItem-info__item'> <IoHeartOutline className='icon' /> {statistics.likes} </p>
      </div>
      <div className='quizListItem__bottom'>
        <div></div>
        <div className='buttonContainer'>
        <Button onClick={onLikeQuiz} outline title='Поставить отметку "Нравится"'> <IoHeartOutline className='icon' /> Нравится</Button>
        <Link className='link' to={`/quiz/${_id}`} >
          <Button title='Пройти тест'>
            <IoPlay className='icon' />
          </Button>
        </Link>
        </div>
      </div>
    </li>
  )
}

export default QuizListItem
