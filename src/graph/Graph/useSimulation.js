import { useRef, useEffect } from "react";

import * as d3 from "d3";

export const useSimulation = (props) => {
  const { nodes, links, updatePositions } = props;
  console.log("useSimulation: Run", nodes.length);

  const simRef = useRef();

  useEffect(() => {
    if (simRef.current) {
      updateSimData(simRef.current, { nodes, links });
      restartSim(simRef.current, { threshold: 0.3 });
    }
  }, [nodes, links]);

  if (!simRef.current) {
    simRef.current = createSim(props);
    updateSimData(simRef.current, props);
  }

  if (simRef.current) {
    syncWithDom(simRef.current, { nodes, updatePositions });
  }

  return {
    updatePositions,
  };
};

const createSim = () => {
  console.log("useSimulation: Create simulation");
  const sim = d3.forceSimulation();
  sim.force("charge", d3.forceManyBody());
  return sim;
};

const updateSimData = (sim, { nodes, links }) => {
  console.log("useSimulation: Update Sim Data", nodes.length);
  return sim.nodes(nodes).force(
    "link",
    d3.forceLink(links).id((d) => d.id)
  );
};

const restartSim = (sim, { threshold }) => {
  if (sim.alpha() < threshold) {
    sim.alpha(threshold + 0.1);
    sim.restart();
  }
};

const syncWithDom = (sim, { nodes, updatePositions }) => {
  console.log("useSimulation: Sync with DOM");

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
