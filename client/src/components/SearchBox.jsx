import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Form, Button, FormControl} from 'react-bootstrap'

const SearchBox = () => {

    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    }

  return (
    <Form onSubmit={submitHandler} className="d-flex">
        <FormControl
        type="text"
        name = 'q'
        onChange={e=>setKeyword(e.target.value)}
        placeholder='Search Products ...'
        className='me-sm-2'
        />
        <Button type='submit' variant='outline-success' className='p-2'>
            Search
        </Button>
    </Form>
  )
}

export default SearchBox