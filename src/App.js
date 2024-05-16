import { useContext, useEffect } from "react";

import { AppContext } from "./store/Context";
import { AppActions } from "./store/Actions";

import "./App.css";

import { FormalDefinitionNFA } from "./components/FormalDefinitionNFA";
import { TransitionTableNFA } from "./components/TransitionTableNFA";

function App() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    // Save the state to the local storage
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const handleAddState = (e) => {
    e.preventDefault();

    const element = document.getElementById("input_state_add");
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

    const element = document.getElementById("select_state_delete");
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

    const element = document.getElementById("input_final_state_add");
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

    const element = document.getElementById("select_final_state_delete");
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

    const symbol = document
      .getElementById("transition__select_symbol")
      .value.trim();
    const source = document
      .getElementById("transition__select_source")
      .value.trim();
    const target = document
      .getElementById("transition__select_target")
      .value.trim();

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

  const handleAddSymbol = (e) => {
    e.preventDefault();

    const element = document.getElementById("input_symbol_add");
    const symbol = element.value.trim();

    if (symbol && !state.alphabet.includes(symbol)) {
      dispatch({
        type: AppActions.ADD_SYMBOL,
        payload: symbol,
      });

      element.value = "";
    }
  };

  const handleDeleteSymbol = (e) => {
    e.preventDefault();

    const element = document.getElementById("select_symbol_delete");
    const symbol = element.value.trim();

    if (symbol) {
      dispatch({
        type: AppActions.DELETE_SYMBOL,
        payload: symbol,
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
                  <input type="text" id="input_state_add" placeholder="State" />
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
                    <select id="select_state_delete">
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
          {
            <tr>
              <td>
                <form onSubmit={handleAddSymbol}>
                  <fieldset>
                    <legend>Add Symbol</legend>
                    <input
                      type="text"
                      id="input_symbol_add"
                      placeholder="Symbol"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("input_symbol_add").value = "ε";
                      }}
                    >
                      ε
                    </button>
                    <button type="submit">Add</button>
                  </fieldset>
                </form>
              </td>
            </tr>
          }
          {state.alphabet.length > 0 && (
            <tr>
              <td>
                <form onSubmit={handleDeleteSymbol}>
                  <fieldset>
                    <legend>Delete Symbol</legend>
                    <select id="select_symbol_delete">
                      <option value="">- Select -</option>
                      {state.alphabet.map((symbol) => (
                        <option key={symbol}>{symbol}</option>
                      ))}
                    </select>
                    <button className="delete">Delete</button>
                  </fieldset>
                </form>
              </td>
            </tr>
          )}
          {state.alphabet > 0 && (
            <tr>
              <td>
                <form onSubmit={handleDeleteSymbol}>
                  <fieldset>
                    <legend>Delete Symbol</legend>
                    <select id="select_symbol">
                      <option value="">- Select -</option>
                      {state.alphabet.map((symbol) => (
                        <option key={symbol}>{symbol}</option>
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
                    <select id="input_final_state_add">
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
                    <select id="select_final_state_delete">
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
                    {/* <input type="text" id="input_symbol" placeholder="Symbol" /> */}
                    <select id="transition__select_symbol">
                      <option value="">- Symbol -</option>
                      <option value="ε">ε</option>
                      {state.alphabet.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>

                    <select id="transition__select_source">
                      <option value="">- Source -</option>
                      {state.states.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <select id="transition__select_target">
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
                {/* NOTE: The application needs to be reset 
                when the context structure is changed 
                because the data in local storage remains the same */}
                <button
                  onClick={() => {
                    dispatch({ type: AppActions.RESET });
                  }}
                >
                  Reset NFA
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <FormalDefinitionNFA />
      <TransitionTableNFA />

      <footer>
        2024{" · "}Copyleft (ɔ) Sirri Demirtas{" · "}
        <a
          href="https://github.com/sirridemirtas/nfa-to-dfa-converter"
          target="_blank"
          rel="noreferrer"
        >
          View project on GitHub ↗
        </a>
      </footer>
    </div>
  );
}

export default App;
