import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logut: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;

/* 
{
  "rules": {
    ".read": "now < 1622844000000",  // 2021-6-5
    ".write": "now < 1622844000000",  // 2021-6-5
  }
} */

/* {
  "rules": {
    "$uid": {
      "wishes": {
        // Allow only authenticated content owners access to their data
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
 */

/* 
{
  "rules": {
    "wishes": {
      "$user_id": {
        ".write": "$user_id === auth.uid"
      }
    }
  }
} */
