import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Message } from '../components'
import { addToCart } from '../redux/actions/cartActions'

const Cart = () => {
  // const dispatch = useDispatch()
  // const { productId } = useParams()
  // const [searchParams] = useSearchParams()
  // const qty = Number(searchParams.get('qty'))

  // useEffect(() => {
  //   if (productId) {
  //     dispatch(addToCart(productId, qty))
  //   }
  // }, [dispatch, productId, qty])
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  console.log(cart);
  return (
    <div>Cart</div>
  )
}

export default Cart