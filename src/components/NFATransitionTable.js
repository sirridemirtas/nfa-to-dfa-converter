import { useContext } from "react";
import { AppContext } from "../store/Context";

/** NFA data structure
{
  "states": ["A", "B", "C"],
  "alphabet": ["0", "1"],
  "initialState": "A",
  "finalStates": ["C"],
  "transitions": {
    "A": {
      "0": ["A"],
      "1": ["B", "C"]
    },
    "B": {
      "0": ["B"],
      "1": ["A", "C"]
    },
    "C": {
      "0": ["A", "B"],
      "1": ["C"]
    }
  }
} */

export const NFATransitionTable = () => {
  const { state } = useContext(AppContext);

  const uniqueSymbols = [
    ...new Set(state.transitions.map(([symbol]) => symbol)),
  ];

  const uniqueSourceStates = [
    ...new Set(state.transitions.map(([, source]) => source)),
  ];

  return (
    <div className="table tableNFA">
      <h2>NFA Transition Table</h2>
      <table>
        <thead>
          <tr>
            <th>δ</th>
            {uniqueSymbols.map((symbol) => (
              <th key={symbol}>{symbol}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueSourceStates.map((source) => (
            <tr key={source}>
              <td>
                {source === state.startState ? "→" : ""}
                {state.finalStates.includes(source) ? "*" : ""}
                {source}
              </td>
              {uniqueSymbols.map((symbol) => (
                <td key={symbol}>
                  {state.transitions
                    .filter(([s, src, _t]) => s === symbol && src === source)
                    .map(([_symbol, _source, target]) => target)
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
