import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './App';
import store from './redux/store';

import { getQuizzes, writeQuiz } from './firebase'
import { IQuizzes } from './types';

export const quizzes: IQuizzes = {
  "gaAsW0": {
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
  "AFhas123": {
    createdAt: 1642484588648,
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
      played: 14,
    },
    _id: 'AFhas123'
  },
  "AFhas1234": {
    createdAt: 1642484588649,
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
  "AFhas12377": {
    createdAt: 1642484588650,
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

const addQuizzes = () => {
  Object.keys(quizzes).forEach((id, _) => {
    writeQuiz(quizzes[id])
  })
}

(window as any).addQuizzes = addQuizzes;
(window as any).getQuizzes = getQuizzes;

ReactDOM.render(
  <HashRouter>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
);