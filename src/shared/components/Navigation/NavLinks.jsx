import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';

import {AuthContext} from '../../context/auth-context';
import './NavLinks.css';

function NavLinks(props) {

  //components rerender whenever context we listening to changes
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact> ALL USERS </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places"> ALL PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new"> NEW PLACES</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth"> AUTHENTICATE</NavLink>
        </li>
      )}
       {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}> LOG OUT </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
