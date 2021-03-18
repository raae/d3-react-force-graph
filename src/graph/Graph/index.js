import { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import { useGraphDimensions } from "../utils";
import { useData } from "./useData";
import { useSimulation } from "./useSimulation";

const Graph = ({ data, children }) => {
  console.log("Render");

  const { ref: rootRef, height, width } = useGraphDimensions();
  const { nodes, links } = useData(data);
  const { svgRef } = useSimulation({ nodes, links, width, height });

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
        width={width}
        height={height}
        ref={svgRef}
      >
        {children}
      </svg>
    </div>
  );
};

export default Graph;
