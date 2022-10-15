import { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Loader, Message } from '../components'
import { listUsers } from '../redux/actions/userActions'

const UserList = () => {
    const dispatch = useDispatch()
    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])

    const deleteHandler = (id)=>{
        console.log('delete')
    }
    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{Error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>
                                    {user.name}</td>
                                <td>
                                    <Link to={`mailto:${user.email}`}>
                                        {user.email}
                                    </Link>
                                </td>
                                <td>
                                    {user.isAdmin ?
                                        (<i className='fas fa-check' style={{ color: 'green' }} />)
                                        :
                                        (<i className='fas fa-times' style={{ color: 'red' }} />
                                        )}
                                </td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <i className='fas fa-trash' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserList