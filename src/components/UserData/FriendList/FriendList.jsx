import classes from './FriendList.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const FriendList = (props) => {
  return (
    <div>
      <section>
        <ul className={classes.friendList}>
          {props.friends.map((friend) => {
            return (
              <li key={props.userId}>
                <div>
                  <p>{friend.name}</p>
                  <p>{friend.name}s Wishes</p>
                </div>
                <button className={classes.dissmissButton} onClick={props.onRemoveFriend}>
                  <FontAwesomeIcon className={classes.trashBinIcon} icon={faTrash} />
                </button>
              </li>
            );
          })}
        </ul>
        <Link to="addFriend">Add new friend</Link>
      </section>
    </div>
  );
};

export default FriendList;
