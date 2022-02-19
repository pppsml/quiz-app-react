import React from "react";

export interface IQuizStatistics {
  numQuestions: number,
  played: number,
  likes: number,
}

export interface IAnswerOption {
  text: string,
  id: number,
}

export interface ICorrectAnswers {
  [key: string]: true
}


export interface IQuestion {
  text: string,
  options: IAnswerOption[],
  type: 'single' | 'multiple' | undefined,
  correct: ICorrectAnswers
}

export interface IQuizInfo {
  name: string,
  questions: IQuestion[],
}

export interface IQuizData {
  createdAt: number,
  info: IQuizInfo,
  statistics: IQuizStatistics,
  _id: string,
}

export interface IAnswerState {
  [key: string]: 'correct' | 'error'
}

export interface IUserAnswers {
  [ key: string ] : boolean
}

export interface IQuiz {
  createdAt: number,
  info: IQuizInfo,
  statistics: IQuizStatistics,
  _id: string,
  started: boolean,
  finished: boolean,
  currentQuestion: number,
  score: number,
  answerState: IAnswerState | null,
  userAnswers: IUserAnswers,
  tryCount: number
}


export interface ILastQuiz {
  item: object | null,
  hasMore: boolean,
}

export interface IQuizzesState {
  quizzes: {
    items: IQuizData[],
  },
  lastQuiz: ILastQuiz,
  quizIsLoaded: boolean,
}

export interface action {
  type: string,
  payload: any,
}

export interface IFetchingQuizData {
  data: [],
  lastQuiz: ILastQuiz,
}

export interface IInputValidationControls {
  required?: boolean,
  minLength?: number,
  maxLength?:number,
  regExp?: RegExp,
}

export interface IInputControlProps {
  value?: string,
  type?: React.HTMLInputTypeAttribute,
  checked?: boolean,
  labelText?: string,
  hoverTitle?: string,
  name?: string,
  inlineLabel?: boolean
  placeholder?: string,
  errorMessage?: string,
  valid?: boolean,
  touched?: boolean,
  autoComplete?: 'on' | 'off'
  validation?: IInputValidationControls,
  map?: any
}

export interface IFormControls {
  [key: string]: {
    inputs: IInputControlProps[],
    title?: string,
  }
}

export const SET_QUIZZES = 'SET_QUIZZES'
export const SET_LASTQUIZ = 'SET_LASTQUIZ'
export const SET_RESETTED_QUIZZES = 'SET_RESETTED_QUIZZES'