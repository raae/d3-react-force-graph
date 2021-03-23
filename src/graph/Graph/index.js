import { memo, useRef } from "react";
import { useData } from "./useData";
import { useSimulation } from "./useSimulation";
import { useDrag } from "./useDrag";
import { useZoom } from "./useZoom";

// Use memo so graph does not re-render when positions change
const Graph = memo(({ children, height, width, ...props }) => {
  console.log("Graph: Render");

  const svgRef = useRef();

  const { nodes, links, threshold, updatePositions } = useData(props);
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
    </svg>
  );
});

export { Graph };
