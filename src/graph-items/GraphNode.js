import { memo } from "react";
import { useGraphState } from "../graph";

// Use memo so graph item does not re-render,
// on position changes. But moves its position.

const GraphNode = memo(({ id, fill }) => {
  const { positions } = useGraphState();

  const pos = positions[id];
  const opacity = pos ? 1 : 0;
  const { x, y } = pos || {};

  return (
    <circle
      data-graph-id={id}
      data-graph-type="node"
      r="5"
      opacity={opacity}
      fill={fill || "teal"}
      cx={x}
      cy={y}
    />
  );
});

export { GraphNode };
