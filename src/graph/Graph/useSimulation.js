import { useRef, useEffect } from "react";
import * as d3 from "d3";

const useSimulation = ({ nodes, links, height, width }) => {
  console.log("useSimulation: Run", nodes.length);

  const svgRef = useRef();
  const simRef = useRef();

  if (!simRef.current && width !== 0 && height !== 0) {
    simRef.current = createSim();
  }

  useEffect(() => {
    if (simRef.current) {
      updateSimForceCenter(simRef.current, { width, height });
      updateSimData(simRef.current, { nodes, links });
      syncWithDom(simRef.current, svgRef.current, { nodes, links });
      restartSim(simRef.current, { threshold: 0.3 });
    }
  }, [nodes, links, height, width]);

  return {
    svgRef,
  };
};

export { useSimulation };

const createSim = () => {
  console.log("D3Sim: Create");
  const sim = d3.forceSimulation();
  sim.force("charge", d3.forceManyBody());
  return sim;
};

const updateSimForceCenter = (sim, { width, height }) => {
  console.log("D3Sim: Update Force Center");
  return sim.force("center", d3.forceCenter(width / 2, height / 2));
};

const updateSimData = (sim, { nodes, links }) => {
  console.log("D3Sim: Update Sim Data", nodes.length);
  return sim.nodes(nodes).force(
    "link",
    d3
      .forceLink(links)
      .id((d) => d.id)
      .distance(100)
  );
};

const restartSim = (sim, { threshold }) => {
  if (sim.alpha() < threshold) {
    sim.alpha(threshold + 0.1);
    sim.restart();
  }
};

const syncWithDom = (sim, svg, { nodes, links }) => {
  sim.on("tick", () => {
    const svgEl = d3.select(svg);

    const node = svgEl.selectAll("circle").data(nodes, function (d) {
      return (d && d.id) || d3.select(this).attr("id");
    });

    const link = svgEl.selectAll("line").data(links, function (d) {
      return (d && d.id) || d3.select(this).attr("id");
    });

    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });

  sim.on("end", () => {
    console.log("D3Sim: End");
    nodes.forEach((node) => {
      node.fx = node.x;
      node.fy = node.y;
    });
  });
};
