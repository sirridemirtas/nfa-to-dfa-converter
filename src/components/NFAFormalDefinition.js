import { useContext } from "react";
import { AppContext } from "../store/Context";

export const NFAFormalDefinition = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="formal_definition">
      <h2>NFA Formal Definition</h2>
      {state.states.length > 0 && (
        <code>
          <b>Q</b>: {"{"}
          {state.states.join(", ")}
          {"}"}
        </code>
      )}
      {state.alphabet.length > 0 && (
        <code>
          <b>Σ</b>: {"{"}
          {state.alphabet.join(", ")}
          {"}"}
        </code>
      )}
      {state.startState && (
        <code>
          <b>
            q<sub>0</sub>
          </b>
          : {state.startState}
        </code>
      )}
      {state.finalStates.length > 0 && (
        <code>
          <b>F</b>: {"{"}
          {state.finalStates.join(", ")}
          {"}"}
        </code>
      )}
      {state.transitions.length > 0 && (
        <code>
          <b>δ</b>:{" "}
          {state.transitions.map((t, index) => (
            <span key={index}>
              δ({t[1]}, {t[0]}) = {"{"}
              {t[2]}
              {"}"}
              {index < state.transitions.length - 1 && <br />}
            </span>
          ))}
        </code>
      )}
      <small>
        States: {state.states.length}, Final States: {state.finalStates.length},
        Transitions: {state.transitions.length}
      </small>
    </div>
  );
};
