import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FormContainer , CheckoutSteps} from '../components'
import { saveShippingAddress } from '../redux/actions/cartActions'

const Shipping = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='py-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text'
                        value={address}
                        placeholder='Enter your address'
                        required
                        onChange={e => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='city' className='py-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text'
                        value={city}
                        placeholder='Enter your city'
                        required
                        onChange={e => setCity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='postalCode' className='py-2'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text'
                        value={postalCode}
                        placeholder='Enter Postal Code'
                        required
                        onChange={e => setPostalCode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='country' className='py-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text'
                        value={country}
                        placeholder='Enter your country'
                        required
                        onChange={e => setCountry(e.target.value)}
                    />
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default Shipping