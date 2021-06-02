import classes from './BackButton.module.css';
import { useHistory } from 'react-router-dom';

const BackButton = (props) => {
  const history = useHistory();

  const backHandler = (event) => {
    event.preventDefault();
    history.replace(props.path);
  };

  return (
    <button className={classes.backButton} type="button" onClick={backHandler}>
      Back
    </button>
  );
};

export default BackButton;
