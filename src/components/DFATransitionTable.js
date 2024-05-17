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

  return (
    <div className="table tableDFA">
      <h2>DFA Transition Table</h2>
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
          {tableData.states.map((source) => (
            <tr key={source}>
              <td>
                {JSON.parse(source).join("") === state.startState ? "→" : ""}
                {state.finalStates.map(JSON.stringify).includes(source)
                  ? "*"
                  : ""}
                {JSON.parse(source).join(", ")}
              </td>
              {tableData.alphabet.map((symbol) => (
                <td key={symbol}>
                  {tableData.transitions
                    .filter(([s, src, _t]) => s === symbol && src === source)
                    .map(([_symbol, _source, target]) =>
                      JSON.parse(target).join(", ")
                    )
                    .join(", ")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
