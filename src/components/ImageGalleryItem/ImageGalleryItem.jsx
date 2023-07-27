import PropTypes from 'prop-types'
import { useState } from 'react'
import Modal from 'components/Modal/Modal'
import { GalleryItem, Image } from "./ImageGalleryItem.styled"

const ImageGalleryItem = ({url, tags, largeUrl}) => {
    
    const[showModal, setshowModal] = useState(false)

    const toggleModal = () => {
        setshowModal(!showModal)
      }

    return(
        <GalleryItem >
            <Image onClick={toggleModal} src={url} alt={tags} />
            {showModal && <Modal largeUrl = {largeUrl} tags={tags} onClose = {toggleModal}/>}
        </GalleryItem>
    )
}

export default ImageGalleryItem

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeUrl: PropTypes.string.isRequired,
    }