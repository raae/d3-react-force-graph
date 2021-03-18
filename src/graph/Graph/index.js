import { useGraphDimensions } from "../utils";
import { useData } from "./useData";
import { useSimulation } from "./useSimulation";

const Graph = ({ data, children }) => {
  console.log("Graph: Render");

  const { ref: rootRef, height, width } = useGraphDimensions();
  const { nodes, links } = useData(data);
  const { simElRef } = useSimulation({ nodes, links, width, height });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "floralwhite",
      }}
      ref={rootRef}
    >
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        ref={simElRef}
      >
        {children}
      </svg>
    </div>
  );
};

export default Graph;
