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
      inlineLabel: true,
      validation: {
        required: true,
      },
    })
  }

  return inputControlsArr
}

const QuizConstructorItem:React.FC<QuizConstructorItemProps> = ({currentQuestion}) => {
  const [ answersInputsCount, setAnswersInputsCount ] = useState(3)

  const InitialFormControls:IFormControls = {
    question: {
      inputs: [
        {
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
      ]
    },
    answerOptions: {
      inputs: createAnswerInputControl(answersInputsCount),
      title: 'Варианты ответов:',
    },
    correctAnswer: {
      inputs: [
        {
          value: '',
          type: 'number',
          labelText: `Номер правильного варианта ответа`,
          valid: false,
          touched: false,
          validation: {
            required: true,
            pattern: `[1-${answersInputsCount}]`
          }
        },
      ]
    },
  }

  const [ formControls, setFormControls ] = useState(InitialFormControls)

  const incAnswerInputsCountClickHandler = ():void => {
    setAnswersInputsCount(prev => prev + 1)
  }

  const decAnswerInputsCountClickHandler = ():void => {
    setAnswersInputsCount(prev => prev - 1)
  }

  (window as any).incAnswers = incAnswerInputsCountClickHandler;
  (window as any).decAnswers = decAnswerInputsCountClickHandler;

  const onFormSubmit = () => {
    console.log('submit')
  }

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: string, index:number):void => {
    setFormControls(

    (prev) => {
      const newFormControls = {...prev}
      const newControls = {...newFormControls[controlName]}
      const newCurrInputControls = {...newControls.inputs[index]}

      newCurrInputControls.value = event.target.value

      newControls.inputs[index] = newCurrInputControls
      newFormControls[controlName] = newControls

      return newFormControls
    }
    )
  } 

  console.log(answersInputsCount)

  return (
    <form>
      {
        Object.keys(formControls).map(controlName => {
          if (Array.isArray(formControls[controlName].inputs)) {
            return formControls[controlName].inputs.map((controls:any, index:number) => {
              const key = `${controls.labelText}}`

              return <React.Fragment key={index}>
                {formControls[controlName].title 
                && index === 0 
                && <p className='text tal'>{formControls[controlName].title}</p>}
                <Input
                  key={key}
                  {...controls}
                  onChange={(event) => onInputChangeHandler(event, controlName, index)}
                />
              </React.Fragment>
            })
          }
        })
      }
    </form>
  )
}

export default QuizConstructorItem;
