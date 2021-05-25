import { useState, useRef, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './RegisterForm.module.css';

const RegisterForm = (props) => {
  const history = useHistory();
  const userNameInputRef = useRef();
  const birthdayInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredName = userNameInputRef.current.value;
    const enteredBirthday = birthdayInputRef.current.value;

    const user = {
      name: enteredName,
      dob: enteredBirthday,
      email: enteredEmail,
    };

    //Validation
    setIsLoading(true);
    let url;
    const API_KEY = 'AIzaSyDmKuxhqvy2Gt55tZcWLmf4xmq1K7TBgpI';

    url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    if (!enteredEmail || !enteredPassword) {
      setError('Please fill all fields');
      setIsLoading(false);
      console.log(props.onPassUid);
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
              console.log(data.error);
              if (data && data.error && data.error.message) {
                switch (data.error.message) {
                  case 'WEAK_PASSWORD : Password should be at least 6 characters':
                    setError('Password should be at least 6 characters');
                    break;
                  case 'EMAIL_EXISTS':
                    setError('Email is already in use');
                    break;

                  case 'INVALID_EMAIL':
                    setError(`${enteredEmail} is not a valid Email`);
                    break;

                  default:
                    setError('Registration failed');
                }
              }

              throw new Error(error);
            });
          }
        })
        .then((data) => {
          alert('Registration successful!');
          props.onPassUid(data.localId);
          authCtx.login(data.idToken);
          history.replace('/my_wishlist');
          profileSetupHandler(data.localId, user);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  async function profileSetupHandler(uid, user) {
    await fetch(
      `https://make-a-wish-2c068-default-rtdb.europe-west1.firebasedatabase.app/${uid}/profile.json`,
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    /*  await fetch(
      `https://make-a-wish-2c068-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`,
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ); */
    /* const data = await response.json(); */
  }

  return (
    <div>
      <section className={classes.auth}>
        <h1>Register</h1>
        <hr className={classes.line} />
        <form>
          <div className={classes.control}>
            <label htmlFor="name">Username</label>
            <input type="name" id="name" required ref={userNameInputRef} />
          </div>

          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="dob">Birthday</label>
            <input type="date" id="dob" required ref={birthdayInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required ref={passwordInputRef} />
          </div>
          <div className={classes.actions}>
            {
              <div>
                <Link to="/my_wishlist" onClick={submitHandler}>
                  <button type="submit">Sign Up</button>
                </Link>
                <Link to="/login">
                  <button type="submit">Cancel</button>
                </Link>
              </div>
            }
            {isLoading && <p>Loading....</p>}
            <p className={classes.error}>{error && error}</p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RegisterForm;
