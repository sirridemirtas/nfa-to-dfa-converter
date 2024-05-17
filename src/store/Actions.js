export const AppActions = {
  // Add a new state to the NFA (state.states)
  ADD_STATE: "ADD_STATE",

  // Delete a state from the NFA (state.states)
  DELETE_STATE: "DELETE_STATE",

  // Set the start state of the NFA (state.startState)
  SET_START_STATE: "SET_START_STATE",

  // Add a new final state to the NFA (state.finalStates)
  ADD_FINAL_STATE: "ADD_FINAL_STATE",

  // Delete a final state from the NFA (state.finalStates)
  DELETE_FINAL_STATE: "DELETE_FINAL_STATE",

  // Add a new transition to the NFA (state.transitions)
  ADD_TRANSITION: "ADD_TRANSITION",

  // Delete a transition from the NFA (state.transitions)
  DELETE_TRANSITION: "DELETE_TRANSITION",

  // Reset the NFA (application state)
  RESET: "RESET",

  // Add symbol to alphabet (state.alphabet)
  ADD_SYMBOL: "ADD_SYMBOL",

  // Delete symbol from alphabet (state.alphabet)
  DELETE_SYMBOL: "DELETE_SYMBOL",

  // Load Sample NFA
  LOAD_SAMPLE_DATA: "LOAD_EXAMPLE",
};
