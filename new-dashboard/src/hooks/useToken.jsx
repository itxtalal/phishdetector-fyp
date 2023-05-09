import React, { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = tokenString && JSON.parse(tokenString);

    return userToken;
  };

  const [token, setToken] = useState(() => getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    token,
    setToken: saveToken,
  };
};

export default useToken;
