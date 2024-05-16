import { createContext, useReducer } from "react";
import { AppReducer } from "./Reducer";

const AppContext = createContext();

export const initialState = {
  states: [],
  startState: "",
  finalStates: [],
  transitions: [],
  alphabet: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    AppReducer,
    // Load the state from the local storage if it exists
    (initialState, JSON.parse(localStorage.getItem("state")) || initialState)
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
