import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, getDocs, getDoc, query, orderBy, limit, startAfter } from "firebase/firestore";


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
initializeApp(firebaseConfig);

const db = getFirestore()

export const writeQuiz = (quiz: IQuizData):void => {
  setDoc(doc(db, 'quizzes', quiz._id), quiz);
}

export const getQuizzes = async (lastQuiz: object | null):Promise<any> => {
  let myQuery
  if (lastQuiz) {
    myQuery = query(collection(db, "quizzes"),
    orderBy('createdAt', 'asc'),
    startAfter(lastQuiz),
    limit(3));
  } else {
    myQuery = query(collection(db, "quizzes"),
    orderBy('createdAt', 'asc'),
    limit(3));
  }

  const snapshot:any = await getDocs(myQuery);
  const data:any = {}
  let setLastQuiz:any = null
  try {
    snapshot.forEach((doc:any) => {
      const document = doc.data()
      data[document._id] = document
    })
    setLastQuiz = snapshot.docs[snapshot.docs.length - 1]
  } catch(err) {
    console.error(err)
  }

  return {
    data,
    lastQuiz: setLastQuiz,
  }
}

export const getQuizFromId = async (id: string) => {
  return (await getDoc(doc(db, "quizzes", id))).data()
}