import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, getDocs, getDoc, query, orderBy, limit, startAfter } from "firebase/firestore";


import { IQuizData, IFetchingQuizData } from './types'

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

export const writeQuiz = (quiz: IQuizData):void => {
  setDoc(doc(db, 'quizzes', quiz._id), quiz);
}

export const getQuizzes = async (lastQuiz: object | null):Promise<IFetchingQuizData> => {
  const itemsPerPage = 20
  let myQuery
  if (lastQuiz) {
    myQuery = query(collection(db, "quizzes"),
    orderBy('createdAt', 'asc'),
    startAfter(lastQuiz),
    limit(itemsPerPage));
  } else {
    myQuery = query(collection(db, "quizzes"),
    orderBy('createdAt', 'asc'),
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
    lastQuiz: {
      item: newLastQuiz,
      hasMore: Object.keys(data).length === itemsPerPage,
    }
  }
}

export const getQuizFromId = async (id: string) => {
  return (await getDoc(doc(db, "quizzes", id))).data()
}