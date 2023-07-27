import { useEffect, useState } from 'react'

import {getGallery} from '../services/api'
import Searchbar from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Container } from './App.styled'
import { Button } from './Button/Button'
import { Loader } from './Loader/Loader'


import { ToastContainer, toast } from 'react-toastify'


const toastConfig = {
  
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    
}


const App = () => {
  const [query, setQuery] = useState('')
  const [arrayImages, setArrayImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    if(query === ''){return};
    async function getImages () {
      try{
        setIsLoading(true);
        const response = await getGallery(query, currentPage);
        if(response.hits.length === 0){
          toast.info('Sorry, no pictures with this name were found', toastConfig)
        }
        setArrayImages(prevState => [...prevState, ...response.hits]);
        setTotalPage(Math.ceil(response.totalHits / 12))
      }catch(error){
        toast.error('Oops, something went wrong', toastConfig);
      }finally{
        setIsLoading(false);  
    }
    }
    getImages()
  },[query, currentPage])

  const incremCurrentPage = () => {
    setCurrentPage(prevState => prevState + 1)
  }

  const createQuery = (data) => {
    if(data === ''){
      toast.info('Please enter a word to search', toastConfig);
      return
    }
    setQuery(data);
    setArrayImages([]);
    setCurrentPage(1)
  }

    return(
      <Container>
        <Searchbar createQuery={createQuery}/>
        {isLoading && <Loader />}
        <ImageGallery images = {arrayImages}/>
        {arrayImages.length !== 0 && currentPage !== totalPage && <Button incremCurrentPage = {incremCurrentPage}/>}
        
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
      </Container>
    )
}

export default App