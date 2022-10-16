import { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom"
import { Loader, Message, Meta, Paginate, Product, ProductCarousel } from "../components"
import { listProducts } from "../redux/actions/productActions"


const Home = () => {

  const dispatch = useDispatch()
  const params = useParams()
  const { keyword, pageNumber } = params

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))

  }, [dispatch, listProducts, pageNumber, keyword]);

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
  return (
    <>
      <Meta />
      {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
      <h1>Latest Products</h1>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </>
        )}
    </>
  )
}

export default Home