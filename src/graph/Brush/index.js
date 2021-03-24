import { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";

import { useStage } from "../Stage";
import { useSimulation } from "../Simulation";

const Brush = ({ onBrushEnd, onBrush, active }) => {
  console.log("Brush: Render");

  const { svgElement, width, height } = useStage();
  const { nodes } = useSimulation();

  const ref = useRef();

  const handleOnBrush = useCallback(
    (event) => {
      if (svgElement) {
        const { selection } = event;
        const brushedIds = calculateBrushedNodeIds(svgElement, {
          selection,
          nodes,
        });
        onBrush("brushedIds", brushedIds);
        console.log(brushedIds);
      }
    },
    [onBrush, svgElement, nodes]
  );

  const handleOnBrushEnd = useCallback(() => {
    onBrushEnd();
  }, [onBrushEnd]);

  useEffect(() => {
    if (ref.current) {
      return syncWithDom(ref.current, {
        handleOnBrush,
        handleOnBrushEnd,
      });
    }
  }, [height, width, active, handleOnBrush, handleOnBrushEnd]);

  return active ? <g ref={ref} /> : null;
};

export { Brush };

const syncWithDom = (brushEl, { handleOnBrush, handleOnBrushEnd }) => {
  console.log("Brush: Sync with DOM");

  const d3Selection = d3.select(brushEl);
  const d3Brush = d3.brush();

  d3Brush.on("brush", handleOnBrush);
  d3Brush.on("end", (event) => {
    d3Selection.call(d3.brush().clear);
    handleOnBrushEnd(event);
  });

  d3Selection.call(d3Brush);

  return () => {
    console.log("Brush: Unsync with DOM");
    d3Selection.on(".brush", null);
    d3Selection.on(".end", null);
  };
};

const calculateBrushedNodeIds = (svgElement, { selection, nodes }) => {
  const d3SvgNode = d3.select(svgElement).node();
  const transform = d3.zoomTransform(d3SvgNode);

  const topLeft = transform.invert(selection[0]);
  const bottomRight = transform.invert(selection[1]);

  return nodes
    .filter((node) => {
      const { x, y } = node;
      const insideX = x && topLeft[0] <= x && x < bottomRight[0];
      const insideY = y && topLeft[1] <= y && y < bottomRight[1];

      return insideX && insideY;
    })
    .map(({ id }) => id);
};
