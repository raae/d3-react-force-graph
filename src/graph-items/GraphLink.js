import { memo } from "react";

const GraphLink = memo(({ id, value }) => {
  return (
    <line
      id={id}
      strokeOpacity="0.6"
      stroke="#999"
      strokeWidth={Math.sqrt(value)}
    />
  );
});

export { GraphLink };
