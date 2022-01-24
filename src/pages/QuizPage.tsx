import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Quiz, StartMenu } from "../components";
import { IQuiz, IQuizzesState } from '../types'

const initialQuiz:IQuiz = {
  createdAt: 0,
  info: {
    name: 'empty',
    questions: [{
      text: 'empty',
      options: [{id: 1, text: 'empty'}, {id: 2, text: 'empty'}, {id: 3, text: 'empty'}],
      correct: 1,
    }],
  },
  statistics: {
    likes: 0,
    numQuestions: 1,
    played: 0,
  },
  _id: 'a0',
  started: false,
  finished: false,
  currentQuestion: 0,
  answerState: null,
  score: 0
}

const QuizPage:React.FC = () => {
  const { id } = useParams()
  const [ quiz, setQuiz ] = useState(initialQuiz)

  const quizData = useSelector(({quizzes}:IQuizzesState) => {
    if (id) return quizzes.items[id]
  })
  const isLoaded = useSelector(({quizzes}:IQuizzesState) => quizzes.isLoaded)

  useEffect(() => {
    setQuiz((prev: any) => ({...prev, ...quizData}))
  }, [quizData])

    console.log(quiz)
  // ! эти параметры могут быть undefined
  const { finished, started, info, statistics, score, currentQuestion, answerState, createdAt } = quiz

  const getAnswer = (answerId:number) => {
    if (!quiz.answerState) {
      const isCorrect = answerId === info?.questions[currentQuestion].correct
      setQuiz(prev => ({
        ...prev,
        answerState: {
          [answerId]: isCorrect ? 'correct' : 'error'
        },
        score: isCorrect ? prev.score + 1 : prev.score
      }))
      nextQuestion()
    }
  }

  const nextQuestion = ():void => {
    const timeout = setTimeout(() => {
      setQuiz(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answerState: null
      }))
      clearTimeout(timeout)
    }, 1.5e3)
  }

  // TODO сделать загрузку, старт, и финиш теста
  return (
    <div className="main__content">
      {id 
      ? 
        started 
        ? <div>
            <h2 className='text title'>{info?.name}</h2>
            <Quiz 
              currentQuestion={currentQuestion + 1} 
              question={info.questions[currentQuestion]} 
              numQuestions={statistics.numQuestions}
              getAnswer={getAnswer}
              answerState={answerState}
              />
          </div>
          : <StartMenu 
          isLoaded={isLoaded}
          createdAt={createdAt}
          info={info}
          statistics={statistics}
          />
      : 'Выбери тест'}
    </div>
  )
}

export default QuizPage;
