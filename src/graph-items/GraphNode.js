import { memo } from "react";

const GraphNode = memo(({ id, fill }) => {
  return <circle id={id} r="5" fill={fill || "teal"} />;
});

export { GraphNode };
