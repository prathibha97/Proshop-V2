import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { Product } from "../components"
import api from "../utils/api"

const Home = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get('/products')
      setProducts(data)
    }
    fetchProducts()
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Home