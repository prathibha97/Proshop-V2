import { useEffect } from 'react'
import { Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Loader, Message } from '../components'
import { getOrderDetails } from '../redux/actions/orderActions'

const Order = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    if (!loading) {
        const addDecimal = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        // calculate prices
        order.itemsPrice = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [dispatch, getOrderDetails])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        <h1>Order {order.id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong><Link to={`mailto:${order.user.email}`} style={{ textDecoration: 'none' }}>{order.user.email}</Link></p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode},{' '}
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>Delivered on {order.deliveredAt}
                            </Message>
                        ) : (
                            <Message variant='danger'>Not Delivered
                            </Message>
                        )}
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}
                            </Message>
                        ) : (
                            <Message variant='danger'>Not Paid
                            </Message>
                        )}
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>Your order is empty</Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroupItem key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Order Summary</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default Order