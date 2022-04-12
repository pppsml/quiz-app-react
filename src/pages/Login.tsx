import React from 'react'
import { Button, Input, Alert } from '../components'

import { useSelector } from 'react-redux'
import { IAppState } from '../types'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { signInWithEP, signOutFromApp, signUpWithEP } from '../firebase/firebase-auth'

type Props = {}

const Login:React.FC<Props> = () => {

  const [ openAlert, closeModal, AlertModal ]:any = Alert({
    text: 'Вам на почту отправлено письмо с подтверждением',
    fontSize: '22px',
  })

  const navigate = useNavigate()
  const location:any = useLocation()
  const from = location.state?.from.pathname || '/'

  
  const userData = useSelector(({user}:IAppState) => user.userData)
  
  
  
  const [ registerDisplayName, setRegisterDisplayName ] = React.useState('')
  const [ registerEmail, setRegisterEmail ] = React.useState('')
  const [ registerPassword, setRegisterPassword ] = React.useState('')
  const [ loginEmail, setLoginEmail ] = React.useState('')
  const [ loginPassword, setloginPassword ] = React.useState('')


  const register = () => {
    signUpWithEP(registerEmail, registerPassword, registerDisplayName)
      .then(() => {
        openAlert()
      })
  }

  const login = () => {
    signInWithEP(loginEmail, loginPassword)
    .then(() => {
      navigate(from, {replace: true,})
    })
  }

  const singOut = () => {
    signOutFromApp()
  }
  
  if (userData !== null) return <Navigate to='/profile' />

  return (
    <>
      <div>
        <Input onChange={((event:any) => {setRegisterDisplayName(event.target.value)})} value={registerDisplayName} name='username' labelText='Login' inputTitle='Register' />
        <Input onChange={((event:any) => {setRegisterEmail(event.target.value)})} value={registerEmail} name='email' labelText='Email' />
        <Input onChange={((event:any) => {setRegisterPassword(event.target.value)})} value={registerPassword} type='password' labelText='Password' />
        <Button onClick={register}>Register</Button>
      </div>

      <br />
      <br />
      <br />

      <div>
        <Input onChange={((event:any) => {setLoginEmail(event.target.value)})} value={loginEmail} name='email' labelText='Email' inputTitle='Login' />
        <Input onChange={((event:any) => {setloginPassword(event.target.value)})} value={loginPassword} type='password' labelText='Password' />
        <Button onClick={login}>Login</Button>
      </div>

      <br />
      <br />
      <br />

      <Button onClick={singOut}>sign out</Button>
      <AlertModal />
    </>
  )
}

export default Login