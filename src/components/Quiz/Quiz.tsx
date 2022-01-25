import React, { useState } from 'react';

import { IQuestion, IAnswerState } from '../../types'
import AnswerOption from './AnswerOption'

interface QuizProps {
  currentQuestion: number,
  question?: IQuestion,
  numQuestions?: number,
  getAnswer: (answerId: number) => void
  answerState: IAnswerState | null
}

const Quiz:React.FC<QuizProps> = ({currentQuestion, question, numQuestions, answerState, getAnswer}) => {
  return (
  <>
    <div className='text tal'>
      {currentQuestion}/{numQuestions}. {question?.text}
    </div>
    <ul className='optionList'>
      {question?.options.map(({text, id}) => (
        <AnswerOption 
          answerClick={getAnswer} 
          text={text} id={id} 
          key={text + id} 
          answerState={answerState}
        />
      ))}
    </ul>
  </>
  )
}

export default Quiz;
