import { memo, useRef } from "react";
import { useDimensions } from "./useDimentions";
import { useData } from "./useData";
import { useSimulation } from "./useSimulation";
import { useDrag } from "./useDrag";
import { useZoom } from "./useZoom";

// Use memo so graph does not re-render when positions change

const Graph = memo(({ children, ...props }) => {
  console.log("Graph: Render");

  const ref = useRef();
  const svgRef = useRef();

  const { nodes, links, updatePositions } = useData(props);
  useSimulation({ nodes, links, updatePositions });

  useDrag({ svgRef, nodes, updatePositions });
  const { height, width } = useDimensions({ ref });
  const { transform } = useZoom({ svgRef });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "floralwhite",
      }}
      ref={ref}
    >
      <svg
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
        width={width}
        height={height}
        ref={svgRef}
      >
        <g transform={transform}>{children}</g>
      </svg>
    </div>
  );
});

export { Graph };
