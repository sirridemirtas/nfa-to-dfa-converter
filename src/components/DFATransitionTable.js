import { useContext } from "react";
import { AppContext } from "../store/Context";
import { nfaToDfa } from "../lib/nfaToDfa";

/** DFA data structure
{
  states: [ '["A"]', '["B","C"]', '["A","B"]', '["A","C"]', '["A","B","C"]' ],
  alphabet: [ '0', '1' ],
  transitions: [
    [ '0', '["A"]', '["A"]' ],
    [ '1', '["A"]', '["B","C"]' ],
    [ '0', '["B","C"]', '["A","B"]' ],
    [ '1', '["B","C"]', '["A","C"]' ],
    [ '0', '["A","B"]', '["A","B"]' ],
    [ '1', '["A","B"]', '["A","B","C"]' ],
    [ '0', '["A","C"]', '["A","B"]' ],
    [ '1', '["A","C"]', '["B","C"]' ],
    [ '0', '["A","B","C"]', '["A","B"]' ],
    [ '1', '["A","B","C"]', '["A","B","C"]' ]
  ],
  startState: '["A"]',
  finalStates: [ '["B","C"]', '["A","C"]', '["A","B","C"]' ]
} */

export const DFATransitionTable = () => {
  const { state } = useContext(AppContext);
  const tableData = nfaToDfa(state);
  const { stateMapping } = tableData;

  return (
    <div className="table tableDFA">
      <h2>DFA Transition Table</h2>
      <p>
        <b>→</b>: Start State, <b>*</b>: Final State
      </p>
      <table>
        <thead>
          <tr>
            <th>δ</th>
            {tableData.alphabet.map((symbol) => (
              <th key={symbol}>{symbol}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.states.map((source) => {
            const srcMap = stateMapping[source];
            const isStart = tableData.startState === srcMap.name;
            const isFinal = tableData.finalStates.includes(srcMap.name);
            return (
              <tr key={source}>
                <td>
                  {isStart ? "→" : ""}
                  {isFinal ? "*" : ""}
                  {srcMap.name}
                  <small> ({srcMap.originalStates.join(", ")})</small>
                </td>
                {tableData.alphabet.map((symbol) => {
                  const transition = tableData.transitions.find(
                    ([s, src, _t]) => s === symbol && src === srcMap.name
                  );
                  const targetName = transition
                    ? stateMapping[
                        Object.keys(stateMapping).find(
                          (k) => stateMapping[k].name === transition[2]
                        )
                      ].name
                    : "";
                  return <td key={symbol}>{targetName}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="state-mapping-legend">
        <h4>State Mapping</h4>
        <ul>
          {Object.values(stateMapping).map((m) => (
            <li key={m.name}>
              {m.name} = {"{"}
              {m.originalStates.join(", ")}
              {"}"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
