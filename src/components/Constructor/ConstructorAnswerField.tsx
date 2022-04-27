import React from 'react'
import Input from '../UI/Input'

type Props = {
  checked: boolean,
  type: 'checkbox' | 'radio',
  number: number,
  correctInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => {},
  textInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => {},
}

function ConstructorAnswerField({}: Props) {
  return (
    <div className='quizConstructor__answerOption' >
      {/* <Input
        checked={correctAnswers[index + 1] || false}
        type={questionType === 'multiple' ? 'checkbox' : 'radio'}
        className='quizConstructor__radioInput'
        id={`radio-${index + 1}`}
        name='correctAnswer'
        onChange={onCorrectInputChangeHandler}
        value={`${index + 1}`}
      />
      <Input
        {...controls}
        id={`answerOption-${index + 1}`}
        shouldValidate={!!controls.validation}
        onChange={(event) => onInputChangeHandler(event, controlName, index)}
      /> */}
    </div>
  )
}

export default ConstructorAnswerField