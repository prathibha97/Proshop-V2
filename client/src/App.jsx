import { Container } from 'react-bootstrap'
import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom'
import { Footer, Header } from "./components"
import { Cart, Home, Product } from './pages'

function App() {

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/product/:id' element={<Product />} exact />
            <Route path='/cart/:id?' element={<Cart />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
