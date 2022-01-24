import React from 'react';

import { getText } from '../functions';
import { IQuestion, IQuizInfo, IQuizStatistics } from '../../types'
import { Button } from '..';
import { IoPlay } from 'react-icons/io5'

interface StartMenuProps {
  createdAt: number,
  isLoaded: boolean,
  info: IQuizInfo,
  statistics: IQuizStatistics,
}

const StartMenu = ({createdAt, isLoaded, info, statistics}:StartMenuProps) => {
  const likedText = getText(statistics?.likes, ['раз', 'раза', 'раз'])
  const playedText = getText(statistics?.played, ['раз', 'раза', 'раз'])
  const fewQuestions:IQuestion[] = [] 

  for (let i = 0; i < 1; i++) {
    fewQuestions.push(info.questions[i])
  }

  // todo createdAt переделать в дату

  return <div className='quiz__container'>
    <h2 className='text title' >{info?.name}</h2>
    <div className='quizInfo__wrapper' >
      <div className='quizInfo-item tal'>
        <p className='text'>
          Несколько вопросов из этого теста:
        </p>
        <div>
          {
            fewQuestions.map((obj, idx) => (
              <div className='questionExample'>
                <p>{idx + 1}. {obj.text}</p>
                <ul className='questionExample__option--list'>
                  {obj.options.map(option => <li>{option.id}. {option.text}</li>)}
                </ul>
              </div>
            ))
          }
        </div>
      </div>
      <div className='quizInfo-item text tar'>
        <p>Создан: {createdAt}</p>
        <p>Количество вопросов: {statistics?.numQuestions}</p>
        <p>Понравилось: {statistics?.likes} {likedText}</p>
        <p>Пройден: {statistics?.played} {playedText}</p>
      </div>
    <div className='buttonContainer jcc'>
      <Button>
        <IoPlay className='buttonIcon' />
        Начать тест
      </Button>
      <Button outline>
        Вернуться к выбору теста
      </Button>
    </div>
    </div>
  </div>;
}

export default StartMenu;
