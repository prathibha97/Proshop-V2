import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Footer, Header } from "./components"
import {
  Cart,
  Home,
  Login,
  Order,
  Payment,
  PlaceOrder,
  Product,
  Profile,
  Register,
  Shipping,
  UserList,
  UserEdit
} from './pages'

function App() {

  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/product/:id' element={<Product />} exact />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/:id' element={<Cart />} />
            <Route path='/order/:id' element={<Order />} />
            <Route path='/admin/userlist' element={<UserList />} />
            <Route path='/admin/user/:id/edit' element={<UserEdit />} />
            <Route path='/' element={<Home />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
