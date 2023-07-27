import PropTypes from 'prop-types'
import { useState } from 'react'
import { Header, SearchForm, Button, Input } from './Searchbar.styled'
import {ReactComponent as SearchIcon} from '../../icons/search.svg'


const Searchbar = ({createQuery}) => {

  const[searchName, setSearchName] = useState('')

  const handleChange = ({target}) => {
    setSearchName(target.value)
    }

  const handleSubmit = (e) => {
      
      e.preventDefault()
      createQuery(
        searchName.trim()
    )
    
    setSearchName('')

    }

        return(
          <Header>
            <SearchForm onSubmit = {handleSubmit}>
               <Button type="submit">
                     <SearchIcon width='25' height='25' stroke='white'/> 
               </Button>

               <Input
                   type="text"
                   autoComplete="off"
                   autoFocus
                   placeholder="Search images and photos"
                   onChange={handleChange}
                   value={searchName}
               />
            </SearchForm>
          </Header>
               )
 }


export default Searchbar

Searchbar.propTypes = {
  createQuery: PropTypes.func.isRequired}
