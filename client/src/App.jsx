import { Container } from 'react-bootstrap'
import { Footer, Header } from "./components"

function App() {

  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to Proshop</h1>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
