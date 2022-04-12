import React from 'react'
import Button from './Button'

type Props = {
  html: JSX.Element,
}

type modalReturns = {
  isShown: boolean,
  openModal: () => void,
  closeModal: () => void,
  Modal: ({}:Props) => JSX.Element,
}


const useModal = ():modalReturns => {
  const [ isShown, setIsShown ] = React.useState<boolean>(false)

  const openModal = () => {
    setIsShown(true)
  }

  const closeModal = () => {
    setIsShown(false)
  }

  return {
    isShown,
    openModal,
    closeModal,
    Modal: ({html}:Props) => (
      <div className={`modal__wrapper ${isShown && 'active'}`} onClick={closeModal}>
        <div className='modal' onClick={e => e.stopPropagation()}>
          <Button circle outline className='modal__closeBtn' onClick={closeModal}>X</Button>
          {html}
        </div>
      </div>
    )
  }
}

export default useModal