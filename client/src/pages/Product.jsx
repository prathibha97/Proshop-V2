import React, { useEffect, useState } from 'react'
import {
  Button, Card, Col, Form, FormControl, FormGroup, FormLabel,
  FormSelect, Image, ListGroup, ListGroupItem, Row
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Loader, Message, Meta, Rating } from '../components'
import { addToCart } from '../redux/actions/cartActions'
import { createProductReview, listProductDetails } from '../redux/actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants'

const Product = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { error: errorProductReview, success: successProductReview } = productReviewCreate

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (successProductReview) {
      alert('Review submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(id))
  }, [dispatch, listProductDetails, successProductReview])

  const AddToCartHandler = () => {
    dispatch(addToCart(id, qty))
    navigate(`/cart/${id}?qty=${qty}`)

  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id, {
      rating,
      comment,
    }))
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'> Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant='dander'>{error}</Message> : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={Number(product.rating)} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Price:
                      </Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status:
                      </Col>
                      <Col>
                        {product.countInStock > 0 ? 'In  stock' : 'Out of stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>}
                  <ListGroup.Item>
                    <div className='d-grid gap-2'>
                      <Button className='btn-block'
                        type='button'
                        disabled={product.countInStock === 0}
                        onClick={AddToCartHandler}
                      >
                        Add To Cart</Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} text='' />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId='rating'>
                        <FormLabel>Rating</FormLabel>
                        <FormSelect value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value={1}>1 - Poor</option>
                          <option value={2}>2 - Fair</option>
                          <option value={3}>3 - Good</option>
                          <option value={4}>4 - Very Good</option>
                          <option value={5}>5 - Excellent</option>
                        </FormSelect>
                      </FormGroup>
                      <FormGroup className='my-3'>
                        <FormLabel>Comment</FormLabel>
                        <FormControl as='textarea'
                          row='3'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        />
                      </FormGroup>
                      <Button type='submit' variant='primary'>Submit</Button>
                    </Form>
                  ) :
                    (
                      <Message>Please <Link to='/login'>Sign In</Link> to write a review</Message>
                    )
                  }
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default Product
