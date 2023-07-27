import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Overlay, ModalWindow } from "./Modal.styled"

const Modal = ({tags, largeUrl, onClose}) => {

  useEffect(()=>{

    const handleKeyDown = e => {
      if(e.code === 'Escape'){
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return() => {window.removeEventListener('keydown', handleKeyDown)}
  },[onClose])

  const handleOverlayClick = e => {
    if(e.currentTarget === e.target){
      onClose()
    }
  }

    return(
      <Overlay onClick={handleOverlayClick}>
      <ModalWindow>
        <img src={largeUrl} alt={tags} />
      </ModalWindow>
    </Overlay>
    )
}

export default Modal

Modal.propTypes = {
  largeUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired}
