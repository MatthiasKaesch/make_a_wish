import classes from './AddFriend.module.css';

import React, { useState, useCallback, useRef, useEffect } from 'react';

import BackButton from '../BackButton/BackButton';

const AddFriend = () => {
  const [searchMode, setSearchMode] = useState(false);
  const [fetchedUser, setFetchedUser] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchInput = useRef('');

  const toggleHandler = () => {
    setSearchMode((searchMode) => !searchMode);
  };

  const fetchUserHandler = useCallback(async () => {
    const searchString = searchInput.current.value;

    if (searchString !== '') {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://make-a-wish-2c068-default-rtdb.europe-west1.firebasedatabase.app/users/${searchString}.json`
        );
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        /*  console.log(data); */

        const user = [data.name];
        setFetchedUser(user);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      <h2>Add new friend</h2>
      <section>
        <button className={classes.toggleButton} onClick={toggleHandler}>
          {searchMode ? 'Search by user ID' : 'Search by name'}
        </button>
        {searchMode ? (
          <div className={classes.addFriendInput}>
            <p>User Name:</p>
            <input ref={searchInput} type="text" />
          </div>
        ) : (
          <div className={classes.addFriendInput}>
            <p>User ID:</p>
            <input ref={searchInput} type="text" />
          </div>
        )}
        <button className={classes.searchButton} onClick={fetchUserHandler}>
          SEARCH
        </button>
        <BackButton path="/friendList" />
      </section>
      <p>{fetchedUser}</p>
      <hr />
    </div>
  );
};

export default AddFriend;
