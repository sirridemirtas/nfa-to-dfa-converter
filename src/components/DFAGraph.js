import { useContext } from "react";
import { AppContext } from "../store/Context";
import { nfaToDfa } from "../lib/nfaToDfa";
import { FAGraph } from "./FAGraph";

export const DFAGraph = () => {
  const { state } = useContext(AppContext);
  const dfa = nfaToDfa(state);
  // Use human-readable state names and mapping for graph
  const graphData = {
    states: Object.values(dfa.stateMapping).map((m) => m.name),
    alphabet: dfa.alphabet,
    startState: dfa.startState,
    finalStates: dfa.finalStates,
    transitions: dfa.transitions.map(([symbol, src, tgt]) => [
      symbol,
      src,
      tgt,
    ]),
  };
  return <FAGraph data={graphData} title={"DFA Graph"} />;
};
