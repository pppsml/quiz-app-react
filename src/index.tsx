import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './App';
import { writeQuiz } from './firebase';
import store from './redux/store';

const createQuiz = () => {
  return{
    createdAt: Date.now() + Math.floor(Math.random() * 10),
    info: {
      name: 'Имеешь ли ты зрение',
      questions: [
        {
          text: 'Какого цвета небо?',
          options: [
            {text: 'Серый', id: 1},
            {text: 'Голубой', id: 2},
            {text: 'Красный', id: 3},
            {text: 'Желтый', id: 4},
          ],
          correct: 2
        },
        {
          text: 'Какого цвета вода?',
          options: [
            {text: 'Голубой', id: 1},
            {text: 'Синий', id: 2},
            {text: 'Зеленый', id: 3},
            {text: 'Почти прозрачный', id: 4},
          ],
          correct: 4
        },
        {
          text: 'Какого цвета трава?',
          options: [
            {text: 'Серый', id: 1},
            {text: 'Голубой', id: 2},
            {text: 'Красный', id: 3},
            {text: 'Зеленый', id: 4},
          ],
          correct: 4
        },
        {
          text: 'Какого цвета кровь человека?',
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
      likes: Math.floor(Math.random() * 1000),
      played: Math.floor(Math.random() * 1000),
    },
    _id: `ajsdhkauwekasd${Math.floor(Math.random() * 1000)}`
  }
}

// for (let i = 0; i < 50; i++) {
//   writeQuiz(createQuiz())
// }

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