import React from 'react'
import styled from 'styled-components'

type Props = {
  fontSize?: string,
  textAlign?: string,
  margin?: string,
  text: string;
}

const StyledTitle = styled.h2<Props>`
  width: 100%;
  text-align: ${props => props.textAlign || 'center'};
	margin: ${props => props.margin || '0 0 16px 0'};
	font-size: ${props => props.fontSize || '26px'};
	font-weight: 700;
`


const Title:React.FC<Props> = (props) => {
  return (
    <StyledTitle {...props}>
      {props.text}
    </StyledTitle>
  )
}

export default Title