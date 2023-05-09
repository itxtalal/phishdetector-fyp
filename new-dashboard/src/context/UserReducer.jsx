import { useReducer, useCallback } from "react";

export const USER_STORAGE_KEY = "USER_STORAGE_KEY";
export const INITIAL_STATE = {
  email: "",
  username: "",
  token: "",
};

export const actions = {
  SET_USER: "SET_USER",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        ...(action.payload ?? INITIAL_STATE),
      };
    default:
      return state;
  }
};

const init = () => {
  try {
    const user = sessionStorage.getItem(USER_STORAGE_KEY);
    console.log("INIT RUNNING");
    if (user !== null) return JSON.parse(user);
    else {
      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(INITIAL_STATE));
    }
    return INITIAL_STATE;
  } catch {}
};

export function usePersistReducer() {
  const reducerLocalStorage = useCallback((state, action) => {
    const newState = reducer(state, action);
    try {
      // store new state in session storage
      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newState));
    } catch {
      // if user is in incognito mode, `localStorage` access
      // will throw an error. The state could fail to stringify
      // too. So do nothing
    }
    return newState;
  }, []);
  return useReducer(reducerLocalStorage, undefined, init);
}
