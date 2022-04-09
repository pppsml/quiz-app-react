import React from 'react';

import { Button } from '..';
import { IQuizInfo, IUserAnswers } from '../../types';

import { IoCheckmarkOutline, IoCloseOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom';


interface FinishedQuizProps {
  score: number,
  numQuestions: number,
  info: IQuizInfo,
  userAnswers: IUserAnswers,
  retryQuiz: () => void,
}

const FinishedQuiz:React.FC<FinishedQuizProps> = ({score, numQuestions, info, userAnswers, retryQuiz}) => {
  return (
    <div className='quizInfo__wrapper'>
      <div className='quizInfo-item'>
        <p className='text'>
          Правильных ответов: {score}\{numQuestions}
        </p>
        <ul>
          {
            Object.keys(userAnswers).map((num:any, index) => (
              <div key={index} className={`finishedQuiz__question ${userAnswers[num] ? 'correct' : 'error'} text tal`}>
                <span>{index + 1}. {info.questions[num].text}</span>
                {userAnswers[num] ? <IoCheckmarkOutline className='icon' /> : <IoCloseOutline className='icon' />}
              </div>
            ))
          }
        </ul>
        <div className='buttonContainer'>
          <Button onClick={retryQuiz}>Пройти тест снова</Button>
          <Link to='/' className='link'>
            <Button outline>К списку тестов</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FinishedQuiz;
