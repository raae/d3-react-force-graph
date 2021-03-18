import { memo } from "react";

const GraphNode = memo(({ id, fill }) => {
  return <circle id={id} r="5" opacity={0} fill={fill || "teal"} />;
});

export { GraphNode };
