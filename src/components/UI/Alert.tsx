import React from 'react'
import Button from './Button'

import useModal from './Modal'

type Props = {
  textArr: string[],
  fontSize?: string,
}

const Alert = ({textArr, fontSize}: Props) => {
  const {isShown, openModal, closeModal, Modal} = useModal()
  return [
    openModal,
    closeModal,
    () => <Modal 
      html={
        <div>
          {textArr.map((text, index) => (
            <p key={`${text}_${index}`} style={{fontSize}} className='modal__text'>
              {text}
            </p>
          ))}
          <Button className='modal__alert--okBtn' onClick={closeModal}>OK</Button>
        </div>
      }
    />
  ]
}

export default Alert