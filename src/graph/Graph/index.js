import { memo, useState } from "react";

import { useGraphUpdater } from "../graph-context";
import { Brush } from "../Brush";
import { Zoom } from "../Zoom";
import { Stage } from "../Stage";
import { Drag } from "../Drag";
import { Simulation } from "../Simulation";

// Use memo so graph does not re-render when positions change
const Graph = memo(({ children, height, width, data }) => {
  console.log("Graph: Render", height, width);

  const [brush, setBrush] = useState(false);

  const { setPositions, setBrushedIds } = useGraphUpdater();

  return (
    <>
      <Stage width={width} height={height}>
        <Simulation
          data={data}
          onPositionsChange={(positions) => setPositions(positions)}
        >
          <Zoom mousedownActive={!brush}>{children}</Zoom>
          <Drag />

          <Brush
            active={brush}
            onBrush={(brushedIds) => {
              setBrushedIds(brushedIds);
            }}
            onBrushEnd={() => {
              setBrush(false);
            }}
          />
        </Simulation>
      </Stage>
      <p style={{ position: "absolute", bottom: 0 }}>
        <input
          id="brush"
          type="checkbox"
          onChange={() => setBrush((current) => !current)}
          checked={brush}
        />{" "}
        <label htmlFor="brush">Brush</label>
      </p>
    </>
  );
});

export { Graph };
