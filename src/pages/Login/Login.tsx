import React from 'react'

import { useSelector } from 'react-redux'
import { IAppState } from '../../types'
import { useLocation, useNavigate } from 'react-router-dom'
import { signInWithEP, signOutFromApp, signUpWithEP } from '../../firebase/firebase-auth'

import { LoginWrapper } from './Login.styled'

import { SignupForm, LoginForm, PasswordRecoveryForm, Alert } from '../../components'

type Props = {}

const Login:React.FC<Props> = () => {

  const [ openAlert, closeModal, AlertModal ]:any = Alert({
    textArr: ['Спасибо за регистацию!', 'Вам на почту отправлено письмо с подтверждением'],
    fontSize: '22px',
  })

  const navigate = useNavigate()
  const location:any = useLocation()
  const from = location.state?.from.pathname || '/'
  
  const isAuthenticated = useSelector(({user}:IAppState) => user.isAuthenticated)

  const [ formType, setFormType ] = React.useState<'signup' | 'login' | 'password'>('signup')

  React.useEffect(() => {
    if (isAuthenticated) navigate(from, {replace: true,})
  }, [isAuthenticated])

  let form:JSX.Element = <SignupForm />

  switch (formType) {
    case 'signup': 
      form = <SignupForm />;
      break;

    case 'login': 
      form = <LoginForm />
      break;

    case 'password': 
      form = <PasswordRecoveryForm />
      break;

    default: 
      <SignupForm />
      break;
  }

  return (
    <LoginWrapper>
      <SignupForm />
    </LoginWrapper>
  )
}

export default Login;