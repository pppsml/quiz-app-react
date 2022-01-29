import React, { useState } from 'react'

import { QuizConstructorItem } from '../components'
import { IAnswerOption, IQuestion } from '../types'

interface IConstructorState {
  questions: IQuestion[],
  currentQuestion : number,
}

const InitialState:IConstructorState = {
  questions: [],
  currentQuestion: 0,
}

const Constructor:React.FC = () => {

  const [ newQuiz, setNewQuiz ] = useState(InitialState)

  const createQuestion = ({text, options, correct}:IQuestion):void => {
    console.log("Вопрос", text)
    console.log("ответы", options)
    console.log("правильный", correct)
  }

  return (
    <div className='main__content'>
      <h1 className='text title' >Создание теста</h1>
      <div className="quizConstructor">
        <QuizConstructorItem currentQuestion={newQuiz.currentQuestion + 1} />
      </div>
    </div>
  )
}

export default Constructor
