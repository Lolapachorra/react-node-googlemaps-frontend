import { Link } from "react-router-dom";
import styles from "../css/Navbar.module.css";
const Navbar = () => {

  return (
    <nav className={styles.navbar}>
    <div>
        Projeto react + node + googlemaps
    </div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to="/allentregas">Ver todas as entregas</Link></li>
        <li><Link to='/create/entrega'> Criar Entrega</Link></li>
      </ul>
       
         
    </nav>
  );
};

export default Navbar;