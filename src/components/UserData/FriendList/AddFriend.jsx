import classes from './AddFriend.module.css';

import React, { useState, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import BackButton from '../BackButton/BackButton';
import Spinner from '../../Spinner/Spinner';

const AddFriend = (props) => {
  const [fetchedUser, setFetchedUser] = useState([]);
  const [fetchedUserId, setFetchedUserId] = useState('');
  const [fetchedProfile, setFetchedProfile] = useState({ name: '', uid: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);

  const url = 'https://make-a-wish-2c068-default-rtdb.europe-west1.firebasedatabase.app';
  const searchInput = useRef('');

  const fetchUserHandler = useCallback(async () => {
    const searchString = searchInput.current.value;

    if (searchString === '') {
      setError('Please enter an ID');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const foundUsersResponse = await fetch(`${url}/users/${searchString}.json`);

      if (!foundUsersResponse.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await foundUsersResponse.json();

      setFetchedUser(data.name);
      setFetchedUserId(data.uid);
    } catch (error) {
      setFetchedUser('');
      switch (error.message) {
        case 'data is null':
          setError('No user with that ID found');
          break;
        default:
          setError('');
      }
    }
    setIsLoading(false);
  }, []);

  async function friendRequestHandler() {
    console.log('Friend Added');

    fetchProfileHandler();

    const friendEntry = {};
    friendEntry[props.uid] = fetchedProfile[0].name;
    console.log(friendEntry);

    await fetch(`${url}/users/${fetchedUserId}/friends.json`, {
      method: 'PUT',
      body: JSON.stringify(friendEntry),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const fetchProfileHandler = useCallback(async () => {
    if (props.uid !== '') {
      try {
        const response = await fetch(
          `https://make-a-wish-2c068-default-rtdb.europe-west1.firebasedatabase.app/users/${props.uid}.json`
        );
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();

        const profileData = [];

        profileData.push({
          name: data.name,
          uid: data.uid,
        });
        setFetchedProfile(profileData);
      } catch (error) {
        setError(error.message);
      }
    }
  }, [props.uid]);

  return (
    <div>
      <section>
        <h2>Add new friend</h2>

        <div className={classes.searchUser}>
          <p>User ID:</p>
          <input ref={searchInput} type="text" />
        </div>

        <button className={classes.searchButton} onClick={fetchUserHandler}>
          SEARCH
        </button>
        {isLoading && <Spinner />}
        {!isLoading &&
          (error ? (
            <p className={classes.error}>{error}</p>
          ) : (
            <div className={classes.userContainer}>
              <h3>{fetchedUser}</h3>
              <button onClick={friendRequestHandler}>
                <FontAwesomeIcon className={classes.addButton} icon={faPlus} />
              </button>
            </div>
          ))}

        <hr />
        <BackButton path="/friendList" />
      </section>
    </div>
  );
};

export default AddFriend;
