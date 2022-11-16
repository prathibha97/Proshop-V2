import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormContainer, Loader, Message } from '../components'
import { listProductDetails, updateProduct } from '../redux/actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productConstants'
import api from '../utils/api'

const ProductEdit = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: ErrorUpdate, success: successUpdate } = productUpdate

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== id) {
                dispatch(listProductDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

    }, [product, id, dispatch, successUpdate, navigate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await api.post('/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (err) {
            console.log(err)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }))
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {ErrorUpdate && <Message variant='danger'>{ErrorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <FormGroup controlId='name'>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl type='name'
                                value={name}
                                placeholder='Enter name'
                                onChange={e => setName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId='price' className='py-3'>
                            <FormLabel>Price</FormLabel>
                            <FormControl type='number'
                                value={price}
                                placeholder='Enter price'
                                onChange={e => setPrice(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className='py-2'>
                            <FormLabel>Image</FormLabel>
                            <FormControl type='text'
                                value={image}
                                placeholder='Enter image url'
                                onChange={e => setImage(e.target.value)}
                            />
                            <FormControl id='image-file'
                                label='Choose File'
                                type="file"
                                onChange={uploadFileHandler}></FormControl>
                            {uploading && <Loader />}
                        </FormGroup>
                        <FormGroup controlId='brand' className='py-2'>
                            <FormLabel>Brand</FormLabel>
                            <FormControl type='text'
                                value={brand}
                                placeholder='Enter brand'
                                onChange={e => setBrand(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId='countInStock' className='py-3'>
                            <FormLabel>Count In Stock</FormLabel>
                            <FormControl type='number'
                                value={countInStock}
                                placeholder='Enter count In Stock'
                                onChange={e => setCountInStock(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId='category' className='py-2'>
                            <FormLabel>Category</FormLabel>
                            <FormControl type='text'
                                value={category}
                                placeholder='Enter category'
                                onChange={e => setCategory(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId='description' className='py-2'>
                            <FormLabel>Description</FormLabel>
                            <FormControl as="textarea"
                                value={description}
                                placeholder='Enter description'
                                style={{ height: '100px' }}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </FormGroup>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>

    )
}

export default ProductEdit