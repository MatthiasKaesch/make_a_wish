import classes from './AddFriend.module.css';

import React, { useState } from 'react';

import BackButton from '../BackButton/BackButton';

const FriendList = () => {
  const [searchMode, setSearchMode] = useState(false);

  const toggleHandler = () => {
    setSearchMode((searchMode) => !searchMode);
  };

  const addFriendHandler = () => {};

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
            <input type="text" />
          </div>
        ) : (
          <div className={classes.addFriendInput}>
            <p>User ID:</p>
            <input type="text" />
          </div>
        )}
        <button className={classes.searchButton} onClick={addFriendHandler}>
          SEARCH
        </button>
        <BackButton path="/friendList" />
      </section>

      <hr />
    </div>
  );
};

export default FriendList;
