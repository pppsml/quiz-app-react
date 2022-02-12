import React, { useState, useEffect } from 'react';

import { IQuestion, IAnswerState, ICorrectAnswers } from '../../types'
import AnswerOption from './AnswerOption'
import { Button, Input } from '..';

interface QuizProps {
  currentQuestion: number,
  question?: IQuestion,
  numQuestions?: number,
  answerState: IAnswerState | null,
  getAnswer: (userCorrectAnswer: ICorrectAnswers) => void,
}

const Quiz:React.FC<QuizProps> = ({currentQuestion, question, numQuestions, answerState, getAnswer}) => {
  const [error, setError] = useState('')
  const [ userCorrectAnswer, setUserCorrectAnswer ]:[ICorrectAnswers, Function] = useState({})

  useEffect(() => {
    setUserCorrectAnswer({})
  }, [currentQuestion])

  const quizInputChangeHandler = (event:React.ChangeEvent<HTMLInputElement>):void => {
    if (answerState) return
    const answers:ICorrectAnswers = {}

    document.querySelectorAll('.input[name="answerOption"]:checked')
    .forEach((input:any) => {
      answers[input.value] = true
    })

    setUserCorrectAnswer(answers)
  }


  const checkAnswersClickHandler = () => {
    const answerEls = document.querySelectorAll('.input[name="answerOption"]:checked')

    if (question!.type === 'multiple' && answerEls.length < 2) {
      setError('Укажите несколько правильных вариантов ответа')
      return
    }

    if (question!.type === 'single' && answerEls.length === 0) {
      setError('Укажите правильный вариант ответа')
      return
    }

    setError('')
    getAnswer(userCorrectAnswer)
  }


  const renderAnswerOptions = () => {
    return question!.options.map(({text, id}) => (
      <div className='answerOption__wrapper' key={text + id}>
        <Input 
          type={question!.type === 'single' ? 'radio' : 'checkbox'} 
          name='answerOption' 
          checked={userCorrectAnswer[id] || false}
          value={id.toString()} 
          id={text + id} 
          onChange={quizInputChangeHandler}
        />
        <label className='answerOption__label' htmlFor={text + id}>
          <AnswerOption 
            text={text} id={id} 
            key={text + id}
            answerState={answerState}
          />
        </label>
      </div>
    ))
  }


  return (
  <>
    <div className='text tal'>
      {currentQuestion}/{numQuestions}. {question?.text}
    </div>
    <ul className='optionList'>
      {question!.type === 'multiple' && <p className='text tal'>**Выберите несколько правильных ответов</p>}
      {renderAnswerOptions()}
      {error && <p className='formErrorMessage'>{error}</p>}
      <Button onClick={checkAnswersClickHandler} disabled={!!answerState}>Проверить правильность</Button>
    </ul>
  </>
  )
}

export default Quiz;
