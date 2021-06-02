import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header>
      <nav className={classes.navigation}>
        <ul>
          <li>{isLoggedIn && <Link to="my_wishlist">Wishlist</Link>}</li>
          {<li>{isLoggedIn && <Link to="friendList"> Friends</Link>}</li>}
          <li>{isLoggedIn && <Link to="profile"> Profile</Link>}</li>
          <li className={classes.logoutButton}>
            {isLoggedIn && (
              <Link to="/login" onClick={logoutHandler}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
