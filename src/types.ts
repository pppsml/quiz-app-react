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

export const SET_QUIZZES = 'SET_QUIZZES'
export const SET_LASTQUIZ = 'SET_LASTQUIZ'