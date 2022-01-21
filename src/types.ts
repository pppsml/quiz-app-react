interface IStatistics {
  numQuestions: number,
  played: number,
  likes: number,
}

interface IAnswerOption {
  text: string,
  id: number,
}

interface IQuestion {
  question: string,
  options: IAnswerOption[],
  correct: number | number[]
}

interface IQuizInfo {
  name: string,
  questions: IQuestion[],
}

export interface IQuizData {
  createdAt: number,
  info: IQuizInfo,
  statistics: IStatistics,
  _id: string,
}

export interface IQuizzes {
  [ key:string ] : IQuizData,
}



export interface IQuizzesState {
  quizzes: IQuizzes 
}

export interface action {
  type: string,
  payload: any,
}

export const SET_QUIZZES = 'SET_QUIZZES'