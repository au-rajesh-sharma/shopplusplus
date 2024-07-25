import {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {FaSearch} from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const navigate = useNavigate()
    const {keyword: urlKeyword} = useParams()
    //state variable keyword 
    const [keyword, setKeyword] = useState(urlKeyword || '')

const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()) {//if there is keyword
        navigate(`/search/${keyword}`)
        setKeyword('')//clear search box
    } else {
        navigate('/')
    
    }
}    

return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control 
            type='text' name='q'//q for query
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Products...'
            value={keyword}
            className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        
        <Button className='p-2 mx-3' 
            type='submit'
            variant='outline-light'
            // >Search
            ><FaSearch  />
        </Button>
        
</Form> 
  )
}

export default SearchBox