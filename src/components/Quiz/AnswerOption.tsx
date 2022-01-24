import React from 'react';
import { IAnswerState } from '../../types';

interface AnswerOptProps {
  className?: string,
  answerClick: (id:number) => void,
  text: string,
  id: number,
  answerState: IAnswerState | null,
}

const AnswerOption = ({ className, text, answerClick, id, answerState}:AnswerOptProps) => {
  const onOptionClickHandler = () => {
    answerClick(id)
  }

  return <li 
    id={id.toString()} 
    onClick={onOptionClickHandler} 
    className={`answerOption ${className ? className : ''} ${answerState ? answerState[id] : ''}`}
  >
    {text}
  </li>;
}

export default AnswerOption;
