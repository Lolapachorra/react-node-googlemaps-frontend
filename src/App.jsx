
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Layouts/NavBar'
import Home from './components/pages/Home'
import Footer from './components/Layouts/Footer'
import AllEntregas from './components/pages/AllEntregas'
import Container from './components/Layouts/Container'
import CriarEntrega from './components/pages/CriarEntrega'
import Message from './components/Layouts/Message'
import EntregaMap from './components/pages/EntregaMap'
function App() {
 

  return (
    <BrowserRouter>
    <div className='App'>
    
      <Navbar />
      <Message />
      <Container>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/allentregas' element={<AllEntregas />} />
        <Route exact path='/create/entrega' element={<CriarEntrega />} />
        <Route exact path='/entrega/:id' element={<EntregaMap />} />
        </Routes>
        </Container>
      <Footer />
    </div>
    </BrowserRouter>
     
  )
}

export default App
