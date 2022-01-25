import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { FinishedQuiz, Quiz, StartMenu } from "../components";
import { IQuiz, IQuizzesState } from '../types'

const initQuiz = [
  {
    text: 'empty',
    options: [{id: 1, text: 'empty'}, {id: 2, text: 'empty'}, {id: 3, text: 'empty'}],
    correct: 1,
  },
  {
    text: 'empty',
    options: [{id: 1, text: 'empty'}, {id: 2, text: 'empty'}, {id: 3, text: 'empty'}],
    correct: 1,
  },
]

const initialQuiz:IQuiz = {
  createdAt: 0,
  info: {
    name: 'empty',
    questions: initQuiz,
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
      const timeout = setTimeout(() => {
        if (currentQuestion + 1 === statistics.numQuestions) {
          finishQuiz()
        } else {
          nextQuestion()
        }
        clearTimeout(timeout)
      }, 1.5e3)
    }
  }
  
  const startQuiz = ():void => {
    setQuiz(prev => ({
      ...prev,
      started: true,
    }))
  }

  const finishQuiz = ():void => {
    // todo 
    setQuiz(prev => ({
      ...prev,
      finished: true,
    }))
  }

  const nextQuestion = ():void => {
    setQuiz(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      answerState: null
    }))
  }

  // TODO сделать загрузку, старт, и финиш теста
  return (
    <div className="main__content">
      <div className="quiz__container">

        {isLoaded && <h2 className="text title">{info.name}</h2>}
        {id 
        ? !started 
          ? <StartMenu 
            isLoaded={isLoaded}
            createdAt={createdAt}
            info={info}
            statistics={statistics}
            startQuiz={startQuiz}
          />
          : !finished 
          ? <Quiz 
              currentQuestion={currentQuestion + 1} 
              question={info.questions[currentQuestion]} 
              numQuestions={statistics.numQuestions}
              getAnswer={getAnswer}
              answerState={answerState}
            />
          : <FinishedQuiz score={score} numQuestions={statistics.numQuestions} info={info} />
        : 'Выбери тест'}

      </div>
    </div>
  )
}

export default QuizPage;
