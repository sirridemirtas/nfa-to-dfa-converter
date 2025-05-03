export function nfaToDfa({
  states,
  alphabet,
  transitions,
  startState,
  finalStates,
}) {
  // Remove epsilon from DFA alphabet if present
  const dfaAlphabet = alphabet.filter((symbol) => symbol !== "ε");

  // Helper: epsilon closure for a single state
  function epsilonClosure(state) {
    const closure = new Set([state]);
    const stack = [state];
    while (stack.length > 0) {
      const curr = stack.pop();
      for (const [symbol, src, tgt] of transitions) {
        if (symbol === "ε" && src === curr && !closure.has(tgt)) {
          closure.add(tgt);
          stack.push(tgt);
        }
      }
    }
    return closure;
  }

  // Helper: epsilon closure for a set of states
  function epsilonClosureSet(stateSet) {
    const result = new Set();
    for (const s of stateSet) {
      for (const t of epsilonClosure(s)) result.add(t);
    }
    return Array.from(result).sort();
  }

  // Helper: move for a set of states and a symbol
  function move(stateSet, symbol) {
    const result = new Set();
    for (const s of stateSet) {
      for (const [sym, src, tgt] of transitions) {
        if (sym === symbol && src === s) result.add(tgt);
      }
    }
    return Array.from(result).sort();
  }

  // DFA construction
  const dfa = {
    states: [],
    alphabet: dfaAlphabet,
    transitions: [],
    startState: "",
    finalStates: [],
    stateMapping: {}, // { dfaStateStr: { name: "q0", originalStates: [...] } }
  };

  const stateNameMap = {};
  let stateCount = 0;
  function getStateName(stateArr) {
    const key = JSON.stringify(stateArr);
    if (!stateNameMap[key]) {
      stateNameMap[key] = `q${stateCount++}`;
    }
    return stateNameMap[key];
  }

  // Start with epsilon closure of start state
  const startSet = epsilonClosureSet([startState]);
  const startSetStr = JSON.stringify(startSet);
  dfa.states.push(startSetStr);
  dfa.startState = getStateName(startSet);
  dfa.stateMapping[startSetStr] = {
    name: dfa.startState,
    originalStates: startSet,
  };

  const queue = [startSet];
  const visited = new Set([startSetStr]);

  if (startSet.some((s) => finalStates.includes(s))) {
    dfa.finalStates.push(dfa.startState);
  }

  while (queue.length > 0) {
    const currentSet = queue.shift();
    const currentSetStr = JSON.stringify(currentSet);
    const currentName = dfa.stateMapping[currentSetStr].name;

    for (const symbol of dfa.alphabet) {
      const moveSet = move(currentSet, symbol);
      if (moveSet.length === 0) continue;
      const closureSet = epsilonClosureSet(moveSet);
      const closureSetStr = JSON.stringify(closureSet);
      if (!dfa.stateMapping[closureSetStr]) {
        const name = getStateName(closureSet);
        dfa.states.push(closureSetStr);
        dfa.stateMapping[closureSetStr] = { name, originalStates: closureSet };
        queue.push(closureSet);
        visited.add(closureSetStr);
        if (closureSet.some((s) => finalStates.includes(s))) {
          dfa.finalStates.push(name);
        }
      }
      dfa.transitions.push([
        symbol,
        currentName,
        dfa.stateMapping[closureSetStr].name,
      ]);
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
