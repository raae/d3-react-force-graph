import { useRef, useEffect, memo, useCallback } from "react";
import * as d3 from "d3";

import { useGraphUpdater } from "../graph-context";

const Brush = memo(({ width, height, nodes, onBrushEnd }) => {
  console.log("Brush: Run");

  const { setBrushedIds } = useGraphUpdater();

  const ref = useRef();

  const handleOnBrush = useCallback(
    (event) => {
      if (ref.current) {
        const { selection } = event;
        const brushedIds = calculateBrushedNodeIds(ref.current, {
          selection,
          nodes,
        });
        setBrushedIds(brushedIds);
        console.log(brushedIds);
      }
    },
    [setBrushedIds, nodes]
  );

  const handleOnBrushEnd = useCallback(
    (event) => {
      onBrushEnd();
    },
    [onBrushEnd]
  );

  useEffect(() => {
    if (ref.current) {
      return syncWithDom(ref.current, { handleOnBrush, handleOnBrushEnd });
    }
  }, [height, width, handleOnBrush, handleOnBrushEnd]);

  return <g ref={ref} />;
});

export { Brush };

const syncWithDom = (brushEl, { handleOnBrush, handleOnBrushEnd }) => {
  console.log("Brush: Sync with DOM");

  const d3Selection = d3.select(brushEl);
  const d3Brush = d3.brush();

  d3Brush.on("brush", handleOnBrush);
  d3Brush.on("end", () => {
    d3Selection.call(d3.brush().clear);
  });

  d3Selection.call(d3Brush);

  return () => {
    console.log("Brush: Unsync with DOM");
    d3Selection.on(".brush", null);
    d3Selection.on(".end", null);
  };
};

const calculateBrushedNodeIds = (brushEl, { selection, nodes }) => {
  const d3SvgNode = d3.select(brushEl.parentElement).node();
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
