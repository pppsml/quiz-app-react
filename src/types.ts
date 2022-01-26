export interface IQuizStatistics {
  numQuestions: number,
  played: number,
  likes: number,
}

interface IAnswerOption {
  text: string,
  id: number,
}

export interface IQuestion {
  text: string,
  options: IAnswerOption[],
  correct: number | number[]
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

export interface IQuizzes {
  [ key:string ] : IQuizData,
}

export interface IAnswerState {
  [key: string]: 'correct' | 'error'
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
}



export interface IQuizzesState {
  quizzes: {
    items: IQuizzes,
    isLoaded: boolean,
  },
  lastQuiz: object | null,
}

export interface action {
  type: string,
  payload: any,
}

export const SET_QUIZZES = 'SET_QUIZZES'
export const SET_LASTQUIZ = 'SET_LASTQUIZ'