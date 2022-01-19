import React from 'react'

import { IoListOutline, IoPlayOutline, IoHeartOutline } from 'react-icons/io5'

import { quizData } from '../'

interface ListItemProps {
  quizData: quizData
}

const QuizListItem: React.FC<ListItemProps> = ({quizData}) => {
  const {createdAt, info, statistics} = quizData

  const getText = (num: number, wordArray: string[]):string => {
    const decNum = num % 100
    const digit = num % 10

    if (decNum >= 11 && decNum <= 19) return wordArray[2]

    if (digit === 1) return wordArray[0]
    if (digit >= 2 && digit <= 4) return wordArray[1]
    if (digit >= 5 && digit <= 9 || digit === 0) return wordArray[2]

    return 'Ошибка'
  }

  const playedText = getText(statistics.played, ['раз', 'раза', 'раз'])
  const numQuestionsText = getText(statistics.numQuestions, ['вопрос', 'вопроса', 'вопросов'])

  return (
    <li className='quizListItem'>
      <p className='quizListItem__title'>{info.name}</p>
      <div className='quizListItem-info'>
        <p className='quizListItem-info__item'> <IoListOutline className='quizListItem-info__item--icon' /> {statistics.numQuestions} {numQuestionsText}</p>
        <p className='quizListItem-info__item'> <IoPlayOutline className='quizListItem-info__item--icon' /> {statistics.played} {playedText} пройдено</p>
        <p className='quizListItem-info__item'> <IoHeartOutline className='quizListItem-info__item--icon' /> {statistics.likes} </p>
      </div>
      <div>
        <button> <IoHeartOutline className='quizListItem-info__item--icon' /> Нравится</button>
      </div>
    </li>
  )
}

export default QuizListItem
