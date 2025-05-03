import { useContext } from "react";
import { AppContext } from "../store/Context";

export const NFAFormalDefinition = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="formal_definition">
      <h2>NFA Formal Definition</h2>
      <code style={{ whiteSpace: "pre", lineHeight: "1.5" }}>
        {state.states.length > 0 && (
          <>
            <b>Q</b> = {"{"}
            {state.states.map(
              (s, i) => s + (i < state.states.length - 1 ? ", " : "")
            )}
            {"}"}
            <br />
          </>
        )}
        {state.alphabet.length > 0 && (
          <>
            <b>Σ</b> = {"{"}
            {state.alphabet.map(
              (a, i) => a + (i < state.alphabet.length - 1 ? ", " : "")
            )}
            {"}"}
            <br />
          </>
        )}
        {state.startState && (
          <>
            <b>q</b>
            <sub>0</sub> = {state.startState}
            <br />
          </>
        )}
        {state.finalStates.length > 0 && (
          <>
            <b>F</b> = {"{"}
            {state.finalStates.map(
              (f, i) => f + (i < state.finalStates.length - 1 ? ", " : "")
            )}
            {"}"}
            <br />
          </>
        )}
        {state.transitions.length > 0 && (
          <>
            <b>δ</b> : Q × Σ → P(Q)
            <br />
            {state.transitions.map((t, index) => (
              <span key={index}>
                {"    "}δ({t[1]}, {t[0]}) = {"{"}
                {t[2]}
                {"}"}
                {index < state.transitions.length - 1 && <br />}
              </span>
            ))}
            <br />
          </>
        )}
      </code>
      <small>
        States: {state.states.length}, Final States: {state.finalStates.length},
        Transitions: {state.transitions.length}
      </small>
    </div>
  );
};
