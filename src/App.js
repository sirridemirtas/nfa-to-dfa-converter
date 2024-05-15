import { useState } from "react";
import "./App.css";

function App() {
  const [states, setStates] = useState([]);

  const handleAddState = (e) => {
    e.preventDefault();
    const element = document.getElementById("input_state");
    const state = element.value.trim();
    if (state && !states.includes(state)) {
      setStates([...states, state]);
      element.value = "";
    }
  };

  const handleDeleteState = (e) => {
    e.preventDefault();
    const element = document.getElementById("select_state");
    const state = element.value.trim();
    if (state) {
      setStates(states.filter((s) => s !== state));
    }
  };

  const [startState, setStartState] = useState("");

  const handleSelectStartState = (e) => {
    e.preventDefault();
    const element = document.getElementById("select_start_state");
    const startState = element.value.trim();
    if (startState) {
      setStartState(startState);
    }
  };

  const [finalStates, setFinalStates] = useState([]);

  const handleAddFinalState = (e) => {
    e.preventDefault();
    const element = document.getElementById("input_final_state");
    const finalState = element.value.trim();
    if (finalState && !finalStates.includes(finalState)) {
      setFinalStates([...finalStates, finalState]);
      element.value = "";
    }
  };

  const handleDeleteFinalState = (e) => {
    e.preventDefault();
    const element = document.getElementById("select_final_state");
    const finalState = element.value.trim();
    if (finalState) {
      setFinalStates(finalStates.filter((s) => s !== finalState));
    }
  };

  const [transitions, setTransitions] = useState({});
  /* 
  {
      "symbol": "A",
      "source": "q1",
      "target": "q2"
    }
  */
  const handleAddTransition = (e) => {
    e.preventDefault();
    const symbol = document.getElementById("input_symbol").value.trim();
    const source = document.getElementById("input_source").value.trim();
    const target = document.getElementById("input_target").value.trim();
    if (symbol && source && target) {
      setTransitions([
        ...transitions,
        {
          symbol,
          source,
          target,
        },
      ]);
    }
  };

  return (
    <div className="app">
      <table>
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
        {states.length > 0 && ( // select ile seçilen state silinsin
          <tr>
            <td>
              <form onSubmit={handleDeleteState}>
                <fieldset>
                  <legend>Delete State</legend>
                  <select id="select_state">
                    {/* <option value="">- Select -</option> */}
                    {states
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
        {states.length > 0 && (
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
                    {states.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </select>
                </fieldset>
              </form>
            </td>
          </tr>
        )}
        {states.length > 0 && (
          <tr>
            <td>
              <form onSubmit={handleAddFinalState}>
                <fieldset>
                  <legend>Add Final State</legend>
                  <select id="input_final_state">
                    <option value="">- Select -</option>
                    {states
                      .filter((state) => !finalStates.includes(state))
                      .map((state) => (
                        <option key={state}>{state}</option>
                      ))}
                  </select>
                  <button>Add</button>
                </fieldset>
              </form>
            </td>
          </tr>
        )}
        {finalStates.length > 0 && (
          <tr>
            <td>
              <form onSubmit={handleDeleteFinalState}>
                <fieldset>
                  <legend>Delete Final State</legend>
                  <select id="select_final_state">
                    <option value="">- Select -</option>
                    {finalStates.reverse().map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </select>
                  <button className="delete">Delete</button>
                </fieldset>
              </form>
            </td>
          </tr>
        )}
        {/* {states.length > 0 && (
          <tr>
            <td>
              <form onSubmit={handleAddTransition}>
                <fieldset>
                  <legend>Add Transition</legend>
                  <input type="text" id="input_symbol" placeholder="Symbol" />
                  <select id="input_source">
                    <option value="">- Select -</option>
                    {states.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </select>
                  <select id="input_target">
                    <option value="">- Select -</option>
                    {states.map((state) => (
                      <option key={state}>{state}</option>
                    ))}
                  </select>
                  <button>Add</button>
                </fieldset>
              </form>
            </td>
          </tr>
        )} */}
      </table>

      <div>
        {states.length > 0 && (
          <p>
            <b>Q</b>: {states.join(", ")}
          </p>
        )}
        {startState && (
          <p>
            <b>
              q<sub>0</sub>
            </b>
            : {startState}
          </p>
        )}
        {finalStates.length > 0 && (
          <p>
            <b>F</b>: {finalStates.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
