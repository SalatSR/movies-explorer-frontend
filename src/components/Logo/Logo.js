import './Logo.css';
import { NavLink } from 'react-router-dom';

function Logo(props) {
  return (
    <NavLink className="logo-link" activeClassName="logo-link_active" to="/" />
  )
}

export default Logo;