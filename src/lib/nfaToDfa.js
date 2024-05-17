export function nfaToDfa({
  states,
  alphabet,
  transitions,
  startState,
  finalStates,
}) {
  const nfa = {
    states,
    alphabet,
    transitions,
    startState,
    finalStates,
  };

  const dfa = {
    states: [],
    alphabet: alphabet,
    transitions: [],
    startState: "",
    finalStates: [],
  };

  const queue = [];
  const visited = new Set();

  // Initialize the start state set with the NFA's start state
  const startStateSet = [startState];

  // Convert the start state set to a string for consistency
  const startStateStr = JSON.stringify(startStateSet);

  // Add the start state to the DFA states
  dfa.states.push(startStateStr);

  // Set the start state of the DFA
  dfa.startState = startStateStr;

  // Add the start state set to the queue for processing
  queue.push(startStateSet);

  // Mark the start state as visited
  visited.add(startStateStr);

  while (queue.length > 0) {
    // Dequeue the current state set for processing
    const currentStateSet = queue.shift();

    // Convert the current state set to a string
    const currentStateStr = JSON.stringify(currentStateSet);

    alphabet.forEach((symbol) => {
      // For each symbol in the alphabet, calculate the new state set
      const newStateSet = currentStateSet.reduce((acc, state) => {
        // Find transitions for the current symbol and state
        const transitionsFromState = nfa.transitions.filter(
          ([s, src]) => s === symbol && src === state
        );

        // Get the target states from these transitions
        const newStates = transitionsFromState.map(
          ([_s, _src, target]) => target
        );

        return [...acc, ...newStates];
      }, []);

      if (newStateSet.length === 0) return;

      // Remove duplicates and sort the new state set
      const uniqueNewStateSet = [...new Set(newStateSet)].sort();

      // Convert the new state set to a string
      const uniqueNewStateStr = JSON.stringify(uniqueNewStateSet);

      // Add the transition to the DFA transitions
      dfa.transitions.push([symbol, currentStateStr, uniqueNewStateStr]);

      if (!visited.has(uniqueNewStateStr)) {
        // If the new state set has not been visited,
        // add it to DFA states and queue
        dfa.states.push(uniqueNewStateStr);
        queue.push(uniqueNewStateSet);

        // Mark the new state set as visited
        visited.add(uniqueNewStateStr);
      }
    });

    // If any state in the current state set is a final state,
    // add the current state set to DFA final states
    if (currentStateSet.some((state) => nfa.finalStates.includes(state))) {
      dfa.finalStates.push(currentStateStr);
    }
  }

  return dfa;
}

/*

const dfaTransitions = [
  ["0", "A", "A"],
  ["1", "A", "B"],
  ["1", "A", "C"],
  ["0", "B", "B"],
  ["1", "B", "A"],
  ["1", "B", "C"],
  ["0", "C", "A"],
  ["0", "C", "B"],
  ["1", "C", "C"],
];

const data = {
  states: ["A", "B", "C"],
  alphabet: ["0", "1"],
  startState: "A",
  finalStates: ["C"],
  transitions: dfaTransitions,
};

console.log("dfa:", nfaToDfa(data));
 */
