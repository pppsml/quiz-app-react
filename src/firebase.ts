import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, updateDoc, getDocs, getDoc, query, orderBy, limit, startAfter, increment, deleteDoc, FieldPath } from "firebase/firestore";

import { generateId } from './functions'
import { IQuizData, IFetchingQuizData, IQuestion } from './types'

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
initializeApp(firebaseConfig);

const db = getFirestore()

const collectionName = 'testQuizData' // 'quizzes' | 'testQuizData'




export const writeQuiz = (quiz: IQuizData):void => {
  setDoc(doc(db, collectionName, quiz._id), quiz);
}

export const getQuizzes = async (orderPaths: string, order: 'asc' | 'desc', lastQuiz: object | null):Promise<IFetchingQuizData> => {
  const fieldPath = new FieldPath(...orderPaths.split('/'))
  const itemsPerPage = 20
  let myQuery
  if (lastQuiz) {
    myQuery = query(collection(db, collectionName),
    orderBy(fieldPath, order),
    startAfter(lastQuiz),
    limit(itemsPerPage));
  } else {
    myQuery = query(collection(db, collectionName),
    orderBy(fieldPath, order),
    limit(itemsPerPage));
  }

  const snapshot:any = await getDocs(myQuery);
  const data:any = []
  let newLastQuiz = null

  snapshot.forEach((doc:any) => {
    data.push(doc.data())
  })
  newLastQuiz = snapshot.docs[snapshot.docs.length - 1]

  return {
    data,
    newLastQuiz: {
      item: newLastQuiz,
      hasMore: Object.keys(data).length === itemsPerPage,
    }
  }
}

export const getQuizFromId = async (id: string) => {
  return (await getDoc(doc(db, collectionName, id))).data()
}



export const increasePlayedCount = (id: string, quizData: any):void => {
  const quizRef = doc(db, collectionName, id)
  updateDoc(quizRef, {
    ...quizData,
    statistics: {
      ...quizData.statistics,
      played: quizData.statistics.played + 1
    }
  });
}

export const createTestData = (count:number) => {
  const questions:IQuestion[] = [
    {
      text: 'empty',
      options: [{id: 1, text: 'empty'}, {id: 2, text: 'empty'}, {id: 3, text: 'empty'}, {id: 4, text: 'empty'}],
      type: 'single',
      correct: {1: true},
    },
    {
      text: 'empty',
      options: [{id: 1, text: 'empty'}, {id: 2, text: 'empty'}, {id: 3, text: 'empty'}, {id: 4, text: 'empty'}],
      type: 'single',
      correct: {1: true},
    },
    {
      text: 'empty',
      options: [{id: 1, text: 'empty'}, {id: 2, text: 'empty'}, {id: 3, text: 'empty'}, {id: 4, text: 'empty'}],
      type: 'single',
      correct: {1: true},
    },
    {
      text: 'empty',
      options: [{id: 1, text: 'empty'}, {id: 2, text: 'empty'}, {id: 3, text: 'empty'}, {id: 4, text: 'empty'}],
      type: 'single',
      correct: {1: true},
    },
    {
      text: 'empty',
      options: [{id: 1, text: 'empty'}, {id: 2, text: 'empty'}, {id: 3, text: 'empty'}, {id: 4, text: 'empty'}],
      type: 'single',
      correct: {1: true},
    },
    {
      text: 'empty',
      options: [{id: 1, text: 'empty'}, {id: 2, text: 'empty'}, {id: 3, text: 'empty'}, {id: 4, text: 'empty'}],
      type: 'single',
      correct: {1: true},
    },
  ]
  const timestamp = Date.now()
  for (let i = 0; i < count; i++) {
    const quiz = {
      createdAt: timestamp + i,
      info: {
        name: `testQuiz №${i + 1}`,
        questions,
      },
      statistics: {
        numQuestions: questions.length,
        played: Math.floor(Math.random() * ( 3000 - 10 ) + 10),
        likes: Math.floor(Math.random() * ( 200 - 10 ) + 10),
      },
      _id: generateId(timestamp + i, 10)
    }

    setDoc(doc(db, 'testQuizData', quiz._id), quiz);
  }
}


export const deleteDocs = (docs:string[]):void => {
  docs.forEach(docId => {
    deleteDoc(doc(db, collectionName, docId))
  })
}