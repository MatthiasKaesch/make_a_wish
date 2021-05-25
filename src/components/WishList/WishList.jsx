import classes from './WishList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const WishList = (props) => {
  let i = 0;
  let html;
  if (props.wishes.length !== 0) {
    html = (
      <ul className={classes.wishList}>
        {props.wishes.map((wish) => {
          i++;
          return (
            <li key={wish.id} id={wish.id} className={classes.wishElement}>
              <div>
                <p>
                  <b>
                    {i}. {wish.title}
                  </b>
                </p>
                <p> {wish.price} €</p>
                <p> Public to: {wish.friendList}</p>
              </div>
              <button onClick={props.onRemoveWish} className={classes.deleteButton}>
                <FontAwesomeIcon className={classes.trashBinIcon} icon={faTrash} />
              </button>
            </li>
          );
        })}
        <li className={classes.newWish}>
          <Link to="new_wish">
            <FontAwesomeIcon className={classes.trashBinIcon} icon={faPlus} />
          </Link>
        </li>
      </ul>
    );
  } else {
    html = (
      <div className={classes.wishList}>
        <p>No wishes yet. </p>
        <p>Click the + Button to add your first one.</p>
        <ul>
          <li className={classes.newWish}>
            <Link to="new_wish">
              <FontAwesomeIcon className={classes.trashBinIcon} icon={faPlus} />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  return html;
};

export default WishList;
