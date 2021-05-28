import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import './MainNavigation.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header>
      <nav className={'navigation'}>
        <ul>
          <li>{isLoggedIn && <Link to="my_wishlist">Wishlist</Link>}</li>
          {/*           <li>{isLoggedIn && <Link to="friendList"> Friends</Link>}</li> */}
          <li>{isLoggedIn && <Link to="profile"> Profile</Link>}</li>
          <li>
            {isLoggedIn && (
              <Link to="/login" onClick={logoutHandler}>
                Logout
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
