import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './NewWish.module.css';

const NewWish = (props) => {
  const wishTitleInput = useRef();
  const wishPriceInput = useRef();
  const wishFriendList = useRef();

  const history = useHistory();

  const wishSubmitHandler = (event) => {
    event.preventDefault();

    const newWish = {
      title: wishTitleInput.current.value,
      price: wishPriceInput.current.value,
      friendList: wishFriendList.current.value,
    };
    props.onAddWish(newWish);
    history.replace('/my_wishlist');
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.replace('/my_wishlist');
  };

  return (
    <form onSubmit={wishSubmitHandler} id="addWish" className={classes.addWish}>
      <h2>New Wish</h2>
      <label htmlFor="wish-title">Title</label>
      <input
        className={classes.wishInput}
        id="wish-title"
        type="text"
        placeholder="Wish title"
        ref={wishTitleInput}
      />

      <label htmlFor="price">Price</label>
      <input
        className={classes.wishInput}
        id="price"
        type="text"
        placeholder="Price"
        ref={wishPriceInput}
      />

      <label htmlFor="publicTo">Share with:</label>
      <input
        className={classes.wishInput}
        id="publicTo"
        type="text"
        placeholder="Please choose"
        ref={wishFriendList}
      />
      <div className={classes.buttonContainer}>
        <button className={classes.submitButton} type="submit" onClick={props.onAddHandler}>
          Make a Wish
        </button>
        <button className={classes.cancelButton} type="button" onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewWish;
