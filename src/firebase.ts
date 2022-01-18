import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, push } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

interface User {
  userId?: number
  name: string
  email: string
  imageUrl: string | null
  roles?: string[]
}

export const writeUserData = ({userId, name, email, imageUrl, roles}:User):void => {
  set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl,
      roles,
  });
}
const dbRef = ref(db);

export const getUserData = (userId:string) => 
get(child(dbRef, `users/${userId}`))
.then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

export const getAllUsers = () => {
  get(child(dbRef, `users`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  })
}

export const newPostKey = push(child(ref(db), 'users')).key;