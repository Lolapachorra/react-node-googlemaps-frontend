
import {Link, BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/NavBar'
import Home from './components/Home'
import Footer from './components/Footer'
import AllEntregas from './components/AllEntregas'
import Container from './components/Container'
import CriarEntrega from './components/CriarEntrega'
import Message from './components/Layouts/Message'

function App() {
 

  return (
    <BrowserRouter>
    <div className='App'>
    
      <Navbar />
      <Message />
      <Container />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/allentregas' element={<AllEntregas />} />
        <Route exact path='/create/entrega' element={<CriarEntrega />} />
        </Routes>
      <Footer />
    </div>
    </BrowserRouter>
     
  )
}

export default App
