import { useContext } from "react";
import { AppContext } from "../store/Context";
import { nfaToDfa } from "../lib/nfaToDfa";

export const DFAFormalDefinition = () => {
  const { state } = useContext(AppContext);
  const { states, alphabet, startState, finalStates, transitions } =
    nfaToDfa(state);

  return (
    <div className="formal_definition">
      <h2>DFA Formal Definition</h2>
      {states.length > 0 && (
        <code>
          <b>Q</b>: {"{"}
          {states.join(", ")}
          {"}"}
        </code>
      )}
      {alphabet.length > 0 && (
        <code>
          <b>Σ</b>: {"{"}
          {alphabet.join(", ")}
          {"}"}
        </code>
      )}
      {startState && (
        <code>
          <b>
            q<sub>0</sub>
          </b>
          : {startState}
        </code>
      )}
      {finalStates.length > 0 && (
        <code>
          <b>F</b>: {"{"}
          {finalStates.join(", ")}
          {"}"}
        </code>
      )}
      {transitions.length > 0 && (
        <code>
          <b>δ</b>:{" "}
          {transitions.map((t, index) => (
            <span key={index}>
              δ({t[1]}, {t[0]}) = {t[2]}
              {index < transitions.length - 1 && <br />}
            </span>
          ))}
        </code>
      )}
      <small>
        States: {states.length}, Final States: {finalStates.length},
        Transitions: {transitions.length}
      </small>
    </div>
  );
};
