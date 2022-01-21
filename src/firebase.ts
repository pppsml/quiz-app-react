import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, push } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { IQuizData, IQuizzes } from './types'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALM5TDwXkgRlt-fLP0fjVSqdtJQJH4moQ",
  authDomain: "quiz-app-e7804.firebaseapp.com",
  databaseURL: "https://quiz-app-e7804-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quiz-app-e7804",
  storageBucket: "quiz-app-e7804.appspot.com",
  messagingSenderId: "739781661529",
  appId: "1:739781661529:web:22a56508ca35bdaf6b3248"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app)

export const writeQuiz = (quiz: IQuizData):void => {
  set(ref(db, 'quizzes/' + quiz._id), quiz)
}

export const getQuizzes = async () => {
  const snapshot = await get(child(ref(db), 'quizzes/'))

  const data:IQuizzes = {}
  if (snapshot.exists()) {
    const response = snapshot.val()
    for (let id in response) {
      data[id] = response[id]
    }
  } else {
    console.log('No data available')
  }
  return data
}

// export const getQuizFromId = async (id: string) => {
//   const dbRef = ref(db);
//   const snapshot = await get(child(dbRef, `quizzes/${id}`))

//   let data:IQuizData
//   if (snapshot.exists()) {
//     data = snapshot.val()
//     console.log(data)
//   } else {
//     console.log('No data available')
//   }
//   // return data
// }

export const getQuizFromId = async (id: string | undefined) => {
  if (typeof id !== 'string') {
    return 'Укажите id'
  }

  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `quizzes/${id}`))

  if (snapshot.exists()) {
    return snapshot.val()
  } else {
    return 'no data'
  }
}