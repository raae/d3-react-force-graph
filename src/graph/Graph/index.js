import { memo } from "react";
import { useDimensions } from "./useDimentions";
import { useData } from "./useData";
import { useSimulation } from "./useSimulation";

// Use memo so graph does not re-render when positions change

const Graph = memo(({ data, children, onPositionsChange }) => {
  console.log("Graph: Render");

  const { ref: rootRef, height, width } = useDimensions();
  const { nodes, links } = useData(data);
  const { simElRef } = useSimulation({
    nodes,
    links,
    width,
    height,
    onPositionsChange,
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "floralwhite",
      }}
      ref={rootRef}
    >
      <svg
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
        width={width}
        height={height}
        ref={simElRef}
      >
        {children}
        {/* <g>{children}</g> */}
      </svg>
    </div>
  );
});

export { Graph };
