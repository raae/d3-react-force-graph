import { useEffect, useState } from "react";
import * as d3 from "d3";

import { useStage } from "../Stage";

const Zoom = ({ children, mousedownActive }) => {
  const { svgElement } = useStage();
  const [transform, setTransform] = useState("");

  useEffect(() => {
    if (svgElement) {
      return syncWithDom(svgElement, { setTransform, mousedownActive });
    }
  }, [svgElement, mousedownActive]);

  return <g transform={transform}>{children}</g>;
};

export { Zoom };

const syncWithDom = (svgEl, { setTransform, mousedownActive }) => {
  console.log("useZoom: Sync with DOM");

  const selection = d3.select(svgEl);

  const zoom = d3.zoom().on("zoom", (event) => {
    setTransform(event.transform);
  });

  selection.call(zoom);

  if (!mousedownActive) {
    selection.on("mousedown.zoom", null);
  }
  return () => {
    selection.on(".zoom", null);
  };
};
