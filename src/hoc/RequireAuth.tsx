import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { IAppState } from '../types'

type Props = {
  children: JSX.Element
}

const RequireAuth:React.FC<Props> = ({children}) => {
  const isAuthenticated = useSelector(({user}:IAppState) => user.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) return (
    <Navigate to='/login' state={{from: location}} />
  )

  return children
}

export default RequireAuth