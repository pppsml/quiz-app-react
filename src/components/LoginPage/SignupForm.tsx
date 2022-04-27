import React from 'react'

import { useForm } from '../../hooks'
import type { ICustomFieldsObject } from '../../hooks'

import { Button, Input, Title } from '..'
import { getStringLength } from '../../functions'

import { Form } from '../'

type Props = {}


function SignupForm({}: Props) {

  const formControls:ICustomFieldsObject = {
    username: {
      value: '',
      label: 'Имя пользователя',
      placeholder: 'username888',
      isValid: false,
      validation: {
        required: true,
        validators: [
          (s:string) => getStringLength(s) < 1 && 'Поле не может быть пустым',
        ]
      },
    },
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      placeholder: 'example@example.com',
      isValid: false,
      validation: {
        required: true,
        validators: [
          (s:string) => getStringLength(s) < 1 && 'Поле не может быть пустым',
          (s:string) => !(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(s)) && 'Email должен иметь формат example@example.com'
        ]
      },
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      placeholder: 'QQQwww333(?=$$$)',
      isValid: false,
      validation: {
        required: true,
        validators: [
          (s:string) => getStringLength(s) < 1 && 'Поле не может быть пустым',
          (s:string) => !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{1,}$/.test(s)) && 'Пароль должен содержать латинские буквы верхнего регистра, нижнего регистра, цифры. Может содержать спец.символы (необязательно)',
          (s:string) => getStringLength(s) < 6 && 'Пароль должен быть длиннее 5-ти символов',
        ]
      },
    },
  }

  const { fields, formIsValid, handleSubmit } = useForm(formControls)
  const { username, email, password } = fields


  const formSubmitHandler = () => {
    console.log('submit')
  }

  return (
    <Form onSubmit={handleSubmit(formSubmitHandler)}>
      <Title text='Регистрация' />
      <Input {...username} onChange={username.setState} />
      <Input {...email} onChange={email.setState} />
      <Input {...password} onChange={password.setState} />
      <Button type='submit' disabled={!formIsValid} >submit</Button>
    </Form>
  )
}

export default SignupForm