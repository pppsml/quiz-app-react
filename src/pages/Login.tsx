import React, { useEffect } from 'react'
import { Button, Input } from '../components'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendEmailVerification } from 'firebase/auth'
import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { IAppState } from '../types'
import { setUser } from '../redux/actions/user'

type Props = {}

const Login:React.FC<Props> = () => {
  const dispatch = useDispatch()

  const user = useSelector(({user}:IAppState) => user.user)

  const [ registerDisplayName, setRegisterDisplayName ] = React.useState('')
  const [ registerEmail, setRegisterEmail ] = React.useState('')
  const [ registerPassword, setRegisterPassword ] = React.useState('')
  const [ loginEmail, setLoginEmail ] = React.useState('')
  const [ loginPassword, setloginPassword ] = React.useState('')
  const [ displayName, setDisplayName ] = React.useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser))
    })
  }, [auth.currentUser])
  

  const sendEmail = () => {
    if (auth.currentUser) sendEmailVerification(auth.currentUser)
  }

  (window as any).sendEmail = sendEmail;

  const register = () => {
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then(userCredential => {
        if (auth.currentUser) updateProfile(auth.currentUser, {
          displayName: registerDisplayName,
        })
      })
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    } catch (error:any) {
      console.log(error.message)
    }
  }

  const singOut = async () => {
    await signOut(auth)
  }

  const update = async () => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      displayName,
    })
  }


  return (
    <div className='main__content'>
      <div>
        <Input onChange={((event:any) => {setRegisterDisplayName(event.target.value)})} value={registerDisplayName} labelText='Login' inputTitle='Register' />
        <Input onChange={((event:any) => {setRegisterEmail(event.target.value)})} value={registerEmail} labelText='Email' />
        <Input onChange={((event:any) => {setRegisterPassword(event.target.value)})} value={registerPassword} labelText='Password' />
        <Button onClick={register}>Register</Button>
      </div>

      <br />
      <br />
      <br />

      <div>
        <Input onChange={((event:any) => {setLoginEmail(event.target.value)})} value={loginEmail} labelText='Email' inputTitle='Login' />
        <Input onChange={((event:any) => {setloginPassword(event.target.value)})} value={loginPassword} labelText='Password' />
        <Button onClick={login}>Login</Button>
      </div>

      <br />
      <br />
      <br />

      <div>
        <Input onChange={((event:any) => {setDisplayName(event.target.value)})} value={displayName} labelText='New display name' />
        <Button onClick={update}>Update profile</Button>
      </div>

      <br />
      <br />
      <br />

      <p>You are signed in: {user?.displayName || user?.email || 'not logged in'}</p>
      <Button onClick={singOut}>sign out</Button>
    </div>
  )
}

export default Login