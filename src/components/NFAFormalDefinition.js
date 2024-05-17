import { useContext } from "react";
import { AppContext } from "../store/Context";

export const NFAFormalDefinition = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="formal_definition">
      <h2>NFA Formal Definition</h2>
      {state.states.length > 0 && (
        <p>
          <b>Q</b>: {"{"}
          {state.states.join(", ")}
          {"}"}
        </p>
      )}
      {state.alphabet.length > 0 && (
        <p>
          <b>Σ</b>: {"{"}
          {state.alphabet.join(", ")}
          {"}"}
        </p>
      )}
      {state.startState && (
        <p>
          <b>
            q<sub>0</sub>
          </b>
          : {state.startState}
        </p>
      )}
      {state.finalStates.length > 0 && (
        <p>
          <b>F</b>: {"{"}
          {state.finalStates.join(", ")}
          {"}"}
        </p>
      )}
      {state.transitions.length > 0 && (
        <p>
          <b>δ</b>:{" "}
          {state.transitions.map((t, index) => (
            <span key={index}>
              δ({t[1]}, {t[0]}) = {"{"}
              {t[2]}
              {"}"}
              {index < state.transitions.length - 1 && ", "}
            </span>
          ))}
        </p>
      )}
      <small>
        States: {state.states.length}, Final States: {state.finalStates.length},
        Transitions: {state.transitions.length}
      </small>
    </div>
  );
};
