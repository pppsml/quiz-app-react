import React from 'react';
import { IAnswerState } from '../../types';

interface AnswerOptProps {
  className?: string,
  text: string,
  id: number,
  answerState: IAnswerState | null,
}

const AnswerOption: React.FC<AnswerOptProps> = ({ className, text, id, answerState}) => {
  return <li 
    id={id.toString()} 
    className={`answerOption ${className ? className : ''} ${answerState ? answerState[id] : ''}`}
  >
    {text}
  </li>;
}

export default AnswerOption;
