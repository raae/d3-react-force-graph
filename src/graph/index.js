import { useRef } from "react";
import { Graph as D3Graph } from "./Graph";
import { useDimensions } from "./useDimentions";

import { GraphProvider } from "./graph-context";

// Create a graph context holding positions so that
// useSimulation does not need to know about the
// dom structure of links and nodes to change their position.

export { useGraphState } from "./graph-context";

export const Graph = ({ children, ...props }) => {
  const ref = useRef();
  const dimensions = useDimensions({ ref });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "floralwhite",
        position: "relative",
      }}
      ref={ref}
    >
      <GraphProvider>
        <D3Graph {...props} {...dimensions}>
          {children}
        </D3Graph>
      </GraphProvider>
    </div>
  );
};
