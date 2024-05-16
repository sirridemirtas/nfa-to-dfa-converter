import { useContext } from "react";
import { AppContext } from "../store/Context";

export const TransitionTableNFA = () => {
  const { state } = useContext(AppContext);

  const uniqueSymbols = [
    ...new Set(state.transitions.map(([symbol]) => symbol)),
  ];

  const uniqueSourceStates = [
    ...new Set(state.transitions.map(([, source]) => source)),
  ];

  return (
    <div className="tableNFA">
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
              <td>{source}</td>
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
