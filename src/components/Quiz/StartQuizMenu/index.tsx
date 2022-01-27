import React from 'react';

import { getDateFromTimestamp, getText } from '../../../functions';
import { IQuestion, IQuizInfo, IQuizStatistics } from '../../../types'
import { Button } from '../..';
import { IoPlay } from 'react-icons/io5'
import { Link } from 'react-router-dom';

import LoadingStartMenu from './LoadingStartMenu';

interface StartMenuProps {
  createdAt: number,
  isLoaded: boolean,
  info: IQuizInfo,
  statistics: IQuizStatistics,
  startQuiz: () => void,
}

const StartMenu:React.FC<StartMenuProps> = ({createdAt, isLoaded, info, statistics, startQuiz}) => {
  if (!isLoaded) {
    return <LoadingStartMenu />
  }

  const createdAtDate = getDateFromTimestamp(createdAt, 'ru')
  const likedText = getText(statistics.likes, ['раз', 'раза', 'раз'])
  const playedText = getText(statistics.played, ['раз', 'раза', 'раз'])
  const fewQuestions:IQuestion[] = [] 

  for (let i = 0; i < 2; i++) {
    fewQuestions.push(info.questions[i])
  }

  // todo createdAt переделать в дату

  return (
    <div className='quizInfo__wrapper' >
      <div className='quizInfo-item tal'>
        <p className='text'>
          Несколько вопросов из этого теста:
        </p>
        <div>
          {
            fewQuestions.map((obj, idx) => (
              <div key={obj.text + idx} className='questionExample'>
                <p>{idx + 1}. {obj.text}</p>
                <ul className='questionExample__option--list'>
                  {obj.options.map(option => <li key={option.text + option.id} >{option.id}. {option.text}</li>)}
                </ul>
              </div>
            ))
          }
        </div>
      </div>
      <div className='quizInfo-item text tar'>
        <p>Создан: {createdAtDate}</p>
        <p>Количество вопросов: {statistics?.numQuestions}</p>
        <p>Пройден: {statistics.played} {playedText}</p>
        <p>Понравилось: {statistics.likes} {likedText}</p>
      </div>
      <div className='buttonContainer'>
        <Button onClick={startQuiz}>
          <IoPlay className='icon' />
          Начать тест
        </Button>
        <Link className='link' to='/'>
          <Button outline>
            Вернуться к выбору теста
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default StartMenu;
