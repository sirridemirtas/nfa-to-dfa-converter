import { AppActions } from "./Actions";
import { initialState } from "./Context";

export const AppReducer = (state, action) => {
  switch (action.type) {
    case AppActions.ADD_STATE:
      return {
        ...state,
        states: [...state.states, action.payload],
      };

    case AppActions.DELETE_STATE:
      return {
        ...state,
        states: state.states.filter((state) => state !== action.payload),

        // Remove the state from the start state, final states and transitions
        finalStates: state.finalStates.filter(
          (finalState) => finalState !== action.payload
        ),
        startState: state.startState === action.payload ? "" : state.startState,
        transitions: state.transitions.filter(
          (transition) =>
            transition[1] !== action.payload && transition[2] !== action.payload
        ),
      };

    case AppActions.SET_START_STATE:
      return {
        ...state,
        startState: action.payload,
      };

    case AppActions.ADD_FINAL_STATE:
      return {
        ...state,
        finalStates: [...state.finalStates, action.payload],
      };

    case AppActions.DELETE_FINAL_STATE:
      return {
        ...state,
        finalStates: state.finalStates.filter(
          (state) => state !== action.payload
        ),
      };

    case AppActions.ADD_TRANSITION:
      return {
        ...state,
        transitions: [
          ...state.transitions,
          // transition format: [symbol, source, target]
          [action.payload.symbol, action.payload.source, action.payload.target],
        ],
      };

    case AppActions.DELETE_TRANSITION:
      // Remove the transition at the specified index
      let temp = [...state.transitions];
      temp.splice(action.payload, 1);
      return {
        ...state,
        transitions: temp,
      };

    case AppActions.RESET:
      return initialState;

    case AppActions.ADD_SYMBOL:
      return {
        ...state,
        alphabet: [...state.alphabet, action.payload],
      };

    case AppActions.DELETE_SYMBOL:
      return {
        ...state,
        alphabet: state.alphabet.filter((symbol) => symbol !== action.payload),

        // Remove the symbol from the transitions
        transitions: state.transitions.filter(
          (transition) => transition[0] !== action.payload
        ),
      };

    default:
      return state;
  }
};
