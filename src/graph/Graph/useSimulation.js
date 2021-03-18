import { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";

const createSim = () => {
  const sim = d3.forceSimulation();
  sim.force("charge", d3.forceManyBody());
  return sim;
};

const useSimulation = ({ nodes, links, height, width }) => {
  const svgRef = useRef();
  const simRef = useRef(createSim());

  const restart = useCallback((treshhold) => {
    if (simRef.current.alpha() < treshhold) {
      simRef.current.alpha(treshhold + 0.1);
      simRef.current.restart();
    }
  }, []);

  useEffect(() => {
    const stage = d3.select(svgRef.current);

    const node = stage.selectAll("circle").data(nodes, function (d) {
      return (d && d.id) || d3.select(this).attr("id");
    });

    const link = stage.selectAll("line").data(links, function (d) {
      return (d && d.id) || d3.select(this).attr("id");
    });

    simRef.current.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    simRef.current.on("end", () => {
      console.log("end");
    });
  }, [nodes, links]);

  useEffect(() => {
    console.log("Update force center");
    simRef.current.force("center", d3.forceCenter(width / 2, height / 2));
    restart(0.2);
  }, [width, height, restart]);

  useEffect(() => {
    console.log("Update nodes and links");
    simRef.current.nodes(nodes);
    simRef.current.force(
      "link",
      d3.forceLink(links).id((d) => d.id)
    );
    restart(0.2);
  }, [nodes, links, restart]);

  return {
    svgRef,
  };
};

export { useSimulation };
