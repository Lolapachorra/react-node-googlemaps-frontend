import {Link} from 'react-router-dom'
import styles from './Home.module.css'
const Home = () => {
   return(
      <div>
         <div>
         <h1>Projeto React + Node + Google Maps</h1>
         <p>Este é um projeto de estudo para aprender React, Node e Google Maps API.</p>
         <div className={styles.actions}>
           <Link to='/create/entrega'>Criar Entrega</Link>
            <Link to="/allentregas">Ver Todas as Entregas</Link>
         </div>
      </div>
       
      </div>
       )

};

export default Home;