import React, { useEffect, useState } from 'react'
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormContainer, Loader, Message } from '../components'
import { getUserDetails, updateUser } from '../redux/actions/userActions'
import { USER_UPDATE_RESET } from '../redux/constants/userConstants'

const UserEdit = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: loadingError, success: successUpdate } = userUpdate

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== id) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, id, dispatch, successUpdate, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: id, name, email, isAdmin }))
    }
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {loadingError && <Message variant='danger'>{loadingError}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <FormGroup controlId='name'>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl type='name'
                                value={name}
                                placeholder='Enter your name address'
                                onChange={e => setName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId='email' className='py-3'>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl type='email'
                                value={email}
                                placeholder='Enter your email address'
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId='isAdmin' className='py-2'>
                            <FormCheck type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={e => setIsAdmin(e.target.checked)}
                            />
                        </FormGroup>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>

    )
}

export default UserEdit