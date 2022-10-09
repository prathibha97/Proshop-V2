import { Container } from 'react-bootstrap'
import { Footer, Header } from "./components"
import { Home } from './pages'

function App() {

  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Home/>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
