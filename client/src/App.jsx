import { Container } from 'react-bootstrap'
import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom'
import { Footer, Header } from "./components"
import { Cart, Home, Product } from './pages'
import Login from './pages/Login'

function App() {

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/product/:id' element={<Product />} exact />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/:id' element={<Cart />} />
            <Route path='/' element={<Home />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
