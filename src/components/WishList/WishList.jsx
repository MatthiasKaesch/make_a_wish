import classes from './WishList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AddButton from './AddButton/AddButton';

const WishList = (props) => {
  let i = 0;
  let html;
  if (props.wishes.length !== 0) {
    html = (
      <section className={classes.container}>
        <ul>
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
          <AddButton />
        </ul>
      </section>
    );
  } else {
    html = (
      <div className={classes.wishList}>
        <p>No wishes yet. </p>
        <p>Click the + Button to add your first one.</p>
        <AddButton />
      </div>
    );
  }
  return html;
};

export default WishList;
