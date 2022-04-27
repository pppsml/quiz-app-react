import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button } from '../components'
import { IAppState } from '../types'
import { signOutFromApp } from '../firebase/firebase-auth'

type Props = {}

const Profile:React.FC<Props> = () => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector(({user}:IAppState) => user.isAuthenticated)
  const userData = useSelector(({user}:IAppState) => user.userData)
  
  React.useEffect(() => {
    if (!isAuthenticated) navigate('/login', {replace: true,})
  }, [isAuthenticated])

  return (
    <div>
      <p>username: {userData?.displayName}</p>
      <p>email: {userData?.email}</p>
      <p>email is verified: {userData?.emailVerified.toString()}</p>

      <Button onClick={signOutFromApp}>Sign out</Button>
    </div>
  )
}

export default Profile