import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from "./firebase-quizzes";


export const auth = getAuth(app)

// регистация email+password

// TODO: при регистрации проверять занято ли имя пользователя =>
// TODO: отправлять запрос в firestore с запросом username === displayname
export const signUpWithEP = async (email:string, password:string, displayName:string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    if (auth.currentUser) updateProfile(auth.currentUser, {
      displayName: displayName,
    })

    sendEmailVerification(userCredential.user)
    return userCredential.user
  } catch(error:any) {
    // TODO: сделать свои alert, confirm, prompt окна для взаимодействия с пользователем
    // TODO: в частности показывать пользователю ошибки
    /*
      custom/username-already-in-use
      auth/email-already-in-use
    */
    console.log(error.code, error.message)
  }
}

// login email+password
export const signInWithEP = async (email:string, password:string) => {
  await signInWithEmailAndPassword(auth, email, password)
}

export const signOutFromApp = async () => {
  await signOut(auth)
}

export const updateDisplayName = async (displayName:string) => {
  if (!auth.currentUser) return;
  await updateProfile(auth.currentUser, {
    displayName,
  })
}