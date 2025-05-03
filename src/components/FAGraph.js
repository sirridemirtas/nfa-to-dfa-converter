import { useContext, useEffect, useRef } from "react";
import { Network } from "vis-network/standalone/esm/vis-network";
import "vis-network/styles/vis-network.css";

import { AppContext } from "../store/Context";

export const FAGraph = ({ data, title }) => {
  const { state } = useContext(AppContext);

  const { states, alphabet, startState, finalStates, transitions } = data
    ? data
    : state;

  const containerRef = useRef(null);

  useEffect(() => {
    const nodes = states.map((state) => {
      const isFinal = finalStates.includes(state);
      const isStart = state === startState;
      const isStartAndFinal = isStart && isFinal;

      return {
        id: state,
        label: state,
        color: {
          background: "white",
          border: isStartAndFinal
            ? "orange"
            : isStart
            ? "green"
            : isFinal
            ? "red"
            : "black",
        },
        borderWidth: isStartAndFinal ? 3 : isStart ? 3 : isFinal ? 3 : 1,
        title: isStartAndFinal
          ? "Start and Final State"
          : isStart
          ? "Start State"
          : isFinal
          ? "Final State"
          : "State",
      };
    });

    // Create a map of edges
    const edgeMap = new Map();

    transitions.forEach(([symbol, source, target]) => {
      const key = `${source}-${target}`;
      if (edgeMap.has(key)) {
        edgeMap.get(key).label += `, ${symbol}`;
      } else {
        edgeMap.set(key, {
          from: source,
          to: target,
          label: symbol,
          arrows: "to",
          font: { align: "middle" },
        });
      }
    });

    const edges = Array.from(edgeMap.values());

    const data = { nodes, edges };
    const options = {
      autoResize: true,
      layout: {
        hierarchical: false,
        improvedLayout: true,
      },
      nodes: {
        shape: "circle",
        size: 30,
        font: {
          size: 32,
        },
        borderWidth: 2,
        margin: 10,
      },
      edges: {
        width: 2,
        arrows: {
          to: {
            scaleFactor: 0.5, // make arrows smaller
          },
        },
        smooth: {
          type: "dynamic",
        },
        color: {
          color: "grey",
          highlight: "grey",
          hover: "grey",
        },
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -30000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09,
          /* avoidOverlap: 1, */
        },
        stabilization: {
          iterations: 2500,
        },
      },
    };

    const network = new Network(containerRef.current, data, options);

    return () => {
      network.destroy();
    };
  }, [states, alphabet, startState, finalStates, transitions]);

  return (
    <div className="NFAGraph">
      <h2>{title}</h2>
      <p>
        Red color represents{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>final states</span>,
        green color represents the{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>start state</span>,
        and orange color represents a{" "}
        <span style={{ color: "orange", fontWeight: "bold" }}>
          state that is simultaneously both the start and a final state
        </span>
        .
      </p>
      <div
        ref={containerRef}
        style={{
          height: "600px",
          borderRadius: "8px",
          background: "#fafafa",
        }}
      />
    </div>
  );
};
