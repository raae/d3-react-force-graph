import { memo } from "react";
import { useGraphContext } from "../graph";

// Use memo so graph item does not re-render,
// on position changes. But moves its position.

const GraphLink = memo(({ id, source, target, value }) => {
  const pos = useGraphContext() || {};

  const pos1 = pos[source];
  const pos2 = pos[target];

  const opacity = pos1 && pos2 ? 1 : 0;
  const { x: x1, y: y1 } = pos1 || {};
  const { x: x2, y: y2 } = pos2 || {};

  return (
    <line
      data-graph-id={id}
      data-graph-type="link"
      opacity={opacity}
      strokeOpacity="0.6"
      stroke="#999"
      strokeWidth={Math.sqrt(value)}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
    />
  );
});

export { GraphLink };
