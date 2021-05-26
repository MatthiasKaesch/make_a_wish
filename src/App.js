import React, { Suspense, useCallback, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import classes from './App.module.css';

import Auth from './components/Auth/AuthForm';
import Register from './components/Register/RegisterForm';
import Profile from './components/Profile/Profile'; /* 
import FriendList from './components/FriendList/FriendList'; */

const MainNavigation = React.lazy(() => import('./components/Layout/MainNavigation'));
const WishList = React.lazy(() => import('./components/WishList/WishList'));
const NewWish = React.lazy(() => import('./components/NewWish/NewWish'));

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishes, setWishes] = useState([]);
  const [uid, setUid] = useState('');

  /*   const [friends, setFriends] = useState([{ name: '' }]); */

  const onPassUidHandler = (fetchedUid) => {
    setUid(fetchedUid);
  };

  const fetchWishesHandler = useCallback(async () => {
    if (uid !== '') {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://make-a-wish-2c068-default-rtdb.europe-west1.firebasedatabase.app/${uid}/wishes.json`
        );
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();

        const fetchedWishes = [];

        for (const key in data) {
          fetchedWishes.push({
            id: key,
            title: data[key].title,
            price: data[key].price,
            friendList: data[key].friendList,
          });
        }

        setWishes(fetchedWishes);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    fetchWishesHandler();
  }, [fetchWishesHandler]);

  async function wishAddHandler(wish) {
    await fetch(
      `https://make-a-wish-2c068-default-rtdb.europe-west1.firebasedatabase.app/${uid}/wishes.json`,
      {
        method: 'POST',
        body: JSON.stringify(wish),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    /* const data = await response.json(); */
    fetchWishesHandler();
  }

  async function wishDeleteHandler(event) {
    const id = event.target.parentNode.id;
    const URL = `https://make-a-wish-2c068-default-rtdb.europe-west1.firebasedatabase.app/${uid}/wishes/${id}.json`;
    await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    /* const data = await response.json(); */
    fetchWishesHandler();
  }

  return (
    <main>
      <div className={classes.app}>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
        <Suspense fallback={<p>Loading...</p>}>
          <Route path="/login">
            <Auth onPassUid={onPassUidHandler} />
          </Route>
          <Route path="/profile">
            <MainNavigation />
            <Profile uid={uid} />
          </Route>
          {/*  <Route path="/friendList">
            <MainNavigation />
            <FriendList friends={friends} />
          </Route> */}
          <Route path="/register">
            <Register onPassUid={onPassUidHandler} />
          </Route>
          {!isLoading && !error && (
            <Route path="/my_wishlist">
              <MainNavigation />
              <WishList onRemoveWish={wishDeleteHandler} wishes={wishes} />
            </Route>
          )}
          {!isLoading && !error && (
            <Route path="/new_wish">
              <MainNavigation />
              <NewWish onAddWish={wishAddHandler} />
            </Route>
          )}
        </Suspense>
      </div>
    </main>
  );
}

export default App;
