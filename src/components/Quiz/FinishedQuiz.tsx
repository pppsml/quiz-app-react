import React from 'react';
import { IQuizInfo } from '../../types';

interface FinishedQuizProps {
  score: number,
  numQuestions: number,
  info: IQuizInfo,
}

const FinishedQuiz:React.FC<FinishedQuizProps> = ({score, numQuestions, info}) => {
  return (
    <>
      Правильных ответов: {score}\{numQuestions}
    </>
  )
}

export default FinishedQuiz;
