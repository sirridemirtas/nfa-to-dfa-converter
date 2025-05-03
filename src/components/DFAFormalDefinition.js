import { useContext } from "react";
import { AppContext } from "../store/Context";
import { nfaToDfa } from "../lib/nfaToDfa";

export const DFAFormalDefinition = () => {
  const { state } = useContext(AppContext);
  const dfa = nfaToDfa(state);
  const {
    states,
    alphabet,
    startState,
    finalStates,
    transitions,
    stateMapping,
  } = dfa;

  return (
    <div className="formal_definition">
      <h2>DFA Formal Definition</h2>
      <code style={{ whiteSpace: "pre", lineHeight: "1.5" }}>
        {states.length > 0 && (
          <>
            <b>Q</b> = {"{"}
            {states.map(
              (s, i) =>
                stateMapping[s].name + (i < states.length - 1 ? ", " : "")
            )}
            {"}"}
            <br />
          </>
        )}
        {alphabet.length > 0 && (
          <>
            <b>Σ</b> = {"{"}
            {alphabet.map((a, i) => a + (i < alphabet.length - 1 ? ", " : ""))}
            {"}"}
            <br />
          </>
        )}
        {startState && (
          <>
            <b>q</b>
            <sub>0</sub> = {startState}
            <br />
          </>
        )}
        {finalStates.length > 0 && (
          <>
            <b>F</b> = {"{"}
            {finalStates.map(
              (f, i) => f + (i < finalStates.length - 1 ? ", " : "")
            )}
            {"}"}
            <br />
          </>
        )}
        {transitions.length > 0 && (
          <>
            <b>δ</b> : Q × Σ → Q<br />
            {transitions.map((t, index) => (
              <span key={index}>
                {"    "}δ({t[1]}, {t[0]}) = {t[2]}
                {index < transitions.length - 1 && <br />}
              </span>
            ))}
            <br />
          </>
        )}
      </code>
      <small>
        States: {states.length}, Final States: {finalStates.length},
        Transitions: {transitions.length}
      </small>
    </div>
  );
};
