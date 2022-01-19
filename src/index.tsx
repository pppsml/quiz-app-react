import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';

import { writeUserData, getUserData, getAllUsers, newPostKey } from './firebase'

interface statistics {
  numQuestions: number,
  played: number,
  likes: number,
}

interface answerOption {
  text: string,
  id: number,
}

interface question {
  question: string,
  options: answerOption[],
  correct: number | number[]
}

interface quizInfo {
  name: string,
  questions: question[],
}

export interface quizData {
  createdAt: number,
  info: quizInfo,
  statistics: statistics,
  _id: string,
}

interface quizzes {
  [ key:string ]: quizData,
}

export const quizzes: quizzes = {
  "0": {
    createdAt: 1642484588647,
    info: {
      name: 'Имеешь ли ты зрение',
      questions: [
        {
          question: 'Какого цвета небо?',
          options: [
            {text: 'Серый', id: 1},
            {text: 'Голубой', id: 2},
            {text: 'Красный', id: 3},
            {text: 'Желтый', id: 4},
          ],
          correct: 2
        },
        {
          question: 'Какого цвета вода?',
          options: [
            {text: 'Голубой', id: 1},
            {text: 'Синий', id: 2},
            {text: 'Зеленый', id: 3},
            {text: 'Почти прозрачный', id: 4},
          ],
          correct: 4
        },
        {
          question: 'Какого цвета трава?',
          options: [
            {text: 'Серый', id: 1},
            {text: 'Голубой', id: 2},
            {text: 'Красный', id: 3},
            {text: 'Зеленый', id: 4},
          ],
          correct: 4
        },
        {
          question: 'Какого цвета кровь человека?',
          options: [
            {text: 'Серый', id: 1},
            {text: 'Голубой', id: 2},
            {text: 'Красный', id: 3},
            {text: 'Желтый', id: 4},
          ],
          correct: 3
        },
      ],
    },
    statistics: {
      numQuestions: 4,
      likes: 0,
      played: 0,
    },
    _id: 'gaAsW0'
  },
  "123": {
    createdAt: 1642484588647,
    info: {
      name: 'Закончил ли ты первый класс?',
      questions: [
        {
          question: 'Чему равно 2+2?',
          options: [
            {text: '4', id: 1},
            {text: '6-2', id: 2},
            {text: '0+4', id: 3},
            {text: 'Желтый', id: 4},
          ],
          correct: 1 // множественный выбор
        },
        {
          question: 'Сколько всего цифр?',
          options: [
            {text: 'Много', id: 1},
            {text: 'Бесконечно', id: 2},
            {text: '10', id: 3},
            {text: '99', id: 4},
          ],
          correct: 3
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
      ],
    },
    statistics: {
      numQuestions: 3,
      likes: 15,
      played: 888,
    },
    _id: 'AFhas123'
  },
  "1234": {
    createdAt: 1642484588647,
    info: {
      name: 'Закончил ли ты первый класс?',
      questions: [
        {
          question: 'Чему равно 2+2?',
          options: [
            {text: '4', id: 1},
            {text: '6-2', id: 2},
            {text: '0+4', id: 3},
            {text: 'Желтый', id: 4},
          ],
          correct: 1 // множественный выбор
        },
        {
          question: 'Сколько всего цифр?',
          options: [
            {text: 'Много', id: 1},
            {text: 'Бесконечно', id: 2},
            {text: '10', id: 3},
            {text: '99', id: 4},
          ],
          correct: 3
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
      ],
    },
    statistics: {
      numQuestions: 5,
      likes: 15,
      played: 882,
    },
    _id: 'AFhas1234'
  },
  "12377": {
    createdAt: 1642484588647,
    info: {
      name: 'Закончил ли ты первый класс?',
      questions: [
        {
          question: 'Чему равно 2+2?',
          options: [
            {text: '4', id: 1},
            {text: '6-2', id: 2},
            {text: '0+4', id: 3},
            {text: 'Желтый', id: 4},
          ],
          correct: 1 // множественный выбор
        },
        {
          question: 'Сколько всего цифр?',
          options: [
            {text: 'Много', id: 1},
            {text: 'Бесконечно', id: 2},
            {text: '10', id: 3},
            {text: '99', id: 4},
          ],
          correct: 3
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
        {
          question: 'Как пишется жы-ши?',
          options: [
            {text: 'жы-ши пиши от душы', id: 1},
            {text: 'жи-ши пиши через "И"', id: 2},
            {text: 'жы-шы пишы через "Ы"', id: 3},
          ],
          correct: 2
        },
      ],
    },
    statistics: {
      numQuestions: 11,
      likes: 23,
      played: 873,
    },
    _id: 'AFhas12377'
  },
}

ReactDOM.render(
  <HashRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
);

// writeUserData({
//   userId: 13941,
//   name: 'Vlad',
//   email: 'shumkin.99@inbox.ru',
//   imageUrl: null,
//   roles: [
//     'admin',
//     'Good boy',
//     'programmer'
//   ]
// })

// getUserData('12841')
// getAllUsers()
// console.log(newPostKey)