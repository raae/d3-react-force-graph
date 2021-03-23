import { memo, useRef } from "react";
import { useData } from "./useData";
import { useSimulation } from "./useSimulation";
import { useDrag } from "./useDrag";
import { useZoom } from "./useZoom";

import { useGraphUpdater } from "../graph-context";
import { Brush } from "../Brush";

// Use memo so graph does not re-render when positions change
const Graph = memo(({ children, height, width, data }) => {
  console.log("Graph: Render", height, width);
  const { setPositions } = useGraphUpdater();
  const svgRef = useRef();

  const { nodes, links, threshold, updatePositions } = useData(data, {
    setPositions,
  });
  useSimulation({ nodes, links, threshold, updatePositions });

  useDrag({ svgRef, nodes, updatePositions });

  const { transform } = useZoom({ svgRef });

  return (
    <svg
      viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      width={width}
      height={height}
      ref={svgRef}
    >
      <g transform={transform}>{children}</g>
      <Brush
        height={height}
        width={width}
        nodes={nodes}
        onBrushEnd={() => console.log("onBrushEnd")}
      />
    </svg>
  );
});

export { Graph };
