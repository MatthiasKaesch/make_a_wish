import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import classes from './AddButton.module.css';

const AddButton = () => {
  return (
    <div className={classes.newWish}>
      <Link to="new_wish">
        <FontAwesomeIcon className={classes.trashBinIcon} icon={faPlus} />
      </Link>
    </div>
  );
};

export default AddButton;
