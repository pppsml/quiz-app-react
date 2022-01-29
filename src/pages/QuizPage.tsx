import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { FinishedQuiz, Quiz, StartMenu } from "../components";
import { getQuizFromId, increasePlayedCount } from "../firebase";
import { IQuiz } from '../types'

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
  score: 0,
  userAnswers: {},
  tryCount: 0,
}

const QuizPage:React.FC = () => {
  const { id } = useParams()
  const [ quiz, setQuiz ] = useState(initialQuiz)
  const [ quizIsLoaded, setQuizIsLoaded ] = useState(false)

  useEffect(() => {
    setQuizIsLoaded(false)
    if (id) getQuizFromId(id).then(data => {
      setQuiz((prev: any) => ({...prev, ...data}))
      setQuizIsLoaded(true)
    })
  }, [id, quiz.tryCount])

  const { finished, started, info, statistics, score, currentQuestion, answerState, createdAt, userAnswers } = quiz



  const getAnswer = (answerId:number) => {
    if (!quiz.answerState) {
      const isCorrect = answerId === info?.questions[currentQuestion].correct
      setQuiz(prev => ({
        ...prev,
        answerState: {
          [answerId]: isCorrect ? 'correct' : 'error'
        },
        userAnswers: {
          ...prev.userAnswers,
          [currentQuestion]: isCorrect
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
    setQuiz(prev => ({
      ...prev,
      finished: true,
    }))

    if (id && !quiz.tryCount) {
      const quizData = {
        _id: id,
        createdAt,
        info,
        statistics,
      }
      increasePlayedCount(id, {
        ...quizData,
        statistics: {
          ...statistics,
          played: statistics.played + 1
        }
      })
    }

  }

  const retryQuiz = ():void => {
    setQuiz(prev => ({
      ...prev,
      started: false,
      finished: false,
      currentQuestion: 0,
      answerState: null,
      score: 0,
      userAnswers: {},
      tryCount: prev.tryCount + 1
    }))
  }

  const nextQuestion = ():void => {
    setQuiz(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
      answerState: null
    }))
  }


  return (
    <div className="main__content">
      <div className="quiz__container">

        {quizIsLoaded && <h2 className="text title">{info.name}</h2>}
        {id 
        ? !started 
          ? <StartMenu 
            isLoaded={quizIsLoaded}
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
          : <FinishedQuiz 
            score={score} 
            numQuestions={statistics.numQuestions} 
            info={info} 
            retryQuiz={retryQuiz}
            userAnswers={userAnswers}
          />
        : 'Выбери тест'}

      </div>
    </div>
  )
}

export default QuizPage;
