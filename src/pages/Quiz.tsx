import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizFromId } from "../firebase";
import { IQuiz } from '../types'

type stateParams = [
  IQuiz,
  any,
]

const initialQuiz:IQuiz = {
  started: false,
  finished: false,
  currentQuestion: 0,
}

function Quiz() {
  const { id } = useParams()
  const [ quiz, setQuiz ]:stateParams = useState(initialQuiz)

  const { finished, started, info, statistics } = quiz

  console.log(quiz)

  useEffect(() => {
    id && getQuizFromId(id)
    .then(data => {
      setQuiz((prev:any) => ({...prev, ...data}))
    })
  }, [])

  return (
    <div className="main__content">
      {id 
      ? <div>
        <h2 className='text title'> {info?.name} </h2>
      </div>
      : 'Выбери тест'}
    </div>
  )
}

export default Quiz;
