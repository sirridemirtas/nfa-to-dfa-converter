import { useContext, useEffect } from "react";
import { AppContext } from "./store/Context";
import { AppActions } from "./store/Actions";

import "./App.css";

function App() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    // Save the state to the local storage
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const handleAddState = (e) => {
    e.preventDefault();

    const element = document.getElementById("input_state");
    const val = element.value.trim();

    if (val && !state.states.includes(val)) {
      dispatch({
        type: AppActions.ADD_STATE,
        payload: val,
      });
      element.value = "";
    }
  };

  const handleDeleteState = (e) => {
    e.preventDefault();

    const element = document.getElementById("select_state");
    const val = element.value.trim();
    if (val) {
      dispatch({
        type: AppActions.DELETE_STATE,
        payload: val,
      });
    }
  };

  const handleSelectStartState = (e) => {
    e.preventDefault();
    const element = document.getElementById("select_start_state");
    const startState = element.value.trim();
    if (startState) {
      dispatch({
        type: AppActions.SET_START_STATE,
        payload: startState,
      });
    }
  };

  const handleAddFinalState = (e) => {
    e.preventDefault();

    const element = document.getElementById("input_final_state");
    const finalState = element.value.trim();

    if (finalState && !state.finalStates.includes(finalState)) {
      dispatch({
        type: AppActions.ADD_FINAL_STATE,
        payload: finalState,
      });
      element.value = "";
    }
  };

  const handleDeleteFinalState = (e) => {
    e.preventDefault();

    const element = document.getElementById("select_final_state");
    const finalState = element.value.trim();

    if (finalState) {
      dispatch({
        type: AppActions.DELETE_FINAL_STATE,
        payload: finalState,
      });
    }
  };

  const handleAddTransition = (e) => {
    e.preventDefault();

    const symbol = document.getElementById("input_symbol").value.trim();
    const source = document.getElementById("input_source").value.trim();
    const target = document.getElementById("input_target").value.trim();

    if (symbol && source && target) {
      if (
        state.transitions.find(
          // transition format: [symbol, source, target]
          (t) => t[1] === source && t[0] === symbol && t[2] === target
        )
      ) {
        console.log("Transition already exists");
        return;
      }

      dispatch({
        type: AppActions.ADD_TRANSITION,
        payload: {
          symbol: symbol,
          source: source,
          target: target,
        },
      });
    }
  };

  return (
    <div className="app">
      <table className="actions">
        <thead>
          <tr>
            <th>
              <h2>Create NFA</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <form onSubmit={handleAddState}>
                <fieldset>
                  <legend>Add State</legend>
                  <input type="text" id="input_state" placeholder="State" />
                  <button>Add</button>
                </fieldset>
              </form>
            </td>
          </tr>
          {state.states.length > 0 && (
            <tr>
              <td>
                <form onSubmit={handleDeleteState}>
                  <fieldset>
                    <legend>Delete State</legend>
                    <select id="select_state">
                      {/* <option value="">- Select -</option> */}
                      {state.states
                        .slice()
                        .reverse()
                        .map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                    <button className="delete">Delete</button>
                  </fieldset>
                </form>
              </td>
            </tr>
          )}
          {state.states.length > 0 && (
            <tr>
              <td>
                <form onSubmit={handleSelectStartState}>
                  <fieldset>
                    <legend>Start State</legend>
                    <select
                      id="select_start_state"
                      onChange={handleSelectStartState}
                    >
                      <option value="">- Select -</option>
                      {state.states.map((state) => (
                        <option key={state}>{state}</option>
                      ))}
                    </select>
                  </fieldset>
                </form>
              </td>
            </tr>
          )}
          {state.states.length > 0 && (
            <tr>
              <td>
                <form onSubmit={handleAddFinalState}>
                  <fieldset>
                    <legend>Add Final State</legend>
                    <select id="input_final_state">
                      <option value="">- Select -</option>
                      {state.states
                        .filter((s) => !state.finalStates.includes(s))
                        .map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                    </select>
                    <button>Add</button>
                  </fieldset>
                </form>
              </td>
            </tr>
          )}
          {state.finalStates.length > 0 && (
            <tr>
              <td>
                <form onSubmit={handleDeleteFinalState}>
                  <fieldset>
                    <legend>Delete Final State</legend>
                    <select id="select_final_state">
                      <option value="">- Select -</option>
                      {state.finalStates.reverse().map((state) => (
                        <option key={state}>{state}</option>
                      ))}
                    </select>
                    <button className="delete">Delete</button>
                  </fieldset>
                </form>
              </td>
            </tr>
          )}
          {state.states.length > 0 && (
            <tr>
              <td>
                <form onSubmit={handleAddTransition}>
                  <fieldset>
                    <legend>Add Transition</legend>
                    <input type="text" id="input_symbol" placeholder="Symbol" />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("input_symbol").value = "ε";
                      }}
                    >
                      ε
                    </button>
                    <select id="input_source">
                      <option value="">- Source -</option>
                      {state.states.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <select id="input_target">
                      <option value="">- Target -</option>
                      {state.states.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <button>Add</button>
                  </fieldset>
                </form>
              </td>
            </tr>
          )}
          {state.states.length > 0 && (
            <tr>
              <td>
                <button
                  onClick={() => {
                    dispatch({ type: AppActions.RESET });
                  }}
                >
                  Reset DFA
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="formal_definition">
        <h2>NFA Formal Definition</h2>
        {state.states.length > 0 && (
          <p>
            <b>Q</b>: {state.states.join(", ")}
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
            <b>F</b>: {state.finalStates.join(", ")}
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
          States: {state.states.length}, Final States:{" "}
          {state.finalStates.length}, Transitions: {state.transitions.length}
        </small>
      </div>
    </div>
  );
}

export default App;
