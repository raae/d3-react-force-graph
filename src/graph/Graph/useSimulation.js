import { useRef, useEffect } from "react";
import * as d3 from "d3";

export const useSimulation = ({ nodes, links, height, width }) => {
  console.log("useSimulation: Run", nodes.length);

  const simElRef = useRef();
  const simRef = useRef();

  useEffect(() => {
    if (simRef.current) {
      updateSimData(simRef.current, { nodes, links });
      restartSim(simRef.current, { threshold: 0.3 });
    }
  }, [nodes, links]);

  if (!simRef.current) {
    simRef.current = createSim({ width, height });
    updateSimData(simRef.current, { nodes, links });
  }

  if (simRef.current && simElRef.current) {
    syncWithDom(simRef.current, simElRef.current, { nodes, links });
  }

  return {
    simElRef,
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

const syncWithDom = (sim, svg, { nodes, links }) => {
  console.log("useSimulation: Sync with DOM");

  const svgEl = d3.select(svg);

  const d3NodeSelection = svgEl.selectAll("circle").data(nodes, function (d) {
    return (d && d.id) || d3.select(this).attr("id");
  });

  const d3LinkSelection = svgEl.selectAll("line").data(links, function (d) {
    return (d && d.id) || d3.select(this).attr("id");
  });

  const updatePositions = () => {
    d3LinkSelection
      .attr("opacity", 1)
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    d3NodeSelection
      .attr("opacity", 1)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);
  };

  const d3Drag = d3.drag().on("start drag end", (event) => {
    const { dx, dy, subject } = event;
    const { id } = subject;

    let draggingIds = [id];

    draggingIds.map((draggingId) => {
      const node = nodes.find((node) => node.id === draggingId);

      if (node) {
        node.x = node.x + dx;
        node.y = node.y + dy;
        node.fx = node.x;
        node.fy = node.y;
      }

      return node;
    });

    updatePositions();
  });

  d3NodeSelection.call(d3Drag);

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
