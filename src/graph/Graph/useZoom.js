import { useState } from "react";

import * as d3 from "d3";

export const useZoom = (props) => {
  const { svgRef } = props;
  console.log("useZoom: Run");

  const [transform, setTransform] = useState();

  if (svgRef.current) {
    syncWithDom(svgRef.current, { setTransform });
  }

  return {
    transform,
  };
};

const syncWithDom = (svgEl, { setTransform }) => {
  console.log("useZoom: Sync with DOM");

  const svg = d3.select(svgEl);

  const zoom = d3.zoom().on("zoom", (event) => {
    setTransform(event.transform);
  });

  svg.call(zoom).on("mousedown.zoom", null);
};
