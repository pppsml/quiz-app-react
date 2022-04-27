import React from 'react'
import styled from 'styled-components';
import { FormWrapper, StyledForm } from './Form.styled'

type Props = {
  className?: string;
  children?: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const Form:React.FC<Props> = (props) => {
  return (
    <FormWrapper className={props.className}>
      <StyledForm onSubmit={props.onSubmit}>
        {props.children}
      </StyledForm>
    </FormWrapper>
  )
}

export default Form