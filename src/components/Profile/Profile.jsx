import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Profile.module.css';
import Spinner from '../Spinner/Spinner';

const Profile = (props) => {
  const history = useHistory();

  /*   const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); */
  const [profile, setProfile] = useState([]);
  const [showId, setShowId] = useState(false);

  const cancelHandler = (event) => {
    event.preventDefault();
    history.replace('/my_wishlist');
  };

  const fetchProfileHandler = useCallback(async () => {
    if (props.uid !== '') {
      /*       setIsLoading(true);
      setError(null); */
      try {
        const response = await fetch(
          `https://make-a-wish-2c068-default-rtdb.europe-west1.firebasedatabase.app/${props.uid}/profile.json`
        );
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();

        const fetchedProfile = [];

        for (const key in data) {
          fetchedProfile.push({
            name: data[key].name,
            dob: data[key].dob,
            email: data[key].email,
          });
          setProfile(fetchedProfile);
        }
      } catch (error) {
        /*      setError(error.message); */
      }
      /*       setIsLoading(false); */
    }
  }, [props.uid]);

  useEffect(() => {
    fetchProfileHandler();
  }, [fetchProfileHandler]);

  const showIdHandler = () => {
    setShowId(!showId);
  };

  return profile[0] !== undefined ? (
    <div>
      <section className={classes.profile}>
        <h2 className={classes.heading}>Personal Profile</h2>
        <p>
          Username: <span className={classes.userData}>{profile[0].name}</span>
        </p>
        <p>
          Date of Birth: <span className={classes.userData}>{profile[0].dob}</span>
        </p>
        <p>
          E-Mail: <span className={classes.userData}>{profile[0].email}</span>
        </p>
        <hr />
        <div>
          <h3 className={classes.heading}>Private Information</h3>

          <p className={showId ? classes.show : classes.hide}>
            {showId ? 'UserID: ' + props.uid : 'Confidential information'}
          </p>
          <button className={classes.privacyButton} type="button" onClick={showIdHandler}>
            {showId ? 'Hide' : 'Show'}
          </button>
        </div>

        <button className={classes.cancelButton} type="button" onClick={cancelHandler}>
          Back
        </button>
      </section>
    </div>
  ) : (
    <Spinner />
  );
};

export default Profile;
