import { library } from '@fortawesome/fontawesome-svg-core';
import React from 'react';

const FriendList = (props) => {
  return (
    <div>
      <h1>FriendList</h1>
      <section>
        <ul>
          {props.friends.map((friend) => {
            console.log(friend);
            return /*  <li>{friend}</li>; */ null;
          })}
        </ul>
      </section>
    </div>
  );
};

export default FriendList;
