import React from 'react';
import { useState } from 'react';

import { Input } from './'

import { IFormControls, IInputControlProps } from '../types'

interface QuizConstructorItemProps {
  currentQuestion: number,
}

const createAnswerInputControl = (count: number):IInputControlProps[] => {
  const inputControlsArr:IInputControlProps[] = []

  for (let i = 0; i < count; i++) {
    inputControlsArr.push({
      value: '',
      type: 'text',
      labelText: `${i + 1}.`,
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    })
  }

  return inputControlsArr
}

const QuizConstructorItem:React.FC<QuizConstructorItemProps> = ({currentQuestion}) => {
  const [ answersInputsCount, setAnswersInputsCount ] = useState(3)

  const formControls:IFormControls = {
    question: {
      value: '',
      type: 'text',
      labelText: `Вопрос №${currentQuestion}`,
      placeholder: 'Введите текст вопроса',
      valid: false,
      touched: false,
      validation: {
        required: true,
      }
    },
    answerOptions: createAnswerInputControl(answersInputsCount),
    correctAnswer: {
      value: '',
      type: 'text',
      labelText: `Номер правильного варианта ответа`,
      valid: false,
      touched: false,
      validation: {
        required: true,
        pattern: `[1-${answersInputsCount}]`
      }
    }
  }

  const incAnswerInputsCountClickHandler = ():void => {
    setAnswersInputsCount(prev => prev + 1)
  }

  const decAnswerInputsCountClickHandler = ():void => {
    setAnswersInputsCount(prev => prev - 1)
  }

  const onFormSubmit = () => {
    console.log('submit')
  }

  const onInputChangeHandler = (event: React.ChangeEvent, controlName: string, index?:number):void => {
    console.log(event.target)
  } 

  console.log(formControls.answerOptions)

  return (
    <form>
      <Input 
        labelText={`Вопрос №${currentQuestion}`}
        placeholder='Введите текст вопроса'
        minLength={5}
        errorMessage='TEST'
      />
      <p className='text tal'>Варианты ответов:</p>
      {
        formControls.answerOptions.map((controls:IInputControlProps, index:number) => {
          console.log(controls)
          return <Input
            key={index}
            type={controls.type}
            value={controls.value}
            valid={controls.valid}
            touched={controls.touched}
            labelText={controls.labelText}
            shouldValidate={!!controls.validation}
            errorMessage={controls.errorMessage}
            onChange={(event) => onInputChangeHandler(event, 'answerOptions', index)}
          />
        })
      }
    </form>
  )
}

export default QuizConstructorItem;
