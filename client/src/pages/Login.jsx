import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message, Loader, FormContainer } from '../components'
import { login } from '../redux/actions/userActions'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email'
                        placeholder='Enter your email address'
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='password'  className='py-3'>
                    <Form.Label>password</Form.Label>
                    <Form.Control type='password'
                        placeholder='Enter your password'
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Login