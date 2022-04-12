import React from 'react'
import Button from './Button'

import useModal from './Modal'

type Props = {
  text: string,
  fontSize?: string,
}

const Alert = ({text, fontSize}: Props) => {
  const {isShown, openModal, closeModal, Modal} = useModal()
  return [
    openModal,
    closeModal,
    () => <Modal 
      html={
        <div>
          <p style={{fontSize}} className='modal__alert--text'>
            {text}
          </p>
          <Button className='modal__alert--okBtn' onClick={closeModal}>OK</Button>
        </div>
      }
    />
  ]
}

export default Alert