import classes from './AddFriend.module.css';

import React, { useState, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import BackButton from '../BackButton/BackButton';

const AddFriend = () => {
  const [searchMode, setSearchMode] = useState(false);
  const [fetchedUser, setFetchedUser] = useState([]);
  const [error, setError] = useState(true);

  const searchInput = useRef('');

  const toggleHandler = () => {
    setSearchMode(!searchMode);
    console.log(searchMode);
  };

  const fetchUserHandler = useCallback(async () => {
    const searchString = searchInput.current.value;

    if (searchString === '') {
      setError('Please enter a name or ID');
      return;
    }
    setError(null);
    try {
      const response = await fetch(
        `https://make-a-wish-2c068-default-rtdb.europe-west1.firebasedatabase.app/users/${searchString}.json`
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      const user = [data.name];
      setFetchedUser(user);
    } catch (error) {
      setFetchedUser('');
      switch (error.message) {
        case 'data is null':
          setError('No user with that name was found');
          break;
        default:
          setError('');
      }
    }
  }, []);

  return (
    <div>
      <section>
        <h2>Add new friend</h2>
        <button className={classes.toggleButton} onClick={toggleHandler}>
          {!searchMode ? 'Search by User ID' : 'Search by name'}
        </button>

        <div className={classes.searchUser}>
          <p>{searchMode ? 'User ID:' : 'User Name:'}</p>
          <input ref={searchInput} type="text" />
        </div>

        <button className={classes.searchButton} onClick={fetchUserHandler}>
          SEARCH
        </button>
        {error ? (
          <p className={classes.error}>{error}</p>
        ) : (
          <div>
            <p className={classes.user}>{fetchedUser}</p>
            <button>
              <FontAwesomeIcon className={classes.addButton} icon={faPlus} />
            </button>
          </div>
        )}
        <hr />
        <BackButton path="/friendList" />
      </section>
    </div>
  );
};

export default AddFriend;
