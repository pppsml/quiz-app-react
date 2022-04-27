import React from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Title from '../UI/Title'
import { StyledForm } from '../Forms/Form.styled'

type Props = {}

function PasswordRecoveryForm({}: Props) {
  return (
    <StyledForm>
      <Title text='забыл пароль лох' />
      <Input label='E-Mail'/>
      <Button onClick={() => {}}>login</Button>
    </StyledForm>
  )
}

export default PasswordRecoveryForm