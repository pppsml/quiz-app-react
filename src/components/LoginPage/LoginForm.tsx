import React from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Title from '../UI/Title'
import { StyledForm } from '../Forms/Form.styled'

type Props = {}

function LoginForm({}: Props) {
  return (
    <StyledForm>
      <Title text='Авторизация' />
      <Input label='E-Mail'/>
      <Input label='Пароль'/>
      <Button onClick={() => {}}>change form</Button>
      <Button onClick={() => {}}>forgot password</Button>
    </StyledForm>
  )
}

export default LoginForm