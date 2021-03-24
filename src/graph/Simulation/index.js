import { useContext, createContext, useRef, useEffect } from "react";
import * as d3 from "d3";

import { useData } from "./useData";

const Context = createContext(null);

const Simulation = ({ children, data, onPositionsChange }) => {
  const simRef = useRef(createSim());

  const { nodes, links, threshold, updatePositions } = useData(data, {
    onPositionsChange,
  });

  const value = { nodes, links, updatePositions };

  useEffect(() => {
    updateSim(simRef.current, { nodes, links, updatePositions });
    return cleanUpSim(simRef.current);
  }, [nodes, links, updatePositions]);

  useEffect(() => {
    restartSim(simRef.current, { threshold });
  }, [nodes, links, threshold]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useSimulation = () => {
  return useContext(Context);
};

export { Simulation, useSimulation };

const createSim = () => {
  console.log("Simulation: Create simulation");
  const sim = d3.forceSimulation();
  sim.force("charge", d3.forceManyBody());
  return sim;
};

const restartSim = (sim, { threshold }) => {
  console.log("Simulation: Restart Sim", sim.alpha(), threshold);
  if (sim.alpha() < threshold) {
    sim.alpha(threshold);
    sim.restart();
  }
};

const updateSim = (sim, { nodes, links, updatePositions }) => {
  console.log("Simulation: Update simulation");

  sim.nodes(nodes).force(
    "link",
    d3.forceLink(links).id((d) => d.id)
  );

  sim.on("tick", () => {
    updatePositions();
  });

  sim.on("end", () => {
    console.log("D3Sim: End");
    nodes.forEach((node) => {
      node.fx = node.x;
      node.fy = node.y;
    });
  });
};

const cleanUpSim = (sim) => {
  return () => {
    sim.on(".tick", null);
    sim.on(".end", null);
  };
};
