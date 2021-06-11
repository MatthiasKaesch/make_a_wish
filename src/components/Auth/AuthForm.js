import { useState, useRef, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import Spinner from '../Spinner/Spinner';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

import API_KEY from '../../ApiKey.js';

const AuthForm = (props) => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  /* const [isLogin, setIsLogin] = useState(true); */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //Validation
    setIsLoading(true);
    let url;

    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

    if (!enteredEmail || !enteredPassword) {
      setError('Please fill all fields');
      setIsLoading(false);
    } else {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              if (data && data.error && data.error.message) {
                switch (data.error.message) {
                  case 'WEAK_PASSWORD : Password should be at least 6 characters':
                    setError('Password should be at least 6 characters');
                    break;
                  case 'EMAIL_EXISTS':
                    setError('Email is already in use');
                    break;
                  case 'INVALID_PASSWORD':
                    setError('Email and Password do not match');
                    break;
                  case 'INVALID_EMAIL':
                    setError(`${enteredEmail} is not a valid Email`);
                    break;
                  case 'EMAIL_NOT_FOUND':
                    setError(`Could not find account for ${enteredEmail}`);
                    break;
                  case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
                    setError('To many attempts. Please try again later');
                    break;
                  default:
                    setError('Authentication failed');
                }
              }

              throw new Error(error);
            });
          }
        })
        .then((data) => {
          console.log(data);
          authCtx.login(data.idToken);
          props.onPassUid(data.localId);
          history.replace('/my_wishlist');
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div>
      <section className={classes.auth}>
        <h1>
          MAKE <span>a</span> WISH
        </h1>
        <hr className={classes.horizontal_line} />

        <form>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required ref={passwordInputRef} />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <Link to="/my_wishlist" onClick={submitHandler}>
                <button type="submit">Login</button>
              </Link>
            )}
            {isLoading && <Spinner />}
            <p className={classes.error}>{error && error}</p>
            <hr className={classes.line} />

            <p className={classes.register}>
              Not registered yet? Create a profile <Link to="register">HERE</Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
