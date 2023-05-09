import React, { createContext } from "react";

const initialState = {
  username: "",
  email: "",
  token: "",
  setState: {},
};

const UserContext = createContext(initialState);

export default UserContext;
