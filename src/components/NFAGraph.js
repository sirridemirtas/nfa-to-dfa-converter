import { useContext, useEffect, useRef } from "react";
import { Network } from "vis-network/standalone/esm/vis-network";
import "vis-network/styles/vis-network.css";

import { AppContext } from "../store/Context";

export const NFAGraph = () => {
  const { state } = useContext(AppContext);

  const { states, alphabet, startState, finalStates, transitions } = state;

  const containerRef = useRef(null);

  useEffect(() => {
    const nodes = states.map((state) => ({
      id: state,
      label: state,
      color: {
        background: "white",
        border:
          startState === state
            ? "green"
            : finalStates.includes(state)
            ? "red"
            : "black",
      },
      borderWidth:
        startState === state ? 3 : finalStates.includes(state) ? 3 : 1,
      title:
        startState === state
          ? "Start State"
          : finalStates.includes(state)
          ? "Final State"
          : "State",
    }));

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
          avoidOverlap: 1,
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
      <h2>NFA Graph</h2>
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
