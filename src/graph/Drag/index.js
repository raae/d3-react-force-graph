import { useCallback, useEffect } from "react";
import * as d3 from "d3";

import { useStage } from "../Stage";
import { useSimulation } from "../Simulation";

const Drag = () => {
  console.log("Drag: Render");
  const { svgElement } = useStage();
  const { nodes, updatePositions } = useSimulation();

  const handlePositionsChange = useCallback(
    (newPositions) => {
      updatePositions(newPositions);
    },
    [updatePositions]
  );

  useEffect(() => {
    if (svgElement) {
      return syncWithDom(svgElement, { nodes, handlePositionsChange });
    }
  }, [svgElement, nodes, handlePositionsChange]);

  return null;
};

export { Drag };

const syncWithDom = (svgEl, { nodes, handlePositionsChange }) => {
  console.log("Drag: Sync with DOM");

  const svgDomNode = d3.select(svgEl);

  const d3NodeSelection = svgDomNode
    .selectAll('[data-graph-type="node"]')
    .data(nodes, function (d) {
      return (d && d.id) || d3.select(this).attr("data-graph-id");
    });

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

    handlePositionsChange();
  });

  d3NodeSelection.call(d3Drag);

  return () => {
    console.log("Drag: Unsync with DOM");
    d3NodeSelection.on(".start", null);
    d3NodeSelection.on(".drag", null);
    d3NodeSelection.on(".end", null);
  };
};
