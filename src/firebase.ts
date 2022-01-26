import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, push } from 'firebase/database';
import { getFirestore, collection, setDoc, doc, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";


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

const db = getDatabase()
const fs = getFirestore()

export const writeQuiz = (quiz: IQuizData):void => {
  setDoc(doc(fs, 'quizzes', quiz._id), quiz);
}

export const getDocuments = async () => {
  const first = query(collection(fs, "QuizData"),
  orderBy('id'),
  limit(2));
  const documentSnapshots = await getDocs(first);

  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  console.log("last", lastVisible.data());

  const next = query(collection(fs, "QuizData"),
  orderBy('id'),
  startAfter(lastVisible),
  limit(2));

  const documentSnapshots2 = await getDocs(next);
  const lastVisible2 = documentSnapshots2.docs[documentSnapshots2.docs.length-1];
  console.log("last2", lastVisible2.data());
}

export const getQuizzes = async (lastQuiz: object | null):Promise<any> => {
  let myQuery
  console.log('isLastquiz',!!lastQuiz)
  if (lastQuiz) {
    myQuery = query(collection(fs, "quizzes"),
    orderBy('createdAt', 'desc'),
    startAfter(lastQuiz),
    limit(2));
  } else {
    myQuery = query(collection(fs, "quizzes"),
    orderBy('createdAt', 'desc'),
    limit(2));
  }

  const snapshot:any = await getDocs(myQuery);
  const data:any = {}
  let setLastQuiz:any = null
  try {
    snapshot.forEach((doc:any) => {
      const document = doc.data()
      console.log(document)
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

// export const getQuizzes = async ():Promise<IQuizzes> => {
//   const snapshot = await get(child(ref(db), 'quizzes/'))

//   const data:IQuizzes = {}
//   try {
//     if (snapshot.exists()) {
//       const response = snapshot.val()
//       for (let id in response) {
//         data[id] = response[id]
//       }
//     } else {
//       console.log('No data available')
//     }
//   } catch(err) {
//     console.error(err)
//   }
//   return data
// }