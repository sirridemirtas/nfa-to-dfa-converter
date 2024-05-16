import { useContext } from "react";
import { AppContext } from "../store/Context";

export const TransitionTableNFA = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="tableNFA">
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Transition</th>
            <th>Next State</th>
          </tr>
        </thead>
        <tbody>
          {state.transitions.map((transition, index) => (
            <tr key={index}>
              <td>{transition[1]}</td>
              <td>{transition[0]}</td>
              <td>{transition[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
