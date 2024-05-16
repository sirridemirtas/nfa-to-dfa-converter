import { createContext, useReducer } from "react";
import { AppReducer } from "./Reducer";

const AppContext = createContext();

export const initialState = {
  states: [],
  startState: "",
  finalStates: [],
  transitions: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
